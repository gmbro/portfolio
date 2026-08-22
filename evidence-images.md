# 증거 이미지 등록 가이드

프로젝트 증거 이미지는 기존 자동 슬라이드·확대 보기 컴포넌트를 그대로 사용한다. PNG를 아래 규격과 경로로 준비한 뒤 `src/data/portfolio.ts`의 해당 프로젝트 `visual.items`에 등록하면 된다.

## 공통 제작 규격

| 항목 | 설정값 |
|---|---|
| 파일 형식 | PNG, sRGB |
| 화면 비율 | `16:10` |
| 권장 크기 | `1600×1000px` |
| 안전 여백 | 상하좌우 `80px` 이상(캔버스의 5%) |
| 이미지 내부 최소 글자 | `32px` 이상 |
| 권장 파일 크기 | 장당 `700KB` 이하, 최대 `1MB` |
| 권장 장수 | 프로젝트당 3장 |
| 파일명 | 표시 순서 두 자리 숫자 + 영문 소문자 kebab-case |

정확히 `1600×1000px`로 내보내면 모바일과 웹의 `16:10` 프레임에서 잘림이나 레터박스 없이 같은 비율로 보인다. 다른 비율의 원본은 자르지 말고 1600×1000 캔버스 안에 여백을 두어 배치한다.

## 이미지 저장 위치

```text
public/evidence/
├── arkylab-ai-coach/
├── nipa-vision-ai-poc/
├── selectstar-stt-operations/
├── skelter-ai-counselor/
└── sk-planet-syrup-wallet/
```

| 프로젝트 | 권장 파일 |
|---|---|
| 아키 AI 기록 솔루션 | `01-landing-page.png`, `02-record-screen.png`, `03-architecture.png` |
| Vision AI 품질 검사 | `01-inspection-process.png`, `02-poc-output.png`, `03-project-management.png` |
| STT 데이터셋 구축 | `01-before-after-process.png`, `02-operation-screen.png`, `03-cost-time-evidence.png` |
| AI 상담사 PoC | `01-prd.png`, `02-conversation-flow.png`, `03-poc.png` |
| Syrup Wallet 광고 운영 | `01-push-operation.png`, `02-targeting-distribution.png`, `03-performance-metric.png` |

## 데이터 등록 위치

`src/data/portfolio.ts`에서 해당 프로젝트의 `visual` 객체에 `items` 배열을 추가한다.

```ts
visual: {
  title: "아키 제품 자료",
  type: "image",
  alt: "아키 AI 기록 제품의 사용 흐름과 베타 검증 자료",
  items: [
    {
      id: "landing",
      src: "/evidence/arkylab-ai-coach/01-landing-page.png",
      alt: "아키 랜딩 페이지 화면",
      caption: "제품이 해결하려는 문제와 핵심 기능",
      width: 1600,
      height: 1000,
    },
    {
      id: "record",
      src: "/evidence/arkylab-ai-coach/02-record-screen.png",
      alt: "아키 수업 기록 화면",
      caption: "음성과 동작 데이터를 동기화해 기록하는 화면",
      width: 1600,
      height: 1000,
    },
    {
      id: "architecture",
      src: "/evidence/arkylab-ai-coach/03-architecture.png",
      alt: "아키 서비스 아키텍처",
      caption: "Gemini API와 MediaPipe를 연결한 처리 구조",
      width: 1600,
      height: 1000,
    },
  ],
  placeholderItems: ["랜딩 페이지", "기록 화면", "아키텍처"],
},
```

- `alt`: 이미지에 실제로 보이는 화면·도표를 설명한다.
- `caption`: 이 이미지가 어떤 판단·행동·성과의 근거인지 한 문장으로 쓴다.
- `width`, `height`: 모든 항목에 `1600`, `1000`을 입력해 레이아웃 이동을 막는다.
- `src`와 `alt`가 모두 공백이 아닌 항목만 유효한 슬라이드로 집계된다.
- `id`는 선택값이지만 프로젝트 안에서 중복되지 않는 짧은 영문 id를 쓰는 것을 권장한다.
- 유효한 `items`가 한 장 이상 등록되면 기존 준비 중 목록은 자동으로 숨겨진다.
- 유효한 항목이 두 장 이상이면 2초마다 자동 이동하며, hover·focus·확대·화면 밖·숨겨진 탭·모션 감소 환경에서는 자동 이동을 멈춘다.

## 공개 전 확인

- 이름·전화번호·이메일·회원 얼굴 등 개인정보를 가린다.
- 고객사 내부 URL, 토큰, 계정, 비공개 지표와 원본 데이터가 보이지 않는지 확인한다.
- 고객사·파트너의 외부 공개 허용 범위를 확인한다.
- 과장된 그래프 축이나 확인되지 않은 성과 수치를 넣지 않는다.
- 모바일에서 읽어야 하는 핵심 설명은 이미지 안이 아니라 caption에도 남긴다.
- 각 슬라이드의 alt는 서로 구별되게 작성하고, 파일명이나 `이미지`만 반복하지 않는다. alt와 caption은 같은 문장을 복제하지 않는다.
- caption에 자료의 출처와 기준 시점이 필요한 경우 함께 남긴다.

## 등록 후 검증

1. `src/test/index.test.tsx`의 빈 증거 영역 개수를 아직 이미지가 없는 프로젝트 수로 갱신한다.
2. 전체 테스트와 build를 통과시킨다.
3. 390×844, 768×900, 1440×900에서 첫 이미지, 2초 자동 이동, 이전·다음 버튼, 확대 dialog와 가로 넘침 여부를 확인한다.
4. 브라우저 콘솔 오류와 깨진 이미지가 없는지 확인한다.

Supabase 공개 URL도 `src`로 사용할 수 있지만, 현재 포트폴리오는 Git revision과 함께 검증할 수 있는 `public/evidence` 등록을 기본으로 한다.
