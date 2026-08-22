import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export const EVIDENCE_AUTOPLAY_INTERVAL_MS = 2_000;
const SLIDE_TRANSITION_SECONDS = 0.65;

export interface EvidenceMediaItem {
  id?: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface EvidenceMediaGalleryProps {
  projectTitle: string;
  items?: readonly EvidenceMediaItem[];
  className?: string;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const slideVariants = {
  enter: (direction: 1 | -1) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.72,
  }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: 1 | -1) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.72,
  }),
};

const EvidenceMediaGallery = ({
  projectTitle,
  items = [],
  className = "",
}: EvidenceMediaGalleryProps) => {
  const instanceId = useId().replace(/:/g, "");
  const titleId = `evidence-media-title-${instanceId}`;
  const dialogTitleId = `evidence-media-dialog-title-${instanceId}`;
  const dialogDescriptionId = `evidence-media-dialog-description-${instanceId}`;
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [pointerPaused, setPointerPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(() =>
    typeof document === "undefined" || document.visibilityState !== "hidden",
  );
  const [inViewport, setInViewport] = useState(() => typeof IntersectionObserver === "undefined");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const [announcement, setAnnouncement] = useState("");
  const galleryRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const activeImageButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  const validItems = useMemo(
    () => items.filter((item) => item.src.trim().length > 0 && item.alt.trim().length > 0),
    [items],
  );
  const itemCount = validItems.length;
  const activeItem = validItems[activeIndex];
  const hasMultipleItems = itemCount > 1;

  const announceSlide = useCallback(
    (index: number) => {
      const item = validItems[index];
      if (item) setAnnouncement(`${index + 1} / ${itemCount}: ${item.alt}`);
    },
    [itemCount, validItems],
  );

  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (itemCount === 0) return;
      const normalizedIndex = ((nextIndex % itemCount) + itemCount) % itemCount;
      setSlideDirection(normalizedIndex >= activeIndexRef.current ? 1 : -1);
      activeIndexRef.current = normalizedIndex;
      setActiveIndex(normalizedIndex);
      announceSlide(normalizedIndex);
    },
    [announceSlide, itemCount],
  );

  const goPrevious = useCallback(() => {
    if (itemCount === 0) return;
    const nextIndex = (activeIndexRef.current - 1 + itemCount) % itemCount;
    setSlideDirection(-1);
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    announceSlide(nextIndex);
  }, [announceSlide, itemCount]);

  const goNext = useCallback(() => {
    if (itemCount === 0) return;
    const nextIndex = (activeIndexRef.current + 1) % itemCount;
    setSlideDirection(1);
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    announceSlide(nextIndex);
  }, [announceSlide, itemCount]);

  const restoreTriggerFocus = useCallback(() => {
    const focusTrigger = () => {
      const originalTrigger = returnFocusRef.current;
      const target = originalTrigger?.isConnected ? originalTrigger : activeImageButtonRef.current;
      target?.focus({ preventScroll: true });
    };
    if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(focusTrigger);
    else window.setTimeout(focusTrigger, 0);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    restoreTriggerFocus();
  }, [restoreTriggerFocus]);

  const openLightbox = (event: ReactMouseEvent<HTMLButtonElement>) => {
    returnFocusRef.current = event.currentTarget;
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = (event?: MediaQueryListEvent) => {
      setPrefersReducedMotion(event?.matches ?? mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener?.("change", syncPreference);
    return () => mediaQuery.removeEventListener?.("change", syncPreference);
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || typeof IntersectionObserver === "undefined") {
      setInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(Boolean(entry?.isIntersecting && entry.intersectionRatio > 0)),
      { threshold: 0.1 },
    );
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncVisibility = () => setDocumentVisible(document.visibilityState !== "hidden");
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    setActiveIndex((current) => {
      const nextIndex = itemCount === 0 ? 0 : Math.min(current, itemCount - 1);
      activeIndexRef.current = nextIndex;
      return nextIndex;
    });
    setAnnouncement("");
  }, [itemCount]);

  const autoplayActive =
    hasMultipleItems &&
    inViewport &&
    documentVisible &&
    !prefersReducedMotion &&
    !userPaused &&
    !pointerPaused &&
    !focusPaused &&
    !lightboxOpen;

  useEffect(() => {
    if (!autoplayActive) return;
    const autoplayTimer = window.setTimeout(() => {
      setSlideDirection(1);
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % itemCount;
        activeIndexRef.current = nextIndex;
        return nextIndex;
      });
    }, EVIDENCE_AUTOPLAY_INTERVAL_MS);

    return () => window.clearTimeout(autoplayTimer);
  }, [activeIndex, autoplayActive, itemCount]);

  useEffect(() => {
    if (!inViewport || itemCount < 2 || typeof Image === "undefined") return;
    const nextItem = validItems[(activeIndex + 1) % itemCount];
    if (!nextItem) return;
    const preloadImage = new Image();
    preloadImage.decoding = "async";
    preloadImage.src = nextItem.src;
  }, [activeIndex, inViewport, itemCount, validItems]);

  useEffect(() => {
    if (itemCount === 0 && lightboxOpen) closeLightbox();
  }, [closeLightbox, itemCount, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusCloseButton = () => closeButtonRef.current?.focus({ preventScroll: true });
    const focusFrame = typeof window.requestAnimationFrame === "function"
      ? window.requestAnimationFrame(focusCloseButton)
      : window.setTimeout(focusCloseButton, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      if (typeof window.cancelAnimationFrame === "function") window.cancelAnimationFrame(focusFrame);
      else window.clearTimeout(focusFrame);
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft" && hasMultipleItems) {
        event.preventDefault();
        goPrevious();
        return;
      }

      if (event.key === "ArrowRight" && hasMultipleItems) {
        event.preventDefault();
        goNext();
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => element.tabIndex >= 0 && !element.hasAttribute("disabled"));
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDialogKeyDown);
    };
  }, [closeLightbox, goNext, goPrevious, hasMultipleItems, lightboxOpen]);

  const handleGalleryKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (lightboxOpen || !hasMultipleItems) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "Home") {
      event.preventDefault();
      goToSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goToSlide(itemCount - 1);
    }
  };

  const handleBackdropMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeLightbox();
  };

  const handleFocusLeave = (event: ReactFocusEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setFocusPaused(false);
    }
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLElement>) => {
    if (!event.pointerType || event.pointerType === "mouse") setPointerPaused(true);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
    if (!event.pointerType || event.pointerType === "mouse") setPointerPaused(false);
  };

  const toggleUserPaused = () => {
    setUserPaused((paused) => {
      const nextPaused = !paused;
      if (!nextPaused) setFocusPaused(false);
      return nextPaused;
    });
  };

  const autoplayStatus = prefersReducedMotion
    ? "모션 감소 설정으로 자동 넘김이 꺼져 있습니다."
    : userPaused
      ? "자동 넘김이 일시정지되었습니다."
      : pointerPaused || focusPaused || lightboxOpen
        ? "이미지를 살펴보는 동안 자동 넘김이 멈춥니다."
        : "2초마다 다음 증거 이미지로 자동 이동합니다.";

  return (
    <section
      ref={galleryRef}
      className={`min-w-0 max-w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111111]/95 ${className}`.trim()}
      aria-labelledby={titleId}
      aria-roledescription={activeItem ? "carousel" : undefined}
      onKeyDown={handleGalleryKeyDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={handleFocusLeave}
    >
      <h3 id={titleId} className="sr-only">{projectTitle} 증거 이미지</h3>

      {!activeItem ? (
        <div
          className="flex min-h-56 w-full flex-col items-center justify-center border border-dashed border-[#ff6645]/30 bg-[#ff6645]/[0.04] px-6 py-10 text-center"
          data-evidence-media-state="empty"
        >
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff8a70]">
            증거 이미지
          </span>
          <p className="mt-3 break-words font-display text-base font-bold text-white">
            증거 이미지 준비 중
          </p>
        </div>
      ) : (
        <div className="min-w-0 p-3 sm:p-4">
          <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-2xl bg-black/40" aria-live="off">
            <motion.figure
              key={activeItem.id ?? activeItem.src}
              className="absolute inset-0 min-w-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${activeIndex + 1} / ${itemCount}`}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              transition={{
                duration: prefersReducedMotion ? 0 : SLIDE_TRANSITION_SECONDS,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
                <button
                  ref={activeImageButtonRef}
                  type="button"
                  className="group relative block h-full w-full min-w-0 overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] focus-visible:ring-inset"
                  aria-label={`${activeItem.alt} 확대해서 보기`}
                  aria-haspopup="dialog"
                  onClick={openLightbox}
                >
                  <img
                    src={activeItem.src}
                    alt={activeItem.alt}
                    width={activeItem.width}
                    height={activeItem.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-3 bottom-3 rounded-full bg-black/75 px-3 py-2 text-center font-body text-xs font-semibold text-white opacity-100 motion-safe:transition-opacity motion-reduce:transition-none sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
                    aria-hidden="true"
                  >
                    클릭하여 확대
                  </span>
                </button>
            </motion.figure>
          </div>

          {activeItem.caption && (
            <p className="break-words px-1 pt-3 font-body text-xs leading-5 text-white/65 sm:text-sm">
              {activeItem.caption}
            </p>
          )}

          {hasMultipleItems && (
            <div className="mt-3 flex min-w-0 items-center justify-between gap-2" aria-label="슬라이드 제어">
              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-white/15 px-3 text-lg text-white motion-safe:transition-colors motion-reduce:transition-none hover:border-[#ff6645]/60 hover:text-[#ff8a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
                aria-label="이전 이미지"
                onClick={goPrevious}
              >
                <span aria-hidden="true">←</span>
              </button>

              <div className="flex min-w-0 flex-wrap items-center justify-center gap-1" aria-label="이미지 선택">
                {validItems.map((item, index) => (
                  <button
                    key={item.id ?? `${item.src}-${index}`}
                    type="button"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
                    aria-label={`${index + 1}번째 이미지 보기`}
                    aria-current={activeIndex === index ? "true" : undefined}
                    onClick={() => goToSlide(index)}
                  >
                    <span
                      className={`h-2.5 rounded-full motion-safe:transition-all motion-reduce:transition-none ${
                        activeIndex === index ? "w-6 bg-[#ff6645]" : "w-2.5 bg-white/35"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-white/15 px-3 text-lg text-white motion-safe:transition-colors motion-reduce:transition-none hover:border-[#ff6645]/60 hover:text-[#ff8a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
                aria-label="다음 이미지"
                onClick={goNext}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}

          {hasMultipleItems && (
            <div className="mt-2 flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2">
              <span className="min-w-0 break-words font-body text-[11px] leading-5 text-white/55 sm:text-xs">
                {autoplayStatus}
              </span>
              {!prefersReducedMotion && (
                <button
                  type="button"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-white/15 px-4 font-body text-xs font-bold text-white motion-safe:transition-colors motion-reduce:transition-none hover:border-[#ff6645]/60 hover:text-[#ff8a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
                  aria-label={userPaused ? "자동 넘김 재생" : "자동 넘김 일시정지"}
                  aria-pressed={userPaused}
                  onClick={toggleUserPaused}
                >
                  {userPaused ? "자동 재생" : "일시정지"}
                </button>
              )}
            </div>
          )}

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {announcement}
          </p>
        </div>
      )}

      {lightboxOpen && activeItem && createPortal(
        <div
          className="fixed inset-0 z-[424244] flex items-center justify-center overflow-y-auto bg-black/90 p-3 sm:p-6"
          onMouseDown={handleBackdropMouseDown}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            aria-describedby={dialogDescriptionId}
            tabIndex={-1}
            className="relative my-auto w-full min-w-0 max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#070707] shadow-[0_24px_100px_rgba(0,0,0,.65)] focus:outline-none sm:rounded-3xl"
          >
            <header className="flex min-w-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <h4 id={dialogTitleId} className="truncate font-display text-sm font-bold text-white sm:text-base">
                  {projectTitle} 증거 이미지 확대
                </h4>
                <p className="mt-1 font-body text-xs text-white/55">{activeIndex + 1} / {itemCount}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl text-white hover:border-[#ff6645]/60 hover:text-[#ff8a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
                aria-label="확대 이미지 닫기"
                onClick={closeLightbox}
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="grid min-w-0 items-center gap-3 p-3 sm:grid-cols-[3rem_minmax(0,1fr)_3rem] sm:p-5">
              {hasMultipleItems && (
                <button
                  type="button"
                  className="order-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 text-xl text-white hover:border-[#ff6645]/60 hover:text-[#ff8a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] sm:order-1"
                  aria-label="확대 화면 이전 이미지"
                  onClick={goPrevious}
                >
                  <span aria-hidden="true">←</span>
                </button>
              )}

              <figure className="order-1 min-w-0 sm:order-2">
                <div className="flex max-h-[calc(100dvh-13rem)] min-h-0 w-full items-center justify-center overflow-hidden rounded-xl bg-black/40">
                  <img
                    src={activeItem.src}
                    alt={activeItem.alt}
                    width={activeItem.width}
                    height={activeItem.height}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[calc(100dvh-13rem)] max-w-full object-contain motion-safe:transition-opacity motion-safe:duration-200 motion-reduce:transition-none"
                  />
                </div>
                {activeItem.caption && (
                  <figcaption className="break-words px-1 pt-3 font-body text-xs leading-5 text-white/70 sm:text-sm">
                    {activeItem.caption}
                  </figcaption>
                )}
              </figure>

              {hasMultipleItems && (
                <button
                  type="button"
                  className="order-3 ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 text-xl text-white hover:border-[#ff6645]/60 hover:text-[#ff8a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
                  aria-label="확대 화면 다음 이미지"
                  onClick={goNext}
                >
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>

            <p id={dialogDescriptionId} className="sr-only">
              {activeIndex + 1} / {itemCount}. {activeItem.caption ?? activeItem.alt}
            </p>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
};

export default EvidenceMediaGallery;
