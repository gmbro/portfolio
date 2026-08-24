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
        name: "포트폴리오 자체를 하나의 제품으로 운영합니다.",
      }),
    ).toBeInTheDocument();

    const coverage = within(section as HTMLElement).getByRole("group", {
      name: "현재 제품 커버리지",
    });
    const followupCount = Math.min(
      ...Object.values(chatbotFollowupQuestionsByPath).map((questions) => questions.length),
    );

    expect(chatbotStarterQuestions).toHaveLength(8);
    expect(followupCount).toBe(3);
    expect(within(coverage).getByText(`${chatbotStarterQuestions.length}개`)).toBeInTheDocument();
    expect(within(coverage).getByText(`${followupCount}개`)).toBeInTheDocument();
    expect(within(coverage).getByText(`${portfolioProjects.length}개`)).toBeInTheDocument();
    expect(section).toHaveTextContent("해결할 문제");
    expect(section).toHaveTextContent("제품 가설");
    expect(section).toHaveTextContent("검증된 경력 근거 도달률");
    expect(section).toHaveTextContent("추천 질문 클릭률");
    expect(section).toHaveTextContent("근거 카드 열람률");
    expect(section).toHaveTextContent("평균 질문 수");
    expect(section).toHaveTextContent("브리프 생성률");
    expect(within(section as HTMLElement).getAllByText("수집 전")).toHaveLength(4);
    expect(section).toHaveTextContent("분석 비활성 · 베이스라인 수집 전");
  });

  it("제품 개선 단계를 정해진 순서로 보여준다", () => {
    render(<PortfolioProductLab />);

    const improvementLog = screen.getByRole("list", { name: "포트폴리오 개선 기록" });
    expect(within(improvementLog).getAllByRole("listitem")).toHaveLength(4);
    expect(
      within(improvementLog)
        .getAllByRole("heading")
        .map((heading) => heading.textContent),
    ).toEqual([
      "추천 질문·사용자 모드 개편",
      "답변 출처·프로젝트 CTA 연결",
      "JD Brief 추출 실패 복구",
      "실제 수치만 공개",
    ]);
  });
});
