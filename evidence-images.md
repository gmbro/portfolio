# 증거 이미지 등록 가이드

프로젝트 이미지는 자동 슬라이드·확대 보기 컴포넌트를 사용한다. PNG를 아래 규격으로 준비한 뒤 `src/data/portfolio.ts`의 해당 프로젝트 `visual.items`에 등록한다. 저장 위치는 저장소의 `public/evidence/` 또는 공개 접근이 가능한 Supabase Storage URL을 동일하게 지원한다.

등록 자료는 항목별 `kind`로 상태를 구분한다.

- `evidence`: 공개 허용 범위와 사실 관계를 확인한 실제 제품 화면·산출물·성과 자료다. `kind`를 생략하면 기존 호환을 위해 이 상태로 처리한다.
- `concept-mockup`: 프로젝트의 문제와 작업 구조를 설명하기 위해 새로 만든 개념 목업이다. 실제 당시 화면·산출물·고객 데이터·성과 증거가 아니다.

`concept-mockup`은 카드 이미지 위에 `개념 목업` 배지를 표시하고, 확대 화면의 이미지 순번에도 `· 개념 목업`을 표시한다. `alt`도 `개념 목업:`으로 시작해 화면을 보지 않는 사용자에게 같은 상태를 전달한다.

## 공통 제작 규격

| 항목 | 설정값 |
|---|---|
| 파일 형식 | PNG, sRGB |
| 화면 비율 | 기본 `4:3`; 아키·NIPA Vision AI 표시 프레임 `7:6` |
| 권장 크기 | `1600×1200px` |
| 아키·NIPA 표시 영역 | `1400×1200px`, `object-contain` |
| 안전 여백 | 상하좌우 `80px` 이상(캔버스의 5%) |
| 이미지 내부 최소 글자 | `32px` 이상 |
| 권장 파일 크기 | 장당 `700KB` 이하, 최대 `1MB` |
| 권장 장수 | 프로젝트당 3장 |
| 파일명 | 표시 순서 두 자리 숫자 + 영문 소문자 kebab-case |

갤러리는 기본적으로 모든 화면에서 4:3 고정 프레임과 `object-contain`을 사용한다. 정확히 `1600×1200px`로 내보내면 기본 프레임에서 잘림이나 레터박스 없이 보인다. 아키와 NIPA Vision AI는 실제 원본 `1600×1200px`을 유지하되 사용자 지정 `1400×1200px` 표시 영역에 대응하는 7:6 프레임을 사용한다. 원본을 자르거나 늘리지 않도록 이 예외 프레임에서도 `object-contain`을 유지한다.

프로젝트는 한 행에 하나씩 표시되고 이미지 영역은 카드 폭 전체를 사용한다. 이미지 아래에는 별도 캡션이나 `랜딩 페이지 / 기록 화면 / 아키텍처` 같은 3줄 설명 목록을 노출하지 않는다.

## 이미지 저장 위치

로컬 자산을 Git revision과 함께 관리하려면 아래 위치를 사용한다.

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
| 아키 AI 기록 솔루션 | `01-product-flow.png`, `02-recording-proof.png`, `03-user-manual.png` |
| Vision AI 품질 검사 | `01-inspection-process.png`, `02-poc-output.png`, `03-project-management.png` |
| STT 데이터셋 구축 | `01-before-after-process.png`, `02-operation-screen.png`, `03-cost-time-evidence.png` |
| AI 상담사 PoC | `01-prd.png`, `02-conversation-flow.png`, `03-poc.png` |
| Syrup Wallet 광고 운영 | `01-push-operation.png`, `02-targeting-distribution.png`, `03-performance-metric.png` |

Supabase를 사용할 때는 버킷을 공개로 설정하고 객체의 `public` URL을 `src`에 그대로 입력한다. URL을 바꾸거나 파일을 덮어쓸 때 캐시로 이전 이미지가 보일 수 있으므로 새 파일명 사용을 권장한다.

## 현재 개념 목업 등록 현황

현재 공개 프로젝트 갤러리에 `kind: "concept-mockup"`으로 등록된 항목은 0개다. 컴포넌트는 향후 개념 목업을 다시 사용할 때를 위해 provenance 배지와 확대 화면 상태 표시를 계속 지원한다.

## 현재 실제 자료 등록 현황

아키·NIPA Vision AI·셀렉트스타 STT·시럽월렛·Skelter Labs AI 상담사는 사용자가 직접 제공한 공개 Supabase Storage 자료를 사용한다. 모든 자료는 브라우저에서 PNG `1600×1200px`, `complete=true`를 확인했고 `kind: "evidence"`로 등록했다. 아키와 NIPA 자료는 원본 크기와 별도로 7:6의 `1400×1200px` 표시 프레임을 사용한다.

| 프로젝트 | 표시 순서 | 공개 URL | 원본 크기 | 실제 파일 크기 | 상태 |
|---|---:|---|---:|---:|---|
| 아키 AI 기록 솔루션 | 1 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/1.png` | `1600×1200px` | `1,596,197 bytes` (약 1.52MiB) | `evidence` |
| 아키 AI 기록 솔루션 | 2 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/2.png` | `1600×1200px` | `511,656 bytes` (약 500KiB) | `evidence` |
| 아키 AI 기록 솔루션 | 3 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/3.png` | `1600×1200px` | `434,169 bytes` (약 424KiB) | `evidence` |
| NIPA Vision AI 품질 검사 | 1 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/pratama/1.png` | `1600×1200px` | `689,918 bytes` (약 674KiB) | `evidence` |
| NIPA Vision AI 품질 검사 | 2 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/pratama/2.png` | `1600×1200px` | `178,497 bytes` (약 174KiB) | `evidence` |
| NIPA Vision AI 품질 검사 | 3 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/pratama/3.png` | `1600×1200px` | `1,443,605 bytes` (약 1.38MiB) | `evidence` |
| Syrup Wallet 운영 | 1 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/syrup/1.png` | `1600×1200px` | `698,452 bytes` (약 682KiB) | `evidence` |
| Syrup Wallet 운영 | 2 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/syrup/2.png` | `1600×1200px` | `669,600 bytes` (약 654KiB) | `evidence` |
| Syrup Wallet 운영 | 3 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/syrup/3.png` | `1600×1200px` | `628,074 bytes` (약 613KiB) | `evidence` |
| 셀렉트스타 STT | 1 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/select/1.png` | `1600×1200px` | `224,890 bytes` (약 220KiB) | `evidence` |
| 셀렉트스타 STT | 2 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/select/2.png` | `1600×1200px` | `266,246 bytes` (약 260KiB) | `evidence` |
| 셀렉트스타 STT | 3 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/select/3.png` | `1600×1200px` | `141,635 bytes` (약 138KiB) | `evidence` |
| AI 상담사 PoC | 1 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/skelter/skel.png` | `1600×1200px` | `693,838 bytes` (약 678KiB) | `evidence` |
| AI 상담사 PoC | 2 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/skelter/skel2.png` | `1600×1200px` | `419,422 bytes` (약 410KiB) | `evidence` |
| AI 상담사 PoC | 3 | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/skelter/skel3.png` | `1600×1200px` | `846,353 bytes` (약 827KiB) | `evidence` |

아키 1번과 NIPA 3번 자료는 각각 약 `1.52MiB`, `1.38MiB`로 권장 최대 1MB를 초과한다. 이번에는 사용자가 제공한 공개 원본의 판독성을 우선해 그대로 등록하고, 후속 성능 최적화에서는 내용·크기·사실성을 보존한 무손실 또는 시각적 무손실 압축을 우선 검토한다.

아키 1번의 인물과 2번 화면의 이름·일정처럼 보이는 정보는 사용자가 공개 URL로 직접 제공하고 배포를 요청한 승인 자료로 취급한다. 해당 정보를 본문·alt·분석 이벤트로 추출하거나 개인과 연결하지 않으며, 실제 고객 데이터라면 원본 단계에서 비식별화한 파일로 교체한다.

셀렉트스타 3번 자료에는 가명성 작업자 ID와 작업량이 화면 일부로 보인다. 사용자가 공개 URL을 직접 제공하고 포트폴리오 등록을 요청한 범위에서만 이미지로 표시하며, ID·작업량을 본문·alt·분석 이벤트로 추출하거나 개인과 연결하지 않는다.

NIPA 실제 자료와 프로젝트별 7:6 표시 프레임 등록 예시는 다음과 같다.

```ts
visual: {
  frameAspectRatio: "7:6",
  items: [
    {
      id: "nipa-vision-ai-test-report",
      src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/pratama/1.png",
      alt: "정확도·재현율·처리 속도의 시험 결과가 적합으로 표시된 AI 바우처 시험 성적서",
      width: 1600,
      height: 1200,
      kind: "evidence",
    },
    {
      id: "nipa-vision-ai-defect-flow",
      src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/pratama/2.png",
      alt: "신발 아웃솔 이미지를 AI로 세그멘테이션해 7종 불량 유형을 구분하는 검사 흐름도",
      width: 1600,
      height: 1200,
      kind: "evidence",
    },
    {
      id: "nipa-vision-ai-inspector",
      src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/pratama/3.png",
      alt: "신발 아웃솔의 결함 위치와 검사 수량을 보여주는 AI 품질 검사 실행 화면",
      width: 1600,
      height: 1200,
      kind: "evidence",
    },
  ],
}
```

## 데이터 등록 위치

`src/data/portfolio.ts`에서 해당 프로젝트의 `visual.items` 배열에 등록한다. 현재 아키 프로젝트는 아래 세 파일이 등록되어 있다.

```ts
visual: {
  title: "아키 제품 자료",
  type: "image",
  frameAspectRatio: "7:6",
  alt: "아키 AI 기록 제품의 사용 흐름과 베타 검증 자료",
  items: [
    {
      id: "arky-motion-tracking",
      src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/1.png",
      alt: "운동 자세를 촬영하면서 휴대전화 화면에 관절 추적선이 표시된 수업 기록 장면",
      width: 1600,
      height: 1200,
      kind: "evidence",
    },
    {
      id: "arky-product-screens",
      src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/2.png",
      alt: "수업 캘린더와 AI 분석 기록, 회원별 수업 기록 목록을 보여주는 아키 모바일 화면 3종",
      width: 1600,
      height: 1200,
      kind: "evidence",
    },
    {
      id: "arky-report-sharing",
      src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/3.png",
      alt: "AI 분석 리포트를 회원에게 한 번에 전달하는 아키 수업 기록 공유 기능 소개 화면",
      width: 1600,
      height: 1200,
      kind: "evidence",
    },
  ],
  placeholderItems: [],
},
```

- `alt`는 필수이며 이미지에 실제로 보이는 화면·도표를 구체적으로 설명한다.
- `caption`은 선택값이다. 입력해도 이미지 아래에는 표시하지 않고 확대 dialog의 보조기술 설명으로만 사용한다.
- `width`, `height`에는 원본 픽셀 크기를 입력해 레이아웃 이동을 줄인다.
- `kind`는 실제 확인 자료면 `evidence`, 개념 표현이면 `concept-mockup`으로 항목마다 지정한다.
- `src`와 `alt`가 모두 공백이 아닌 항목만 유효한 슬라이드로 집계된다.
- `id`는 프로젝트 안에서 중복되지 않는 짧은 영문 id를 사용한다.
- 이미지가 없는 프로젝트는 `증거 이미지 준비 중`만 표시하며 `placeholderItems` 목록은 화면에 렌더하지 않는다.
- 유효한 항목이 두 장 이상이면 4초마다 자동 이동한다. 현재 공개 프로젝트 5개는 모두 실제 자료가 3장 이상이므로 같은 4초 규칙을 적용한다. hover·focus·확대·화면 밖·숨겨진 탭·모션 감소 환경에서는 자동 이동을 멈춘다.

## 실제 자료 교체 원칙

개념 목업은 공개 가능한 실제 자료를 확보하기 전까지의 설명용 상태다. 다음 조건을 모두 충족한 뒤 실제 자료로 교체한다.

1. 당시 제품 화면·산출물·성과 자료와 프로젝트의 연결 관계를 확인한다.
2. 고객사·파트너의 외부 공개 허용 범위를 확인하고 개인정보·내부 URL·계정·토큰·비공개 수치를 제거한다.
3. 기존 목업 항목의 `src`, `alt`, `width`, `height`를 실제 자료에 맞게 교체하고 `kind: "evidence"`로 변경한다.
4. 개념 목업과 실제 자료를 한 갤러리에 함께 둘 때는 각 항목의 `kind`를 개별 지정해 모든 슬라이드에서 상태가 정확히 표시되게 한다.
5. 실제 자료가 확인되기 전에는 개념 목업 안의 그래프·화면 요소에서 새로운 성과 수치나 사실을 추론하지 않는다.
6. 실제 자료 교체 후에도 기본 4:3 또는 프로젝트에 명시한 예외 프레임, 확대 보기, 키보드 탐색, 4초 자동 이동 조건을 동일하게 재검증한다.

## 공개 전 확인

- 이름·전화번호·이메일·회원 얼굴 등 개인정보를 가린다.
- 고객사 내부 URL, 토큰, 계정, 비공개 지표와 원본 데이터가 보이지 않는지 확인한다.
- 고객사·파트너의 외부 공개 허용 범위를 확인한다.
- 과장된 그래프 축이나 확인되지 않은 성과 수치를 넣지 않는다.
- 개념 목업에는 회사 로고·브랜드 UI·실제 수치·실제 고객 데이터·워터마크를 넣지 않고 `개념 목업` 상태를 유지한다.
- 모바일에서도 이미지 안의 핵심 글자가 읽히는지 확인한다.
- 각 슬라이드의 alt는 서로 구별되게 작성하고 파일명이나 `이미지`만 반복하지 않는다.

## 등록 후 검증

1. 로컬 파일은 `sips -g pixelWidth -g pixelHeight -g format -g profile <파일>`, 원격 파일은 브라우저의 `naturalWidth`·`naturalHeight`로 실제 `1600×1200px`, PNG 여부를 확인하고 파일 크기를 기록한다. 표시 프레임 크기를 원본 크기로 잘못 기록하지 않는다.
2. `src/test/index.test.tsx`의 빈 증거 영역 개수와 `개념 목업` 표시 개수를 현재 공개 등록 수 `0`에 맞게 갱신한다.
3. 갤러리 단위 테스트에서 `kind: "concept-mockup"` 항목의 카드 배지와 확대 화면 상태 문구가 모두 표시되는지 확인한다.
4. 유효한 항목이 두 장 이상일 때 4초 전에는 유지되고 4초 시점에 다음 이미지로 이동하는지 확인한다.
5. 전체 테스트와 build를 통과시킨다.
6. 390×844, 768×900, 1440×900에서 한 프로젝트가 한 행에 표시되는지, 첫 이미지, 이전·다음 버튼, 확대 dialog, 가로 넘침을 확인한다. 아키와 NIPA는 7:6 프레임, 나머지는 기본 4:3이며 모든 화면에서 `object-contain`으로 잘리지 않아야 한다.
7. 원격 이미지의 `naturalWidth`가 0보다 큰지, 로컬 이미지의 `complete`가 true인지, 브라우저 콘솔 오류가 없는지 확인한다.
8. 개념 목업에 회사 로고·브랜드 UI·실제 수치·개인정보·판독 가능한 긴 텍스트·워터마크가 없는지 시각 검사한다.
