import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import EvidenceMediaGallery, {
  EVIDENCE_AUTOPLAY_INTERVAL_MS,
  type EvidenceMediaItem,
} from "@/components/EvidenceMediaGallery";

const projectMedia: EvidenceMediaItem[] = [
  {
    id: "problem",
    src: "/evidence/problem.png",
    alt: "문제 정의 화면",
    caption: "문제 정의 과정",
    width: 1600,
    height: 1000,
  },
  {
    id: "decision",
    src: "https://example.com/evidence/decision.png",
    alt: "우선순위 결정 화면",
    caption: "우선순위 결정 과정",
  },
  {
    id: "result",
    src: "/evidence/result.png",
    alt: "결과 확인 화면",
  },
];

class VisibleIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0.1];

  constructor(protected readonly callback: IntersectionObserverCallback) {}

  disconnect() {}

  observe(target: Element) {
    const bounds = target.getBoundingClientRect();
    this.callback(
      [{
        time: 0,
        target,
        rootBounds: null,
        boundingClientRect: bounds,
        intersectionRect: bounds,
        isIntersecting: true,
        intersectionRatio: 1,
      }],
      this,
    );
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {}
}

class OffscreenIntersectionObserver extends VisibleIntersectionObserver {
  observe(target: Element) {
    const bounds = target.getBoundingClientRect();
    this.callback(
      [{
        time: 0,
        target,
        rootBounds: null,
        boundingClientRect: bounds,
        intersectionRect: bounds,
        isIntersecting: false,
        intersectionRatio: 0,
      }],
      this,
    );
  }
}

const stubReducedMotion = (matches: boolean) => {
  vi.stubGlobal("matchMedia", vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
};

describe("EvidenceMediaGallery", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("이미지가 없으면 프로젝트별 준비 상태를 독립 영역으로 표시한다", () => {
    const { container } = render(
      <EvidenceMediaGallery projectTitle="Archi" items={[]} />,
    );

    expect(screen.getByRole("heading", { name: "Archi 증거 이미지" })).toBeInTheDocument();
    expect(screen.getByText("증거 이미지 준비 중")).toBeInTheDocument();
    expect(container.querySelector('[data-evidence-media-state="empty"]')).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("URL·PNG 데이터를 설명 행 없이 lazy 이미지, 이전·다음·점과 키보드로 탐색한다", () => {
    const { container } = render(
      <EvidenceMediaGallery projectTitle="Archi" items={projectMedia} />,
    );

    const firstImage = screen.getByRole("img", { name: "문제 정의 화면" });
    expect(firstImage).toHaveAttribute("src", "/evidence/problem.png");
    expect(firstImage).toHaveAttribute("loading", "lazy");
    expect(firstImage).toHaveAttribute("decoding", "async");
    expect(firstImage).toHaveAttribute("width", "1600");
    expect(container.querySelector('[data-evidence-media-frame="4:3"]')).toHaveClass("aspect-[4/3]");
    expect(screen.queryByText("문제 정의 과정")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1번째 이미지 보기" })).toHaveAttribute("aria-current", "true");
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeEmptyDOMElement();

    fireEvent.click(screen.getByRole("button", { name: "다음 이미지" }));
    expect(screen.getByRole("img", { name: "우선순위 결정 화면" })).toHaveAttribute(
      "src",
      "https://example.com/evidence/decision.png",
    );
    expect(screen.queryByRole("img", { name: "문제 정의 화면" })).not.toBeInTheDocument();
    expect(screen.queryByText("우선순위 결정 과정")).not.toBeInTheDocument();
    expect(liveRegion).toHaveTextContent("2 / 3: 우선순위 결정 화면");

    fireEvent.click(screen.getByRole("button", { name: "3번째 이미지 보기" }));
    expect(screen.getByRole("img", { name: "결과 확인 화면" })).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole("button", { name: "결과 확인 화면 확대해서 보기" }), {
      key: "ArrowRight",
    });
    expect(screen.getByRole("img", { name: "문제 정의 화면" })).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole("button", { name: "문제 정의 화면 확대해서 보기" }), {
      key: "End",
    });
    expect(screen.getByRole("img", { name: "결과 확인 화면" })).toBeInTheDocument();
  });

  it("화면 안에 있을 때 2초마다 옆 슬라이드로 자동 이동하고 자동 변경은 읽어주지 않는다", () => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", VisibleIntersectionObserver);

    const { container } = render(
      <EvidenceMediaGallery projectTitle="Archi" items={projectMedia} />,
    );
    const liveRegion = container.querySelector('[aria-live="polite"]');

    expect(screen.getByRole("img", { name: "문제 정의 화면" })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS - 1));
    expect(screen.queryByRole("img", { name: "우선순위 결정 화면" })).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("img", { name: "우선순위 결정 화면" })).toBeInTheDocument();
    expect(liveRegion).toBeEmptyDOMElement();

    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS));
    expect(screen.getByRole("img", { name: "결과 확인 화면" })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS));
    expect(screen.getByRole("img", { name: "문제 정의 화면" })).toBeInTheDocument();
  });

  it("화면 밖에 있는 동안에는 자동 이동을 시작하지 않는다", () => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", OffscreenIntersectionObserver);

    render(<EvidenceMediaGallery projectTitle="Archi" items={projectMedia} />);
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS * 3));

    expect(screen.getByRole("img", { name: "문제 정의 화면" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "우선순위 결정 화면" })).not.toBeInTheDocument();
  });

  it("마우스 상호작용과 사용자의 일시정지 선택 동안 자동 이동을 멈춘다", () => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", VisibleIntersectionObserver);

    const { container } = render(
      <EvidenceMediaGallery projectTitle="Archi" items={projectMedia} />,
    );
    const gallery = container.querySelector("section");
    expect(gallery).toBeInTheDocument();

    fireEvent.pointerEnter(gallery as HTMLElement, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS * 2));
    expect(screen.getByRole("img", { name: "문제 정의 화면" })).toBeInTheDocument();

    fireEvent.pointerLeave(gallery as HTMLElement, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS));
    expect(screen.getByRole("img", { name: "우선순위 결정 화면" })).toBeInTheDocument();

    const pauseButton = screen.getByRole("button", { name: "자동 넘김 일시정지" });
    act(() => pauseButton.focus());
    fireEvent.click(pauseButton);
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS * 2));
    expect(screen.getByRole("img", { name: "우선순위 결정 화면" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "자동 넘김 재생" }));
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS));
    expect(screen.getByRole("img", { name: "결과 확인 화면" })).toBeInTheDocument();
  });

  it("키보드 focus, 확대 dialog, 숨겨진 탭과 화면 밖에서는 자동 이동을 멈춘다", () => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", VisibleIntersectionObserver);
    let visibilityState: DocumentVisibilityState = "visible";
    vi.spyOn(document, "visibilityState", "get").mockImplementation(() => visibilityState);

    render(<EvidenceMediaGallery projectTitle="Archi" items={projectMedia} />);

    const trigger = screen.getByRole("button", { name: "문제 정의 화면 확대해서 보기" });
    act(() => trigger.focus());
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS * 2));
    expect(screen.getByRole("img", { name: "문제 정의 화면" })).toBeInTheDocument();

    fireEvent.blur(trigger, { relatedTarget: document.body });
    fireEvent.click(trigger);
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS * 2));
    expect(within(screen.getByRole("dialog")).getByRole("img", { name: "문제 정의 화면" })).toBeInTheDocument();

    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "확대 이미지 닫기" }));
    act(() => vi.advanceTimersByTime(16));
    fireEvent.blur(screen.getByRole("button", { name: "문제 정의 화면 확대해서 보기" }), {
      relatedTarget: document.body,
    });
    visibilityState = "hidden";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS * 2));
    expect(screen.getByRole("img", { name: "문제 정의 화면" })).toBeInTheDocument();

    visibilityState = "visible";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS));
    expect(screen.getByRole("img", { name: "우선순위 결정 화면" })).toBeInTheDocument();
  });

  it("모션 감소 환경에서는 자동 이동과 자동 재생 제어를 제공하지 않는다", () => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", VisibleIntersectionObserver);
    stubReducedMotion(true);

    render(<EvidenceMediaGallery projectTitle="Archi" items={projectMedia} />);

    expect(screen.getByText("모션 감소 설정으로 자동 넘김이 꺼져 있습니다.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "자동 넘김 일시정지" })).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(EVIDENCE_AUTOPLAY_INTERVAL_MS * 3));
    expect(screen.getByRole("img", { name: "문제 정의 화면" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "우선순위 결정 화면" })).not.toBeInTheDocument();
  });

  it("클릭 확대 dialog에서 화살표 탐색·focus trap·ESC 닫기와 trigger focus 복귀를 지원한다", async () => {
    render(<EvidenceMediaGallery projectTitle="Archi" items={projectMedia} />);

    const trigger = screen.getByRole("button", { name: "문제 정의 화면 확대해서 보기" });
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Archi 증거 이미지 확대" });
    const closeButton = within(dialog).getByRole("button", { name: "확대 이미지 닫기" });
    await waitFor(() => expect(closeButton).toHaveFocus());
    expect(within(dialog).getByRole("img", { name: "문제 정의 화면" })).toHaveAttribute("loading", "lazy");
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(within(dialog).getByRole("button", { name: "확대 화면 다음 이미지" })).toHaveFocus();

    const nextButton = within(dialog).getByRole("button", { name: "확대 화면 다음 이미지" });
    nextButton.focus();
    fireEvent.click(nextButton);
    expect(within(dialog).getByRole("img", { name: "우선순위 결정 화면" })).toBeInTheDocument();
    expect(within(dialog).queryByText("우선순위 결정 과정")).not.toBeInTheDocument();
    expect(dialog.querySelector('[id^="evidence-media-dialog-description-"]')).toHaveTextContent(
      "우선순위 결정 과정",
    );
    expect(nextButton).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(
      screen.getByRole("button", { name: "우선순위 결정 화면 확대해서 보기" }),
    ).toHaveFocus());
    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
  });

  it("비어 있는 src나 alt 항목은 노출하지 않고 유효한 증거만 렌더한다", () => {
    render(
      <EvidenceMediaGallery
        projectTitle="데이터 프로젝트"
        items={[
          { src: "", alt: "빈 주소" },
          { src: "/evidence/private.png", alt: " " },
          { src: "/evidence/verified.png", alt: "검증 자료" },
        ]}
      />,
    );

    expect(screen.getByRole("img", { name: "검증 자료" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "빈 주소" })).not.toBeInTheDocument();
    expect(screen.queryByText("증거 이미지 준비 중")).not.toBeInTheDocument();
  });
});
