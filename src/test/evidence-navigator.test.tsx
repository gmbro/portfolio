import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EvidenceNavigator from "@/components/EvidenceNavigator";
import { evidenceCapabilities } from "@/data/evidence";
import { portfolioProjects } from "@/data/portfolio";

describe("EvidenceNavigator", () => {
  it("다섯 역량과 연결된 대표 프로젝트 근거를 조건부 mount 없이 모두 렌더한다", () => {
    const { container } = render(<EvidenceNavigator />);

    expect(
      screen.getByRole("heading", {
        name: "역량을 선택해 연결된 프로젝트 증거를 확인하세요.",
      }),
    ).toBeInTheDocument();

    const panels = Array.from(container.querySelectorAll<HTMLDetailsElement>("details"));
    expect(panels).toHaveLength(5);
    expect(panels[0]).toHaveAttribute("open");
    expect(panels[1]).not.toHaveAttribute("open");
    fireEvent.click(panels[1].querySelector("summary") as HTMLElement);
    expect(panels[1]).toHaveAttribute("open");

    evidenceCapabilities.forEach((capability) => {
      const panel = container.querySelector<HTMLDetailsElement>(
        `#evidence-capability-${capability.id}`,
      );
      expect(panel).toBeInTheDocument();
      if (!panel) return;

      expect(within(panel).getByText(capability.label)).toBeInTheDocument();
      expect(within(panel).getByText(`연결 프로젝트 ${capability.projectIds.length}개`)).toBeInTheDocument();

      capability.projectIds.forEach((projectId) => {
        const project = portfolioProjects.find((item) => item.id === projectId);
        expect(project).toBeDefined();
        if (!project) return;

        const card = panel.querySelector<HTMLElement>(`[data-evidence-project="${project.id}"]`);
        expect(card).toBeInTheDocument();
        if (!card) return;

        expect(within(card).getByText(project.title)).toBeInTheDocument();
        expect(within(card).getByText(project.involvement.value)).toBeInTheDocument();
        expect(within(card).getByText(project.result)).toBeInTheDocument();
        project.metrics.forEach((metric) => {
          expect(within(card).getByText(metric)).toBeInTheDocument();
        });
        expect(
          within(card).getByRole("link", { name: `${project.title} 프로젝트로 이동` }),
        ).toHaveAttribute("href", `#${project.id}`);
      });
    });
  });

  it("현재 대표 프로젝트 다섯 개만 역량 근거로 연결한다", () => {
    const configuredIds = new Set(
      evidenceCapabilities.flatMap((capability) => [...capability.projectIds]),
    );

    expect([...configuredIds].sort()).toEqual(
      portfolioProjects.map((project) => project.id).sort(),
    );
    expect(portfolioProjects).toHaveLength(5);
  });

  it("모든 프로젝트 카드에 모바일 오버플로 방지 구조를 적용한다", () => {
    const { container } = render(<EvidenceNavigator />);
    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-evidence-project]"));

    expect(cards.length).toBeGreaterThanOrEqual(portfolioProjects.length);
    cards.forEach((card) => {
      expect(card).toHaveClass("min-w-0");
      expect(card.querySelector("h3")).toHaveClass("break-words");
      expect(card.querySelector("h3")).toHaveClass("[overflow-wrap:anywhere]");
    });
  });
});
