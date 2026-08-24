import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  analyzeJdAgainstPortfolio,
  buildJdFollowupQuestion,
  extractJdTextFromFile,
  extractJdTextFromUrl,
  JD_URL_MAX_CHARACTERS,
  type JdPortfolioAnalysisResult,
} from "@/lib/jdBrief";

export type JdBriefSourceType = "url" | "file";

interface JdBriefFormProps {
  disabled?: boolean;
  onCreateBrief: (prompt: string) => void;
  onReadStart?: (sourceType: JdBriefSourceType) => void;
  onExtracted?: (sourceType: JdBriefSourceType) => void;
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error
    ? error.message
    : "채용 공고를 읽지 못했습니다. 입력 내용을 확인해 주세요.";

const JdBriefForm = ({
  disabled = false,
  onCreateBrief,
  onReadStart,
  onExtracted,
}: JdBriefFormProps) => {
  const [sourceType, setSourceType] = useState<JdBriefSourceType>("url");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState<JdPortfolioAnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [isReading, setIsReading] = useState(false);
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const baseId = useId().replace(/:/g, "");
  const errorId = `${baseId}-error`;
  const statusId = `${baseId}-status`;

  useEffect(
    () => () => {
      requestIdRef.current += 1;
      abortControllerRef.current?.abort();
    },
    [],
  );

  const resetExtraction = () => {
    requestIdRef.current += 1;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setExtractedText("");
    setAnalysis(null);
    setError("");
    setIsReading(false);
  };

  const selectSourceType = (nextSourceType: JdBriefSourceType) => {
    if (nextSourceType === sourceType) return;
    resetExtraction();
    setSourceType(nextSourceType);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetExtraction();
    setFile(event.target.files?.[0] ?? null);
  };

  const handleExtract = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled || isReading) return;

    const requestId = requestIdRef.current + 1;
    const abortController = new AbortController();
    requestIdRef.current = requestId;
    abortControllerRef.current?.abort();
    abortControllerRef.current = abortController;
    setExtractedText("");
    setError("");
    setIsReading(true);
    onReadStart?.(sourceType);

    try {
      const text = sourceType === "url"
        ? await extractJdTextFromUrl(url, fetch, abortController.signal)
        : file
          ? await extractJdTextFromFile(file, fetch, abortController.signal)
          : await Promise.reject(new Error("PDF 또는 이미지 파일을 선택해 주세요."));

      if (requestIdRef.current !== requestId) return;
      setExtractedText(text);
      setAnalysis(null);
      onExtracted?.(sourceType);
    } catch (readError) {
      if (requestIdRef.current !== requestId) return;
      setError(getErrorMessage(readError));
    } finally {
      if (requestIdRef.current === requestId) {
        abortControllerRef.current = null;
        setIsReading(false);
      }
    }
  };

  const handleAnalyzeBrief = () => {
    if (disabled || isReading || !extractedText) return;

    try {
      setError("");
      setAnalysis(analyzeJdAgainstPortfolio(extractedText));
    } catch (buildError) {
      setError(getErrorMessage(buildError));
    }
  };

  const handleAskFollowup = () => {
    if (disabled || isReading || !analysis || analysis.insufficient_signal) return;
    onCreateBrief(buildJdFollowupQuestion(analysis));
  };

  const statusText = isReading
    ? "Jina Reader가 공개 채용 공고를 읽고 있어요…"
    : extractedText
      ? `${extractedText.length.toLocaleString("ko-KR")}자 추출됨`
      : "";

  return (
    <div className="portfolio-jd-brief">
      <div className="portfolio-jd-brief__intro">
        <strong>공개 채용 공고로 경력 근거를 비교해 보세요.</strong>
        <span>채용 결정이 아닌, 공개 포트폴리오 근거 탐색을 돕는 Beta 기능입니다.</span>
      </div>

      <div className="portfolio-jd-brief__source-switch" role="group" aria-label="채용 공고 입력 방식">
        <button
          type="button"
          className={sourceType === "url" ? "is-active" : undefined}
          aria-pressed={sourceType === "url"}
          disabled={disabled || isReading}
          onClick={() => selectSourceType("url")}
        >
          공개 LINK
        </button>
        <button
          type="button"
          className={sourceType === "file" ? "is-active" : undefined}
          aria-pressed={sourceType === "file"}
          disabled={disabled || isReading}
          onClick={() => selectSourceType("file")}
        >
          PDF·이미지
        </button>
      </div>

      <form className="portfolio-jd-brief__reader-form" onSubmit={handleExtract} noValidate>
        {sourceType === "url" ? (
          <div key="link" className="portfolio-jd-brief__field">
            <label htmlFor={`${baseId}-url`}>공개 채용 공고 링크</label>
            <input
              id={`${baseId}-url`}
              type="url"
              inputMode="url"
              value={url}
              maxLength={JD_URL_MAX_CHARACTERS}
              autoComplete="url"
              placeholder="https://jobs.example.com/position"
              aria-invalid={Boolean(error)}
              aria-describedby={`${error ? `${errorId} ` : ""}${statusText ? `${statusId} ` : ""}portfolio-jd-brief-notice`.trim()}
              disabled={disabled || isReading}
              onChange={(event) => {
                resetExtraction();
                setUrl(event.target.value);
              }}
            />
          </div>
        ) : (
          <div key="file" className="portfolio-jd-brief__field">
            <label htmlFor={`${baseId}-file`}>공개 채용 공고 PDF 또는 이미지</label>
            <input
              id={`${baseId}-file`}
              type="file"
              accept="application/pdf,image/png,image/jpeg,image/webp,.pdf,.png,.jpg,.jpeg,.webp"
              aria-invalid={Boolean(error)}
              aria-describedby={`${error ? `${errorId} ` : ""}${statusText ? `${statusId} ` : ""}portfolio-jd-brief-notice`.trim()}
              disabled={disabled || isReading}
              onChange={handleFileChange}
            />
            <span className="portfolio-jd-brief__file-name">
              {file ? file.name : "PDF, PNG, JPEG, WebP · 최대 5MB"}
            </span>
          </div>
        )}

        <button
          type="submit"
          className="portfolio-jd-brief__read-button"
          disabled={disabled || isReading || (sourceType === "url" ? !url.trim() : !file)}
        >
          {isReading ? "공고 읽는 중…" : "공고 읽기"}
        </button>
      </form>

      {statusText && (
        <p id={statusId} className="portfolio-jd-brief__status" role="status" aria-live="polite">
          {statusText}
        </p>
      )}
      {error && (
        <p id={errorId} className="portfolio-jd-brief__error" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        className="portfolio-jd-brief__create-button"
        disabled={disabled || isReading || !extractedText}
        onClick={handleAnalyzeBrief}
      >
        근거 적합도 분석하기
        <span aria-hidden="true">→</span>
      </button>

      {analysis && (
        <section
          className="portfolio-jd-result"
          aria-labelledby={`${baseId}-result-title`}
          aria-live="polite"
        >
          {analysis.insufficient_signal ? (
            <div className="portfolio-jd-result__insufficient" role="status">
              <strong id={`${baseId}-result-title`}>요구역량 신호가 부족합니다.</strong>
              <p>
                주요 업무·자격요건·우대사항이 포함된 공개 채용 공고를 다시 입력해 주세요.
                근거가 부족할 때는 점수를 만들지 않습니다.
              </p>
            </div>
          ) : (
            <>
              <header className="portfolio-jd-result__header">
                <div>
                  <p>공개 경력 근거 적합도</p>
                  <h3 id={`${baseId}-result-title`}>
                    <span>{analysis.evidenceFitScore}</span>/100
                  </h3>
                </div>
                <span className="portfolio-jd-result__beta">Evidence Beta</span>
              </header>

              <p className="portfolio-jd-result__summary">
                {analysis.requirements[0]?.strongEvidence[0]
                  ? `가장 강한 연결은 ${analysis.requirements[0].label} · ${analysis.requirements[0].strongEvidence[0].projectTitle}입니다.`
                  : "강한 공개 프로젝트 근거를 확인하지 못했습니다."}
              </p>

              <div className="portfolio-jd-result__requirements" aria-label="요구역량별 공개 근거">
                {analysis.requirements.map((requirement) => (
                  <article key={requirement.id} className="portfolio-jd-result__requirement">
                    <header>
                      <h4>{requirement.label}</h4>
                      <span>중요도 {requirement.importance}</span>
                    </header>
                    <p className="portfolio-jd-result__signals">
                      JD 신호 · {requirement.signalKeywords.slice(0, 4).join(" · ")}
                    </p>
                    {requirement.strongEvidence.length > 0 ? (
                      <ul>
                        {requirement.strongEvidence.map((evidence) => (
                          <li key={evidence.projectId}>
                            <strong>{evidence.projectTitle}</strong>
                            <span>{evidence.responsibility}</span>
                            <p>{evidence.fact}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="portfolio-jd-result__gap">공개 포트폴리오 근거 공백</p>
                    )}
                  </article>
                ))}
              </div>

              {analysis.evidenceGaps.length > 0 && (
                <details className="portfolio-jd-result__details">
                  <summary>확인이 필요한 근거 공백</summary>
                  <ul>{analysis.evidenceGaps.map((gap) => <li key={gap}>{gap}</li>)}</ul>
                </details>
              )}

              <details className="portfolio-jd-result__details">
                <summary>실무 인터뷰에서 확인할 질문 3개</summary>
                <ol>{analysis.interviewQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
              </details>

              <details className="portfolio-jd-result__details portfolio-jd-result__formula">
                <summary>점수 산정 기준</summary>
                <p>{analysis.scoreFormula}</p>
              </details>

              <p className="portfolio-jd-result__disclaimer">
                이 점수는 채용 확률이나 사람에 대한 평가가 아니라, 공개된 프로젝트 근거의 커버리지입니다.
              </p>

              <button
                type="button"
                className="portfolio-jd-result__ask-button"
                disabled={disabled || isReading}
                onClick={handleAskFollowup}
              >
                이 근거를 AI에게 더 묻기
                <span aria-hidden="true">↗</span>
              </button>
            </>
          )}
        </section>
      )}

      <p id="portfolio-jd-brief-notice" className="portfolio-jd-brief__notice">
        개인정보·회사 내부 문서·비공개 JD는 입력하지 마세요. 링크·파일은 Jina Reader에서 읽고,
        근거 매핑은 브라우저에서 처리합니다. 심층 질문을 선택할 때만 상위 역량과 공개 프로젝트명이
        Typebot으로 전송되며 JD 원문·링크·파일명은 전송하지 않습니다. URL query와 파일에도
        공개 정보만 포함해 주세요.
      </p>
    </div>
  );
};

export default JdBriefForm;
