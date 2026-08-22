import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EvidenceMediaGallery, { type EvidenceMediaItem } from "@/components/EvidenceMediaGallery";

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

describe("EvidenceMediaGallery", () => {
  it("이미지가 없으면 프로젝트별 준비 상태를 독립 영역으로 표시한다", () => {
    const { container } = render(
      <EvidenceMediaGallery projectTitle="Archi" items={[]} />,
    );

    expect(screen.getByRole("heading", { name: "Archi 증거 이미지" })).toBeInTheDocument();
    expect(screen.getByText("증거 이미지 준비 중")).toBeInTheDocument();
    expect(container.querySelector('[data-evidence-media-state="empty"]')).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("URL·PNG 데이터를 lazy 이미지, caption, 이전·다음·점과 키보드로 탐색한다", () => {
    render(<EvidenceMediaGallery projectTitle="Archi" items={projectMedia} />);

    const firstImage = screen.getByRole("img", { name: "문제 정의 화면" });
    expect(firstImage).toHaveAttribute("src", "/evidence/problem.png");
    expect(firstImage).toHaveAttribute("loading", "lazy");
    expect(firstImage).toHaveAttribute("decoding", "async");
    expect(firstImage).toHaveAttribute("width", "1600");
    expect(firstImage).toHaveClass("motion-reduce:transition-none");
    expect(screen.getByText("문제 정의 과정")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1번째 이미지 보기" })).toHaveAttribute("aria-current", "true");

    fireEvent.click(screen.getByRole("button", { name: "다음 이미지" }));
    expect(screen.getByRole("img", { name: "우선순위 결정 화면" })).toHaveAttribute(
      "src",
      "https://example.com/evidence/decision.png",
    );
    expect(screen.getByText("우선순위 결정 과정")).toBeInTheDocument();

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

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(within(dialog).getByRole("img", { name: "우선순위 결정 화면" })).toBeInTheDocument();
    expect(within(dialog).getByText("우선순위 결정 과정")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
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
