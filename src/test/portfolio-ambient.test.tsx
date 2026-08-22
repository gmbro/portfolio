import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PortfolioAmbient, { portfolioAmbientVideo } from "@/components/PortfolioAmbient";

const matchMedia = (matches: boolean): MediaQueryList => ({
  matches,
  media: "(prefers-reduced-motion: reduce)",
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

describe("Portfolio ambient background", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", vi.fn(() => matchMedia(false)));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("첫 화면에는 정적 fallback만 렌더하고 이후 영상을 한 번 재생하도록 지연 mount한다", () => {
    const { container } = render(<PortfolioAmbient />);
    expect(container.querySelector(".portfolio-ambient__fallback")).toBeInTheDocument();
    expect(container.querySelector("video")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(301));

    const video = container.querySelector<HTMLVideoElement>("video");
    expect(video?.src).toBe(portfolioAmbientVideo);
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("playsinline");
    expect(video).not.toHaveAttribute("loop");
  });

  it("모션 감소 환경에서는 video src 자체를 mount하지 않는다", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => matchMedia(true)));
    const { container } = render(<PortfolioAmbient />);

    act(() => vi.advanceTimersByTime(2_000));

    expect(container.querySelector(".portfolio-ambient__fallback")).toBeInTheDocument();
    expect(container.querySelector("video")).not.toBeInTheDocument();
  });
});
