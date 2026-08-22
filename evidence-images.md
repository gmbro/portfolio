# 증거 이미지 등록 가이드

프로젝트 증거 이미지는 자동 슬라이드·확대 보기 컴포넌트를 사용한다. PNG를 아래 규격으로 준비한 뒤 `src/data/portfolio.ts`의 해당 프로젝트 `visual.items`에 등록한다. 저장 위치는 저장소의 `public/evidence/` 또는 공개 접근이 가능한 Supabase Storage URL을 동일하게 지원한다.

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
- `src`와 `alt`가 모두 공백이 아닌 항목만 유효한 슬라이드로 집계된다.
- `id`는 프로젝트 안에서 중복되지 않는 짧은 영문 id를 사용한다.
- 이미지가 없는 프로젝트는 `증거 이미지 준비 중`만 표시하며 `placeholderItems` 목록은 화면에 렌더하지 않는다.
- 유효한 항목이 두 장 이상이면 2초마다 자동 이동한다. hover·focus·확대·화면 밖·숨겨진 탭·모션 감소 환경에서는 자동 이동을 멈춘다.

## 공개 전 확인

- 이름·전화번호·이메일·회원 얼굴 등 개인정보를 가린다.
- 고객사 내부 URL, 토큰, 계정, 비공개 지표와 원본 데이터가 보이지 않는지 확인한다.
- 고객사·파트너의 외부 공개 허용 범위를 확인한다.
- 과장된 그래프 축이나 확인되지 않은 성과 수치를 넣지 않는다.
- 모바일에서도 이미지 안의 핵심 글자가 읽히는지 확인한다.
- 각 슬라이드의 alt는 서로 구별되게 작성하고 파일명이나 `이미지`만 반복하지 않는다.

## 등록 후 검증

1. `src/test/index.test.tsx`의 빈 증거 영역 개수를 아직 이미지가 없는 프로젝트 수로 갱신한다.
2. 전체 테스트와 build를 통과시킨다.
3. 390×844, 768×900, 1440×900에서 한 프로젝트가 한 행에 표시되는지, 첫 이미지와 2초 자동 이동, 이전·다음 버튼, 확대 dialog와 가로 넘침을 확인한다.
4. 원격 이미지의 `naturalWidth`가 0보다 큰지, 브라우저 콘솔 오류가 없는지 확인한다.
