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
| 화면 비율 | 권장 `4:3` |
| 권장 크기 | `1600×1200px` |
| 안전 여백 | 상하좌우 `80px` 이상(캔버스의 5%) |
| 이미지 내부 최소 글자 | `32px` 이상 |
| 권장 파일 크기 | 장당 `700KB` 이하, 최대 `1MB` |
| 권장 장수 | 프로젝트당 3장 |
| 파일명 | 표시 순서 두 자리 숫자 + 영문 소문자 kebab-case |

갤러리는 모든 화면에서 4:3 고정 프레임과 `object-contain`을 사용한다. 정확히 `1600×1200px`로 내보내면 잘림이나 레터박스 없이 보인다. 다른 비율의 원본도 잘라내지 않지만 여백이 생길 수 있으므로, 가능하면 1600×1200 캔버스 안에 원본을 배치해 내보낸다.

현재 개념 목업 4개는 생성 원본의 시각 품질을 우선해 권장 파일 크기보다 크다. 실제 용량은 아래 등록 현황에 별도로 기록하며, 실제 자료로 교체하거나 배포 성능을 최적화할 때는 1MB 이하를 다시 목표로 한다.

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

아래 4개 파일은 모두 `1600×1200px`, PNG, `sRGB IEC61966-2.1`, `kind: "concept-mockup"`으로 등록되어 있다. 경력 사실의 이해를 돕는 구조 설명용이며 실증자료로 인용하지 않는다.

| 프로젝트 | 저장소 경로 / `src` | 실제 파일 크기 | 상태 |
|---|---|---:|---|
| Vision AI 품질검사 | `public/evidence/nipa-vision-ai-poc/mockup-overview.png` / `/evidence/nipa-vision-ai-poc/mockup-overview.png` | `1,926,948 bytes` (약 1.84MiB) | `concept-mockup` |
| STT 데이터셋 운영 | `public/evidence/selectstar-stt-operations/mockup-overview.png` / `/evidence/selectstar-stt-operations/mockup-overview.png` | `1,651,171 bytes` (약 1.57MiB) | `concept-mockup` |
| AI 상담사 PoC | `public/evidence/skelter-ai-counselor/mockup-overview.png` / `/evidence/skelter-ai-counselor/mockup-overview.png` | `1,600,405 bytes` (약 1.53MiB) | `concept-mockup` |
| Syrup Wallet 운영 | `public/evidence/sk-planet-syrup-wallet/mockup-overview.png` / `/evidence/sk-planet-syrup-wallet/mockup-overview.png` | `1,639,911 bytes` (약 1.56MiB) | `concept-mockup` |

개념 목업 등록 예시는 다음과 같다.

```ts
{
  id: "nipa-vision-ai-concept-mockup",
  src: "/evidence/nipa-vision-ai-poc/mockup-overview.png",
  alt: "개념 목업: AI Vision 기반 신발 아웃솔 품질검사 대시보드",
  width: 1600,
  height: 1200,
  kind: "concept-mockup",
}
```

## 데이터 등록 위치

`src/data/portfolio.ts`에서 해당 프로젝트의 `visual.items` 배열에 등록한다. 현재 아키 프로젝트는 아래 세 파일이 등록되어 있다.

```ts
visual: {
  title: "아키 제품 자료",
  type: "image",
  alt: "아키 AI 기록 제품의 사용 흐름과 베타 검증 자료",
  items: [
    {
      id: "arky-product-flow",
      src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/arky1.png",
      alt: "아키 로그인, 수업 캘린더와 AI 수업 기록 상세 화면",
      width: 1809,
      height: 1311,
    },
    {
      id: "arky-recording-proof",
      src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/arky2.png",
      alt: "모바일에서 아키 수업 기록 영상을 확인하는 사용 장면과 기록 시간·공유·보관 안내",
      width: 1355,
      height: 1311,
    },
    {
      id: "arky-user-manual",
      src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/arky3.png",
      alt: "회원가입부터 수업 기록·공유·설정까지 정리한 아키 이용 매뉴얼",
      width: 1784,
      height: 1311,
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
- 유효한 항목이 두 장 이상이면 4초마다 자동 이동한다. 현재 개념 목업은 프로젝트당 한 장이므로 자동 이동 대상이 아니며, 실제 자료가 추가되어 두 장 이상이 되면 같은 4초 규칙을 적용한다. hover·focus·확대·화면 밖·숨겨진 탭·모션 감소 환경에서는 자동 이동을 멈춘다.

## 실제 자료 교체 원칙

개념 목업은 공개 가능한 실제 자료를 확보하기 전까지의 설명용 상태다. 다음 조건을 모두 충족한 뒤 실제 자료로 교체한다.

1. 당시 제품 화면·산출물·성과 자료와 프로젝트의 연결 관계를 확인한다.
2. 고객사·파트너의 외부 공개 허용 범위를 확인하고 개인정보·내부 URL·계정·토큰·비공개 수치를 제거한다.
3. 기존 목업 항목의 `src`, `alt`, `width`, `height`를 실제 자료에 맞게 교체하고 `kind: "evidence"`로 변경한다.
4. 개념 목업과 실제 자료를 한 갤러리에 함께 둘 때는 각 항목의 `kind`를 개별 지정해 모든 슬라이드에서 상태가 정확히 표시되게 한다.
5. 실제 자료가 확인되기 전에는 개념 목업 안의 그래프·화면 요소에서 새로운 성과 수치나 사실을 추론하지 않는다.
6. 실제 자료 교체 후에도 4:3 프레임, 확대 보기, 키보드 탐색, 4초 자동 이동 조건을 동일하게 재검증한다.

## 공개 전 확인

- 이름·전화번호·이메일·회원 얼굴 등 개인정보를 가린다.
- 고객사 내부 URL, 토큰, 계정, 비공개 지표와 원본 데이터가 보이지 않는지 확인한다.
- 고객사·파트너의 외부 공개 허용 범위를 확인한다.
- 과장된 그래프 축이나 확인되지 않은 성과 수치를 넣지 않는다.
- 개념 목업에는 회사 로고·브랜드 UI·실제 수치·실제 고객 데이터·워터마크를 넣지 않고 `개념 목업` 상태를 유지한다.
- 모바일에서도 이미지 안의 핵심 글자가 읽히는지 확인한다.
- 각 슬라이드의 alt는 서로 구별되게 작성하고 파일명이나 `이미지`만 반복하지 않는다.

## 등록 후 검증

1. `sips -g pixelWidth -g pixelHeight -g format -g profile <파일>`로 `1600×1200px`, PNG, sRGB인지 확인하고 실제 파일 크기를 기록한다.
2. `src/test/index.test.tsx`의 빈 증거 영역 개수와 `개념 목업` 표시 개수를 현재 등록 수에 맞게 갱신한다.
3. 갤러리 단위 테스트에서 `kind: "concept-mockup"` 항목의 카드 배지와 확대 화면 상태 문구가 모두 표시되는지 확인한다.
4. 유효한 항목이 두 장 이상일 때 4초 전에는 유지되고 4초 시점에 다음 이미지로 이동하는지 확인한다.
5. 전체 테스트와 build를 통과시킨다.
6. 390×844, 768×900, 1440×900에서 한 프로젝트가 한 행에 표시되는지, 첫 이미지, 이전·다음 버튼, 확대 dialog, `개념 목업` 배지와 가로 넘침을 확인한다.
7. 원격 이미지의 `naturalWidth`가 0보다 큰지, 로컬 이미지의 `complete`가 true인지, 브라우저 콘솔 오류가 없는지 확인한다.
8. 개념 목업에 회사 로고·브랜드 UI·실제 수치·개인정보·판독 가능한 긴 텍스트·워터마크가 없는지 시각 검사한다.
