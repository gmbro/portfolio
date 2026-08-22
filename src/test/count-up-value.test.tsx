import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CountUpValue from "@/components/CountUpValue";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

describe("CountUpValue", () => {
  it("모션 감소 환경에서는 첫 화면부터 최종 수치를 표시한다", () => {
    const { container } = render(<CountUpValue value="13억" />);

    expect(container.querySelector("[data-count-up]")).toHaveTextContent("13억");
    expect(screen.getByText("13억", { selector: ".sr-only" })).toBeInTheDocument();
  });

  it("숫자로 시작하지 않는 회사별 지표는 원문을 그대로 표시한다", () => {
    const { container } = render(<CountUpValue value="검증" />);

    expect(container.querySelector("[data-count-up]")).not.toBeInTheDocument();
    expect(screen.getByText("검증")).toHaveAttribute("data-stat-final-value", "검증");
  });
});
