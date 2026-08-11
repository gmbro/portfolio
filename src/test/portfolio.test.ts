import { describe, expect, it } from "vitest";
import type { Json } from "@/lib/database.types";
import { defaultHeroContent, parsePortfolioPageContent } from "@/types/portfolio";
import { careerExperiences, featuredProjects, profile } from "@/data/portfolio";

const validContent: Json = {
  meta: {
    companyName: "Verified Company",
    roleTitle: "Product Manager",
    pageTitle: "Verified Company Product Manager Portfolio",
  },
  hero: {
    roleLabel: "Product Manager",
    careerLabel: "Verified experience",
    headline: "I connect verified problems\nto measurable outcomes.",
    highlight: "measurable outcomes",
    subcopy: [
      "I use verified evidence to shape strategy.",
      "I turn cross-functional execution into practical results.",
    ],
    keywords: ["Problem Definition", "Data Analysis", "Delivery Management"],
    ctaLabel: "View selected work",
    ctaTarget: "case-studies",
    stats: [{ value: "Verified", label: "Evidence-backed metric" }],
  },
};

describe("parsePortfolioPageContent", () => {
  it("accepts a public-safe Hero payload with exactly three keywords", () => {
    expect(parsePortfolioPageContent(validContent)).toMatchObject({
      hero: { keywords: ["Problem Definition", "Data Analysis", "Delivery Management"] },
    });
  });

  it("rejects an incomplete Hero payload", () => {
    const invalidContent: Json = {
      hero: {
        roleLabel: "Product Manager",
        headline: "Incomplete headline",
        subcopy: ["Only one line"],
        keywords: ["One", "Two"],
        ctaLabel: "View work",
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
  it("uses the approved English AI PM Hero copy, keywords, CTA, and stats", () => {
    expect(defaultHeroContent).toEqual({
      roleLabel: "AI Product & Project Manager",
      careerLabel: "· 9 years",
      headline: "I turn AI into products, operating systems,\nand measurable outcomes.",
      highlight: "measurable outcomes.",
      subcopy: [
        "Nine years across AI product planning, data operations, and B2B/B2G commercialization.",
        "From 0→1 PoCs to 3.5M-MAU operations and 70%+ cost reduction.",
      ],
      keywords: ["AI Product Design", "Data & Operations", "Commercial Delivery"],
      ctaLabel: "View selected work",
      ctaTarget: "case-studies",
      stats: [
        { value: "₩200M", label: "AI Project Scope" },
        { value: "3.5M", label: "MAU Service Operations" },
        { value: "70%+", label: "Operating Cost Reduction" },
      ],
    });
  });

  it("keeps the verified identity and career history in newest-first order", () => {
    expect(profile.name).toBe("LEE GYEONGMIN");
    expect(careerExperiences.map((experience) => experience.company)).toEqual([
      "Arkylab",
      "GenON",
      "Selectstar",
      "Adler",
      "Skelter Labs",
      "SK Planet",
      "Kakao Commerce",
    ]);
    expect(careerExperiences.map((experience) => experience.period)).toEqual([
      "Jun 2026–Present",
      "Jan 2025–May 2026",
      "Jun 2024–Jan 2025",
      "Apr–Jun 2023",
      "Sep 2021–Apr 2023",
      "Apr 2018–Apr 2020",
      "May–Dec 2017",
    ]);
  });

  it("keeps the three verified Arkylab achievements at the top of Experience", () => {
    const [arkylab] = careerExperiences;

    expect(arkylab).toMatchObject({
      company: "Arkylab",
      period: "Jun 2026–Present",
      achievements: [
        "Developing and operating an AI record-keeping solution for fitness instructors; currently in beta",
        "Building and operating an AI solution for a Trevari-hosted reading community",
        "Built and delivered a B2C legal-information and refund-support service for consumers challenging unfair policies",
      ],
    });
  });

  it("orders selected projects newest-first", () => {
    expect(featuredProjects.map((project) => project.period)).toEqual([
      "Jun 2026–Present",
      "May 2026–Present",
      "Jun–Dec 2025",
      "Jun 2024–Jan 2025",
      "Sep 2021–Apr 2023",
      "Apr 2018–Apr 2020",
    ]);
  });

  it("shows exact English organization and involvement labels without inventing percentages", () => {
    expect(
      featuredProjects.map((project) => `${project.organizationLabel}: ${project.organization}`),
    ).toEqual([
      "Owner: Arkylab",
      "Owner: Arkylab · Independent build",
      "Program: NIPA-supported project",
      "Company: Selectstar · Project Office",
      "Company: Skelter Labs · Product",
      "Company: SK Planet · Syrup Wallet",
    ]);
    expect(
      featuredProjects.map((project) => `${project.involvement.label}: ${project.involvement.value}`),
    ).toEqual([
      "Scope: Product strategy · MVP development",
      "Contribution: 100%",
      "Scope: Proposal-to-close delivery",
      "Contribution: 100%",
      "Contribution: 90%",
      "Contribution: 100%",
    ]);
  });

  it("keeps public portfolio evidence free of Korean copy", () => {
    expect(
      JSON.stringify({ defaultHeroContent, profile, careerExperiences, featuredProjects }),
    ).not.toMatch(/[가-힣]/);
  });
});
