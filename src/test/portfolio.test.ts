import { describe, expect, it } from "vitest";
import type { Json } from "@/lib/database.types";
import { defaultHeroContent, parsePortfolioPageContent } from "@/types/portfolio";
import { careerExperiences, featuredProjects, profile } from "@/data/portfolio";

const validContent: Json = {
  meta: {
    companyName: "검증 회사",
    roleTitle: "Product Manager",
    pageTitle: "검증 회사 Product Manager 포트폴리오",
  },
  hero: {
    roleLabel: "Product Manager",
    careerLabel: "검증된 경력",
    headline: "검증된 문제를\n성과로 연결합니다.",
    highlight: "성과",
    subcopy: ["검증된 근거를 바탕으로 전략을 세웁니다.", "협업을 통해 실행 가능한 결과를 만듭니다."],
    keywords: ["문제 정의", "데이터 분석", "실행 관리"],
    ctaLabel: "핵심 사례 확인하기",
    ctaTarget: "case-studies",
    stats: [{ value: "검증값", label: "검증 지표" }],
  },
};

describe("parsePortfolioPageContent", () => {
  it("accepts a public-safe Hero payload with exactly three keywords", () => {
    expect(parsePortfolioPageContent(validContent)).toMatchObject({
      hero: { keywords: ["문제 정의", "데이터 분석", "실행 관리"] },
    });
  });

  it("rejects an incomplete Hero payload", () => {
    const invalidContent: Json = {
      hero: {
        roleLabel: "Product Manager",
        headline: "헤드라인",
        subcopy: ["한 줄만 있음"],
        keywords: ["하나", "둘"],
        ctaLabel: "확인하기",
        ctaTarget: "case-studies",
      },
    };

    expect(parsePortfolioPageContent(invalidContent)).toBeNull();
  });

  it("rejects invalid metadata types before they reach document metadata", () => {
    const invalidMeta = structuredClone(validContent) as Record<string, unknown>;
    invalidMeta.meta = { pageTitle: 42 };

    expect(parsePortfolioPageContent(invalidMeta as Json)).toBeNull();
  });
});

describe("verified base portfolio content", () => {
  it("uses the approved AI PM positioning and exactly three Hero keywords", () => {
    expect(defaultHeroContent.roleLabel).toBe("AI Product & Project Manager");
    expect(defaultHeroContent.careerLabel).toContain("9년");
    expect(defaultHeroContent.keywords).toHaveLength(3);
  });

  it("contains only the verified profile identity and career companies", () => {
    expect(profile.name).toBe("이경민");
    expect(careerExperiences.map((experience) => experience.company)).toEqual([
      "제논",
      "셀렉트스타",
      "아들러",
      "스켈터랩스",
      "SK플래닛",
      "카카오커머스",
    ]);
  });

  it("includes both approved ongoing AI side projects", () => {
    const projectTitles = featuredProjects.map((project) => project.title).join(" ");
    expect(projectTitles).toContain("운동강사");
    expect(projectTitles).toContain("독서모임");
  });
});
