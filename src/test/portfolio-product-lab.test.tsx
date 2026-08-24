import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PortfolioProductLab from "@/components/PortfolioProductLab";
import {
  chatbotFollowupQuestionsByPath,
  chatbotStarterQuestions,
} from "@/data/chatbot";
import { portfolioProjects } from "@/data/portfolio";

describe("PortfolioProductLab", () => {
  it("코드에서 확인되는 제품 커버리지와 베이스라인 상태만 보여준다", () => {
    const { container } = render(<PortfolioProductLab />);
    const section = container.querySelector<HTMLElement>("#portfolio-product-lab");

    expect(section).toBeInTheDocument();
    expect(
      within(section as HTMLElement).getByRole("heading", {
        name: "이 포트폴리오도 검증하며 성장합니다.",
      }),
    ).toBeInTheDocument();

    const coverage = within(section as HTMLElement).getByRole("group", {
      name: "현재 제품 커버리지",
    });
    const followupCount = Math.min(
      ...Object.values(chatbotFollowupQuestionsByPath).map((questions) => questions.length),
    );

    expect(chatbotStarterQuestions).toHaveLength(6);
    expect(followupCount).toBe(3);
    expect(within(coverage).getByText(`${chatbotStarterQuestions.length}개`)).toBeInTheDocument();
    expect(within(coverage).getByText(`${followupCount}개`)).toBeInTheDocument();
    expect(within(coverage).getByText(`${portfolioProjects.length}개`)).toBeInTheDocument();
    expect(within(coverage).getByText("현재 미수집")).toBeInTheDocument();
    expect(within(coverage).getByText("분석 비활성 · 측정 설계 완료")).toBeInTheDocument();
    expect(section?.textContent).not.toMatch(/전환율|재방문율|사용자 수/);
  });

  it("제품 개선 단계를 정해진 순서로 보여준다", () => {
    render(<PortfolioProductLab />);

    const improvementLog = screen.getByRole("list", { name: "포트폴리오 개선 기록" });
    expect(within(improvementLog).getAllByRole("listitem")).toHaveLength(3);
    expect(
      within(improvementLog)
        .getAllByRole("heading")
        .map((heading) => heading.textContent),
    ).toEqual(["Evidence-first", "Chat-first", "JD Brief Beta"]);
  });
});
