# 배포 전 오류 체크리스트

이 문서는 Portfolio의 모든 배포에서 사용하는 필수 품질 게이트이자 배포 기록이다. `최초 진단 → 문제 기록 → 직접 수정 → 동일 조건 재검사 → 배포 → 실제 URL 점검` 순서를 지킨다.

## 배포 원칙

- 최초 화면 검사를 마치기 전에는 수정하지 않는다.
- 발견한 문제와 수정 방향을 먼저 아래 기록에 남긴 다음 수정한다.
- 모바일 `390px`, 태블릿 `768px`, 데스크톱 `1440px`을 모두 직접 확인한다.
- 빌드 성공만으로 시각 검사를 대신하지 않는다.
- 미해결 차단 문제가 있거나 재검사가 실패하면 배포하지 않는다.
- 회사별 페이지는 기본적으로 `noindex, nofollow`를 유지한다.
- 내부 JD 원문, 분석표, 다른 회사 지원 정보, 비공개 경력 근거가 공개 payload에 포함되지 않았는지 확인한다.

## 필수 검사 항목

각 너비에서 전체 페이지를 위에서 아래까지 확인한다.

### 레이아웃과 반응형

- [ ] 텍스트가 컨테이너 밖으로 넘치거나 잘리지 않는다.
- [ ] 헤드라인과 서브카피 줄바꿈이 의미를 해치지 않는다.
- [ ] 이미지가 의도하지 않게 잘리거나 찌그러지지 않는다.
- [ ] 버튼과 CTA가 정렬되고 충분한 터치 영역을 가진다.
- [ ] 카드 간격과 높이가 불규칙하지 않다.
- [ ] 섹션 패딩과 좌우 여백이 화면 크기에 적절하다.
- [ ] 가로 스크롤이 발생하지 않는다.
- [ ] 모바일에서 hover 전용 정보나 어색한 hover 상태가 남지 않는다.
- [ ] 고정·sticky 요소가 콘텐츠나 CTA를 가리지 않는다.
- [ ] 메뉴, 앵커, 스크롤 이동이 올바른 위치로 동작한다.

### 콘텐츠와 접근성

- [ ] Hero의 역할 라벨, 헤드라인, 서브카피, 키워드 3개, CTA가 선택된 최종안과 일치한다.
- [ ] 수치, 회사명, 역할, 기간이 검증된 자료와 일치한다.
- [ ] 텍스트와 배경 대비가 충분하다.
- [ ] 이미지 대체 텍스트와 버튼 이름이 의미를 전달한다.
- [ ] 키보드 포커스가 보이고 주요 동작을 키보드로 실행할 수 있다.
- [ ] 로딩, 빈 상태, 오류, 존재하지 않는 slug가 깨진 화면을 만들지 않는다.

### 기술과 공개 안전성

- [ ] 프로덕션 빌드가 성공한다.
- [ ] 관련 테스트와 정적 검사가 통과하거나 기존 예외가 기록돼 있다.
- [ ] 브라우저 콘솔에 새 오류가 없다.
- [ ] 실패한 네트워크 요청과 깨진 asset이 없다.
- [ ] 회사별 route를 직접 새로고침해도 정상 렌더링된다.
- [ ] 현재 publication이 의도한 revision을 가리킨다.
- [ ] 브라우저 번들에 service role key나 비공개 값이 포함되지 않는다.
- [ ] 회사별 페이지의 `noindex, nofollow`가 적용돼 있다.

## 배포 기록 템플릿

새 배포마다 이 섹션을 복사해 문서 아래에 추가한다.

### 배포: YYYY-MM-DD / 회사·직무 / revision N

- 작업 대상 URL:
- 로컬 미리보기 URL:
- 배포 예정 URL:
- 대상 revision:
- 검사 브라우저:
- 검사 담당:

#### 1차 진단 — 수정 전

문제를 발견하면 수정 전에 먼저 기록한다. 심각도는 `차단`, `높음`, `보통`, `낮음` 중에서 선택한다.

| ID | 너비 | 섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-001 | 390px |  |  |  |  |  | 발견 |

1차 진단 요약:

- 발견한 문제:
- 수정 방법:

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-001 |  |  | 없음 |  |

#### 동일 조건 재검사

| 너비 | 텍스트·줄바꿈 | 이미지 | 버튼·CTA | 카드·간격·패딩 | 가로 스크롤 | 모바일 hover | 전체 결과 |
|---:|---|---|---|---|---|---|---|
| 390px |  |  |  |  |  |  |  |
| 768px |  |  |  |  | 해당 없음 | 해당 없음 |  |
| 1440px |  |  |  |  | 해당 없음 | 해당 없음 |  |

- 프로덕션 빌드:
- 테스트·정적 검사:
- 미해결 문제:
- 배포 가능 여부: `가능` / `중단`

#### 배포 후 실제 URL 점검

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 URL 로드 |  |  |  |
| route 새로고침 |  |  |  |
| 올바른 revision |  |  |  |
| CTA·링크 |  |  |  |
| 콘솔·네트워크 |  |  |  |

- 최종 공개 URL:
- 발행 revision:
- publication 상태:
- `noindex, nofollow`:
- 배포 결과: `성공` / `롤백` / `중단`
- 남은 낮은 우선순위 항목:

### 배포: 2026-08-11 / 포트폴리오 인프라 / revision 1

- 작업 대상 URL: `/`, `/p/:slug`, `/admin/links`
- 로컬 미리보기 URL: `http://127.0.0.1:8080/`
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: 인프라 revision 1
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-001 | 390·768·1440px | Hero·내비게이션 | `case-studies`, `skills` 대상 ID가 없어 CTA와 메뉴 클릭이 동작하지 않음 | 핵심 콘텐츠로 이동할 수 없음 | 높음 | 실제 섹션에 안정적인 ID를 부여하고 동작 검사 | 발견 |
| QA-002 | 390·768·1440px | Hero | 서브카피, CTA, 성과 지표의 배경 대비가 낮음 | 채용 담당자가 핵심 내용을 빠르게 읽기 어려움 | 높음 | 텍스트·버튼·지표 대비를 높이고 세 너비에서 재확인 | 발견 |
| QA-003 | 390·768px | 내비게이션 | 모바일 메뉴 버튼에 명확한 이름과 펼침 상태가 없음 | 보조기기 사용자가 메뉴 상태를 알기 어려움 | 보통 | `aria-label`, `aria-expanded`, `aria-controls` 추가 | 발견 |
| QA-004 | 390px | Leadership | 소개 문장과 카드 제목의 `nowrap`, 타임라인 고정 폭으로 모바일 텍스트가 잘림 | 핵심 역량 설명을 읽을 수 없음 | 높음 | 모바일 카드 세로 배치, 줄바꿈 허용, 타임라인 막대 전체 폭 적용 | 발견 |

1차 진단 요약:

- 발견한 문제: 페이지 가로 스크롤은 없지만 CTA/메뉴 대상 누락, Hero 대비, 모바일 메뉴 접근성, Leadership 텍스트 잘림 문제가 있다.
- 수정 방법: 실제 섹션 ID 연결, Hero 색상 대비 강화, 모바일 메뉴 ARIA 상태 추가, Leadership 모바일 레이아웃 수정 후 같은 390px·768px·1440px에서 재검사한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-001 | `src/components/ImageCards.tsx`, `src/components/Leadership.tsx` | 실제 섹션에 `case-studies`, `skills` ID와 스크롤 여백을 추가하고 CTA·메뉴 이동을 직접 확인 | 없음 | 통과 |
| QA-002 | `src/components/Hero.tsx`, `src/components/ImageCards.tsx` | 서브카피, 키워드, CTA, 성과 지표와 카드 본문의 배경 대비를 강화 | 없음 | 통과 |
| QA-003 | `src/components/Navbar.tsx` | 메뉴 버튼에 이름·펼침 상태·대상 연결을 추가하고 닫힘→열림 상태 변화를 확인 | 없음 | 통과 |
| QA-004 | `src/components/Leadership.tsx` | 모바일 줄바꿈 허용, 카드 세로 배치, 타임라인 막대 가용 폭 확장 | 없음 | 통과 |

#### 동일 조건 재검사

| 너비 | 텍스트·줄바꿈 | 이미지 | 버튼·CTA | 카드·간격·패딩 | 가로 스크롤 | 모바일 hover | 전체 결과 |
|---:|---|---|---|---|---|---|---|
| 390px | 통과 | 통과 | CTA 이동·메뉴 상태 통과 | 통과 | 없음 | 어색한 잔존 상태 없음 | 통과 |
| 768px | 통과 | 통과 | 통과 | 통과 | 없음 | 해당 없음 | 통과 |
| 1440px | 통과 | 통과 | 통과 | 통과 | 없음 | 해당 없음 | 통과 |

- 프로덕션 빌드: GitHub Pages base(`/portfolio/`) 조건으로 통과
- 테스트·정적 검사: TypeScript 통과, Vitest 4개 통과, ESLint 오류 0·기존 fast-refresh 경고 8개
- 추가 route 검사: `/admin/links` 390px 로그인·`noindex`·가로 스크롤 없음, `/p/not-real-slug` RLS 조회 후 안전한 오류 상태·`noindex`·가로 스크롤 없음
- 미해결 문제: 기능 차단 없음. 초기 JS 청크 약 1.54MB와 Hero 이미지 약 2.59MB는 다음 성능 최적화 대상으로 기록한다.
- 배포 가능 여부: `가능` — 사용자 승인 후 저장소를 public으로 전환하고 GitHub Actions Pages 소스를 활성화함

#### 배포 후 실제 URL 점검

배포 후 발견·수정 기록:

| ID | 너비 | 발견한 문제 | 사용자 영향 | 심각도 | 실제 수정 | 상태 |
|---|---:|---|---|---|---|---|
| QA-005 | 390px | 1차 배포 Hero 성과 지표가 밝은 배경 구간에서 대비가 낮음 | 모바일에서 핵심 성과를 빠르게 읽기 어려움 | 높음 | `src/components/Hero.tsx`에 지표별 어두운 반투명 배경·테두리·텍스트 대비를 추가하고 재배포 | 실제 URL 재검사 통과 |

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 URL 로드 | 통과 | 통과 | 통과 |
| route 새로고침 | `/admin/links`, `/p/not-real-slug` 통과 | `/p/not-real-slug` 통과 | `/p/not-real-slug` 통과 |
| 올바른 revision | 배포 커밋 `0e8cb4b` 자산 확인 | 배포 커밋 `0e8cb4b` 자산 확인 | 배포 커밋 `0e8cb4b` 자산 확인 |
| CTA·링크 | CTA 스크롤·모바일 메뉴 상태 통과 | CTA·대상 ID 통과 | CTA·내비게이션 대상 통과 |
| 콘솔·네트워크 | 신규 오류·실패 없음 | 신규 오류·실패 없음 | 신규 오류·실패 없음 |

- 최종 공개 URL: `https://gmbro.github.io/portfolio/`
- 발행 revision: 인프라 revision 1 / Git commit `0e8cb4b`
- publication 상태: 인프라 배포 완료, 회사별 publication은 아직 생성하지 않음
- `noindex, nofollow`: `/p/:slug`와 `/admin/links` 실제 URL에서 확인
- 배포 결과: `성공`

- 남은 낮은 우선순위 항목: 초기 번들 및 Hero 이미지 용량 최적화, 템플릿 인물 콘텐츠를 사용자 검증 자료로 교체

### 배포: 2026-08-11 / Typebot 플로팅 챗봇 / integration revision 1

- 작업 대상 URL: `/`, `/p/:slug`
- 제외 URL: `/admin/links`
- 로컬 미리보기 URL: `http://127.0.0.1:8080/`
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: Typebot integration revision 1
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제·제약 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-TB-001 | 390·768·1440px | 전체 공개 포트폴리오 | 요청한 Typebot 플로팅 진입점이 아직 없음 | 방문자가 챗봇을 시작할 수 없음 | 높음 | React Bubble을 공통 라우터 내부에 추가 | 발견 |
| QA-TB-002 | 390px | 우측 하단 | 큰 버블을 추가할 때 모바일 CTA·폼·콘텐츠를 가릴 수 있음 | 핵심 동작의 터치·가독성 저하 가능 | 높음 | 실제 큰 버블 크기와 우측·하단 여백, 스크롤 구간별 겹침을 직접 확인 | 발견 |
| QA-TB-003 | 전체 | `/admin/links` | 공통 App에 직접 추가하면 관리자 화면에도 챗봇이 노출될 수 있음 | 관리 작업 방해 및 불필요한 외부 UI 노출 | 보통 | 현재 pathname을 기준으로 관리자 라우트에서는 렌더링하지 않음 | 발견 |

1차 진단 요약:

- 기존 화면은 세 너비 모두 가로 스크롤과 하단 고정 UI 충돌이 없다.
- 공개 기본·회사별 페이지에만 Typebot Bubble을 추가하고, 관리자 화면 제외와 모바일 겹침을 같은 조건에서 재검사한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-TB-001 | `package.json`, `src/components/TypebotBubble.tsx`, `src/App.tsx` | 공식 React 패키지와 사용자가 제공한 `gmbro` Bubble·아이콘·색상·large 설정을 공통 라우터에 추가 | 없음 | 통과 |
| QA-TB-002 | `src/components/Footer.tsx` | Bubble 높이와 하단 여백을 고려해 Footer 하단 안전 공간을 확보하고 세 너비에서 실제 겹침 계산·시각 검사 | 없음 | 통과 |
| QA-TB-003 | `src/components/TypebotBubble.tsx` | `/`와 `/p/*`에서만 Bubble을 렌더링하고 `/admin/links`에서는 반환하지 않음 | 없음 | 통과 |

#### 동일 조건 재검사

| 너비 | 버블 표시·고정 | 열기·닫기 | 콘텐츠 겹침 | 가로 스크롤 | 관리자 화면 제외 | 전체 결과 |
|---:|---|---|---|---|---|---|
| 390px | 64px large 버튼·우측 35px·하단 20px 확인 | 챗봇 내용 로드·열기·닫기 통과 | Footer 안전 여백 적용 후 겹침 없음 | 없음 | Bubble 없음 확인 | 통과 |
| 768px | 표시·고정 통과 | 열기·닫기 통과 | Footer와 겹침 없음 | 없음 | 390px 직접 확인 | 통과 |
| 1440px | 표시·고정 통과 | 열기·닫기 통과 | Footer와 겹침 없음 | 없음 | 390px 직접 확인 | 통과 |

- 프로덕션 빌드: GitHub Pages base(`/portfolio/`) 조건으로 통과
- 테스트·정적 검사: TypeScript 통과, Vitest 4개 통과, ESLint 오류 0·기존 fast-refresh 경고 8개
- 추가 route 검사: `/p/not-real-slug`에서도 Bubble·`noindex`·안전한 오류 상태 확인, `/admin/links`에는 Bubble이 생성되지 않음을 확인
- 미해결 문제: 기능 차단 없음. Typebot 웹 컴포넌트 청크 약 696KB(199KB gzip)는 필요 시 후속 성능 최적화 대상으로 기록한다.
- 배포 가능 여부: `가능`

#### 배포 후 실제 URL 점검

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 URL 로드 | 통과 | 통과 | 통과 |
| Bubble 표시·열기·닫기 | large 버튼·대화 내용 로드·열기·닫기 통과 | 통과 | 통과 |
| route 새로고침 | `/`, `/p/not-real-slug`, `/admin/links` 통과 | `/` 통과 | `/` 통과 |
| 관리자 화면 제외 | Bubble 미생성 확인 | 390px 직접 확인 | 390px 직접 확인 |
| 콘솔·네트워크 | 신규 오류·실패 없음 | 신규 오류·실패 없음 | 신규 오류·실패 없음 |

- 최종 공개 URL: `https://gmbro.github.io/portfolio/`
- 발행 revision: Typebot integration revision 1 / Git commit `987c27e`
- Typebot: `gmbro`
- 배포 결과: `성공`
- 남은 낮은 우선순위 항목: Typebot 웹 컴포넌트 청크 용량 최적화 검토

### 배포: 2026-08-11 / 챗봇 안내·링크 복구 UX / integration revision 2

- 작업 대상 URL: `/`, `/p/:slug`
- 제외 URL: `/admin/links`
- 로컬 미리보기 URL: `http://127.0.0.1:8080/`
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: Typebot·링크 상태 integration revision 2
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제·제약 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-UX-001 | 390·768·1440px | 우측 하단 챗봇 | 인물 사진만 노출되어 버튼의 용도를 열기 전에 알 수 없음 | 방문자가 도움 기능임을 인지하기 어렵고 클릭 동기가 약함 | 높음 | Typebot 공식 preview message로 사진 위에 `답변해드립니다` 안내를 노출 | 발견 |
| QA-UX-002 | 390px | 유효하지 않은 회사별 링크 | 제목이 `링크입 / 니다`로 어색하게 분리되고 화면이 막다른 경로가 됨 | 오류 이유는 알 수 있지만 포트폴리오로 복귀할 수 없음 | 보통 | 모바일 제목 크기·줄바꿈을 다듬고 기본 포트폴리오 복귀 링크 제공 | 발견 |
| QA-UX-003 | 768·1440px | 유효하지 않은 회사별 링크 | 참고 이미지보다 카드의 정보 위계와 여백이 작고, 테마 값에 의존해 검은 상태 화면이 보장되지 않음 | 공유 링크가 만료됐을 때 브랜드 일관성과 복구 가능성이 낮음 | 보통 | 상태 화면을 명시적 검정 배경·대형 카드·주황 라벨로 고정하고 CTA 포함 | 발견 |

1차 진단 요약:

- 세 너비 모두 가로 스크롤은 없지만 챗봇의 목적을 설명하는 텍스트가 전혀 없다.
- `/p/not-real-slug`는 실제 발행물이 아닌 존재하지 않는 slug의 점검용 URL이다. 이 URL을 임의 발행물로 바꾸지 않고, 유효하지 않은 모든 회사별 링크에서 기본 포트폴리오로 복귀할 수 있도록 안전한 복구 동선을 추가한다.
- 본문은 아직 타인용 템플릿이므로 첨부 경력 자료와 섹션을 대조한 교체 기획을 먼저 확정하고, 이번 배포에서는 사실 콘텐츠를 임의로 덮어쓰지 않는다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-UX-001 | `src/components/TypebotBubble.tsx`, `src/types/typebot-react.d.ts` | Typebot 공식 preview message에 `답변해드립니다` 문구와 흰색 말풍선 테마를 추가 | 없음 | 통과 |
| QA-UX-002 | `src/pages/CompanyPortfolio.tsx` | 제목에 `break-keep`을 적용해 단어 중간 분리를 막고 유효하지 않은 링크에 기본 포트폴리오 복귀 CTA 추가 | 없음 | 통과 |
| QA-UX-003 | `src/pages/CompanyPortfolio.tsx`, `src/components/Hero.tsx` | 상태 화면을 참고 이미지의 검정 배경·대형 카드·주황 라벨로 고정하고, 모바일 Hero 지표 간격을 조정해 안내 말풍선과 맞닿지 않도록 안전 공간 확보 | 없음 | 통과 |

#### 동일 조건 재검사

| 너비 | 안내 말풍선 | 링크 상태 제목·설명 | 복귀 CTA | 카드·간격·패딩 | 가로 스크롤 | 전체 결과 |
|---:|---|---|---|---|---|---|
| 390px | 700ms 후 사진 위 표시·열기 시 자동 숨김·닫기 통과 | `유효하지 않은 / 링크입니다` 의미 단위 줄바꿈 통과 | 홈 이동·터치 영역 통과 | Hero 지표와 말풍선 경계 분리·카드 여백 통과 | 없음 | 통과 |
| 768px | 사진 위 표시 통과 | 한 줄 제목·설명 통과 | 통과 | 참고 이미지 비율·여백 통과 | 없음 | 통과 |
| 1440px | 사진 위 표시 통과 | 한 줄 제목·설명 통과 | 통과 | 760px 최대 폭·중앙 정렬 통과 | 없음 | 통과 |

- 프로덕션 빌드: GitHub Pages base(`/portfolio/`) 조건으로 통과
- 테스트·정적 검사: TypeScript 빌드 통과, Vitest 4개 통과, ESLint 오류 0·기존 fast-refresh 경고 8개
- 미해결 문제: 기능 차단 없음. Typebot 웹 컴포넌트 청크 약 696KB와 기존 Hero 이미지 약 2.59MB는 기존 성능 최적화 항목으로 유지한다. 타인용 템플릿 본문은 이번 기획 승인 전에는 의도적으로 변경하지 않는다.
- 배포 가능 여부: `가능`

#### 배포 후 실제 URL 점검

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 URL 로드 | 새 자산 `index-BhWi4S2k.js` 확인 | 통과 | 통과 |
| `답변해드립니다` 표시 | 700ms 후 사진 위 표시·챗봇 열기 시 숨김 통과 | 통과 | 통과 |
| route 새로고침 | `/`, `/p/not-real-slug` 통과 | `/p/not-real-slug` 통과 | `/p/not-real-slug` 통과 |
| 기본 포트폴리오 복귀 | 직접 클릭 후 `/portfolio` 이동 통과 | 링크 렌더링·대상 `/portfolio` 확인 | 링크 렌더링·대상 `/portfolio` 확인 |
| 콘솔·네트워크 | 신규 화면 오류·실패 asset 없음 | 신규 화면 오류·실패 asset 없음 | 신규 화면 오류·실패 asset 없음 |

- 최종 공개 URL: `https://gmbro.github.io/portfolio/`
- 상태 화면 검증 URL: `https://gmbro.github.io/portfolio/p/not-real-slug`
- 발행 revision: Typebot·링크 상태 integration revision 2 / Git commit `da19ec1`
- `noindex, nofollow`: `/p/not-real-slug`의 실제 meta 값 확인
- 배포 결과: `성공`
- 남은 낮은 우선순위 항목: 첨부 검증 자료를 반영한 기본 포트폴리오 콘텐츠 교체, 최초 실제 publication 발행, 기존 번들·Hero 이미지 용량 최적화

### 배포: 2026-08-11 / 기본 포트폴리오·AI 역량·EmailJS / base revision 1

- 작업 대상 URL: `/`, `/p/:slug`, `/admin/links`
- 로컬 미리보기 URL: `http://127.0.0.1:8080/`
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: 기본 포트폴리오 base revision 1
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 콘텐츠 기준 자료: 사용자 제공 경력 원문, 러닝보드·아키랩 프로젝트 이미지

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제·제약 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE-001 | 390·768·1440px | 전체 기본 포트폴리오 | 김지수, N·K·B사, 7년·12개·3개, 추천사와 연락처 등 타인 템플릿 정보가 전 구간에 남아 있음 | 이경민의 경력으로 오인될 수 있고 지원 자료로 사용할 수 없음 | 차단 | 디자인 골격만 유지하고 사용자 검증 자료로 이름·Hero·프로젝트·경력·활동·연락처 전면 교체 | 발견 |
| QA-BASE-002 | 390·768·1440px | Hero·프로젝트·역량 | STT·TTS·Retrieval·RAG·OCR, AI PoC, 데이터 운영, Codex·Supabase MVP 등 검증된 AI 활용 경험이 구조화돼 있지 않음 | AI 역량이 드러나지 않거나 모델 개발자로 잘못 해석될 위험 | 높음 | AI 서비스 기획·데이터 프로젝트 운영·MVP 검증·사업화의 3축으로 정확히 표현하고 대표 사례를 CAR 순서로 배치 | 발견 |
| QA-BASE-003 | 390·768·1440px | Contact | 가짜 이메일·LinkedIn을 표시하고, SDK와 Public Key 없이 `window.emailjs`를 호출해 제출 시 런타임 오류가 발생함 | 문의가 전달되지 않고 방문자 입력이 유실될 수 있음 | 차단 | 공식 EmailJS SDK·환경변수·입력 검증·인라인 상태·스팸 방어·mailto 대체 동선 적용 | 발견 |
| QA-BASE-004 | 390px | Contact | Typebot 안내 말풍선이 폼 진입 구간의 콘텐츠를 가릴 수 있음 | 문의 입력·설명 가독성이 낮아질 수 있음 | 보통 | Contact가 화면에 들어오면 preview message를 숨기거나 안전한 여백을 확보하고 직접 재검사 | 발견 |
| QA-BASE-005 | 전체 | `/p/:slug` | 발행된 회사별 페이지가 Hero만 렌더링해 `대표 프로젝트 보기` CTA 대상과 전체 경력 본문이 없음 | 맞춤 링크가 완전한 포트폴리오 역할을 하지 못함 | 높음 | 검증된 공통 본문을 함께 렌더링하고 Hero만 revision 데이터로 교체 | 발견 |
| QA-BASE-006 | 배포 | EmailJS 설정 | 이경민 EmailJS 계정의 Service ID·Template ID·Public Key가 저장소와 CI에 없음 | 코드 교체 후에도 EmailJS 실발송은 활성화되지 않음 | 높음 | GitHub Secrets 연동 구조와 누락 시 안전한 직접 메일 fallback을 만들고, 식별자 제공 후 Gmail 수신 1회 검증 | 발견 |

1차 진단 요약:

- 페이지에는 가로 스크롤은 없지만 전체 콘텐츠가 타인 템플릿이므로 이번 배포의 차단 문제로 판단한다.
- 사용자 원문과 이번 이미지에서 확인된 사실만 사용하며, AI 모델을 직접 개발한 것처럼 표현하지 않는다.
- 러닝보드는 `커뮤니티 최초` 비교 문구를 제외하고 `1인 기획·구현`, OCR 활용, 게이미피케이션, 진행 중인 고도화만 공개한다.
- CSAP은 최종 인증 취득이 아니라 예비인증 대응 경험으로 제한한다.
- EmailJS 수신 주소는 대시보드 템플릿에 `gmbro7942@gmail.com`으로 고정하며 Gmail 비밀번호나 private key는 브라우저 번들에 넣지 않는다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE-001 | `src/data/portfolio.ts`, `src/components/{Navbar,Hero,About,ImageCards,Experience,Footer}.tsx`, `src/pages/Index.tsx`, `index.html` | 이름, Hero, 대표 프로젝트, 경력, 교육·자격, 연락처와 메타데이터를 이경민의 검증 자료로 전면 교체하고 사용되지 않는 타인용 섹션 6개를 제거 | 검증 자료로 교체 | 통과 |
| QA-BASE-002 | `src/data/portfolio.ts`, `src/components/{ImageCards,Leadership,Activities}.tsx` | AI 서비스 흐름 설계, AI·데이터 프로젝트 운영, AI 도구 기반 MVP 검증, 신뢰성·안전성 검증을 실제 사례의 Challenge–Action–Result와 함께 구성 | 검증 자료로 추가 | 통과 |
| QA-BASE-003 | `src/components/Contact.tsx`, `package.json`, `.env.example`, `.github/workflows/deploy-pages.yml`, `src/test/contact.test.tsx` | `@emailjs/browser` SDK, 3개 환경변수, 입력 검증·honeypot·10초 rate limit·개인정보 동의·인라인 상태·메일 앱 fallback과 mock 전송 테스트를 적용 | 연락처 교체 | 통과 |
| QA-BASE-004 | `src/components/{TypebotBubble,Contact}.tsx` | 첫 화면에서 안내 말풍선을 2.5초 후 표시하고, 120px 이상 스크롤하거나 Contact가 보이면 자동 숨김 | 없음 | 통과 |
| QA-BASE-005 | `src/pages/CompanyPortfolio.tsx`, `src/pages/Index.tsx` | 발행된 회사별 route가 revision Hero와 검증된 공통 본문 전체를 함께 렌더링하도록 수정 | 없음 | 통과 |
| QA-BASE-006 | GitHub Actions Repository secrets, `.github/workflows/deploy-pages.yml` | EmailJS Service·Template·Public 식별자 3개를 Repository secrets에 저장하고 Pages 빌드 환경에 연결 | 수신 주소 반영 | 통과 |

#### 동일 조건 재검사

| 너비 | 콘텐츠·줄바꿈 | AI 프로젝트·경력 | Contact·EmailJS | 고정 UI 겹침 | 가로 스크롤 | 전체 결과 |
|---:|---|---|---|---|---|---|
| 390px | Hero·섹션 제목·CAR 카드 줄바꿈 통과 | 6개 대표 프로젝트·6개 경력·4개 AI 역량 표시 통과 | 입력 폭 327px·검증·동의·SDK 구성 확인 | 안내 말풍선이 스크롤 후 자동 숨김, 플로팅 버튼은 폼 주요 텍스트를 가리지 않음 | 없음 | 통과 |
| 768px | Hero·카드·섹션 여백 통과 | 대표 CAR 카드 단일열 가독성 통과 | 폼·연락처 카드 너비 통과 | 말풍선 스크롤 숨김 통과 | 없음 | 통과 |
| 1440px | Hero 중앙 정렬·메뉴·지표 통과 | 프로젝트·경력·AI 역량 정보 위계 통과 | 2열 문의 영역과 링크 통과 | 플로팅 버튼이 핵심 CTA와 분리됨 | 없음 | 통과 |

- 프로덕션 빌드: GitHub Pages base(`/portfolio/`) 기준 통과. Hero 대형 배경 이미지를 제거해 기존 약 2.59MB 자산이 배포 번들에서 제외됨.
- 테스트·정적 검사: TypeScript 통과, Vitest 8개 통과, ESLint 오류 0·기존 fast-refresh 경고 8개
- CI 재점검: 최초 Pages run #5에서 문의 폼 테스트가 로컬 `.env.local`에 의존해 실패한 것을 확인했다. `src/test/contact.test.tsx`에 전용 가짜 EmailJS 환경값과 모듈 초기화를 명시한 뒤 TypeScript·Vitest 8개를 다시 통과했다.
- EmailJS 실발송: SDK mock 전송과 GitHub Secrets 연결 통과. 공개 폼은 `EmailJS로 문의 보내기` 상태로 정상 초기화됐다. 자동화 브라우저의 1회 제출은 의도한 `blockHeadless` 방어에 의해 실패 상태와 입력 보존 UI로 처리됐고, 비브라우저 API 확인도 EmailJS 계정의 non-browser API 차단 정책(403)으로 거부됐다.
- 미해결 문제: 실제 Gmail 수신은 일반 사용자 브라우저에서 폼을 1회 제출해 최종 확인해야 한다. 보안 옵션을 낮추거나 non-browser API를 활성화하지는 않았다. Typebot 웹 컴포넌트 청크 약 696KB와 메인 청크 약 1.56MB는 후속 성능 최적화 대상으로 기록한다.
- 배포 가능 여부: `가능`

#### 배포 후 실제 URL 점검

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 URL 로드 | 새 자산 `index-CwL-fBSv.js`, 새 title·Hero 확인 | 통과 | 통과 |
| 전체 콘텐츠·route 새로고침 | `/`, `/p/not-real-slug`, `/admin/links` 통과 | `/` 통과 | `/` 통과 |
| AI 프로젝트·링크 | 6개 대표 프로젝트·6개 경력·4개 AI 역량 표시, ArchiLab이 `https://archi.best/`로 정상 이동 | 통과 | LinkedIn·ArchiLab href와 메뉴 통과 |
| 문의 폼·fallback | EmailJS 설정 인식·입력·동의·오류 시 입력 보존과 직접 메일 링크 통과 | 버튼·폼 너비 통과 | 2열 문의 레이아웃 통과 |
| 콘솔·네트워크 | 신규 렌더링 오류 없음. 자동화 제출은 anti-headless 정책으로 안전하게 실패 처리 | 신규 오류 없음 | 신규 오류 없음 |

- 최종 공개 URL: `https://gmbro.github.io/portfolio/`
- 상태 화면 검증 URL: `https://gmbro.github.io/portfolio/p/not-real-slug`
- 링크 관리 화면: `https://gmbro.github.io/portfolio/admin/links`
- 발행 revision: 기본 포트폴리오 base revision 1 / 콘텐츠 commit `8446f34` / CI fix commit `c7fd46a`
- EmailJS 상태: Service·Template·Public 식별자 GitHub Secrets 연결, 공개 빌드 인식, mock 전송 통과. anti-headless·non-browser API 차단 정책을 유지했으므로 Gmail 실수신만 사용자 일반 브라우저 확인 필요.
- 배포 결과: `성공`
- 남은 낮은 우선순위 항목: 최초 실제 JD 기반 publication 발행, EmailJS Gmail 실수신 1회 확인, 메인·Typebot 청크 코드 분할

### 배포: 2026-08-11 / 문의 CTA·학력 정보 구조 개선 / base revision 2

- 작업 대상 URL: `/`, `/p/:slug`
- 로컬 미리보기 URL: `http://127.0.0.1:8080/`
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: 기본 포트폴리오 base revision 2
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 콘텐츠 변경 범위: 검증된 사실은 유지하고 문의 버튼명과 학력·자격·교육의 정보 구조만 변경

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제·제약 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE2-001 | 390·768·1440px | Contact | 제출 버튼이 `EmailJS로 문의 보내기`처럼 구현 수단을 전면에 노출 | 방문자가 행동 목적보다 기술명을 먼저 읽어 CTA가 길고 딱딱함 | 보통 | 설정·전송 상태와 무관하게 버튼 접근성 이름을 `문의하기`로 통일 | 발견 |
| QA-BASE2-002 | 390·768·1440px | About | 학력 1개, 자격 2개, 교육 2개가 `교육 & 자격` 단일 목록에 혼재 | 정보 유형을 빠르게 구분하기 어렵고 이력서형 스캔 가독성이 낮음 | 높음 | 데이터에 분류값을 추가하고 `학력 / 자격 / 교육` 세 그룹의 세로 구조로 재배치 | 발견 |
| QA-BASE2-003 | 390px | About | 긴 자격명과 연도가 같은 행에서 폭을 경쟁하며 좁아짐 | 자격명·기관·연도를 한 번에 읽기 어렵고 줄바꿈 충돌 위험 | 보통 | 모바일은 제목·연도를 위아래, `sm` 이상은 좌우 정렬 | 발견 |
| QA-BASE2-004 | 390·768·1440px | Typebot·About | 스크롤 이벤트가 자동 표시 타이머보다 먼저 발생하면 안내 말풍선이 뒤늦게 다시 나타남 | 학력 목록과 역량 카드를 가려 사용자가 요청한 가독성을 훼손 | 높음 | Typebot 자동 표시 타이머를 직접 제어해 화면 상단에 머무를 때만 안내 노출 | 발견 |

1차 진단 요약:

- 세 너비 모두 가로 스크롤은 없었지만 단일 목록은 정보 유형의 위계가 부족했다.
- 사용자가 제공한 학교명, 전공, 자격명, 기관, 교육명과 기간은 변경하지 않는다.
- 3열 카드보다 기존 왼쪽 컬럼 안의 세로 그룹이 항목 수 `1/2/2`와 긴 제목에 더 안정적이다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE2-001 | `src/components/Contact.tsx`, `src/test/contact.test.tsx` | EmailJS 설정·fallback·전송 중 상태와 무관하게 버튼명을 `문의하기`로 고정하고, 제출 중에는 disabled·`aria-busy`·로딩 아이콘으로 상태 전달 | 없음 | 통과 |
| QA-BASE2-002 | `src/data/portfolio.ts`, `src/components/About.tsx`, `src/test/portfolio.test.ts` | 각 항목에 `school / certificate / training` 분류를 추가하고 아이콘·그룹 제목·별도 카드로 학력 1개, 자격 2개, 교육 2개를 구분 | 없음 | 통과 |
| QA-BASE2-003 | `src/components/About.tsx` | 모바일은 항목과 연도를 세로 정렬하고 `sm` 이상에서만 좌우 정렬하도록 변경 | 없음 | 통과 |
| QA-BASE2-004 | `src/components/TypebotBubble.tsx`, `src/types/typebot-react.d.ts` | Typebot 내부 자동 타이머 대신 현재 스크롤을 확인하는 직접 타이머를 사용해 상단에서만 안내 표시, 120px 이후에는 예약 취소·즉시 숨김 | 없음 | 통과 |

#### 동일 조건 재검사

| 너비 | 버튼명 | 학력·자격·교육 구분 | 제목·연도 정렬 | 챗봇 겹침 | 가로 스크롤 | 전체 결과 |
|---:|---|---|---|---|---|---|
| 390px | `문의하기` 표시·터치 폭 통과 | 학력·자격·교육 제목과 1/2/2 항목 통과 | 제목·기관·연도가 세로로 분리되어 충돌 없음 | 상단 안내 표시, About 이동 3.2초 후 안내 미표시 확인 | 없음 | 통과 |
| 768px | DOM 이름·폼 폭 통과 | 세 그룹 카드·간격 통과 | 긴 자격명과 우측 연도 충돌 없음 | About 이동 후 안내 미표시 확인 | 없음 | 통과 |
| 1440px | DOM 이름·2열 Contact 통과 | 왼쪽 정보 그룹과 오른쪽 역량 카드 균형 통과 | 그룹 카드 최대 폭·연도 정렬 통과 | About 이동 후 안내 미표시 확인 | 없음 | 통과 |

- 프로덕션 빌드: GitHub Pages base(`/portfolio/`) 기준 통과
- 테스트·정적 검사: TypeScript 통과, Vitest 9개 통과, ESLint 오류 0·기존 fast-refresh 경고 8개
- 미해결 문제: 기능 차단 없음. 플로팅 챗봇 버튼은 고정 UI 특성상 화면 우측 하단을 차지하지만 학력 텍스트·연도·문의 CTA를 가리지 않는 위치에서 확인했다.
- 배포 가능 여부: `가능`

#### 배포 후 실제 URL 점검

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 URL 로드 | 새 자산 `index-BelOvdsM.js` 확인 | 통과 | 통과 |
| `문의하기` 버튼 | DOM 접근성 이름·모바일 폼 CTA 확인 | DOM 이름 확인 | DOM 이름·2열 Contact 확인 |
| 학력·자격·교육 | 세 그룹·1/2/2 항목·모바일 세로 연도 통과 | 그룹 카드·연도 우측 정렬 통과 | 좌측 그룹과 우측 역량 카드 균형 통과 |
| Typebot 안내·겹침 | 상단 2.5초 후 안내 표시, About 이동 후 안내 미표시 확인 | About 이동 후 미표시 | About 이동 후 미표시 |
| 콘솔·네트워크 | 신규 오류 없음 | 신규 오류 없음 | 신규 오류 없음 |

- 최종 공개 URL: `https://gmbro.github.io/portfolio/`
- 발행 revision: 기본 포트폴리오 base revision 2 / Git commit `1bcb3cf`
- 배포 결과: `성공`

### 배포: 2026-08-11 / 대표 프로젝트 수행 주체·기여도 가시성 / base revision 3

- 작업 대상 URL: `/`, `/p/:slug`
- 로컬 미리보기 URL: `http://127.0.0.1:8080/`
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: 기본 포트폴리오 base revision 3
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 콘텐츠 기준 자료: 사용자 제공 경력 원문 및 러닝보드 프로젝트 이미지

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제·제약 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE3-001 | 390·768·1440px | 대표 프로젝트 카드 | 카드 상단에 카테고리와 기간만 있고 수행 회사·조직이 없음 | 프로젝트와 경력 회사의 연결을 빠르게 판단하기 어려움 | 높음 | 카드 상단에 `수행 회사·조직` 전용 메타데이터 추가 | 발견 |
| QA-BASE3-002 | 390·768·1440px | 대표 프로젝트 카드 | 검증된 기여도 수치가 Result·성과 배지에 섞여 있거나 누락됨 | 본인이 맡은 범위와 팀 전체 성과를 구분하기 어려움 | 높음 | 검증된 수치만 `기여도` 배지로 승격하고 중복 성과 배지 제거 | 발견 |
| QA-BASE3-003 | 390px | 대표 프로젝트 카드 | 327px 카드 폭에서 회사명·기여도·기간을 한 행에 배치하면 압축·충돌 위험이 있음 | 긴 수행 주체가 잘리거나 참여율이 다음 행으로 어색하게 밀릴 수 있음 | 보통 | 모바일은 수행 주체와 기여도를 세로 배치하고 `sm` 이상에서 한 행 배치 | 발견 |
| QA-BASE3-004 | 전체 | 참여율 근거 | ArchiLab과 Vision AI의 참여율은 검증 자료에 수치가 없고, NIPA는 수행 회사가 아니라 지원사업 기관임 | 추정 수치나 기관 오표기로 경력 신뢰도가 낮아질 수 있음 | 차단 | 미확인 참여율은 표시하지 않고 `개인 프로젝트`, `NIPA 지원사업`처럼 수행 성격을 사실대로 구분 | 발견 |

1차 진단 요약:

- 390px 카드 폭 327px, 768px 카드 폭 657px, 1440px 2열 카드 폭 628px에서 가로 스크롤은 없었다.
- 셀렉트스타 100%, 스켈터랩스 90%, SK플래닛 100%, 러닝보드 1인 100%는 제공 자료에서 확인됐다.
- ArchiLab과 Vision AI는 수행 성격·지원사업 정보만 공개하고 확인되지 않은 참여율은 임의 생성하지 않는다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE3-001 | `src/data/portfolio.ts`, `src/components/ImageCards.tsx` | 여섯 프로젝트에 `수행 회사 / 수행 주체 / 사업 구분`과 조직명을 구조화하고 제목 직후 메타 카드로 표시 | 검증 자료로 추가 | 통과 |
| QA-BASE3-002 | `src/data/portfolio.ts`, `src/components/ImageCards.tsx`, `src/test/portfolio.test.ts` | 검증된 셀렉트스타 100%, 스켈터랩스 90%, 러닝보드 100%, SK플래닛 100%를 전용 기여도 배지로 승격하고 본문·성과 배지 중복 제거 | 검증 자료로 추가 | 통과 |
| QA-BASE3-003 | `src/components/ImageCards.tsx` | 모바일은 조직·기여도 세로 정렬, `sm` 이상은 좌우 정렬하고 배지에 `shrink-0`·`whitespace-nowrap` 적용 | 없음 | 통과 |
| QA-BASE3-004 | `src/data/portfolio.ts` | ArchiLab은 `개인 프로젝트 · ArchiLab / 기획·MVP 개발`, Vision AI는 `NIPA 지원사업 / 제안→종결 관리`로 표시해 미확인 퍼센트와 수행사 추정 방지 | 검증 자료 범위 정리 | 통과 |

#### 동일 조건 재검사

| 너비 | 수행 주체 표시 | 기여도·역할 범위 | 카드 정렬·간격 | 가로 스크롤 | 전체 결과 |
|---:|---|---|---|---|---|
| 390px | 여섯 카드 조직명·유형 표시 통과 | 세로 배지, 긴 `기획·MVP 개발` 포함 잘림 없음 | 327px 카드 내부 오버플로 없음 | 없음 | 통과 |
| 768px | 여섯 조직명 DOM·시각 확인 | 좌우 한 행 정렬, 100%·90% 및 역할 범위 표시 통과 | 657px 단일열 카드 통과 | 없음 | 통과 |
| 1440px | 셀렉트스타·스켈터랩스 상단 비교 가독성 통과 | 우측 강조 배지 정렬 통과 | 628px 2열 카드 균형 통과 | 없음 | 통과 |

- 프로덕션 빌드: GitHub Pages base(`/portfolio/`) 기준 통과
- 테스트·정적 검사: TypeScript 통과, Vitest 10개 통과, ESLint 오류 0·기존 fast-refresh 경고 8개
- 미해결 문제: 기능 차단 없음. ArchiLab과 Vision AI의 퍼센트 기여도는 확인 자료가 없어 역할 범위로 공개하며, 확인값을 받으면 같은 배지에 교체할 수 있다.
- 배포 가능 여부: `가능`

#### 배포 후 실제 URL 점검

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 URL·revision | 새 자산 `index-By8mfszM.js`, 6개 카드 확인 | 동일 revision 통과 | 동일 revision 통과 |
| 수행 회사·주체 | 여섯 조직명과 `수행 회사 / 수행 주체 / 사업 구분` 확인 | 여섯 조직명 확인 | 2열에서 셀렉트스타·스켈터랩스 비교 확인 |
| 기여도·역할 범위 | 100%·90%·역할 범위 배지, 카드 내부 오버플로 없음 | 메타 한 행 정렬 통과 | 우측 강조 배지 정렬 통과 |
| 콘솔·레이아웃 | 신규 `error` 로그 없음, 가로 스크롤 없음 | 가로 스크롤 없음 | 가로 스크롤 없음 |

- GitHub Actions: `Deploy Portfolio to GitHub Pages #10` 성공
- 최종 공개 URL: `https://gmbro.github.io/portfolio/`
- 발행 revision: 기본 포트폴리오 base revision 3 / Git commit `d7e51fa`
- 배포 결과: `성공`

### 배포: 2026-08-11 / Hero 핵심 지표·AI 챗봇 인지성 개선 / base revision 4

- 작업 대상 URL: `/`, `/p/:slug`
- 로컬 미리보기 URL: `http://127.0.0.1:4173/` (production build)
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: 기본 포트폴리오 base revision 4
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 콘텐츠 기준 자료: 사용자 직접 확인값, 사용자 제공 경력 원문, 현재 대표 프로젝트 데이터

#### 콘텐츠 단계 요약

| 단계 | 결과 |
|---|---|
| 1. 요청 분석 | 채용 담당자가 첫 화면에서 프로젝트 규모·서비스 규모·원가 성과를 확인하고, 챗봇의 기능을 즉시 인지하도록 개선 |
| 2. 증거 구조화 | `2억`은 이번 사용자 직접 확인, `약 350만 MAU`는 SK플래닛 경력 원문, `70%+`는 셀렉트스타 운영 원가 절감 원문에 연결 |
| 3. 콘텐츠 설계 | 사용자가 직접 지정한 `기술로 고객의 문제를 해결하고 성과로 증명합니다.`를 최종안으로 채택하고 의미 확장 없이 세 지표 적용 |
| 4. 웹사이트화 | 공통 기본 Hero·Footer·메타 설명과 챗봇 진입 UI를 수정하고 같은 공개 링크에 base revision 4로 배포 예정 |

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제·제약 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE4-001 | 390·768·1440px | Hero | 첫 번째 지표가 `9년 / 제품·프로젝트 경험`으로 남아 있고 요청한 `2억 / AI 프로젝트 규모`가 없음 | 첫 화면에서 AI 프로젝트 규모를 확인할 수 없음 | 높음 | 사용자가 직접 확인한 값과 라벨로 교체 | 발견 |
| QA-BASE4-002 | 390px | Hero 지표 | 104px 카드 3개가 한 행에 들어가지 못해 `2개 + 1개`로 배치되고 `350만`이 `350 / 만`으로 분리됨 | 세 핵심 수치의 비교·스캔 가독성이 낮음 | 높음 | 모바일 3열 grid, 더 작은 안전 간격·유동 폭·줄바꿈 방지 값 적용 | 발견 |
| QA-BASE4-003 | 전체 | Hero·Footer·메타 | Hero, Footer, OG 설명에 기존 `AI 기술을 사용자 문제와 운영 성과로 연결` 문구가 남아 있음 | 공유 미리보기와 페이지 하단이 새 포지셔닝과 불일치 | 보통 | 사용자 지정 문구 의미로 세 위치를 일관되게 교체 | 발견 |
| QA-BASE4-004 | 390·768·1440px | Typebot | 버튼과 사진의 실제 모서리 반경이 16px인 둥근 사각형이고, 사진만 남으면 기능 설명이 보이지 않음 | 방문자가 인물 사진인지 챗봇 진입점인지 즉시 이해하기 어려움 | 높음 | 완전한 원형 아바타, 채팅 아이콘 배지, 상시 기능 라벨, 한국어 접근성 이름을 가진 자체 트리거 적용 | 발견 |
| QA-BASE4-005 | 전체 | 사실성 | `2억`은 사용자 직접 확인 외 교차 자료가 없고, `350만` 원문에는 `약`, `70%+`는 `운영 원가`로 한정됨 | 금액 성격·정확도·성과 범위를 확대하면 과장 위험 | 차단 | `AI 프로젝트 규모 2억` 이상으로 의미를 확대하지 않고 상세 경력의 `약 350만`, `운영 원가 70%+` 범위 유지 | 발견 |

1차 진단 요약:

- 수정 전 가로 스크롤은 세 너비 모두 없었고, 768·1440px에서는 세 지표가 한 행에 표시됐다.
- Typebot 버튼과 이미지의 계산된 `border-radius`는 모두 `16px`였으며 기본 접근성 이름은 영문 `Open chatbot`이었다.
- 본 작업은 회사별 JD variant가 아닌 기본 포트폴리오의 사용자가 확정한 Hero 수정이므로 `/`를 갱신하고 기존 회사별 데이터 구조는 유지한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE4-001 | `src/types/portfolio.ts`, `src/test/portfolio.test.ts` | Hero 지표를 `2억 / AI 프로젝트 규모`, `350만 / MAU 서비스 운영`, `70%+ / 프로젝트 운영 원가 절감`으로 교체하고 정확한 카피를 테스트로 고정 | 사용자 확인값·검증 자료로 교체 | 통과 |
| QA-BASE4-002 | `src/components/Hero.tsx` | 모바일부터 3열 grid를 사용하고 값 줄바꿈 금지, 유동 카드 폭·간격·타이포 크기를 조정 | 없음 | 통과 |
| QA-BASE4-003 | `src/types/portfolio.ts`, `src/components/Footer.tsx`, `index.html` | Hero, Footer, OG 설명을 `기술로 고객의 문제를 해결하고 성과로 증명`하는 포지셔닝으로 통일 | 사용자 지정 카피 적용 | 통과 |
| QA-BASE4-004 | `src/components/TypebotBubble.tsx`, `src/index.css`, `src/types/typebot-react.d.ts` | Typebot 기본 열기·닫기 기능을 유지한 64px 원형 인물 버튼, 채팅 아이콘과 `경력·프로젝트 Q&A` 기능 라벨, 한국어 접근성 이름 추가 | 없음 | 통과 |
| QA-BASE4-005 | `src/data/portfolio.ts`, `src/components/ui/chart.tsx` | 공식 자격명과 한국어 띄어쓰기를 교정하고 ArchiLab을 검증된 HTTPS로 전환했으며, 사용하지 않는 차트 스타일의 raw HTML 주입을 React 텍스트 노드로 교체 | 경력 수치 변경 없음 | 통과 |
| SEC-BASE4-001 | `supabase/migrations/20260811133000_harden_public_portfolio_access.sql`, `src/pages/CompanyPortfolio.tsx`, `src/lib/database.types.ts` | 익명 테이블 직접 조회와 전체 공개 정책을 제거하고, exact slug의 공개 안전 필드 3개만 반환하는 `SECURITY DEFINER` RPC로 전환 | 공개 링크 정책 유지 | 통과 |
| SEC-BASE4-002 | `src/pages/LinkManager.tsx`, `supabase/config.toml`, Supabase Auth 설정 | OTP의 자동 사용자 생성을 막고 신규 가입을 차단, 소유자 이메일만 초대했으며 배포·로컬 관리 URL을 allow-list로 확인 | 없음 | 통과 |
| SEC-BASE4-003 | `package.json`, `pnpm-lock.yaml`, `vite.config.ts` | React Router 7.18.2와 Vite 6.4.3 보안 수정판으로 갱신하고 개발 서버를 localhost에만 바인딩 | 없음 | 통과 |
| SEC-BASE4-004 | `.github/workflows/deploy-pages.yml` | GitHub Actions의 전역 권한을 제거하고 build·deploy job에 필요한 최소 권한만 부여 | 없음 | 통과 |

#### 동일 조건 재검사

| 너비 | Hero 지표 | 챗봇 UI | 겹침·오버플로 | 가로 스크롤 | 전체 결과 |
|---:|---|---|---|---|---|
| 390px | 104px 카드 3개 한 행, 값·라벨 내부 오버플로 없음 | 64px 원형·기능 라벨 표시, 열기→닫기→재표시 통과 | 지표 하단과 플로팅 UI 사이 11px 이상 간격 | 없음 | 통과 |
| 768px | 195px 카드 3개 한 행, 내부 오버플로 없음 | 원형 반경 `9999px`, 하단 라벨 표시 | 지표 카드와 플로팅 UI 사이 29px 이상 간격 | 없음 | 통과 |
| 1440px | 264px 카드 3개 한 행, 중앙 정렬·내부 오버플로 없음 | 원형 버튼·기능 라벨 우측 하단 정렬 | 콘텐츠와 겹침 없음 | 없음 | 통과 |

- 모바일 챗봇 패널: 390×844px에서 열기·닫기 접근성 이름 전환, 패널 390×704px, 문서 가로 스크롤 없음.
- 공개 라우트 회귀: `/p/not-real-slug`가 DB 오류가 아닌 `유효하지 않은 링크입니다` 화면을 반환.
- 관리자 라우트 회귀: `/admin/links` 390px에서 로그인 폼 정상, Typebot 미노출, 가로 스크롤 없음.

#### 사실·보안·정적 검사

- 사실 확인: `2억`은 이번 사용자 직접 확인값으로만 사용하고 예산·수주액·통화로 확대하지 않았다. `350만` 상세 경력은 원문의 `약 350만 MAU`, `70%+` 상세 성과는 `운영 원가 70% 이상` 범위를 유지했다.
- Supabase 실환경 검증: anon 테이블 SELECT `false`, 기존 공개 정책 `false`, anon/authenticated exact-slug RPC 실행 `true`, `not-real-slug` 반환 `0건`.
- Supabase Auth: 일반 신규 가입 `false`, 수동 계정 연결 `false`, 익명 가입 `false`, 소유자 `gmbro7942@gmail.com` 초대 사용자 생성 확인.
- 의존성 감사: 운영·개발 포함 `critical 0 / high 0 / moderate 0 / low 0`.
- 비밀정보 점검: 추적 파일에서 service-role/private key 패턴 없음, `.env.local`은 gitignore 적용·권한 `600`, 배포 산출물에 `.env`·source map 없음.
- 링크·주입 점검: 외부 새 창 링크 모두 `rel="noreferrer"`, 앱 경로에 사용자 입력 raw HTML 주입 없음. ArchiLab HTTPS는 HTTP 200과 HSTS 응답 확인.
- 오타 점검: 공식 명칭 `Google Project Management Certificate`와 운동 강사·독서 모임·대화 데이터·디지털 휴먼·지원 사업 등 공개 카피 띄어쓰기 교정, 이전 문자열 잔존 없음.
- 프로덕션 검사: TypeScript 통과, Vitest 10개 통과, ESLint 오류 0·기존 fast-refresh 경고 8개, Vite 6 프로덕션 빌드 통과.
- 낮은 우선순위 잔여: 초기 번들 일부가 500kB를 초과하며 추후 코드 분할 가능. GitHub Pages는 사용자 지정 응답 헤더 설정이 제한되므로 CSP 응답 헤더는 별도 호스팅 전환 시 강화 가능.
- 배포 가능 여부: `가능`

#### 배포 후 실제 URL 점검

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 URL·revision | `index-D_ETzTEN.js`, 새 headline·3개 지표 확인 | 동일 revision 통과 | 동일 revision 통과 |
| Hero 지표 | 104px 카드 3개 한 행, 내부 오버플로 없음 | 195px 카드 3개 한 행 | 264px 카드 3개 한 행 |
| Typebot | 64px 원형·기능 라벨, 열기·닫기·재표시 통과 | 원형 버튼·라벨 정렬 통과 | 원형 반경 `9999px` 확인 |
| 가로 스크롤 | 없음 | 없음 | 없음 |
| 공개 RPC 라우트 | `/p/not-real-slug`가 무효 링크 화면 반환 | 동일 | 동일 |
| 카피·링크 | 공식 자격명, 학력·자격·교육 구분, 프로젝트 수행 주체, ArchiLab HTTPS 확인 | DOM 확인 | DOM 확인 |

- GitHub Actions: `Deploy Portfolio to GitHub Pages #12` 성공, run `31497968672`.
- 최종 공개 URL: `https://gmbro.github.io/portfolio/`
- 발행 revision: 기본 포트폴리오 base revision 4 / Git commit `a763f71`
- 배포 결과: `성공`

### 배포: 2026-08-11 / 영문 AI-first 포트폴리오 재구성 / base revision 5

- 작업 대상 URL: `/`, `/p/:slug`
- 로컬 미리보기 URL: `http://127.0.0.1:8080/`
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: 기본 포트폴리오 base revision 5
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 콘텐츠 기준 자료: 사용자 제공 경력 원문, 현재 검증 데이터, 2026.06 Arkylab 최신 경력 이미지
- 적용 범위: 공개 포트폴리오만 영문화. 비공개 `/admin/links` 관리 화면은 기존 한국어 운영 UI 유지

#### 4단계 콘텐츠 설계

이번 작업에는 특정 회사 JD가 제공되지 않았다. 따라서 존재하지 않는 JD 문장을 만들지 않고, 사용자가 지정한 평가자(채용 담당자·대표)가 10초 안에 확인해야 할 공통 채용 신호를 기준으로 기본 포트폴리오를 재구성한다.

##### 1. 요청 분석

| 우선 역량 | 평가자가 먼저 확인할 신호 | 우선 노출 키워드 | 필요한 증거 |
|---|---|---|---|
| AI 제품 설계 | AI 기술을 사용자 흐름·요구사항·MVP로 전환했는가 | AI Product Design | Arkylab, Skelter Labs, Learning Tracker 사례 |
| 데이터·운영 실행 | 복잡한 데이터/운영 구조를 실제로 개선했는가 | Data & Operations | Selectstar 맨먼스 1/10·운영 원가 70%+ |
| AI-assisted MVP 검증 | 직접 작동하는 제품을 빠르게 만들고 실제 사용으로 검증했는가 | AI-assisted MVP Validation | Arkylab beta, OCR 기반 Learning Tracker |
| 프로젝트 리딩 | 제안·일정·산출물·이해관계자를 끝까지 관리했는가 | End-to-end Delivery | Vision AI 7개월, NIPA 조율 |
| 사업화 연결 | 제품을 B2B·B2G·공공조달·보안 요건까지 연결했는가 | Commercial Delivery | GenON SaaS·CSAP·공공조달 경험 |

핵심 Pain Point:

- 최신 AI 제품 구축 경험이 기존 프로젝트 3·4번째와 긴 About 뒤에 묻혀 있다.
- 채용 담당자는 같은 크기의 긴 텍스트 카드 여섯 개를 읽기 전에는 최신성·기여도·성과를 구분하기 어렵다.
- 대표 관점에서는 제품 설계, 운영 개선, 사업화 연결이라는 강점이 여러 섹션에 반복돼 한 문장으로 기억되지 않는다.

##### 2. 역량 구조화

| 경험명 | 맥락 | Challenge | Action | Result | 도구·방식 | 역량 태그 | 한 줄 포지셔닝 | 보강 필요 메모 |
|---|---|---|---|---|---|---|---|---|
| Arkylab AI 기록 솔루션 | 2026.06–현재, 대표 | 운동 강사의 기록·회원 관리 문제 | AI 기록 솔루션 개발·운영, beta 검증 | beta 운영 중 | Codex, Supabase | AI Product Design, MVP Validation | 고객 문제에서 live beta까지 연결한 현재 AI 제품 | 승인된 제품 화면·사용 흐름 필요 |
| Trevari 커뮤니티 AI 솔루션 | 2026.05–현재, Arkylab 내 독립 구축 | 학습 기록 지속성과 성취 확인 | OCR·게이미피케이션 기반 MVP 기획·구현 | 커뮤니티 제공·고도화 준비 | OCR, AI-assisted development | AI-assisted Delivery | 커뮤니티 사용 맥락에 맞춘 AI 도구형 제품 | 화면 공개 범위 확인 |
| Vision AI 품질 검사 | 2025.06–2025.12, 지원 사업 | 수동 outsole 검사 개선 | 제안, 7개월 일정·PoC·산출물·피드백 관리 | 프로젝트 종결·정산 지원 | PoC, stakeholder coordination | End-to-end Delivery | 제안부터 종결까지 관리한 Vision AI 프로젝트 | 실제 수행 회사·허용 가능한 산출물 필요 |
| Selectstar STT 데이터 운영 | 2024.06–2025.01, 기여도 100% | 수작업 전사 인력·반복 작업 | STT 흐름·전후처리·Python 보완·약 200명 운영 설계 | 맨먼스 약 1/10, 운영 원가 70%+ | STT, Python | Data & Operations | AI 데이터 운영 구조로 비용과 시간을 함께 줄인 사례 | before/after workflow 자료 필요 |
| Skelter Labs AI 상담사 PoC | 2021.09–2023.04, 기여도 90% | B2B 챗봇 엔진의 B2C 확장 | STT·TTS·Retrieval, PRD·대화 데이터·제휴 설계 | 0→1 PoC 구축 | STT, TTS, Retrieval | AI Product Design | AI 기술을 사용자 상담 경험으로 전환 | 공개 가능한 flow diagram 필요 |
| Syrup Wallet 운영 | 2018.04–2020.04, 기여도 100% | 푸시 효율·서버 과부하·수작업 | 타기팅·분산 발송·리타기팅 설계 | 수신율 2배, 열람률 1.5배, 운영 1/10 | service operations | Large-scale Operations | 약 3.5M MAU 서비스의 운영을 제품 개선으로 전환 | 상세 baseline 자료는 추가 확인 필요 |

- 동일 경험의 Result를 다른 카드에서 새 성과처럼 중복하지 않는다.
- `2억`은 사용자가 한국어로 직접 확인한 프로젝트 규모이므로 영문 독자가 단위를 오해하지 않게 `₩200M / AI Project Scope`로 표기한다. 예산·계약금·수주액·개별 관리 범위로는 확대하지 않는다.
- Arkylab의 한국어 직함 `대표`는 확인된 소유·운영 책임만 전달하도록 `Owner`로 번역하고, 제품 역할은 설명과 성과 항목에서 증명한다.

##### 3. 콘텐츠 설계 — Hero 3안

| 안 | Headline | Subcopy | 강조 키워드 |
|---|---|---|---|
| 1 (채택) | `I turn AI into products, operating systems, and measurable outcomes.` | `Nine years across AI product planning, data operations, and B2B/B2G commercialization.` / `From 0→1 PoCs to 3.5M-MAU operations and 70%+ cost reduction.` | AI Product Design · Data & Operations · Commercial Delivery |
| 2 | `I build AI products that move from prototype to real-world operation.` | `I connect user problems, technical constraints, and delivery systems.` / `Current work includes live AI product betas at Arkylab.` | 0→1 Product · MVP Validation · Product Operations |
| 3 | `I turn complex technology into products teams can ship and operate.` | `Experience spans AI services, data delivery, SaaS, and public-sector projects.` / `My work is measured in usable products, leaner operations, and business readiness.` | Product Strategy · Project Delivery · Commercialization |

채택 이유: 1안이 AI 제품 설계, 운영 구조, 정량 성과를 한 문장에 묶어 채용 담당자와 대표 모두에게 가장 빠르게 역할과 결과를 전달한다.

##### 4. 웹사이트화

- 공개 정보 구조를 `Hero → Selected Work → AI Capabilities → Experience → Contact form → About → minimal Footer`로 고정한다.
- 프로젝트는 `Arkylab 2026.06 → Learning Tracker 2026.05 → Vision AI 2025.06 → Selectstar 2024.06 → Skelter Labs 2021.09 → SK Planet 2018.04` 순으로 정렬한다.
- 최신 AI 프로젝트 세 개는 강조 카드, 나머지 세 개는 압축 카드로 구분하고 `Headline → Organization/Ownership → Metrics → Problem/Action/Impact` 순으로 읽히게 한다.
- 공개 화면은 다크 뉴트럴 배경, `#FF6645` 성과 강조, 동일 radius·border·padding으로 통일한다.
- 시각 자료는 optional data slot으로 준비하되 자료가 없을 때 빈 박스를 공개하지 않는다. 개발 환경에서만 교체 위치를 안내한다.

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE5-001 | 390·768·1440px | 전체 정보 구조 | `Hero → About → Projects → Marquee → Experience → AI Capabilities → Activities → Contact` 순서이며 최신 증거보다 소개가 먼저 나옴 | 평가자가 현재 AI 제품과 성과를 보기 전에 긴 소개·학력 정보를 통과해야 함 | 차단 | Projects를 Hero 직후로 이동하고 About을 마지막 본문으로 이동, Activities·Marquee 제거 | 발견 |
| QA-BASE5-002 | 390·768·1440px | Selected Projects | 프로젝트가 `2024 → 2021 → 2026 → 2026 → 2025 → 2018` 순으로 섞여 있고 모든 카드가 동일 위계 | 현재 AI 제품이 과거 사례에 묻히며 최신성을 오해할 수 있음 | 차단 | 최신순 재정렬, 최신 3개 강조, 지표를 CAR 앞에 배치 | 발견 |
| QA-BASE5-003 | 전체 | Experience | 최신 Arkylab 경력이 없고 2025.01 GenON이 첫 항목 | 현재 역할과 진행 중인 AI 제품 활동을 확인할 수 없음 | 차단 | 사용자 이미지의 2026.06 Arkylab 대표 경력과 3개 업무를 영문으로 첫 항목에 추가 | 발견 |
| QA-BASE5-004 | 390px | Typebot·Project | `경력·프로젝트 Q&A` 외부 라벨이 첫 프로젝트 카드의 조직·기여도 영역 위를 가림 | 모바일에서 핵심 역할 정보가 가려지고 챗봇 UI가 과도하게 시선을 점유 | 높음 | 외부 라벨 삭제, 원형 Typebot trigger만 유지 | 발견 |
| QA-BASE5-005 | 390·768·1440px | Navbar·Theme | 햇빛 모양 테마 버튼이 남아 있고 localStorage에 따라 공개 페이지 표면 톤이 달라질 수 있음 | 통일된 다크 톤이 보장되지 않음 | 높음 | 버튼·theme toggle 의존 제거, 공개 포트폴리오 다크 테마 고정 | 발견 |
| QA-BASE5-006 | 전체 | 공개 카피 | Hero, Navbar, 프로젝트·경력·Contact·상태 화면·메타데이터에 한국어가 남아 있음 | 영문 포트폴리오 요구를 충족하지 못하고 언어 전환이 중간에 끊김 | 차단 | 공개 UI·상태·ARIA·메타 전체 영문화. 비공개 관리자 화면만 제외 | 발견 |
| QA-BASE5-007 | 전체 | About·Activities·Contact·Footer | 학력·자격·교육, Activities & Awards, Contact 소개 문구·연락 카드, Footer 설명·연락처가 모두 남아 있음 | 핵심 AI 경험보다 보조 정보가 화면 길이와 시선을 차지 | 높음 | 요청 항목 삭제, Contact는 EmailJS form만 유지, Footer는 copyright만 유지 | 발견 |
| QA-BASE5-008 | 390·768·1440px | 시각 톤 | Shader Hero, 검정 Projects, glass 카드, 움직이는 Marquee가 서로 다른 표면·모션 체계를 사용 | 템플릿 조합처럼 보이고 장시간 스캔 시 피로함 | 높음 | 고정 다크 surface·border·accent 체계, 절제된 fade, Marquee 제거 | 발견 |
| QA-BASE5-009 | 전체 | 프로젝트 증거 | 프로젝트 화면·flow·before/after 자료를 넣을 구조가 없음 | 텍스트 주장과 실제 산출물을 연결해 확인하기 어려움 | 보통 | optional visual slot과 개발 전용 placeholder를 추가하고 공개 화면은 자료 없을 때 완성형 유지 | 발견 |

1차 진단 요약:

- 실제 브라우저에서 390px, 768px, 1440px 모두 가로 스크롤은 없었으나 문서 높이가 각각 약 18,044px, 14,828px, 11,180px로 핵심 증거 대비 과도하게 길었다.
- 1440px 첫 프로젝트는 2024 Selectstar, 세 번째에야 2026 Arkylab이 나타났고, 섹션 DOM 순서도 About이 Projects보다 앞이었다.
- 390px에서 Typebot 설명 라벨이 첫 프로젝트 메타 카드와 겹쳤다.
- 수정 후 동일 너비에서 섹션 순서, 최신순, 다크 톤, 영문 잔존, 가로 스크롤, 챗봇 겹침을 다시 검사한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE5-001 | `src/pages/Index.tsx`, `Navbar.tsx` | 정보 구조를 `Hero → Work → AI Capabilities → Experience → Contact → About`으로 변경하고 내비게이션 순서를 일치시킴 | 없음 | 최신 증거 우선 스캔 가능 |
| QA-BASE5-002 | `src/data/portfolio.ts`, `ImageCards.tsx` | 프로젝트를 최신순으로 재정렬하고 상위 3개는 상세, 이전 3개는 native details로 압축. 수행 조직·기여 범위·지표를 CAR보다 먼저 표시 | 기존 검증 사실의 구조만 변경 | 최신 AI 경험과 역할이 즉시 보임 |
| QA-BASE5-003 | `src/data/portfolio.ts`, `Experience.tsx` | Arkylab 2026.06–현재 경력과 사용자 이미지의 3개 업무를 첫 항목에 추가. 최신 3개 경력 상세, 이전 4개 펼쳐보기 처리 | 사용자 이미지 근거만 사용 | 현재 AI 제품 활동을 첫 경력으로 확인 가능 |
| QA-BASE5-004 | `TypebotBubble.tsx`, `index.css` | 외부 Q&A 라벨 삭제, Work·Contact·About·무효 링크에서는 닫힌 launcher 숨김, Skills·Experience에서 56px 원형 노출. 사진 위에 말풍선 glyph 배지 추가. 열린 대화는 Contact로 이동해도 mount 상태 유지 | 없음 | 모바일 핵심 콘텐츠 비가림·기능 인지성·대화 연속성 개선 |
| QA-BASE5-005 | `ThemeProvider.tsx`, `Navbar.tsx`, `sonner.tsx` | 햇빛 버튼과 라이트 전환 제거, 다크 테마 고정 | 없음 | 화면별 톤 일관성 확보 |
| QA-BASE5-006 | 공개 컴포넌트·페이지·`index.html` | 공개 UI, 상태, ARIA, SEO 메타를 영어로 통일. 비공개 `/admin/links`는 한국어 유지 | 번역만 수행 | 공개 메인 번들 한국어 0건 |
| QA-BASE5-007 | `About.tsx`, `Contact.tsx`, `Footer.tsx` | 학력·자격·교육, Activities, Contact 소개·연락 카드, Footer 설명·연락처 제거. EmailJS form과 최소 copyright만 유지 | 없음 | 보조 정보가 핵심 AI 증거를 가리지 않음 |
| QA-BASE5-008 | Hero·Work·Experience·Capabilities·About | Shader·Marquee 제거, `#070707/#111111/#FF6645` surface·accent 체계와 절제된 fade로 통일 | 없음 | 템플릿 혼합감·불필요 모션 감소 |
| QA-BASE5-009 | `FeaturedProjectVisual`, `ProjectVisual` | Arkylab, Learning Tracker, Vision AI, STT에 optional image/video slot과 필수 alt 추가. 자료가 없으면 production에서 박스를 렌더링하지 않음 | 없음 | 자료 제공 전에도 완성형, 제공 후 증거 확장 가능 |
| QA-BASE5-010 | `Index.tsx`, `App.tsx`, `Hero.tsx`, `Navbar.tsx` | skip link·main landmark·Hero 접근성 이름·reduced-motion·44px 모바일 메뉴 타깃 추가 | 없음 | 키보드·스크린리더·모션 민감 사용자 접근성 개선 |
| QA-BASE5-011 | `Contact.tsx`, `LinkManager.tsx` | 문의 payload에서 page URL·전송 시각 제거, delivery 실패일 때만 mail fallback 노출. 관리자 이탈 시 title·robots 복원 | 개인정보 최소화 | 회사별 slug 전송 방지·SPA 메타 회귀 방지 |
| QA-BASE5-012 | `portfolio.ts` | 공식 영문명 `GenON`, `FIXNESS`, `HEALTHBOYGYM` 교정. Learning Tracker 수행 주체를 `Arkylab · Independent build`로 명시 | 사용자 자료·공식 표기와 일치 | 고유명사와 프로젝트 귀속 명확화 |
| QA-BASE5-013 | `Hero.tsx`, `Experience.tsx`, `Leadership.tsx`, `Contact.tsx` | Hero `2억`을 단위가 명확한 `₩200M`으로 번역하고 390px 내부 오버플로를 제거. 작은 보조 텍스트 대비를 white 55%로 상향 | 사용자 확인값의 단위 명시 | 영문 신뢰도·WCAG 일반 텍스트 대비 개선 |

#### 동일 조건 재검사

| 너비 | 텍스트·줄바꿈 | optional visual | 버튼·CTA | 카드·간격·패딩 | 가로 스크롤 | 모바일 hover | 전체 결과 |
|---:|---|---|---|---|---|---|---|
| 390px | Hero·프로젝트·경력·Contact·About 영문 줄바꿈 통과 | production placeholder 0개 | CTA·모바일 메뉴·Contact target 44px 이상 | 프로젝트 327px, Contact form right 351/375px, 이전 Work·경력 details 압축 | 없음 (`scrollWidth 375 = clientWidth 375`) | 고정 hover 없음 | 통과 |
| 768px | Hero headline·subcopy·지표 라벨 통과 | production placeholder 0개 | Hero CTA·Contact·menu 통과 | 지표 각 208px, 전체 surface·gap 일관 | 없음 (`scrollWidth 753 = clientWidth 753`) | 해당 없음 | 통과 |
| 1440px | Work 제목·조직·기여 범위·CAR 통과 | production placeholder 0개 | 상단 nav·Contact·외부 링크 통과 | 상위 3개 1280px, 압축 3개 각 411px·동일 높이 620px | 없음 (`scrollWidth 1425 = clientWidth 1425`) | 해당 없음 | 통과 |

- 수정 전 대비 문서 높이: 390px `18,044 → 15,081`, 768px `14,828 → 12,430`, 1440px `11,180 → 9,585`.
- 섹션 DOM 순서: `hero → case-studies → skills → experience → contact → about`.
- 프로젝트 순서: `Arkylab 2026.06 → Learning Tracker 2026.05 → Vision AI 2025.06 → Selectstar 2024.06 → Skelter Labs 2021.09 → SK Planet 2018.04`.
- Typebot: 390px에서 56×56px, radius `9999px`, 말풍선 glyph 표시. Work·Contact·About·무효 링크에서는 닫힌 launcher 숨김, Experience에서 콘텐츠와 겹침 없음. 열린 상태로 Contact 이동 시 `Close chatbot`과 대화 mount 유지, 닫으면 launcher 숨김.
- 모바일 내비게이션: 5개 항목, Contact 중복 0, 각 target 높이 44px.
- 무효 공개 route: `/p/not-real-slug`가 영문 invalid 화면, `noindex, nofollow`, 가로 스크롤·Typebot 없음.
- 비공개 관리자 route: 390px 가로 스크롤·Typebot 없음. 이탈 cleanup에서 기존 title·robots 복원.
- Hero 첫 지표: 390px에서 `₩200M`, value `scrollWidth 86 = clientWidth 86`, 문서 가로 오버플로 0.
- 프로덕션 빌드: Vite 6.4.3 통과. 초기 index 520.60kB, Typebot web 697.83kB로 chunk-size 경고만 존재.
- 테스트·정적 검사: TypeScript 통과, Vitest 11/11, ESLint 오류 0·기존 UI fast-refresh 경고 7, `git diff --check` 통과.
- 사실·보안 검사: 공식 브랜드 표기 교정, public main bundle 한국어 0건, raw HTML/eval·client-controlled recipient·service-role/private key 없음, `.env.local` ignore, dist env/source map 없음.
- EmailJS: 로컬 3개 공개 식별자와 GitHub Actions secret 이름 연결 확인. 수신 주소는 client payload에 포함하지 않고 EmailJS template에 고정하는 구조 유지.
- 외부 설정 보강 필요: Typebot 편집 화면은 현재 로그아웃 상태라 bot 내부의 한국어 greeting·input placeholder·기본 한국어 답변 규칙은 이번 코드 배포에서 변경하지 못했다. 공개 페이지 shell은 영어이며 Typebot flow 영문화는 Typebot 로그인 후 별도 수정이 필요하다.
- 사실 범위: Hero `₩200M / AI Project Scope`는 사용자 직접 확인값 `2억`의 영문 표기이며, 예산·계약금·수주액·개별 관리 범위로는 확대하지 않는다.
- 시각 자료 제공 슬롯:
  - Arkylab: 제품 화면, 강사 기록 workflow, beta learning snapshot.
  - Learning Tracker: OCR capture → parsed record → gamification/community screen.
  - Vision AI: 허용 가능한 inspection workflow, PoC 산출물, 7개월 timeline.
  - STT: before/after workflow, 운영 화면, 1/10·70%+ 근거 자료.
  - 권장 형식: 1600×1000 WebP/AVIF 350kB 이하 또는 15–20초 무음 WebM/MP4 8MB 이하와 poster. 고객·개인정보·내부정보 제거 및 공개 허용 확인 필수.
- 배포 가능 여부: `가능` — 코드·레이아웃 차단 없음. Typebot 내부 언어는 외부 계정 설정 후 후속 보강.

#### 배포 후 실제 URL 점검

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 asset revision | `index-Bpcthuwg.js` / `index-SP_i0-K6.css` | 동일 | 동일 |
| 레이아웃·가로 스크롤 | `375 = 375`, 문서 높이 15,082px | `753 = 753`, 문서 높이 12,430px | `1425 = 1425`, 문서 높이 9,585px |
| 프로젝트 최신순·영문 | 6개 기간 최신순, 공개 한국어 0, visual placeholder 0 | 공개 한국어 0, Hero 지표 각 208px | Arkylab 첫 카드, 상위 3개 1280px·이전 3개 각 411px |
| Typebot·Contact 겹침 | Experience 56px 원형, 열린 대화 Contact 이동 후 유지, 닫으면 launcher 숨김, form right 351/375px | Hero·Work launcher 숨김 | Work launcher 숨김 |
| `/p/not-real-slug` | 새로고침 후 영문 invalid 화면, `noindex, nofollow`, Typebot 없음 | 동일 route 동작 확인 | 동일 route 동작 확인 |

- Hero CTA: 실서비스 390px에서 클릭 후 `scrollY 898.5`, Work top `80.07px`로 정상 이동.
- 실서비스 로그: `https://gmbro.github.io/portfolio/` 범위 console error/warn `0건`.
- GitHub Actions: `Deploy Portfolio to GitHub Pages` run `31503115896` build·deploy 성공 — `https://github.com/gmbro/portfolio/actions/runs/31503115896`.
- 최종 공개 URL: `https://gmbro.github.io/portfolio/`
- 발행 revision: 기본 포트폴리오 base revision 5 / Git commit `90607d8`
- 배포 결과: `성공`

---

### 2026-08-12 / 공개 포트폴리오 한국어 전환 / base revision 6

#### 1단계 — 요청·평가 신호 분석

이번 요청은 특정 회사 JD 맞춤 발행이 아니라, base revision 5의 최신 AI 중심 구조를 유지하면서 공개 포트폴리오 언어를 영어에서 한국어로 되돌리는 작업이다. 존재하지 않는 JD 문장을 만들지 않고, 기존에 검증된 경력·수치·프로젝트 귀속만 한국어로 다시 표현한다.

| 우선 역량 | 평가자가 먼저 확인할 신호 | 한국어 우선 키워드 | 증거 유형 |
|---|---|---|---|
| AI 제품 설계 | 고객 문제를 작동하는 제품과 MVP로 전환했는가 | AI 제품 설계 | Arkylab AI 기록 솔루션, AI 상담사 PoC |
| 데이터·운영 실행 | 복잡한 데이터·운영 구조를 정량 성과로 개선했는가 | 데이터·운영 | STT 맨먼스 약 1/10, 운영 원가 70%+ |
| 프로젝트 리딩 | 제안부터 실행·검수·종결까지 책임졌는가 | 프로젝트 전 과정 관리 | Vision AI 7개월 프로젝트 |
| 사업화 연결 | AI·SaaS 제품을 B2B·B2G 운영과 사업 요건에 연결했는가 | 사업화·제품 운영 | GenON SaaS·공공조달·보안 경험 |

핵심 Pain Point:

- 현재 라이브 사이트는 공개 가시 텍스트의 한국어가 0건이며, `lang=en`, 영문 SEO 메타와 영문 오류·문의 상태를 사용한다.
- Typebot은 한국어 안내·응답을 사용해 공개 사이트 본문과 챗봇의 언어가 서로 다르다.
- 구조와 최신순은 이미 채용 관점에 맞게 정리되어 있으므로, 정보 구조를 다시 흔들지 않고 언어와 줄바꿈만 정교하게 교정해야 한다.

#### 2단계 — 역량 구조화 원칙

- base revision 5의 최신순 프로젝트와 경력 순서, 수행 조직, 기여 범위, 정량 결과를 그대로 유지한다.
- `2억`, `350만 MAU`, `70%+`는 사용자가 확인한 한국어 표기로 되돌리며 예산·수주액 등 확인되지 않은 의미로 확장하지 않는다.
- 브랜드명 `Arkylab`, `GenON`, `FIXNESS`, `HEALTHBOYGYM`, `CESK`는 공식 표기를 유지하고 설명만 한국어로 쓴다.
- Problem–Action–Impact 구조는 `문제–실행–성과`로 번역하며, 결과가 약한 경험도 삭제하거나 과장하지 않는다.

#### 3단계 — Hero 콘텐츠 3안

| 안 | 헤드라인 | 서브카피 방향 | 강조 키워드 |
|---|---|---|---|
| 1 (채택) | `기술로 고객의 문제를 해결하고 성과로 증명합니다.` | AI 서비스 기획·데이터 운영·사업화를 연결한 9년의 경험과 정량 결과 | AI 제품 설계 · 데이터·운영 · 사업화·프로젝트 관리 |
| 2 | `AI를 실제로 쓰이는 제품과 운영 체계로 만듭니다.` | 현재 제품 beta와 실행 역량을 우선 강조 | 0→1 제품 · MVP 검증 · 제품 운영 |
| 3 | `복잡한 기술을 팀이 실행할 수 있는 제품으로 바꿉니다.` | 기술·사용자·사업 요건 사이의 연결 역할 강조 | 제품 전략 · 프로젝트 실행 · 사업화 |

채택 이유: 1안은 사용자가 이전에 직접 승인한 문구이며, 직함 소개보다 문제 해결 방식과 검증된 결과를 먼저 보여준다.

#### 4단계 — 웹사이트 적용 범위

- 정보 구조는 `Hero → 대표 프로젝트 → AI 역량 → 경력 → 문의 → 소개`를 유지한다.
- Navbar, Hero, 프로젝트, 역량, 경력, 문의 폼, 소개, Footer, 오류·로딩 화면, 접근성 이름, SEO 메타를 한국어로 통일한다.
- 프로젝트·경력은 최신순을 유지하고, 상위 3개 상세·이전 항목 압축 구조와 optional visual slot을 보존한다.
- EmailJS·Supabase·Typebot 연동, 개인정보 최소화, 링크 정책, 반응형 동작은 변경하지 않는다.

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE6-001 | 390·768·1440px | 공개 UI 전체 | 직전 배포본이 `lang=en`, 영문 Hero·프로젝트·경력·문의·소개·상태 문구를 사용 | 한국어 지원용 포트폴리오 요구와 불일치 | 차단 | 공개 텍스트·상태·ARIA·메타 전체 한국어화 | 발견 |
| QA-BASE6-002 | 전체 | Hero | 영문 헤드라인과 `₩200M / AI Project Scope` 지표가 표시 | 이전에 승인한 한국어 포지셔닝과 지표 표현이 사라짐 | 높음 | 승인된 한국어 Hero와 `2억 / AI 프로젝트 규모` 등으로 복원 | 발견 |
| QA-BASE6-003 | 전체 | Typebot·본문 | Typebot은 한국어 흐름인데 본문은 영어 | 상호작용 진입 전후 언어 경험이 단절됨 | 높음 | 본문·상태·접근성 이름을 한국어로 통일 | 발견 |
| QA-BASE6-004 | 390·768·1440px | 줄바꿈·카드 | 영문에 맞춘 카드 높이와 텍스트 길이가 한국어 전환 후 달라질 수 있음 | 모바일 오버플로·카드 높이 불균형 가능 | 높음 | 390·768·1440px 동일 조건 재검사 후 직접 수정 | 발견 |

수정 전 실서비스 기준:

- 실서비스 asset은 base revision 5와 동일하며, 이전 배포 점검값은 390px `375=375`, 768px `753=753`, 1440px `1425=1425`로 가로 스크롤이 없었다.
- 이번 수정 직전 브라우저 1280px 재검사에서 `lang=en`, 공개 한국어 0건, `scrollWidth 1265 = clientWidth 1265`, 문서 높이 9,808px를 확인했다.
- 섹션 순서는 `case-studies → skills → experience → contact → about`, 프로젝트는 2026 → 2026 → 2025 → 2024 → 2021 → 2018로 최신순이었다.
- 변경 후 동일 너비에서 텍스트 오버플로, 이미지 잘림, 버튼 정렬, 카드 간격, 섹션 패딩, 가로 스크롤, 모바일 hover 잔존을 다시 검사한다.

#### 직접 수정

| 범위 | 실제 수정 | 사실 변경 여부 |
|---|---|---|
| 기본 데이터·Hero | 직함, 승인 헤드라인, 서브카피, 지표, 최신순 프로젝트·경력, 문제–실행–성과, 수행 조직·기여 범위를 한국어화 | 기존 검증값 유지. `2억`은 사용자 직접 확인값이며 통화·수주액 등으로 확대하지 않음 |
| 공개 UI | Navbar, Hero, 대표 프로젝트, AI 역량, 경력, 문의, 소개, Footer와 접근성 이름을 한국어화 | 사실 변경 없음 |
| 오류·SEO | 맞춤 링크 로딩·무효·일시 중단·만료 상태, 404, Supabase 설정 오류, `lang=ko`, title·description·OG·Twitter 메타를 한국어화 | 라우트와 noindex 정책 유지 |
| 문의 폼 | 버튼명 `문의하기`, 필드·검증·성공·실패·개인정보 안내를 한국어화 | EmailJS 수신자는 클라이언트가 지정하지 않는 기존 보안 구조 유지 |
| Typebot | 공개 런처의 접근성 이름을 `챗봇 열기/닫기`, 미리보기 닫기와 프로필 대체 텍스트를 한국어화 | Typebot flow와 API 설정 변경 없음 |
| 문장·사실 보정 | 한국어 줄바꿈에 `break-keep` 적용, Vision AI의 미확인 일정 조율 표현 제거, CSAP 범위를 최종 인증 성과로 오해하지 않도록 문구 교정, AI 도구 활용 역할을 명확히 함 | 과장 표현 축소 |
| 테스트 | Hero·프로젝트·경력·문의 폼 테스트를 한국어 기대값으로 갱신 | 최신순, 조직·기여도, EmailJS `to_email` 미전송 회귀 검사 유지 |

#### 동일 조건 재검사

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 content width | `373 = 373`, 가로 오버플로 0 | `751 = 751`, 가로 오버플로 0 | `1423 = 1423`, 가로 오버플로 0 |
| 문서 높이 | 13,560px | 11,201px | 9,205px |
| Hero 지표 | `2억`·`350만`·`70%+`, 각 카드 내부 오버플로 0 | 3개 지표 정상 정렬 | 3개 지표 정상 정렬 |
| 최신순·구조 | 6개 프로젝트 `2026.06 → 2026.05 → 2025.06 → 2024.06 → 2021.09 → 2018.04` | 동일 | 동일 |
| 메뉴·터치 | 모바일 메뉴 5개, 토글·항목 모두 높이 44px | 모바일 메뉴 높이 44px | 데스크톱 메뉴 40px, 문의 CTA 44px |
| Typebot·문의 | 경력 구간 56px 원형·`챗봇 열기/닫기`, 열린 대화는 문의 이동 후 유지, 닫으면 문의 구간 launcher 숨김, 폼 폭 325px | Hero·프로젝트 구간 launcher 숨김 | Hero·프로젝트 구간 launcher 숨김 |

- 한국어 카드 줄바꿈에서 한 글자만 고립되는 문제를 확인해 주요 제목·본문에 `break-keep`를 적용하고 같은 세 너비에서 다시 확인했다.
- Hero CTA 클릭 후 대표 프로젝트가 상단 80px 위치에 정렬되며, 모바일 메뉴의 경력 이동도 상단 80px에 정상 정렬된다.
- `/p/not-real-slug`는 `유효하지 않은 링크입니다`, `noindex, nofollow`, `lang=ko`로 표시되고 공개 챗봇 런처는 노출되지 않는다.
- 로컬 프로덕션 preview의 console error/warn은 0건이다.
- TypeScript 통과, Vitest 11/11, ESLint 오류 0·기존 UI fast-refresh 경고 7, `git diff --check` 통과.
- `pnpm audit --prod`: 알려진 취약점 0건. `.env.local`은 git ignore·권한 600, dist source map 0개, service-role/private key 0건.
- 외부 `https://archi.best/`는 실제 로드되며 제목 `Archi - Fitness Asset Platform`과 한국어 AI 기록 제품 화면을 확인했다.
- 배포 가능 여부: `가능`. 기존 회사별 publication은 Supabase 관리 토큰이 로컬에 없어 목록 조회하지 못했으므로, 활성 회사별 링크가 있다면 해당 저장 revision의 언어는 별도 확인 대상이다.

#### 배포 후 실제 URL 점검

- GitHub Actions `Deploy Portfolio to GitHub Pages` 실행 `31568266505`의 build 40초·deploy 11초가 모두 성공했다.
- 배포 커밋: `9df3a56` (`feat: restore Korean portfolio experience`).
- 실제 공개 URL: `https://gmbro.github.io/portfolio/`.
- 라이브 main asset: `index-D2dmezsB.js`; `lang=ko`, title `이경민 | AI 프로덕트·프로젝트 매니저`.
- 라이브 Hero에서 승인 헤드라인, `2억`·`350만`·`70%+` 지표와 최신순 프로젝트 6개를 확인했다.
- 모바일 라이브 메뉴는 `대표 프로젝트·AI 역량·경력·문의·소개`로 노출되고, 경력 구간의 `챗봇 열기/닫기` 상호작용이 정상이며 console error/warn은 0건이다.
- 라이브 `/portfolio/p/not-real-slug` 직접 새로고침은 한국어 무효 링크 화면, `lang=ko`, `noindex, nofollow`, console error/warn 0건으로 확인했다.
- 배포 결과: `성공` — 기본 공개 포트폴리오 base revision 6.

---

### 2026-08-12 / 프로덕트 매니저 서사 재구성 / base revision 7

#### 1단계 — 채용 신호 분석

특정 JD 맞춤이 아니라 기본 포트폴리오의 PM 포지셔닝을 명확히 하는 작업이다. 사용자가 원하는 채용 신호는 `고객 문제를 발견하고 제품으로 해결하며 실제 사용과 지표로 검증하는 프로덕트 매니저`이다.

| 우선순위 | 핵심 역량 | 평가자가 확인할 신호 | 포트폴리오 키워드 | 필요한 증거 | 근거 강도 |
|---:|---|---|---|---|---|
| 1 | 고객 문제 정의·제품 가설 | 기능이 아니라 어떤 고객 문제에서 출발했는가 | 고객 문제 정의 | Arkylab 문제 발견·실사용 베타 | 강함 |
| 2 | 0→1 제품 설계·실행 | 기술을 사용자 흐름·PRD·작동하는 제품으로 만들었는가 | 0→1 제품 설계 | Skelter Labs AI 상담사 PoC, Arkylab MVP | 강함 |
| 3 | 운영 데이터 기반 개선 | 출시·운영 이후 지표를 제품 개선으로 연결했는가 | 데이터 기반 개선 | SK Planet 350만 MAU·수신율 2배·운영시간 1/10 | 강함 |
| 4 | 복잡한 운영 구조 개선 | 기술과 운영 구조를 바꿔 정량 결과를 만들었는가 | 운영 시스템 개선 | Selectstar 원가 70%+·맨먼스 약 1/10 | 강함 |

핵심 Pain Point:

- Hero에서 `AI·데이터·사업화·프로젝트`가 동급으로 노출되어 PM·PMO·데이터 운영·사업개발 중 무엇을 채용해야 하는 사람인지 수렴되지 않는다.
- 프로젝트, AI 역량, 경력에서 같은 사례를 반복해 설명하고 실제 이미지가 없어 PM의 판단보다 수행 범위 나열로 읽힌다.
- 최신순 상위 3개 중 독서 MVP와 Vision AI가 큰 카드로 노출되고, 전형적인 PM 증거인 Skelter Labs 0→1과 SK Planet 제품 개선은 접혀 있다.

#### 2단계 — 역량 구조화·증거 매칭

| PM 역량 | 대표 경험 | Challenge | Action | Result | 노출 위계 | 보강 필요 |
|---|---|---|---|---|---|---|
| 문제 정의→제품 검증 | Arkylab | 운동 강사의 기록·회원 관리 어려움 | MVP 구현, 데이터 구조화, 실제 수업 사용 | 실사용 베타 운영 | 플래그십 1 | 제품 화면·사용 흐름·베타 근거 |
| 0→1 제품 설계 | Skelter Labs | B2B 엔진을 B2C AI 상담 경험으로 전환 | 기술 연결, 서비스 범위·대화 흐름·PRD·와이어프레임 | 0→1 PoC 구축 | 대표 사례 2 | 공개 가능한 화면·사용자 여정 |
| 대규모 제품 개선 | SK Planet | 푸시 효율·서버 과부하·수작업 운영 | 타기팅·분산발송·리타기팅 기획 | 수신율 2배·열람률 1.5배·운영시간 1/10 | 대표 사례 3 | 기준 기간·전후 차트 |
| 운영 시스템 개선 | Selectstar | 반복적인 수작업 음성 전사 | STT·Python·품질 운영 구조 설계 | 원가 70%+·맨먼스 약 1/10 | 보조 정량 사례 | 산정 범위·전후 프로세스 |
| 빠른 MVP 실행 | 학습 기록 관리 | 지속적인 학습 기록·참여 흐름 필요 | OCR·AI 도구·게이미피케이션으로 1인 구현 | 커뮤니티 제공 | 추가 프로젝트 | 실제 화면·사용/후속 근거 |
| 프로젝트 종결 관리 | Vision AI | 수작업 품질 검사 개선 사업 수행 | 제안·보고·PoC·피드백·산출물 조율 | 종결·정산 지원 | 추가 프로젝트 | 제품 결과보다 PMO 근거가 강함 |

#### 3단계 — Hero 콘텐츠 3안

| 안 | 헤드라인 | 서브카피 방향 | 강조 키워드 3개 | 연결 경험 | 판단 |
|---|---|---|---|---|---|
| 1 (채택) | `고객의 문제를 제품으로 해결하고, 실제 사용과 성과로 검증합니다.` | 350만 MAU 운영·AI 상담사 0→1·현재 AI 제품 베타를 하나의 PM 생애주기로 연결 | 고객 문제 정의 · 0→1 제품 설계 · 데이터 기반 개선 | Arkylab·Skelter Labs·SK Planet·Selectstar | PM 정체성과 검증 근거가 가장 빠르게 연결됨 |
| 2 | `고객의 문제에서 시작해, 쓰이는 제품을 만듭니다.` | 문제 발견과 실사용에 집중 | 문제 발견 · MVP 구축 · 실사용 검증 | Arkylab·학습 기록 MVP | 현재 제품은 강하지만 과거 대규모 성과가 약하게 보임 |
| 3 | `제품의 전 과정을 설계하고, 운영 데이터로 개선합니다.` | 정의·출시·운영의 전 과정 강조 | 제품 전략 · 운영 설계 · 성과 개선 | Skelter Labs·SK Planet·Selectstar | 명확하지만 고객 문제 관점이 1안보다 약함 |

선택안 1은 직무 범위를 나열하지 않고 `문제→제품→사용·성과`라는 PM의 반복 가능한 방식을 먼저 보여준다. `2억`은 어느 프로젝트·책임 범위인지 화면에서 역추적되지 않아 Hero에서 제외하고, 확인 가능한 `0→1·350만·70%+`로 교체한다.

#### 4단계 — 웹사이트 적용 계획

- 구조: `Hero → PM 증거 보드 → 대표 PM 사례 → PM 역량 → 압축 경력 → 문의 → 소개`.
- 대표 사례 순서: `Arkylab → Skelter Labs → SK Planet → Selectstar → 학습 기록 MVP → Vision AI`. 대표 사례는 검증력 순, 경력은 최신순을 유지한다.
- AI 도구·B2B·B2G·보안 인증은 정체성이 아니라 제품 실행을 지원한 보조 경험으로 내린다.
- 실제 이미지가 아직 없으므로 비어 있는 박스를 배포하지 않고, 기존 Arkylab URL만 공개한다. 이후 `제품 URL·화면·PM 산출물·전후 성과 차트·자격증`을 증거 배열로 확장한다.

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE7-001 | 390·768·1440px | Hero | AI·데이터·사업화·프로젝트 신호와 `2억`이 동급 노출 | 어떤 PM인지 5초 안에 수렴되지 않음 | 높음 | PM 방식 중심 Hero와 역추적 가능한 3개 증거로 재작성 | 발견 |
| QA-BASE7-002 | 전체 | 대표 프로젝트 | 상위 3개가 최신순이라 강한 PM 사례가 접힌 하단에 위치 | 0→1·대규모 제품 개선 역량을 늦게 확인 | 높음 | 대표 사례는 PM 검증력 순으로 재배치 | 발견 |
| QA-BASE7-003 | 전체 | AI 역량·경력 | 같은 경험을 프로젝트·역량·경력에서 반복 | 제너럴리스트 인상과 긴 탐색 시간 | 높음 | AI 역량을 PM 3축으로 좁히고 경력 상세 노출 축소 | 발견 |
| QA-BASE7-004 | 390px | 전체 | 문서 13,491px, 프로젝트 4,827px·AI 역량 2,259px·경력 3,449px | 모바일 이탈 가능성 증가 | 높음 | 증거 보드 4행, 대표 3개만 상세, 기타·경력 접기로 압축 | 발견 |
| QA-BASE7-005 | 768px | 전체 | 문서 11,470px, 같은 근거 반복 | 태블릿 스캔 효율 저하 | 보통 | 2×2 증거 보드와 사례 위계 적용 | 발견 |
| QA-BASE7-006 | 1440px | 전체 | 문서 9,193px, 텍스트 카드 중심 | PM 판단을 시각적으로 빠르게 비교하기 어려움 | 보통 | 증거 보드 4열과 PM 사례 중심 계층 적용 | 발견 |

수정 전 반응형 측정:

- 390px: `scrollWidth 375 = clientWidth 375`, 프로젝트 순서 `Arkylab → 학습 기록 MVP → Vision AI`, 가로 오버플로 0.
- 768px: `scrollWidth 753 = clientWidth 753`, 문서 11,470px, 가로 오버플로 0.
- 1440px: `scrollWidth 1425 = clientWidth 1425`, 문서 9,193px, 가로 오버플로 0.

#### 직접 수정

| 범위 | 실제 수정 | 사실 변경 여부 |
|---|---|---|
| Hero·SEO | 직함을 `프로덕트 매니저`로 수렴하고 `고객 문제→제품→실사용·성과` 서사, `0→1·350만·70%+` 지표와 동일한 검색·공유 메타로 변경 | 기존 검증값만 사용. 프로젝트·책임 범위가 연결되지 않은 `2억`은 Hero에서 제외 |
| PM 증거 보드 | Hero 직후 `고객 문제 발견→제품 정의·0→1→운영·성장→측정·개선` 4단계 보드 추가, 각 단계를 실제 대표 사례 앵커에 연결 | Arkylab·Skelter Labs·SK Planet·Selectstar의 기존 사실만 재구조화 |
| 대표 PM 사례 | `Arkylab→Skelter Labs→SK Planet→Selectstar→학습 기록 MVP→Vision AI` 순서로 재배열하고 프로젝트별 고유 id 추가 | 시간순 경력을 변경하지 않고, 대표 사례만 PM 검증력 순으로 변경 |
| 콘텐츠 위계 | 첫 사례만 문제·실행·성과를 펼쳐 두고 나머지는 접기, AI 역량을 PM 3축으로 교체, 도구·CSAP 보조 블록 제거, 현재 Arkylab 경력만 펼침 | 경력·프로젝트 원문 수치와 수행 조직·기여 범위 유지 |
| 소개·내비게이션 | 소개를 `문제 정의→제품 설계→성과 검증` 방식으로 정리하고 메뉴를 `대표 PM 사례·PM 역량`으로 변경 | 사실 변경 없음 |
| 반응형·접근성 | 증거 보드 390px 1열·768px 2열·1440px 4열, 44px 터치 타깃, 키보드 포커스, reduced-motion 앵커 이동 적용 | 사실 변경 없음 |
| 시각 증거 | 자료가 없는 개발용 placeholder는 프로덕션에서 숨기고 Arkylab 기존 라이브 URL만 유지 | 사용자 자료 없이 화면·인용·수치를 새로 만들지 않음 |

#### 동일 조건 재검사

| 항목 | 390px | 768px | 1440px |
|---|---:|---:|---:|
| 실제 content width | `375 = 375`, 가로 오버플로 0 | `753 = 753`, 가로 오버플로 0 | `1425 = 1425`, 가로 오버플로 0 |
| 문서 높이 | 13,070px | 11,667px | 9,360px |
| PM 증거 보드 | 1열·4개 | 2×2·4개 | 4열·4개 |
| 대표 사례 순서 | Arkylab→Skelter Labs→SK Planet→Selectstar→학습 기록→Vision AI | 동일 | 동일 |
| 모바일 메뉴 타깃 | 44×44px | 44×44px | 데스크톱 메뉴 전환 |

- Hero, PM 증거 보드, 대표 PM 사례, PM 역량, 최신순 경력, 문의, 소개 순서를 세 너비에서 확인했다.
- PM 증거 보드의 `제품 정의·0→1`을 선택하면 `#skelter-ai-counselor`로 이동하고 카드 상단이 78px에 정렬된다.
- 390px에서 제목·지표·증거 배지·카드·폼의 텍스트 오버플로와 가로 스크롤이 없고, 768px·1440px에서도 같은 결과를 확인했다.
- `/p/not-real-slug`는 한국어 무효 링크 화면과 `noindex, nofollow`를 유지한다.
- 로컬 프로덕션 preview console error/warn 0건. TypeScript 통과, Vitest 11/11, ESLint 오류 0·기존 UI fast-refresh 경고 7, production build 통과, `git diff --check` 통과.
- `pnpm audit --prod`: 알려진 취약점 0건. `.env.local`은 git ignore·권한 600, dist source map 0개, service-role/private key 0건.
- 배포 가능 여부: `가능`.

#### 배포 후 실제 URL 점검

- GitHub Actions `Deploy Portfolio to GitHub Pages` 실행 `31570911305`가 성공했다.
- 배포 커밋: `396b34c` (`feat: focus portfolio on product management narrative`).
- 실제 공개 URL: `https://gmbro.github.io/portfolio/`.
- 라이브 asset: `index-Dt7uemzk.js`; `lang=ko`, title `이경민 | 프로덕트 매니저`.
- 라이브 Hero에서 `고객의 문제를 제품으로 해결하고 실제 사용과 성과로 검증합니다.`와 `0→1·350만·70%+` 지표를 확인했다.
- PM 증거 보드는 `고객 문제 발견→제품 정의·0→1→운영·성장→측정·개선`, 대표 사례는 `Arkylab→Skelter Labs→SK Planet→Selectstar→학습 기록→Vision AI` 순으로 반영됐다.
- 라이브 390px `375=375`, 768px `753=753`, 1440px `1425=1425`로 세 너비 모두 가로 오버플로 0이며 로컬 재검사와 문서 높이가 일치했다.
- 라이브 `/portfolio/p/not-real-slug`는 한국어 무효 링크 화면과 `noindex, nofollow`, console error/warn 0건을 확인했다.
- 배포 결과: `성공` — 기본 공개 포트폴리오 base revision 7.

---

### 2026-08-12 / 소개 우선 배치·상시 플로팅 챗봇 / base revision 8

- 작업 대상 URL: `/`, `/p/:slug`
- 제외 URL: `/admin/links`
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: 기본 포트폴리오 base revision 8
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1~4단계 적용 기준

- 기존 base revision 7의 PM 포지셔닝·검증 수치·대표 사례·Hero는 변경하지 않는다.
- 정보 구조만 `Hero → 소개 → 제품으로 검증한 PM 역량 → 대표 PM 사례 → PM 역량 → 경력 → 문의`로 바꿔, 증거 보드 전에 문제 해결 방식과 경력 확장 맥락을 설명한다.
- Typebot `gmbro`는 공개 포트폴리오의 우측 하단에 스크롤 위치와 무관하게 고정한다. 관리자 화면에는 노출하지 않는다.

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE8-001 | 390·768·1440px | 정보 구조 | 소개가 문의 뒤, 본문 마지막에 위치하고 PM 증거 보드가 Hero 직후 시작 | 평가자가 증거를 보기 전에 이 사람이 어떤 방식으로 문제를 해결해 왔는지 맥락을 얻기 어려움 | 보통 | About을 Hero 직후, ProductProof 직전으로 이동 | 발견 |
| QA-BASE8-002 | 390·768·1440px | Typebot | 초기 Hero·소개·증거 보드에서 버튼이 생성되지 않고, 프로젝트 이후에도 문의 접근 시 다시 숨김 | 챗봇이 있다는 사실을 대부분의 페이지 구간에서 발견할 수 없음 | 높음 | 공개 route에서는 스크롤 조건 없이 항상 fixed launcher 렌더링 | 발견 |
| QA-BASE8-003 | 390px | Typebot | 기존 모바일 CSS `translate: 14px 0`은 상시 고정 시 우측 여백을 약 6px로 축소 | 버튼이 화면 끝에 붙어 보이고 안전 영역이 부족함 | 보통 | translate 제거, 56px 원형·기본 20px 우측/하단 여백 유지 | 발견 |

수정 전 반응형 측정:

- 390px: `375=375`, 문서 13,070px, 순서 `Hero→ProductProof→Projects→Skills→Experience→Contact→About`, Hero에서 Typebot 버튼 없음.
- 768px: `753=753`, 문서 11,667px, 같은 순서, Hero에서 Typebot 버튼 없음.
- 1440px: `1425=1425`, 문서 9,360px, 같은 순서, Hero에서 Typebot 버튼 없음.

#### 직접 수정

| 범위 | 실제 수정 | 사실 변경 여부 |
|---|---|---|
| 정보 구조 | `Index`를 `Hero → 소개 → 제품으로 검증한 PM 역량 → 대표 PM 사례 → PM 역량 → 경력 → 문의` 순으로 재배치하고, 내비게이션도 `소개`를 첫 항목으로 이동 | 콘텐츠·수치·경력 사실 변경 없음 |
| Typebot 렌더 구조 | 전역 `App` 렌더를 제거하고 실제 공개 포트폴리오를 완성한 `Index`에서만 Typebot을 렌더해 기본 `/`와 유효한 `/p/:slug`에 노출 | Typebot id·아이콘·답변 데이터 변경 없음 |
| 상시 플로팅 | 프로젝트·문의 위치를 감시하던 scroll/resize/MutationObserver와 `isHidden` 조건을 제거하고 `position: fixed`를 명시 | 사실 변경 없음 |
| 모바일 안전 영역 | 390px 챗봇을 56px 원형·우측/하단 20px 기준으로 유지하고 기존 우측 `translate`를 제거. 문의 CTA는 모바일에서 우측 80px 레일을 비워 챗봇과 겹치지 않게 조정 | 사실 변경 없음 |
| 접근성·회귀 테스트 | 챗봇의 `챗봇 열기/닫기`·`aria-pressed` 동기화와 원형 포커스 스타일 유지. 소개/증거 보드 DOM 순서, 내비게이션 순서, fixed Typebot 설정을 검사하는 테스트 추가 | 사실 변경 없음 |

#### 동일 조건 재검사

| 항목 | 390px | 768px | 1440px |
|---|---:|---:|---:|
| 실제 content width | `375 = 375`, 가로 오버플로 0 | `753 = 753`, 가로 오버플로 0 | `1425 = 1425`, 가로 오버플로 0 |
| 문서 높이 | 13,070px | 11,667px | 9,360px |
| 본문 순서 | Hero→소개→PM 증거→대표 사례→PM 역량→경력→문의 | 동일 | 동일 |
| Typebot 버튼 | 56×56px, 우측 35px·하단 20px | 64×64px, 우측 35px·하단 20px | 64×64px, 우측 35px·하단 20px |

- Hero·대표 사례·문의·Footer로 각각 스크롤한 뒤에도 버튼이 `display:flex`, `visibility:visible`, `챗봇 열기`로 고정되는 것을 확인했다.
- 실제 열기·닫기 시 `aria-pressed false→true→false`, 접근성 이름 `챗봇 열기→챗봇 닫기→챗봇 열기`로 동기화됐다.
- 390px 문의 구간에서 챗봇은 `x=299–355`, 제출 CTA는 `x=45–250`으로 교차 영역 0이며, CTA 높이 56px를 유지한다.
- `/admin/links`, `/p/not-real-slug`, 404에는 Typebot host가 0개이고 기본 `/`에는 1개임을 확인했다. 무효 맞춤 링크는 한국어 무효 링크 화면을 유지한다.
- 새 로컬 프로덕션 preview 세션의 console error/warn은 0건이다.
- TypeScript 통과, Vitest 12/12, ESLint 오류 0·기존 UI fast-refresh 경고 7, production build 통과, `git diff --check` 통과.
- `pnpm audit --prod`: 알려진 취약점 0건. 의존성·lockfile·Supabase·EmailJS 설정은 변경하지 않았다.
- 배포 가능 여부: `가능`.

#### 배포 후 실제 URL 점검

- GitHub Actions `Deploy Portfolio to GitHub Pages` 실행 `31573493921`이 성공했다.
- 배포 커밋: `a40a8b1` (`feat: prioritize intro and pin portfolio chatbot`).
- 실제 공개 URL: `https://gmbro.github.io/portfolio/`.
- 라이브 asset: `index-DXXvWY4h.js`; `lang=ko`, title `이경민 | 프로덕트 매니저`.
- 라이브 본문 순서는 `Hero→소개→제품으로 검증한 PM 역량→대표 PM 사례→PM 역량→경력→문의`로 반영됐다.
- 라이브 390px `375=375`·13,070px, 768px `753=753`·11,667px, 1440px `1425=1425`·9,360px로 세 너비 모두 가로 오버플로 0이며 로컬과 일치했다.
- Typebot은 라이브 Hero·대표 사례·문의·Footer에서 계속 표시되며 390px 56px, 768·1440px 64px 원형으로 우측 35px·하단 20px에 고정됐다. 열기·닫기 상태와 한국어 접근성 이름도 정상이다.
- 라이브 390px 문의 CTA와 Typebot 교차 영역은 0이다. `/portfolio/p/not-real-slug`, `/portfolio/admin/links`, 404에는 Typebot이 노출되지 않는다.
- 기본 공개 URL과 무효 맞춤 링크·관리자 화면의 console error/warn은 0건이다. 의도된 404 route는 기존 진단용 `console.error` 1건을 남기지만 UI·라우팅에는 영향이 없다.
- 배포 결과: `성공` — 기본 공개 포트폴리오 base revision 8.

---

### 2026-08-12 / Instagram DM형 챗봇 런처 / base revision 9

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 무효 `/p/:slug`, 404
- 배포 예정 URL: `https://gmbro.github.io/portfolio/`
- 대상 revision: 기본 포트폴리오 base revision 9
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1~4단계 적용 기준

- 이번 작업은 JD·경력·Hero·프로젝트 사실을 바꾸지 않는 공통 UI 개선이다. 기존 base revision 8의 PM 포지셔닝, CAR 구조, 검증 수치와 섹션 순서를 그대로 유지한다.
- 사용자가 제공한 Instagram 메시지 CTA 이미지는 시각 구조만 참고한다. 이미지 속 타인의 프로필·브랜드 자산은 복제하지 않는다.
- Typebot `gmbro`의 기능과 고정 위치는 유지하면서 파란 원형·말풍선 장식을 제거하고, 흰색 캡슐·종이비행기·`메시지`·기존 챗봇 프로필 이미지로 기능을 명확히 한다.
- 390px에서는 콘텐츠 비가림을 줄인 compact launcher, 768px·1440px에서는 텍스트가 있는 pill launcher를 사용한다.

#### 1차 진단 — 수정 전

| ID | 너비 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|
| QA-BASE9-001 | 390·768·1440px | 버튼 배경이 `rgb(0, 66, 218)` 파란색이고 프로필 이미지가 원 전체를 채움 | 사이트의 검정·백색·오렌지 톤과 분리되어 보임 | 보통 | 흰색·검정 기반 launcher로 통일 | 발견 |
| QA-BASE9-002 | 전체 | 버튼 우측 하단에 파란 말풍선 glyph 배지가 겹침 | 사용자가 삭제를 요청한 말풍선 장식이 노출됨 | 높음 | `::after` 말풍선 장식 완전 제거 | 발견 |
| QA-BASE9-003 | 전체 | 원형 사진만 있고 가시적인 기능명 없음 | 프로필 이미지인지 문의 기능인지 즉시 구분하기 어려움 | 높음 | 종이비행기 아이콘과 `메시지` 라벨 추가 | 발견 |
| QA-BASE9-004 | 390px | 56px 원형은 문의 CTA와 겹치지 않지만 그대로 pill로 확장하면 기존 80px 안전 레일을 침범 | 모바일 주요 행동 비가림 위험 | 높음 | 모바일은 132px compact pill, 640px 이상은 196px pill로 조정하고 문의 CTA 안전 레일 재설계 | 발견 |

수정 전 반응형 측정:

- 390px: 버튼 56×56px, 우측 35px·하단 20px, 파란 원형, 프로필 이미지 56×56px, 접근성 이름 `챗봇 열기`.
- 768px: 버튼 64×64px, 우측 35px·하단 20px, 같은 파란 원형·말풍선 배지.
- 1440px: 버튼 64×64px, 우측 35px·하단 20px, 같은 파란 원형·말풍선 배지.
- 세 너비 모두 본문 가로 오버플로는 0이며 고정 위치와 열기·닫기 기능은 정상이다.

#### 직접 수정

| 범위 | 실제 수정 | 사실 변경 여부 |
|---|---|---|
| Typebot 테마 | 인라인 파란 배경을 흰색으로 교체하고, 검정 아이콘 색상·기존 프로필 이미지·중립적인 원형 X 닫기 아이콘을 설정 | Typebot id·대화 데이터·프로필 이미지 원본 변경 없음 |
| Instagram DM형 런처 | 말풍선 glyph 배지를 완전히 제거하고, 흰색 캡슐 안에 검정 outline 종이비행기·`메시지`·원형 프로필을 배치 | 가시 문구만 기능명 `메시지`로 명확화, 경력·프로젝트 사실 변경 없음 |
| 반응형·충돌 방지 | 390px 132×52px, 768·1440px 196×64px로 분기하고 문의 제출 CTA가 모바일·태블릿에서 우측 안전 레일을 비우도록 조정 | 사실 변경 없음 |
| 상태·접근성 | 접근성 이름을 `메시지 열기/닫기`로 상태 동기화하고, 장식용 프로필 alt를 비워 중복 낭독을 제거. 검정 outline+백색 이중 focus ring, 최소 52px 터치 타깃 적용 | 사실 변경 없음 |
| 상호작용 안정화 | Typebot 기본 hover/active 확대를 `scale: 1`로 고정하고, 열린 상태도 동일 크기를 유지. reduced-motion에서는 런처 animation·transition 제거 | 사실 변경 없음 |
| 타입·회귀 테스트 | `inlineStyle`, `customCloseIconSrc` 타입을 보강하고 흰 배경·고정 위치·종이비행기/프로필 자산 설정을 테스트에 추가 | 사실 변경 없음 |

#### 동일 조건 재검사

| 항목 | 390px | 768px | 1440px |
|---|---:|---:|---:|
| 실제 content width | `375 = 375`, 가로 오버플로 0 | `753 = 753`, 가로 오버플로 0 | `1425 = 1425`, 가로 오버플로 0 |
| 문서 높이 | 13,070px | 11,667px | 9,360px |
| 런처 | 132×52px, 우측 35px·하단 6px | 196×64px, 우측 35px·하단 20px | 196×64px, 우측 35px·하단 20px |
| 프로필 이미지 | 38×38px 원형 | 46×46px 원형 | 46×46px 원형 |
| 종이비행기 | 20×20px | 28×28px | 28×28px |
| 문의 요소 교차 | 제출·동의·메시지 모두 0 | 제출·동의·메시지 모두 0 | 제출·동의·메시지 모두 0 |

- 세 너비 모두 `rgb(255, 255, 255)` 흰색 캡슐, `border-radius: 9999px`, 가시 문구 `메시지`, 접근성 이름 `메시지 열기`로 확인했다. 파란색과 기존 말풍선 SVG·말풍선 이모지는 공개 소스에서 0건이다.
- 열기·닫기 시 `aria-pressed false→true→false`, 이름 `메시지 열기→메시지 닫기→메시지 열기`로 동기화됐다. 1280×720에서 열린 패널은 `400×624px`, viewport 안에 완전히 포함됐다.
- closed/open 모두 런처 196×64px와 `scale: 1`을 유지해 Typebot 기본 hover 확대가 남지 않는다.
- 키보드 포커스 시 2px 검정 outline·3px offset·6px 백색 이중 ring이 표시되고, 모바일 최소 높이는 52px다. `prefers-reduced-motion`에서는 런처와 아이콘의 animation·transition을 제거한다.
- 기본 `/`의 Typebot host는 1개, `/admin/links`, `/p/not-real-slug`, 404는 각각 0개다. 새 로컬 production preview의 console error/warn은 0건이다.
- TypeScript 통과, Vitest 12/12, ESLint 오류 0·기존 UI fast-refresh 경고 7, production build 통과, `git diff --check` 통과.
- `pnpm audit --prod`: 알려진 취약점 0건. 의존성·lockfile·Supabase·EmailJS 설정은 변경하지 않았다.
- 배포 가능 여부: `가능`.

#### 배포 후 실제 URL 점검

GitHub Pages 배포 후 같은 세 너비에서 asset revision, launcher 외형·상호작용, 문의 비가림, 제외 route, console 상태를 기록한다.

---

### 2026-08-12 / 사용자 지정 도메인·문의 복구·PM 포트폴리오 최적화 / base revision 10

- 작업 대상 URL: `/`, 유효한 `/p/:slug`, `/admin/links`
- 수정 전 공개 URL: `https://gmbro.github.io/portfolio/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 10
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1~4단계 적용 기준

- 특정 회사 JD가 새로 제공되지 않았으므로 존재하지 않는 JD 요구를 만들지 않는다. 기존에 검증한 공통 PM 채용 신호 `고객 문제 정의 → 0→1 제품 설계 → 운영 데이터 기반 개선`을 유지한다.
- 경력·수치·Hero 주장은 바꾸지 않고, 채용 담당자와 대표가 같은 근거를 반복해서 읽지 않도록 소개·증거 보드·PM 역량·경력의 위계를 압축한다.
- 문의는 사용자가 제공한 EmailJS 공개 식별자를 유지하되 수신자는 템플릿에 고정하고 클라이언트 `to_email`을 금지한다. 실패해도 작성 내용을 잃지 않는 메일 앱 경로를 제공한다.
- 사용자 지정 도메인은 GitHub Pages에 `archilab.ai.kr`로 먼저 등록한 뒤 가비아 DNS, 루트 base, HTTPS를 순서대로 검증한다. DNS와 EmailJS 템플릿처럼 외부 설정이 완료되지 않으면 완료로 보고하지 않는다.

#### 1차 진단 — 수정 전

| ID | 너비·환경 | 섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE10-001 | 실제 EmailJS API | 문의 | `template_zeewzqa` 전송이 HTTP 400 `The template ID not found`로 응답 | 정상 입력도 자동 전송 실패 | 차단 | 대시보드 템플릿을 올바른 계정에 저장하고 ID 확인. 코드에서는 실패 유형과 본문 포함 mailto를 제공 | 발견 |
| QA-BASE10-002 | Codex In-app Browser | 문의 | `blockHeadless: true`가 `navigator.webdriver` 환경에서 451 오탐 가능 | 인앱·자동화 브라우저의 정상 방문자가 전송 전에 차단될 수 있음 | 높음 | honeypot·10초 제한은 유지하고 blockHeadless 제거 | 발견 |
| QA-BASE10-003 | 390px | Hero·Typebot | 132px pill launcher가 `350만`, `70%+` 지표 카드와 교차 | 첫 화면의 핵심 성과 수치를 가림 | 차단 | 챗봇은 계속 mount하되 Hero가 보이고 대화가 닫혔을 때 launcher만 숨김 | 발견 |
| QA-BASE10-004 | 768px | Hero·Typebot | 196px pill launcher가 `70%+` 지표 카드와 교차 | 태블릿 첫 화면 성과 카드 비가림 | 차단 | 390px과 동일한 smart visibility 적용 | 발견 |
| QA-BASE10-005 | 390·768px | Contact | 챗봇 충돌 회피를 위해 제출 버튼을 `calc(100%-7/9rem)`으로 축소 | 주 CTA가 반쪽처럼 보여 신뢰와 터치 가독성 저하 | 높음 | Contact가 보이고 대화가 닫혔을 때 launcher 숨김, 제출 버튼 full width 복구 | 발견 |
| QA-BASE10-006 | 390·768·1440px | 정보 구조 | About·ProductProof·Leadership가 동일한 `문제 정의→제품 설계→성과 검증` 메시지를 반복 | 실제 프로젝트 증거 도달이 늦고 제너럴리스트 인상 강화 | 높음 | About·증거 보드를 압축하고 독립 Leadership 렌더 제거, 경력은 모두 요약형으로 전환 | 발견 |
| QA-BASE10-007 | 390·768·1440px | 대표 사례 | PM 증거 순서가 `Arkylab→Skelter→SK Planet→Selectstar`로 이어져 강한 70%+ 개선 사례가 뒤에 위치 | 0→1 다음 개선 역량의 연결이 약함 | 보통 | `Arkylab→Skelter→Selectstar→SK Planet`으로 대표 증거를 재배치 | 발견 |
| QA-BASE10-008 | 전체 | 성능 | Pretendard 5개 파일 약 3.65MiB, 미사용 전역 Toaster·Tooltip provider, 사용되지 않는 자산·파일이 남음 | 첫 로드와 유지보수·공급망 표면 증가 | 높음 | Pretendard variable dynamic subset 1개로 교체, 미사용 provider와 명백한 dead code 제거 | 발견 |
| QA-BASE10-009 | DNS·GitHub Pages | 도메인 | GitHub Pages Custom domain 저장은 완료됐으나 apex A/AAAA가 NODATA, `www` NXDOMAIN, TLS 인증서 없음 | `https://archilab.ai.kr` 접속 불가 | 차단 | 가비아 A 4개·www CNAME 설정 후 DNS check·HTTPS 강제 | 발견 |
| QA-BASE10-010 | 전체 | 애니메이션·증거 | 동일 fade-up이 반복되지만 실제 제품 화면·전후 자료 `visual.src`는 0개 | 움직임은 많고 제품 판단 증거는 부족 | 보통 | 장식 모션 추가는 보류. 실제 자료가 제공될 때만 제품 흐름·before/after에 목적성 모션 추가 | 발견 |

수정 전 반응형·성능 측정:

- 390px: 문서 약 13,070px, 가로 오버플로 0. 챗봇 pill과 Hero 지표 교차 확인.
- 768px: 문서 약 11,668px, 가로 오버플로 0. 챗봇 pill과 세 번째 Hero 지표 교차 확인.
- 1440px: 문서 약 9,361px, 가로 오버플로 0. launcher 비가림은 없지만 동일 근거가 세 섹션에서 반복됨.
- 프로덕션 자산: main 약 168KiB gzip, Typebot 약 198KiB gzip. 현재 실제 시각 증거 asset은 0개이며 Arkylab 외부 URL만 공개됨.
- 보안 사전 점검: `pnpm audit --prod` 알려진 취약점 0건, 추적된 비밀키 0건, Supabase exact-slug RPC·anon 테이블 SELECT 차단 유지.

#### 직접 수정

| ID | 수정 파일·외부 설정 | 직접 수정 내용 | 사실 변경 | 결과 |
|---|---|---|---|---|
| QA-BASE10-001 | EmailJS Dashboard, `.github/workflows/deploy-pages.yml` | 기존 템플릿의 ID를 사용자가 지정한 `template_zeewzqa`로 변경하고, 제목 `{{subject}}`, 고정 수신자, `{{name}}`·`{{email}}`·`{{message}}` 본문과 `{{reply_to}}`를 저장했다. 본문은 `문의해 주셔서 감사합니다.` 중심으로 간소화했다. | 없음 | Dashboard Test It `200 OK`, Gmail 실제 수신과 변수 치환 확인 |
| QA-BASE10-002 | `src/components/Contact.tsx`, `src/test/contact.test.tsx` | `blockHeadless`를 제거하고 honeypot·10초 제한을 유지했다. 429·451·설정·일반 오류를 분리하고 작성한 제목·본문이 포함된 mailto fallback을 제공했다. | 없음 | 인앱 브라우저 오탐 제거, 입력 보존·재시도 경로 확인 |
| QA-BASE10-003~004 | `src/components/TypebotBubble.tsx`, `src/components/Hero.tsx`, `src/test/index.test.tsx` | Hero가 보일 때 닫힌 launcher를 렌더하지 않고 Hero 이후 Typebot을 지연 로드했다. 본문에서는 고정 pill을 표시하고 Contact에서는 닫힌 launcher만 숨긴다. 열린 대화는 mount 상태를 유지한다. 모바일 panel max-width/height를 viewport 기준으로 제한했다. | 없음 | 390·768 Hero 지표 비가림 0, main gzip 감소, 390 열린 panel 좌우 overflow 0 |
| QA-BASE10-005 | `src/components/Contact.tsx` | 제출 버튼을 전 너비 `w-full`로 복구하고 Contact가 보일 때 닫힌 챗봇 launcher를 숨겼다. | 없음 | 390·768·1440 닫힌 상태 CTA 교차 0 |
| QA-BASE10-006 | `src/components/About.tsx`, `src/components/ProductProof.tsx`, `src/pages/Index.tsx`, `src/components/Experience.tsx`, `src/components/Leadership.tsx` | About을 2문단+compact 3단계로 압축하고 ProductProof를 작은 앵커 rail로 변경했다. 중복 Leadership 렌더와 파일을 제거했다. 경력은 요약형으로 전환하되 현재 Arkylab 설명은 접힘 밖에 유지했다. | 없음 | 모바일 문서 높이 약 13,070→10,372px, 1440 약 9,361→7,516px |
| QA-BASE10-007 | `src/data/portfolio.ts`, `src/components/ProductProof.tsx`, `src/test/portfolio.test.ts` | 대표 사례를 Arkylab→Skelter→Selectstar→SK Planet 순으로 재배치하고 증거 rail도 같은 순서로 맞췄다. | 없음 | 0→1 다음에 70%+ 개선 증거가 이어지는 PM 서사 확보 |
| QA-BASE10-008 | `src/index.css`, `src/App.tsx`, `src/components/TypebotBubble.tsx`, dead files | Pretendard 9개 선언을 공식 variable dynamic subset 1개로 교체했다. 미사용 Toaster·Sonner·Tooltip provider, `App.css`, `NavLink`, `Leadership`, placeholder asset과 미사용 데이터 export를 제거했다. Typebot은 dynamic import로 분리했다. | 없음 | main 168KiB→126.65KiB gzip, Typebot 199.27KiB는 첫 화면 preload 0 |
| QA-BASE10-009 | Gabia DNS, GitHub Pages, Supabase Auth, `vite.config.ts`, `index.html`, `src/pages/LinkManager.tsx` | GitHub Pages custom domain을 저장하고 가비아 권한 DNS에 apex A 4개와 `www → gmbro.github.io.` CNAME을 추가했다. build base를 `/`, canonical/OG를 새 도메인으로 변경했다. Supabase Site URL과 redirect allowlist에 새 도메인을 등록하고 magic-link URL을 절대경로로 교정했다. | 없음 | 권한 DNS 저장 확인. 공용 DNS·TLS는 배포 후 최종 재확인 |
| QA-BASE10-010 | 전체 모션 검토 | 장식용 3D·parallax·count-up은 추가하지 않았다. Hero·증거·섹션의 기존 짧은 진입 모션과 reduced-motion 대응만 유지했다. | 없음 | 실제 제품 화면·전후 자료가 없는 상태에서 과장 모션 방지 |

추가 보안·정책 수정:

- `robots.txt`는 crawler가 `/p/:slug`의 동적 `noindex`를 읽을 수 있도록 전역 Allow로 유지한다. 무효 링크·관리자·404의 런타임 `noindex, nofollow`를 직접 확인했다.
- EmailJS 수신자는 대시보드에서 `gmbro7942@gmail.com`으로 고정했고 클라이언트 payload에 `to_email`은 없다. Free plan에서는 Domains allowlist 저장이 Subscription Limitation으로 차단됨을 확인했다. 잔여 스팸 위험은 honeypot·10초 client throttle·입력 길이 제한으로 완화하며, 트래픽 증가 시 유료 allowlist 또는 reCAPTCHA를 추가한다.
- Supabase public link는 exact-slug RPC, 공개 안전 필드 3개, anon direct table SELECT 차단 상태를 유지한다.

#### 동일 조건 재검사

수정 후 production preview를 같은 브라우저와 너비에서 위→아래 직접 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| 실제 viewport / clientWidth | 390 / 375 | 768 / 753 | 1440 / 1425 |
| scrollWidth / clientWidth | 375 / 375 | 753 / 753 | 1425 / 1425 |
| 문서 높이 | 10,372px | 9,193px | 7,516px |
| Hero의 닫힌 launcher | 렌더 0 | 렌더 0 | 버튼 렌더 0 |
| 본문 launcher | 132×52px, 우 20px·하 6px | 196×64px, 우 20px·하 20px | 196×64px, 우 20px·하 20px |
| Contact 닫힌 launcher | 숨김 | 숨김 | 숨김 |
| Contact 제출 버튼 | 285×56px full width | 591×56px full width | 702×56px full width |

- 390px에서 열린 Typebot panel은 350×704px, x=25~375로 좌우 overflow 0이며 `aria-pressed=true`, `메시지 닫기`가 동기화됐다. Contact로 이동해도 열린 대화는 유지되며 닫으면 Contact에서 launcher가 숨는다.
- 프로젝트 증거 rail의 긴 `운영 원가 70%+ 절감`은 truncate를 제거해 작은 화면에서도 잘리지 않는다.
- `/p/not-real-slug` 새로고침은 `유효하지 않은 링크입니다`와 `noindex, nofollow`, `/admin/links`는 관리자 화면과 `noindex, nofollow`, 임의 404는 한국어 404와 `noindex, nofollow`를 표시했다. 세 경로 모두 Typebot host 0이다.
- production preview console error/warn 0. 루트 asset 경로는 `/assets/...`로 확인했다.
- EmailJS `template_zeewzqa` Test It `200 OK`, 실제 Gmail 수신 제목·이름·회신 이메일·본문 치환 확인. 실패 테스트는 입력 보존과 본문 포함 mailto를 검증한다.
- 최종 검사: TypeScript 통과, Vitest 15/15, ESLint 오류 0·기존 미사용 UI scaffold fast-refresh 경고 7, production build 통과, `git diff --check` 통과, `pnpm audit --prod` 알려진 취약점 0.
- 사실·오타: 기존 회사·기간·역할·350만 MAU·70%+·0→1 수치와 귀속은 변경하지 않았다. 공개 PM 서사의 위계·배치만 변경했다.
- 배포 판단: 코드 배포 가능. 전체 완료 판단은 공용 DNS 전파·GitHub Pages 인증서·HTTPS 강제 후에만 내린다.

#### 배포 후 실제 URL 점검

배포 및 외부 설정 결과:

- GitHub Actions `Deploy Portfolio to GitHub Pages` 실행 `31581316404`가 build·deploy 모두 성공했다.
- 배포 커밋: `b6c0ef39eea62d78012ff88cf741cc94b521f5b3` (`Optimize portfolio UX and deploy custom domain`).
- 실제 공개 URL: `https://archilab.ai.kr/`. 기존 `https://gmbro.github.io/portfolio/`와 `http://archilab.ai.kr/`은 새 HTTPS 주소로 이동한다.
- 가비아 apex A 4개와 `www → gmbro.github.io.` CNAME이 권한 DNS와 1.1.1.1·8.8.8.8에 전파됐다. GitHub Pages `DNS check successful`, apex·www 인증서 발급, `Enforce HTTPS` 활성화를 확인했다.
- 라이브 asset: `index-DWw_8JzB.js`, `index-CLBp8oXy.css`. 두 자산 모두 `/assets/...` 루트 경로이며 canonical·`og:url`은 `https://archilab.ai.kr/`이다.

라이브를 같은 조건으로 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| 실제 viewport / clientWidth | 390 / 375 | 768 / 753 | 1440 / 1425 |
| scrollWidth / clientWidth | 375 / 375 | 753 / 753 | 1425 / 1425 |
| 문서 높이 | 10,372px | 9,193px | 7,516px |
| Hero의 닫힌 launcher | host 0 | host 0 | host 0 |
| 본문 launcher | 132×52px | 196×64px | 196×64px |
| Contact 닫힌 launcher | 숨김 | 숨김 | 숨김 |
| Contact 제출 버튼 | 285×56px full width | 591×56px full width | 702×56px full width |

- 세 너비 모두 가로 오버플로 0이다. Hero 지표·문의 CTA와 챗봇 교차 영역도 0이다.
- 라이브 문의 폼에서 이름 `포트폴리오 QA`, 회신 이메일, QA 메시지를 전송해 `문의가 전송되었습니다` 상태를 확인했다. Gmail에서 제목 `[포트폴리오 문의] 포트폴리오 QA`, `문의해 주셔서 감사합니다.`, 입력한 이름·이메일·메시지 치환을 확인했다.
- `/p/not-real-slug`는 로딩 후 한국어 무효 링크 화면과 `noindex, nofollow`, `/admin/links`는 관리자 로그인 화면과 `noindex, nofollow`, 임의 404는 한국어 404와 `noindex, nofollow`를 표시한다. 세 경로 모두 Typebot host 0이다.
- GitHub Pages의 SPA fallback 특성상 `/p/:slug`와 `/admin/links` 직접 요청의 HTTP 상태는 404이지만 동일한 최신 SPA shell이 실행되어 브라우저 화면·라우팅은 정상이다. 링크 미리보기·일부 보안 스캐너에는 한계가 있으므로, 향후 모든 동적 경로에 200 응답이 필요하면 rewrite를 지원하는 호스팅으로 이전한다.
- 라이브 console error/warn 0, main·Contact·관리자·무효 링크의 새 도메인 새로고침 정상, 이전 GitHub Pages URL의 HTTPS 리다이렉트 정상이다.
- EmailJS 템플릿 `template_zeewzqa`는 고정 수신자와 한국어 간단 본문으로 저장·실수신 완료했다. Free plan의 도메인 allowlist 제한은 잔여 위험으로 유지하며 honeypot·10초 제한·입력 길이 제한을 적용한다.
- 최종 publication: 기본 공개 포트폴리오 base revision 10. 회사별 publication 신규 생성 없음. 기본 `/`은 indexable, 관리자·무효/회사별 링크·404는 각 런타임 정책에 따라 noindex를 유지한다.
- 배포 결과: `성공`.

---

### 2026-08-22 / 채용 증거 서사·프로젝트 CAR·4초 목업 갤러리 / base revision 37

- 작업 대상 URL: 기본 `/`의 `#hero`, `#about`, `#case-studies`, `#experience`, `#contact`
- 수정 전 라이브 URL: `https://archilab.ai.kr/?qa=base37-before`
- 로컬 미리보기 URL: `http://127.0.0.1:4181/?qa=base37-local`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 기준 커밋: `b91af28` (기능 기준 `6024c95`, 문서 동기화 포함)
- 대상 revision: 기본 포트폴리오 base revision 37
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 사실 출처: 이번 사용자의 56개 브라우저 주석, 기존 공개 경력 데이터와 사용자가 앞서 확인한 아키 이미지 3개. 새 회사·기간·수치·인과관계는 만들지 않는다.

#### 1단계 — 요청·채용 신호 분석

특정 JD는 제공되지 않았다. 따라서 채용 검토자가 `정체성 → 프로젝트 범위 → 문제·실행·성과 → 경력의 일관성 → 연락`을 빠르게 탐색하도록 최신 사용자 문구를 증거 중심 구조로 정리한다.

| 우선순위 | 현재 Pain Point | 채용 판단 영향 | 수정 방향 |
|---:|---|---|---|
| 1 | Hero 매출 기여가 최신 확인값 `13억`이 아닌 `28억` | 첫 화면 핵심 수치의 신뢰가 깨짐 | 회사·기간·매출 유형을 임의 귀속하지 않고 집계값만 `13억`으로 교정 |
| 2 | About이 짧은 정체성 선언 뒤 직무·도메인·AI 적용 방식의 연결을 충분히 설명하지 못함 | 제너럴리스트와 AI 전문성이 분리된 주장처럼 보임 | 제목을 `넓게 이해하고, 뾰족하게 실행합니다.`로 교체하고 사용자 지정 4문단과 역량 5개를 배치 |
| 3 | Projects 헤더와 5개 카드의 category·metric·CAR가 최신 확인 내용과 불일치 | 프로젝트마다 무엇을 맡고 무엇을 바꿨는지 스캔하기 어려움 | 최신 주석을 프로젝트별 문제·판단·실행·성과와 역할 신호로 1:1 반영 |
| 4 | Experience 소개와 커리어 방향이 잦은 이동만 강조하고 일관된 문제 해결 방향을 충분히 설명하지 못함 | 재직 기간보다 커리어 선택의 맥락이 먼저 보이지 않음 | 도메인 폭과 `시간·비용 절감 → 제품·사업 성과`의 공통 방향을 사용자 문구로 명확히 연결 |
| 5 | Contact가 1023px 직전 구간에서 `max-w-3xl`에 묶이고 제목 아래 가치 제안이 없음 | 큰 태블릿·좁은 웹에서 다른 섹션보다 작고 연락 이유가 약함 | 섹션 가용 폭을 사용하고 지정 부제목을 추가 |
| 6 | 갤러리가 2초마다 전환되고 아키 외 4개 프로젝트는 비어 있음 | 내용을 읽기 전에 이미지가 바뀌고 시각 탐색이 단절됨 | 4초 간격으로 완화하고 4개 프로젝트에 명시적 `개념 목업` 1600×1200px 이미지를 등록 |

최신 주석 충돌 처리:

- 주석 25는 SK Planet footer 태그 전체 제거를 요청하지만, 같은 요청의 더 구체적인 최신 주석 32–35가 네 태그의 최종 문구를 각각 지정한다. 따라서 SK Planet은 `어드민운영 · 내외부 커뮤니케이션 · 푸시 기능 고도화 · 운영 프로세스 개선`을 유지한다.
- Skelter Labs footer 태그는 주석 26에 따라 전체 제거하며, 이후 대체 태그 지시가 없어 빈 배열로 처리한다.
- 생성 목업은 검증된 실무 산출물로 오해되지 않도록 데이터와 화면 모두 `개념 목업`으로 표시한다. 검증된 수치나 회사 로고를 이미지 안에 새로 만들지 않는다.

#### 2단계 — 검증 근거 구조화

| 경험 | 사용자 확인 범위 | 이번 적용 | 확대 금지·공개 안전 경계 |
|---|---|---|---|
| 공통 Hero | `5+`, `3+`, `13억` | 세 통계의 순서·label·카운트업은 유지하고 매출 집계값만 교정 | `13억`을 특정 회사·기간·계약액·GMV로 귀속하지 않음 |
| About | B2B·B2G·B2C, 금융·공공·IT·커머스, 사업·제품·프로젝트·데이터·고객·인증 대응 | 사용자 지정 제목·4문단·`AI / Product / Project / B2B / B2C` | 새로운 직함·경력 기간으로 확대하지 않음 |
| 아키 | 1인 개발, 2026.06 시작, 2026.08 운동 강사 15명 피드백, 기록 자동화·공유·전후 비교 수요 | 제품·베타 category, 역할 metric, CAR, CTA, Gemini·React 태그 | 생성 목업을 사용하지 않고 기존 실제 아키 이미지 3개를 유지 |
| GenON·NIPA | AI Vision 아웃솔 품질검사, 제안·발표·7개월 보고·PoC·정산 | category·metric·CAR·사업 수행 태그 | 품질 향상률·검사 시간 같은 새 수치 생성 금지 |
| Selectstar | 약 1000시간 음성 전사, 약 200명 운영, 폐쇄망 STT, 맨먼스 1/10·원가 70%+ | category·metric·CAR·폐쇄망/설계 태그 | 원가·맨먼스 수치를 다른 프로젝트로 확대 금지 |
| Skelter Labs | B2C AI 상담사 0→1 PoC, 데이터가공·STT·TTS·Retrieval·대화 설계·산학협력 | category·metric·CAR, footer 태그 제거 | 생성 목업은 실제 PRD·시연 화면이 아닌 개념 화면으로 명시 |
| SK Planet | 시럽월렛 광고 운영, 유효 토큰·분산 발송·어드민, 수신율 2배·열람률 1.5배·운영 시간 1/10 | category·title·CAR·네 역할 태그 | 350만 MAU와 정량 결과를 현재 제품이나 다른 회사에 귀속하지 않음 |
| Experience | 커머스·데이터·클라우드/공공 SaaS·헬스케어에서 제품기획·사업개발·프로젝트 운영 | 소개와 커리어 방향 6문단 교체 | 재직 기간·회사·직함은 변경하지 않음 |
| Contact | AI 제품기획·프로젝트 수행과 고객 문제·AI 성과 연결 | 제목 아래 부제목 추가, 폼 가용 폭 확대 | 폼 개인정보·EmailJS 전송 계약은 변경하지 않음 |

#### 3단계 — 콘텐츠 대안 비교

Hero 헤드라인은 사용자가 변경을 요청하지 않았으므로 `고객의 문제를 제품으로 해결합니다.`를 유지한다. 첫 화면과 이어지는 About·Projects의 서사만 아래 세 방향으로 비교한다.

| 안 | About 제목 | Projects 제목 | 장점 | 판단 |
|---|---|---|---|---|
| 1 (채택) | `넓게 이해하고, 뾰족하게 실행합니다.` | `문제를 성과로 바꾼 프로젝트를 소개합니다.` | 제너럴리스트의 폭과 프로젝트 결과를 짧게 연결 | 사용자 최신 지정 문구와 정확히 일치 |
| 2 | `도메인을 넘나들며 AI 제품을 만듭니다.` | `AI 프로젝트의 실행 근거를 소개합니다.` | AI 정체성이 선명 | 실제 프로젝트 중 운영·광고 범위를 좁혀 보여 보류 |
| 3 | `고객의 시간과 비용을 줄입니다.` | `기술을 사업 성과로 연결한 사례입니다.` | 사업 임팩트 중심 | Hero와 문구 의미가 반복돼 보류 |

- 최종 정보 흐름: `Hero 통계 5+·3+·13억 → About 정체성·역량 5개 → Projects 5개 CAR·시각 자료 → Experience 방향성 → Contact 가치 제안·폼`.
- 프로젝트 시각 자료는 카드마다 한 개의 4:3 영역을 유지한다. 아키는 실제 3장 슬라이드, 나머지 4개는 `개념 목업` 한 장씩이므로 자동 전환 제어를 표시하지 않는다.

#### 4단계 — 적용 계획

| ID | 적용 위치 | 계획 |
|---|---|---|
| QA-BASE37-001 | `types/portfolio.ts`, Hero 관련 테스트·문서 | `28억 → 13억` 교정, 기존 label·카운트업·반응형 위계 유지 |
| QA-BASE37-002 | `About.tsx`, `Index.tsx` | 제목·4문단·역량 5개 반영, 원본 컬러 인물 이미지와 3단 접근 방식 유지 |
| QA-BASE37-003 | `ImageCards.tsx`, `portfolio.ts` | Projects 헤더·부제목과 5개 카드의 category·metric·CAR·CTA·tags를 최신 주석으로 교체 |
| QA-BASE37-004 | `Experience.tsx` | Experience 제목·소개와 커리어 방향 eyebrow·제목·4문단을 교체 |
| QA-BASE37-005 | `Contact.tsx` | 지정 부제목을 추가하고 1023px 직전에서도 폼이 섹션 가용 폭을 사용하도록 max-width 계약 수정 |
| QA-BASE37-006 | `EvidenceMediaGallery.tsx` | 자동 전환을 4,000ms로 변경하고 상태 안내·단위 테스트를 동기화 |
| QA-BASE37-007 | `portfolio.ts`, `public/evidence/**`, gallery UI | 4개 프로젝트별 1600×1200 PNG 개념 목업을 등록하고 가시 badge·alt로 실제 증거와 구분 |
| QA-BASE37-008 | `product.md`, `design.md`, `evidence-images.md`, `deploy.md`, 관련 테스트 | 구현·이미지 규격·출처·생성 프롬프트·검사 결과를 기록 |

#### 1차 진단 — 수정 전

수정 전 라이브 base revision 36을 세 필수 너비에서 전체 페이지 위→아래로 스크롤해 측정했다. Codex Browser의 15px 세로 스크롤바를 제외한 콘텐츠 폭 기준이다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `11,278px` | `9,872px` | `8,885px` |
| 통계 카드 폭·높이 | `104×120px` | `208×160px` | `331×160px` |
| Contact 폼 폭 | `327px` | `657px` | `1,280px` |
| Google analytics script | `0` | `0` | `0` |
| 전체 가로 스크롤 | `0` | `0` | `0` |

| ID | 너비 | 섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE37-001 | 전체 | Hero | `28억`이 최신 확인값 `13억`과 불일치 | 첫 화면 수치 신뢰 저하 | 차단 | 값·테스트·문서 동시 교정 | 발견 |
| QA-BASE37-002 | 전체 | About | 제목·본문·역량 4개가 최신 주석과 불일치 | 제너럴리스트와 AI 실행 역량의 연결이 약함 | 높음 | 지정 제목·4문단·5개 역량 반영 | 발견 |
| QA-BASE37-003 | 전체 | Projects | 헤더·설명과 다섯 카드의 역할 신호·CAR·태그가 최신 주석과 다름 | 프로젝트별 본인 기여와 성과를 빠르게 비교하기 어려움 | 차단 | 사용자 문구를 프로젝트 데이터에 1:1 반영 | 발견 |
| QA-BASE37-004 | 전체 | Experience | 소개·커리어 방향이 최신 서사와 불일치 | 짧은 재직 경험의 공통 방향이 충분히 설명되지 않음 | 높음 | 지정 문단과 제목을 그대로 반영 | 발견 |
| QA-BASE37-005 | 1001–1023px | Contact | `lg` 전까지 폼이 `max-w-3xl`에 묶여 섹션보다 좁음 | 큰 태블릿·좁은 웹에서 Contact만 축소돼 보임 | 높음 | 더 이른 breakpoint부터 가용 폭 사용, 부제목 추가 | 발견 |
| QA-BASE37-006 | 전체 | Evidence gallery | 아키 갤러리가 2초마다 전환 | 화면을 읽고 확대하기 전에 다음 이미지로 이동 | 보통 | 4초로 변경, 정지·모션 감소 계약 유지 | 발견 |
| QA-BASE37-007 | 전체 | Evidence gallery | 아키 외 4개 프로젝트가 `증거 이미지 준비 중`으로만 표시 | 카드별 시각 탐색 흐름이 끊김 | 높음 | 1600×1200 개념 목업 4장 생성·표시 | 발견 |
| QA-BASE37-008 | 전체 | Evidence gallery | 기존 아키 원본은 `1809×1311`, `1355×1311`, `1784×1311px`이며 4:3이 아님 | 프레임은 보존되지만 신규 이미지 규격과 여백이 다름 | 낮음 | 실제 증거는 원본 보존, 신규 목업만 1600×1200 표준 적용 | 발견 |

1차 진단 요약:

- 가로 스크롤·깨진 레이아웃은 없지만 사실 수치, 콘텐츠 정합성, 비어 있는 시각 슬롯이 배포 차단이다.
- 아키 실제 이미지는 자르거나 목업으로 교체하지 않는다. 신규 목업은 4개 빈 프로젝트에만 추가하고 `개념 목업`을 화면에 명시한다.
- 위 문제와 수정 방향을 소스 변경 전에 기록했다. 다음 단계에서 관련 데이터·컴포넌트·테스트·문서를 수정하고 같은 조건으로 재검사한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE37-001 | `src/types/portfolio.ts`, `src/test/count-up-value.test.tsx`, 관련 테스트·문서 | Hero 역할 배지를 `AI PM`, 매출 기여를 `13억`으로 교정하고 카운트업의 숫자·보조기술 최종값을 동기화 | 사용자 최신 확인값 반영 | 통과 |
| QA-BASE37-002 | `src/components/About.tsx`, `src/types/portfolio.ts` | 제목, 사용자 지정 4문단, `AI / Product / Project / B2B / B2C` 역량을 반영 | 사용자 제공 자기소개 반영 | 통과 |
| QA-BASE37-003 | `src/components/ImageCards.tsx`, `src/data/portfolio.ts` | Projects 제목·설명, 다섯 프로젝트의 category·metric·CAR·CTA·tag를 최신 주석과 동기화하고 Skelter 빈 footer를 제거 | 사용자 제공 경력 서술 반영 | 통과 |
| QA-BASE37-004 | `src/components/Experience.tsx` | Experience 제목·소개와 짧은 경험을 일관된 방향으로 연결하는 eyebrow·제목·4문단 적용 | 사용자 제공 커리어 서술 반영 | 통과 |
| QA-BASE37-005 | `src/components/Contact.tsx` | 지정 가치 제안 부제를 추가하고 폼의 `max-w-3xl` 제한을 제거해 모든 너비에서 섹션 컨테이너 폭을 사용 | 없음 | 통과 |
| QA-BASE37-006 | `src/components/EvidenceMediaGallery.tsx`, 갤러리 테스트 | 자동 전환 상수와 보조기술 안내를 `4,000ms`로 변경하고 정지·reduced motion 동작 유지 | 없음 | 통과 |
| QA-BASE37-007 | `src/data/portfolio.ts`, `public/evidence/**`, `EvidenceMediaGallery.tsx` | 비어 있던 4개 프로젝트에 1600×1200 sRGB PNG 한 장씩 등록하고 데이터 `kind`, 카드 badge, 확대 화면에 `개념 목업`을 표시 | 생성 목업은 실증자료가 아님 | 통과 |
| QA-BASE37-008 | `product.md`, `design.md`, `evidence-images.md`, `deploy.md`, 관련 테스트 | 최신 콘텐츠·4초 갤러리·목업 출처와 교체 원칙·검사 결과를 기록 | 없음 | 통과 |

생성한 개념 목업과 최종 프롬프트 요약:

| 프로젝트 | 파일 | 생성 프롬프트의 핵심 구조 | 공개 안전 경계 |
|---|---|---|---|
| NIPA Vision AI | `public/evidence/nipa-vision-ai-poc/mockup-overview.png` | 4:3 dark graphite·coral UI, 신발 아웃솔 검사 입력·결함 위치·검토 queue·결과 패널 | `CONCEPT MOCKUP`, 회사 로고·실제 KPI·고객 데이터 없음 |
| Selectstar STT | `public/evidence/selectstar-stt-operations/mockup-overview.png` | 4:3 dark graphite·coral UI, waveform·전사문·전처리/후처리·품질 검수 pipeline | `CONCEPT MOCKUP`, 브랜드·실제 원문·실제 수치 없음 |
| Skelter AI 상담사 | `public/evidence/skelter-ai-counselor/mockup-overview.png` | 4:3 dark graphite·coral UI, 음성 질문·대화·Retrieval 근거를 연결한 3열 PoC workspace | 실제 서비스 화면·브랜드·실제 대화·KPI 없음 |
| SK Planet 푸시 운영 | `public/evidence/sk-planet-syrup-wallet/mockup-overview.png` | 4:3 dark graphite·coral UI, audience·소재·분산 발송 queue·운영 자동화 dashboard | 실제 어드민·브랜드·실제 광고 수치 없음 |

- 네 파일은 모두 `1600×1200px`, PNG, `sRGB IEC61966-2.1`이다. 실제 용량과 교체 계약은 `evidence-images.md`에 기록했다.
- 화면과 alt에서 `개념 목업`임을 명시하며, 실제 제품 화면·당시 산출물·성과 증거로 인용하지 않는다.

#### 동일 조건 재검사

수정 전과 같은 390·768·1440px 및 사용자 주석이 발생한 1023px 경계에서 전체 페이지를 재검사했다. 수치는 Codex Browser의 15px 세로 스크롤바를 제외한 콘텐츠 폭 기준이다.

| 항목 | 390×844 | 768×900 | 1023×900 | 1440×900 |
|---|---:|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1008 / 1008` | `1425 / 1425` |
| 문서 높이 | `12,603px` | `11,359px` | `11,891px` | `12,041px` |
| 프로젝트 카드 폭 | `327px` | `657px` | `912px` | `1,280px` |
| Contact 내부 / 폼 폭 | `327 / 327px` | `657 / 657px` | `912 / 912px` | `1,280 / 1,280px` |
| ready gallery / concept badge | `5 / 4` | `5 / 4` | `5 / 4` | `5 / 4` |
| 전체 가로 스크롤 | `0` | `0` | `0` | `0` |

| 너비 | 텍스트·줄바꿈 | 이미지 | 버튼·CTA | 카드·간격·패딩 | 가로 스크롤 | 전체 결과 |
|---:|---|---|---|---|---|---|
| 390px | Hero `AI PM`·`13억`, About·Projects·Experience·Contact 최신 문구 확인 | 전체 16개 load, 목업 1600×1200·4:3 `object-contain` 확인 | 확대·닫기, 아키 CTA, 44px 제어 유지 | 프로젝트 한 행 327px, Contact 327px 일치 | 없음 | 통과 |
| 768px | 최신 문구·5개 역량 확인 | ready 5·목업 badge 4 확인 | 통과 | 프로젝트·Contact 657px 일치 | 없음 | 통과 |
| 1023px | 최신 문구 확인 | ready 5·목업 badge 4 확인 | 통과 | 프로젝트·Contact 912px 일치, 기존 Contact 축소 해소 | 없음 | 통과 |
| 1440px | 최신 문구 확인 | ready 5·목업 badge 4 확인 | 통과 | 프로젝트·Contact 1280px 일치 | 없음 | 통과 |

- 4초 자동 전환: 아키 첫 이미지가 `3.6초`까지 유지되고 `4.4초`에 두 번째 이미지로 이동했으며 SR 안내는 `4초마다 다음 증거 이미지로 자동 이동합니다.`로 확인했다.
- 확대 보기: Vision AI 목업 dialog가 열리고 `1 / 1 · 개념 목업`, `1600×1200`, body scroll lock, 닫기 후 scroll unlock을 확인했다.
- 이미지 자산: 전체 공개 이미지 `16/16`이 `complete=true`, `naturalWidth>0`; 생성 목업 `4/4`가 `1600×1200`으로 load됐다.
- 보호·오류 경로: 390px에서 `/p/not-real-slug`, `/admin/links`, 임의 404 모두 가로 오버플로 0, `noindex, nofollow`, Typebot host 0. 무효 slug는 로딩 후 한국어 오류·기본 포트폴리오 복귀 CTA를 표시했다.
- 프로덕션 빌드: Vite production build 통과. 기존 `web` 청크 697.83kB 경고만 유지.
- 테스트·정적 검사: TypeScript 통과, Vitest `9 files / 55 tests` 통과, ESLint 오류 0·기존 fast-refresh 경고 7개.
- 브라우저 콘솔: 전체 페이지 스크롤 후 error/warn 0.
- 미해결 문제: 기능 차단 없음. 생성 PNG 4개가 각 1.53–1.84MiB로 권장 1MiB보다 큰 점은 낮은 우선순위 성능 항목이며, 실제 공개 자료 교체 시 1MiB 이하를 다시 목표로 한다.
- 배포 가능 여부: `가능`.

#### 배포 후 실제 URL 점검

Git commit `fbe0942`를 `origin/main`에 push했고 GitHub Actions `Deploy Portfolio to GitHub Pages` run `32571175158`이 동일 SHA로 `success` 완료했다. CDN 캐시와 이전 자산 혼동을 피하기 위해 각 검사 URL에 `?qa=fbe0942-<width>-<timestamp>`를 붙였다.

| 항목 | 390×844 | 768×900 | 1023×900 | 1440×900 |
|---|---|---|---|---|
| 실제 URL 로드 | 통과 | 통과 | 통과 | 통과 |
| 올바른 Hero·About | `AI PM`, `13억`, 역량 5개 통과 | 통과 | 통과 | 통과 |
| Projects·Experience·Contact 최신 문구 | 통과 | 통과 | 통과 | 통과 |
| Contact 내부 / 폼 폭 | `327 / 327px` | `657 / 657px` | `912 / 912px` | `1280 / 1280px` |
| ready gallery / concept badge | `5 / 4` | `5 / 4` | `5 / 4` | `5 / 4` |
| 가로 스크롤 | 없음 | 없음 | 없음 | 없음 |

- 운영 이미지: 전체 `16/16` load 성공, 생성 목업 `4/4`의 `naturalWidth/naturalHeight`가 모두 `1600/1200`이며 실패 자산 0.
- 운영 자동 전환: 아키 첫 이미지가 3.6초까지 유지되고 4.4초에 두 번째 이미지로 전환, SR 안내 `4초마다 다음 증거 이미지로 자동 이동합니다.` 확인.
- 운영 확대 dialog: Vision AI 목업의 `1 / 1 · 개념 목업`, 1600×1200 원본, body scroll lock·닫기 후 해제 확인.
- 운영 route: 390px에서 `/p/not-real-slug`, `/admin/links`, 임의 404의 한국어 안전 상태·`noindex, nofollow`·가로 오버플로 0·Typebot host 0 확인.
- 운영 브라우저 console error/warn 0.
- 최종 공개 URL: `https://archilab.ai.kr/`
- 발행 revision: 기본 포트폴리오 base revision 37 / Git commit `fbe0942`
- GitHub Actions: run `32571175158`, conclusion `success`, head SHA `fbe094222dc28519364abbb0a58dd9663ec1c622`
- publication 상태: 기본 공개 포트폴리오 갱신, 회사별 publication 신규 생성 없음.
- `noindex, nofollow`: 기본 `/`은 indexable; 관리자·무효 회사별 링크·404는 `noindex, nofollow` 유지.
- 배포 결과: `성공`.
- 남은 낮은 우선순위 항목: 개념 목업 4개 용량 최적화와 공개 가능한 실제 증거 이미지 교체.

---

### 2026-08-22 / 통계 위계·About 역량·프로젝트 귀속 정리 / base revision 36

- 작업 대상 URL: 기본 `/`의 `#hero`, `#about`, `#case-studies`
- 로컬 미리보기 URL: `http://127.0.0.1:4178/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 기준 커밋: `1bd79a3` (기능 커밋 `06c082b`의 배포 문서 동기화 revision)
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 사실 출처: 이번 사용자 지시, 기존 공개 통계·핵심 역량·협업사 로고 데이터, 아키 증거 이미지 등록값. 새 경력·수치·협업 관계는 만들지 않는다.

#### 1단계 — 요청·채용 신호 분석

특정 JD는 제공되지 않았다. 따라서 채용 검토자가 `숫자 → 의미 → 역량 → 프로젝트 귀속`을 빠르게 읽는 정보 위계만 개선한다.

| 우선순위 | 현재 Pain Point | 채용 판단 영향 | 수정 방향 |
|---:|---|---|---|
| 1 | 통계 숫자가 카드 대비 작고 label이 아래에 있음 | 수치의 의미를 나중에 읽고 핵심 성과 스캔이 느림 | label을 DOM·시각 순서 모두 상단으로 옮기고 숫자를 카드 너비 기준으로 확대 |
| 2 | 핵심 경험 태그가 Hero의 통계 앞에 있어 첫 화면 요소가 많음 | Hero와 About의 역할이 섞이고 소개 영역의 역량 요약이 약함 | 기본 `/`의 네 태그를 About 제목 아래로 이동 |
| 3 | 협업사 로고 순서가 사용자가 지정한 프로젝트 맥락과 다름 | 수행 맥락 탐색 순서가 의도와 어긋남 | Busan↔Neosapience, NHN↔Syrup 위치 교환 |
| 4 | About 사진이 grayscale·contrast·brightness로 보정됨 | 사용자 본인의 원본 인상과 다름 | 원본 컬러 이미지를 별도 색상 보정 없이 표시 |
| 5 | 아키 수행 주체가 `아키랩`만 표시됨 | 공동 수행 주체 FIXNESS가 누락됨 | 사용자 확인값 `아키랩, FIXNESS`로 귀속 보강 |

#### 2단계 — 검증 근거 구조화

| 근거 | 확인된 값 | 적용 위치 | 확대 금지 |
|---|---|---|---|
| Hero 확인 수치 | `5+`, `3+`, `28억` | Hero 통계 카드 | 회사·프로젝트·기간·매출 유형을 새로 귀속하지 않음 |
| 기본 핵심 역량 | `프로덕트의 제로투원 경험`, `350만 MAU 제품 운영`, `B2B&B2G 프로젝트`, `B2C Product 기획·개발` | About 제목 아래 | 회사별 맞춤 Hero의 3개 채용 키워드는 그대로 유지 |
| 협업사 로고 | 기존 공개 투명 자산 8개 | 기본 Hero 지표 아래 | 재직·현재 제휴·후원을 의미하지 않음 |
| 아키 수행 주체 | `아키랩, FIXNESS` | 아키 프로젝트의 수행 주체 | Experience의 재직 회사명은 `아키랩` 그대로 유지 |
| 아키 이미지 원본 | `1809×1311`, `1355×1311`, `1784×1311px` | 4:3 `object-contain` 갤러리 | 파일을 임의 crop·stretch하지 않음 |

#### 3단계 — 배치 대안 비교

| 안 | Hero 핵심 역량 | About 핵심 역량 | 장점 | 판단 |
|---|---|---|---|---|
| 1 | 4개 유지 | 없음 | 기존 구조 변경 최소 | 통계 앞 시각 밀도 유지로 보류 |
| 2 | 기본 `/`에서는 제거 | About 제목 바로 아래 4개 | 첫 화면 수치 위계와 About의 정체성 강화 | 채택 |
| 3 | 2개 | 2개 | 화면당 밀도 분산 | 역량 묶음이 분절되어 보류 |

- 회사별 맞춤 페이지는 Hero의 검증된 맞춤 키워드 3개를 계속 표시한다. 기본 `/`만 네 태그를 About으로 이동한다.
- 통계는 `<dt> → <dd>` DOM 순서로 바꿔 스크린리더도 `수행 프로젝트 → 5+` 순으로 읽게 한다.

#### 4단계 — 적용 계획

| ID | 적용 위치 | 계획 |
|---|---|---|
| QA-BASE36-001 | `Hero.tsx` | 카드별 inline-size container와 responsive clamp를 사용해 숫자를 확대하고 label을 상단 배치 |
| QA-BASE36-002 | `Hero.tsx`, `About.tsx`, `Index.tsx` | 기본·회사별 페이지를 분기해 기본 역량만 About으로 이동 |
| QA-BASE36-003 | `heroLogos.ts` | NIPA → Neo → LG → KISA → Busan → Syrup → NHN → Fixness 순서로 변경 |
| QA-BASE36-004 | `About.tsx` | 인물 이미지의 grayscale·contrast·brightness 제거 |
| QA-BASE36-005 | `portfolio.ts` | 아키 `organization`을 사용자 확인값으로 변경 |
| QA-BASE36-006 | 문서·테스트 | 제품·디자인 계약과 관련 회귀 테스트를 실제 구현과 동기화 |

#### 1차 진단 — 수정 전

| 항목 | 390×900 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| Hero 높이 | `832px` | `832px` | `832px` |
| 통계 카드 폭·높이 | `104×120px` | `208×126px` | `331×126px` |
| 통계 숫자 font-size | `21.6px` | `48px` | `48px` |
| label / 숫자 시각 순서 | label이 아래 | label이 아래 | label이 아래 |
| Hero / About 핵심 역량 | `있음 / 없음` | `있음 / 없음` | `있음 / 없음` |
| About 이미지 필터 | grayscale·contrast·brightness | 동일 | 동일 |
| 전체 가로 오버플로 | `0` | `0` | `0` |

- 수정 전 로고 순서는 `NIPA → Busan → LG → KISA → Neosapience → NHN → Syrup → Fixness`다.
- 세 너비 모두 통계 텍스트 자체의 가로 오버플로는 없지만, 모바일 21.6px·웹 최대 48px로 카드 가용 면적 대비 작다.
- 기본 `/`의 핵심 역량은 Hero에만 있고 About에는 없다. 회사별 맞춤 키워드를 보호하는 분기 없이 Hero 블록을 일괄 삭제하면 맞춤 링크 회귀가 발생한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE36-001 | `src/components/Hero.tsx` | 통계 카드에 inline-size container를 만들고 `<dt> → <dd>` 순서, `clamp(2rem, 30cqi, 5.5rem)`, 160px 데스크톱 높이를 적용 | 수치·label 값 변경 없음 | 세 필수 너비에서 숫자 확대·오버플로 0 |
| QA-BASE36-002 | `Hero.tsx`, `About.tsx`, `Index.tsx` | 기본 `/`은 Hero 키워드를 숨기고 About 제목 아래 네 태그를 표시, 회사별 맞춤 Hero는 기존 3개 키워드 유지 | 기존 검증 키워드의 위치만 변경 | 기본·맞춤 분기 테스트 통과 |
| QA-BASE36-003 | `src/data/heroLogos.ts` | 로고 순서를 `NIPA → Neo → LG → KISA → Busan → Syrup → NHN → Fixness`로 변경 | 기존 공개 자산만 재배치 | 8개 로드·순서 확인 |
| QA-BASE36-004 | `src/components/About.tsx` | 인물 이미지의 `grayscale`, `contrast`, `brightness` 클래스 제거 | 원본 컬러 복원 | 세 너비 class·시각 확인 |
| QA-BASE36-005 | `src/data/portfolio.ts` | 아키 프로젝트의 수행 주체를 `아키랩, FIXNESS`로 변경 | 사용자 직접 확인 사실 반영 | 프로젝트 화면·데이터 테스트 통과 |
| QA-BASE36-006 | `product.md`, `design.md`, 관련 테스트 | 정보 구조·컬러·통계 위계·로고 순서·귀속 계약을 구현과 동기화 | 없음 | 관련 Vitest 21/21 통과 |

- 경력 타임라인의 재직 회사 `아키랩`은 그대로 두고, 프로젝트 카드의 `수행 주체`만 변경했다.
- 아키 증거 이미지 파일·4:3 `object-contain` 프레임·2초 자동 슬라이드·확대 기능은 변경하지 않았다.

#### 동일 조건 재검사

최종 production build를 수정 전과 같은 브라우저·너비에서 재검사했다.

| 항목 | 390×900 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| Hero 높이 | `832px` | `832px` | `832px` |
| 통계 카드 폭·높이 | `104×120px` | `208×160px` | `331×160px` |
| 통계 숫자 font-size | `32.0px` | `47.5px` | `84.2px` |
| label / 숫자 순서 | 상단 / 하단 | 상단 / 하단 | 상단 / 하단 |
| 숫자·문서 가로 오버플로 | `0 / 0` | `0 / 0` | `0 / 0` |
| Hero / About 핵심 역량 | `없음 / 4개` | `없음 / 4개` | `없음 / 4개` |
| About 원본 컬러 | 표시 | 표시 | 표시 |
| 로드 완료 이미지 오류 | `0` | `0` | `0` |

- 세 너비 모두 새 로고 순서 8개와 `아키랩, FIXNESS`를 확인했다.
- 회사별 맞춤 `heroContent`는 Hero의 맞춤 키워드 3개를 유지하고 About에 기본 태그를 섞지 않는 회귀 테스트를 통과했다.
- 검증 명령: 관련 Vitest `21/21`, TypeScript `tsc --noEmit`, 변경 파일 ESLint, Vite 6.4.3 production build 모두 성공했다.
- production asset: main `139.53KiB gzip`, CSS `14.38KiB gzip`, Typebot lazy `199.27KiB gzip`. 기존 500kB chunk 안내 외 build 실패·새 경고는 없다.
- 현재 배포 가능 여부: `가능`.

#### 배포 후 실제 URL 점검

- 기능 배포 커밋: `6024c950a2f051238420290eef1c03f12db6b0a4` (`feat: refine portfolio metrics and about evidence`).
- GitHub Actions: `Deploy Portfolio to GitHub Pages` run `#38`, ID `32566161233`의 build·deploy가 모두 성공했다 — `https://github.com/gmbro/portfolio/actions/runs/32566161233`.
- 실제 공개 URL: `https://archilab.ai.kr/`.
- 캐시 우회 URL `https://archilab.ai.kr/?rev=6024c95`에서 새 main JS `index-CySRrqD9.js`와 CSS `index-CDh4Mc4E.css`를 확인했다.

| 항목 | 390×900 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| Hero 높이 | `832px` | `832px` | `832px` |
| 통계 카드 폭·높이 | `104×120px` | `208×160px` | `331×160px` |
| 통계 숫자 font-size | `32.0px` | `47.5px` | `84.2px` |
| label 상단 / 숫자 오버플로 | `확인 / 0` | `확인 / 0` | `확인 / 0` |
| 전체 가로 오버플로 | `0` | `0` | `0` |
| Hero / About 핵심 역량 | `없음 / 4개` | `없음 / 4개` | `없음 / 4개` |
| About 원본 컬러 / 아키 수행 주체 | `확인 / 확인` | `확인 / 확인` | `확인 / 확인` |
| 로드 완료 이미지 오류 | `0` | `0` | `0` |

- 실제 URL의 로고 순서는 `NIPA → Neosapience → LG → KISA → Busan → Syrup → NHN → Fixness`로 확인했다.
- 아키 프로젝트에는 `수행 주체 / 아키랩, FIXNESS`가 표시되고, Experience의 회사명 `아키랩`은 유지된다.
- 현재 아키 증거 이미지 등록값은 `1809×1311`, `1355×1311`, `1784×1311px`이며, 신규 이미지 표준은 4:3 `1600×1200px` PNG다. 현재 4:3 `object-contain` 프레임은 다른 원본 비율을 자르지 않고 여백으로 보존한다.
- 최종 publication: 기본 공개 포트폴리오 base revision 36. 회사별 publication 신규 생성 없음.
- 배포 결과: `성공`.

---

### 2026-08-22 / Hero 역할 3분할·협업사 로고 복원 / base revision 35

- 작업 대상 URL: `/`의 `#hero`
- 로컬 미리보기 URL: `http://127.0.0.1:4178/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 35
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 사실 출처: 사용자가 직접 지정한 Hero 라벨 3개와 기존 공개 투명 협업사 로고 8개. 새 경력·성과·협업 관계는 추가하지 않는다.

#### 1단계 — 요청·채용 신호 분석

특정 JD는 제공되지 않았다. 따라서 일반 채용 검토에서 첫 화면의 역할·경력 범위와 프로젝트 수행 맥락을 빠르게 스캔하는 신호만 다룬다.

| 우선순위 | 평가자가 확인할 신호 | 이번 revision의 방향 | 근거 강도 |
|---:|---|---|---|
| 1 | 이 화면이 포트폴리오이며 지원자의 역할·경력 범위가 무엇인가 | 하나의 긴 역할 배지를 `Portfolio`, `AI Product Manager`, `7 years of experience` 세 배지로 분리 | 사용자 직접 지정 |
| 2 | 어떤 기관·서비스와 프로젝트를 수행했는가 | 이전에 검증한 투명 로고 8개를 지표 아래에 제목 없이 복원 | 기존 공개 자산·사용자 복원 요청 |
| 3 | 회사별 맞춤 링크의 의미가 기본 포트폴리오와 섞이지 않는가 | 협업사 로고는 기본 `/`에만 표시하고 맞춤 Hero는 기존 데이터만 사용 | 기존 publication 계약 |

#### 2단계 — 검증 근거 구조화

| 근거 | 출처 | 공개 범위 | 확대 금지 |
|---|---|---|---|
| 역할 라벨 3개 | 이번 사용자 주석 | Hero 상단의 독립 배지 | 직급·연차·전문성을 새 사실로 확장하지 않음 |
| NIPA·부산광역시·LG유플러스·KISA·네오사피엔스·NHN Cloud·Syrup Wallet·Fixness 로고 | 기존 `heroLogos.ts`와 `public/logos/partners` 투명 WebP | 기본 포트폴리오의 수행 경험 맥락 | 재직·고객·후원·현재 제휴 관계로 해석하지 않음 |

#### 3단계 — Hero 콘텐츠 3안

| 안 | 구성 | 판단 |
|---:|---|---|
| 1 | 기존 `AI Product Manager with 7 years of experience` 한 배지 유지 | 역할·경력·문서 성격이 한 덩어리여서 제외 |
| 2 (채택) | `Portfolio` · `AI Product Manager` · `7 years of experience` 독립 배지 | 사용자 지정값과 일치하고 5초 스캔이 가장 빠름 |
| 3 | `Portfolio`와 `AI Product Manager · 7 years` 두 배지 | 경력 범위를 다시 합쳐 사용자 지시와 달라 제외 |

#### 4단계 — 웹사이트 적용 계획

1. 기본 Hero 데이터의 역할·경력 값을 분리하고 기존 회사별 publication 필드는 그대로 보존한다.
2. Hero 배지를 의미 있는 목록으로 렌더하고 390px에서는 배지 단위로만 줄바꿈되게 한다.
3. 기본 `/`에만 협업사 로고 8개를 지정 순서로 복원한다. `Project partner company` 제목은 복원하지 않는다.
4. Hero의 832px 높이 상한을 유지하면서 모바일·태블릿 4×2, 웹 8×1의 compact 로고 행으로 구성한다.
5. 동일한 390×844, 768×900, 1440×900에서 오버플로·이미지 로드·Hero 높이·회사별 fallback을 재검사한다.

#### 1차 진단 — 수정 전

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1,425 / 1,425` |
| Hero 높이 | `832px` | `832px` | `832px` |
| 역할 배지 | 1개 · 합성 문구 | 1개 · 합성 문구 | 1개 · 합성 문구 |
| 협업사 로고 | 0개 | 0개 | 0개 |
| 깨진 이미지 | 0개 | 0개 | 0개 |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE35-001 | Hero 역할 | 세 의미가 `AI Product Manager with 7 years of experience` 한 배지에 합쳐짐 | 포트폴리오 성격·직무·경력 범위를 분리해 스캔하기 어려움 | 높음 | 독립 배지 3개와 목록 접근성 적용 | 발견 |
| QA-BASE35-002 | Hero 협업사 | 이전 revision에서 제목 제거 요청을 로고 전체 제거로 잘못 확대해 로고 8개가 사라짐 | 수행 프로젝트의 조직·서비스 폭을 첫 화면에서 확인할 수 없음 | 차단 | 제목 없이 기존 투명 로고와 순서를 복원 | 발견 |
| QA-BASE35-003 | 반응형 | 로고 복원 시 832px Hero의 콘텐츠 높이·모바일 가로 폭 회귀 가능 | 다음 About이 다시 밀리거나 로고가 지나치게 작아질 수 있음 | 높음 | compact 4×2/8×1 grid와 동일 조건 재검사 | 발견 |
| QA-BASE35-004 | 맞춤 링크 | 기본 로고를 공통 Hero에 무조건 노출하면 회사별 publication의 의미와 섞일 수 있음 | 맞춤 지원 문맥의 사실 범위가 불명확해짐 | 높음 | 기본 `heroContent === undefined`에서만 노출 | 발견 |

- 수정 전 브라우저 console용 깨진 이미지는 0건이고 세 너비 모두 가로 오버플로가 없다.
- 수정 전 기록을 완료했다. 다음 단계에서 Hero·기본 데이터·테스트·제품·디자인 문서를 직접 수정한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE35-001 | `src/types/portfolio.ts`, `src/components/Hero.tsx` | 기본 역할 문자열을 `AI Product Manager`와 `7 years of experience`로 분리하고, 고정 `Portfolio`를 더한 의미 있는 3개 목록 배지로 렌더 | 사용자 지정 문구 반영 | 통과 |
| QA-BASE35-002 | `src/components/Hero.tsx`, `src/data/heroLogos.ts` | 기존 투명 로고 8개를 NIPA → 부산광역시 → LG유플러스 → KISA → 네오사피엔스 → NHN Cloud → Syrup Wallet → Fixness 순서로 지표 아래에 복원하고 별도 제목은 두지 않음 | 새 협업 사실 없음 | 통과 |
| QA-BASE35-003 | `src/components/Hero.tsx`, `src/index.css` | 기존 Hero `832px` 상한을 유지하고 모바일·태블릿 4×2, 웹 8×1의 compact logo grid 적용 | 없음 | 통과 |
| QA-BASE35-004 | `src/pages/Index.tsx`, `src/test/index.test.tsx`, `src/test/portfolio.test.ts` | 로고를 기본 `/`에서만 활성화하고 회사별 맞춤 Hero에는 3개 맞춤 배지만 표시되는 회귀 테스트 추가 | 없음 | 통과 |
| QA-BASE35-005 | `src/components/ui/chart.tsx`, `src/components/ui/input-otp.tsx` | 배포 워크플로의 TypeScript 5.9 검사에서 드러난 미사용 UI scaffold의 Recharts generic tooltip·OTP context 타입 경계를 명시해 CI 차단 오류 제거 | 없음 | 통과 |
| QA-BASE35-DOC | `product.md`, `design.md`, `deploy.md` | 3개 배지·제목 없는 로고·기본 페이지 한정 규칙과 배포 전후 검사 근거를 문서화 | 없음 | 통과 |

#### 동일 조건 재검사

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1,425 / 1,425` |
| Hero 높이 | `832px` | `832px` | `832px` |
| 독립 역할 배지 | 3개 | 3개 | 3개 |
| 협업사 로고 | 8개 · 4×2 | 8개 · 4×2 | 8개 · 8×1 |
| 로고 원본 로드 | 8 / 8 | 8 / 8 | 8 / 8 |
| 깨진 이미지 | 0개 | 0개 | 0개 |
| 가로 오버플로 | 없음 | 없음 | 없음 |
| 전체 결과 | 통과 | 통과 | 통과 |

- 세 너비 모두 `Portfolio`, `AI Product Manager`, `7 years of experience` 순서가 유지되고 배지 내부가 잘리지 않는다.
- `Project partner company` 제목은 0건이며, 로고 순서와 각 이미지의 natural width를 직접 확인했다.
- 회사별 맞춤 Hero에는 기본 로고가 섞이지 않는 회귀 테스트가 통과했다.
- 브라우저 로그는 Vite 연결·HMR·React 개발 안내만 있으며 warning·error는 0건이다.
- TypeScript `--noEmit -p tsconfig.app.json`: 통과.
- Vitest: 9개 파일, 54/54 통과.
- ESLint: 오류 0, 기존 미사용 UI scaffold의 Fast Refresh 경고 7개.
- production build: 통과. main CSS `index-BH2EZHbR.css` 79.70kB, main JS `index-CFZ42Jpx.js` 434.94kB, Typebot lazy chunk `web-DX435HX4.js` 697.83kB.
- `git diff --check`: 통과.
- 미해결 차단 문제: 없음.
- 배포 가능 여부: `가능`.

#### 배포 후 실제 URL 점검

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| 실제 URL 직접 로드 | 통과 | 통과 | 통과 |
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1,425 / 1,425` |
| Hero 높이 | `832px` | `832px` | `832px` |
| 독립 역할 배지 | 3개 · 통과 | 3개 · 통과 | 3개 · 통과 |
| 협업사 로고 | 8개 · 4×2 | 8개 · 4×2 | 8개 · 8×1 |
| 로고 로드 / 깨진 이미지 | `8 / 8` · 0개 | `8 / 8` · 0개 | `8 / 8` · 0개 |
| 가로 오버플로 | 없음 | 없음 | 없음 |
| 브라우저 warning / error | 0 / 0 | 0 / 0 | 0 / 0 |

- 배포 커밋: `06c082b5ec82759b921d6398e9f13e2cc283934d` (`feat: refine portfolio evidence and restore hero partners`).
- GitHub Actions: `Deploy Portfolio to GitHub Pages` run #37, ID `32564627307`, `completed / success`.
- GitHub Pages deployment: ID `6035284080`, 최종 state `success`, environment URL `https://archilab.ai.kr/`.
- 캐시 우회 URL `https://archilab.ai.kr/?rev=06c082b`를 직접 열어 새 main JS `index-BBm1S9ky.js`와 CSS `index-BH2EZHbR.css`를 확인했다.
- 라이브 Hero는 `Portfolio` → `AI Product Manager` → `7 years of experience` 순서를 유지하고, 제목 없이 로고 8개를 NIPA → 부산광역시 → LG유플러스 → KISA → 네오사피엔스 → NHN Cloud → Syrup Wallet → Fixness 순으로 표시한다.
- 같은 배포에서 이전 승인 변경인 About 무채색 인물 이미지, 아키 이미지 점 내비게이션 3개, 데스크톱 Contact form 1,280px, Navbar `이경민 AI` 버튼도 실서비스에서 확인했다.
- canonical은 `https://archilab.ai.kr/`, 기본 `/`에는 robots noindex가 없어 기존 indexable 정책을 유지한다.
- 최종 공개 URL: `https://archilab.ai.kr/`.
- publication 상태: 기본 공개 포트폴리오 base revision 35 배포 완료. 회사별 publication 신규 생성 없음.
- 배포 결과: `성공`.

---

### 2026-08-22 / 인물·AI 대화·증거 갤러리·Hero 반응형 정리 / base revision 34 로컬 후보

- 작업 대상 URL: `/`의 `#hero`, `#about`, `#case-studies`, `#contact`와 포트폴리오 AI 창
- 로컬 미리보기 URL: `http://127.0.0.1:4178/`
- 공개 URL: `https://archilab.ai.kr/` — 이번 요청에서는 배포하지 않음
- 대상 revision: 기본 포트폴리오 base revision 34 로컬 후보
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 사실 출처: 사용자가 직접 제공한 `me.png`, 기존 개인 프로필 사진과 아키 증거 이미지 3개. 새 회사·역할·성과·수치는 추가하지 않는다.

#### 1단계 — 요청·채용 신호 분석

| 우선순위 | 평가자가 확인할 신호 | 이번 revision의 방향 |
|---:|---|---|
| 1 | 프로젝트 주장과 실제 화면 증거를 한 카드에서 빠르게 연결할 수 있는가 | 아키 증거 PNG 3장을 한 프로젝트의 한 행·한 장씩 보이는 자동 슬라이드에 연결 |
| 2 | 포트폴리오 AI가 이경민 본인의 보조 인터페이스라는 점이 명확한가 | Navbar·채팅 제목을 `이경민 AI`로 통일하고 첫 안내 아이콘도 기존 개인 사진으로 교체 |
| 3 | 넓거나 세로가 긴 화면에서도 핵심 섹션이 균형 있게 보이는가 | Hero의 무제한 `100svh` 확장을 제한하고 Contact 폼을 데스크톱 컨테이너 폭에 맞춤 |
| 4 | About 인물 사진이 전체 다크 톤앤매너와 경쟁하지 않는가 | 이미지와 주변 halo를 무채색으로 바꾸고 1:1 영역을 꽉 채우되 비율을 유지 |

- 특정 JD가 제공되지 않았으므로 기존 경력 서사·프로젝트 순서·성과 수치는 유지한다.
- 채용 담당자가 텍스트 주장보다 먼저 실제 제품 화면을 확인할 수 있도록 이미지 접근성을 높이되, 설명 목록과 반복 caption은 화면에서 제거하고 alt로 보존한다.

#### 2단계 — 검증 근거 구조화

| 근거 | 출처 | 공개 사용 범위 | 금지 범위 |
|---|---|---|---|
| About 인물 사진 | Supabase `videi/me.png`, 548×548 RGBA | 이경민 본인을 식별하는 About 보조 이미지 | 새 직함·경력 사실 추론 |
| 챗봇 개인 사진 | 기존 `chatbotAvatar` bubble icon | Navbar CTA, 채팅 헤더, 첫 안내 메시지 avatar | AI 생성 인물이나 새 브랜드 로고로 교체 |
| 아키 화면 1 | 사용자 제공 `arky1.png`, 1809×1311 | 로그인·캘린더·수업 상세를 묶은 제품 화면 | 화면에 없는 성과 수치 추론 |
| 아키 화면 2 | 사용자 제공 `arky2.png`, 1355×1311 | 모바일 기록 사용 장면과 제품 가치 요약 화면 | 별도 사용자 후기처럼 확대 해석 |
| 아키 화면 3 | 사용자 제공 `arky3.png`, 1784×1311 | 아키 이용 매뉴얼 | 기능 완료율·활성 사용자 수 추론 |

#### 3단계 — UI 대안 비교

| 안 | 프로젝트·이미지 구성 | 판단 |
|---:|---|---|
| 1 | 기존 2열 프로젝트 카드와 3줄 자료 목록을 유지하고 URL만 추가 | 이미지 폭이 데스크톱 461px에 머물고 이후 증거 추가 규칙이 불명확해 제외 |
| 2 (채택) | 모든 프로젝트를 한 행에 하나씩 배치하고, 프로젝트별 갤러리는 한 번에 한 장만 크게 표시 | 웹·모바일 모두 같은 탐색 방식이며 향후 프로젝트별 PNG 추가가 단순함 |
| 3 | 썸네일만 표시하고 확대 dialog에서만 원본 확인 | 첫 화면의 시각 증거가 약해져 제외 |

- 자동 넘김 간격 2초, 수동 이전·다음·점 이동, 키보드, 확대 dialog, focus 복귀, reduced-motion 정지는 유지한다.
- inline caption과 `랜딩 페이지 / 기록 화면 / 아키텍처` 같은 3줄 요청 목록은 제거하고, 이미지 alt와 확대 dialog의 접근성 설명만 유지한다.

#### 4단계 — 웹사이트 적용 계획

1. About 이미지 wrapper와 이미지 filter를 무채색으로 바꾸고 1:1 영역을 채운다.
2. Navbar CTA와 채팅 제목을 `이경민 AI`로 통일하고, 채팅 헤더·첫 안내 메시지에 같은 개인 사진을 사용한다.
3. 아키 프로젝트에 검증된 PNG 3개와 원본 크기·대체 텍스트를 등록한다.
4. 프로젝트 목록을 모든 너비에서 한 프로젝트당 한 행으로 만들고, 시각 자료를 full-width로 배치한다.
5. 갤러리의 요청 목록·가시 caption·별도 상태 행을 제거하고 이미지 영역과 단일 제어 행을 확대한다.
6. Contact 폼은 1024px 이상에서 부모 `max-w-7xl` 폭을 사용하고 모바일·태블릿은 기존 폭을 유지한다.
7. Hero는 콘텐츠 기반 높이를 유지하되 `min(100svh, 52rem)`로 세로가 긴 화면의 과도한 공백을 막는다.

#### 1차 진단 — 수정 전

| ID | 너비 | 섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---:|---|---|---|---|---|---|
| QA-BASE34-001 | 390·768·1440px | About | 인물 이미지는 컬러이고 wrapper·halo에 코랄 색이 남음 | 요청한 회색 톤앤매너와 불일치 | 높음 | wrapper·halo·이미지를 모두 무채색으로 전환 | 발견 |
| QA-BASE34-002 | 390px | Navbar·포트폴리오 AI | CTA는 `AI에게 묻기`, 채팅 제목은 `AI PM 이경민`, 첫 안내 avatar는 검은 `AI` 아이콘 | 본인 AI라는 인지와 개인 사진의 일관성이 약함 | 높음 | `이경민 AI`와 기존 개인 사진으로 통일 | 발견 |
| QA-BASE34-003 | 1440px | Contact | 컨테이너는 1,280px인데 폼은 768px에 고정돼 오른쪽 512px이 비어 있음 | 넓은 화면에서 다른 섹션보다 작고 좌측에 몰려 보임 | 높음 | `lg:max-w-none`으로 컨테이너 폭 사용 | 발견 |
| QA-BASE34-004 | 390·768·1440px | 아키 증거 이미지 | 실제 이미지는 0개이고 224px 빈 상태 아래에 3줄 요청 목록이 표시됨 | 텍스트 주장과 실제 제품 증거를 연결할 수 없음 | 차단 | 사용자 제공 PNG 3개 등록, 3줄 목록 제거 | 발견 |
| QA-BASE34-005 | 1440px | Projects | 첫 프로젝트 시각 자료가 461px 오른쪽 열에 제한되고 나머지 프로젝트는 2열 카드 | 프로젝트별 증거 이미지의 폭·패턴이 화면에 따라 달라짐 | 높음 | 모든 프로젝트 한 행, 갤러리 full-width 배치 | 발견 |
| QA-BASE34-006 | 1600×2200 | Hero | `min-h-[100svh]`로 Hero가 2,200px까지 늘고 About 시작점도 2,200px | 세로가 긴 화면에서 과도한 공백 때문에 다음 영역을 발견하기 어려움 | 차단 | Hero 최소 높이를 `min(100svh, 52rem)`로 제한 | 발견 |
| QA-BASE34-007 | 390·768·1440px | 전체 | 새 URL·문구·폭·높이 변경 후 가로 오버플로와 키보드 동작이 미검증 | 반응형·접근성 회귀 가능 | 높음 | 동일 조건과 세로 긴 화면을 직접 재검사 | 발견 |

수정 전 실측:

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Hero 높이 / About 시작점 | `844 / 844px` | `900 / 900px` | `900 / 900px` |
| About 이미지 / filter | `166×166 / none` | `198×198 / none` | `262×262 / none` |
| Contact 컨테이너 / 폼 폭 | `327 / 327px` | `657 / 657px` | `1,280 / 768px` |
| 아키 갤러리 / 전체 시각 슬롯 | `275×224 / 277×348px` | `589×224 / 591×348px` | `461×224 / 463×348px` |
| 아키 요청 목록 | 3줄 | 3줄 | 3줄 |

- 추가 세로 긴 화면 `1600×2200`: Hero `2,200px`, About 시작점 `2,200px`, 문서 높이 `8,193px`.
- 390px 채팅창: Navbar CTA `AI에게 묻기`, 제목 `AI PM 이경민`, 헤더에는 개인 사진이 있으나 첫 안내 메시지는 `AI` 문자 아이콘이다.
- 세 기본 너비의 전체 가로 오버플로는 0이며 이 값을 회귀 기준으로 유지한다.
- 수정 전 기록을 완료했다. 이제 위 범위만 직접 수정한다.

#### 직접 수정

| ID | 수정 파일·외부 설정 | 직접 수정 내용 | 사실 변경 | 결과 |
|---|---|---|---|---|
| QA-BASE34-001 | `src/components/About.tsx` | 코럴 halo를 제거하고 중립 wrapper, `grayscale`, `object-cover`로 인물 이미지를 무채색 1:1 영역에 맞춤 | 없음 | 해결 |
| QA-BASE34-002 | `src/components/Navbar.tsx`, `src/components/TypebotBubble.tsx`, `src/data/chatbot.ts` | 단일 진입점과 채팅 제목을 `이경민 AI`로 변경하고 헤더·첫 안내 메시지에 같은 개인 사진 사용 | 없음 | 해결 |
| QA-BASE34-003 | `src/components/Contact.tsx` | 모바일·태블릿의 `max-w-3xl`은 유지하고 `lg:max-w-none`으로 데스크톱 폼을 컨테이너 폭까지 확장 | 없음 | 해결 |
| QA-BASE34-004 | `src/data/portfolio.ts`, `src/components/EvidenceMediaGallery.tsx`, `src/components/ImageCards.tsx` | 아키 PNG 3개·원본 크기·alt 등록, 3줄 요청 목록과 가시 caption 제거, 4:3 한 장 슬라이드·확대 보기 구성 | 없음 | 해결 |
| QA-BASE34-005 | `src/components/ImageCards.tsx` | 프로젝트 2열을 제거하고 모든 화면에서 한 프로젝트당 한 행, 갤러리 full-width 배치 | 없음 | 해결 |
| QA-BASE34-006 | `src/components/Hero.tsx`, `src/index.css` | Hero 최소 높이를 `min(100svh, 52rem)`로 제한 | 없음 | 해결 |
| QA-BASE34-007 | `product.md`, `design.md`, `analytics.md`, `evidence-images.md`, 관련 테스트 | 구현 계약·등록 규격·분석 진입점·반응형 회귀 테스트를 실제 UI와 동기화 | 없음 | 해결 |
| 검증 보조 | `eslint.config.js` | 사용자 소유 임시 `node_modules 2`를 검사 대상에서 제외해 애플리케이션 소스 lint 결과를 분리 | 없음 | 완료 |

#### 동일 조건 재검사

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1,425 / 1,425` |
| Hero 높이 / About 시작점 | `832 / 832px` | `832 / 832px` | `832 / 832px` |
| About 이미지 / filter | `174×174 / grayscale(1)` | `206×206 / grayscale(1)` | `270×270 / grayscale(1)` |
| Contact 컨테이너 / 폼 폭 | `327 / 327px` | `657 / 657px` | `1,280 / 1,280px` |
| 아키 이미지 프레임 / 갤러리 | `275×206 / 275×274px` | `589×442 / 589×510px` | `1,196×897 / 1,196×965px` |
| 아키 요청 목록 / 선택점 | `0줄 / 3개` | `0줄 / 3개` | `0줄 / 3개` |
| 가로 오버플로 | `0px` | `0px` | `0px` |

- 추가 세로 긴 화면 `1600×2200`: Hero `832px`, About 시작점 `832px`, 같은 화면에서 About과 Projects 시작부까지 확인했다.
- About 이미지는 세 너비에서 `brightness(0.96) contrast(1.06) grayscale(1)`과 `object-fit: cover`가 적용됐다.
- 아키 첫 PNG는 브라우저에서 `naturalWidth 1809`, `naturalHeight 1311`로 로드됐고, 2.3초 관찰에서 `arky2.png → arky3.png` 자동 전환을 확인했다.
- 확대 dialog는 모바일에서 열림·닫기 버튼·Escape 종료·원래 이미지 버튼으로의 포커스 복귀가 모두 동작했다.
- 모바일 채팅창 제목은 `이경민 AI`, 헤더와 첫 안내 메시지의 이미지 2개는 동일한 기존 개인 사진 URL이며 가시 `AI` 문자 fallback은 없다.
- 브라우저 콘솔 오류·경고 0건, 전체 테스트 `53/53`, production build 통과, lint 오류 0건이다. 기존 UI 공용 컴포넌트의 Fast Refresh 경고 7건은 이번 변경과 무관하게 남아 있다.
- 검사 후 브라우저의 임시 viewport override를 해제했다.

#### 배포 후 실제 URL 점검

- 이번 요청은 로컬 수정·검증 범위이며 실제 배포는 사용자 지시 전까지 진행하지 않는다.

---

### 2026-08-22 / About 인물 이미지 배치 / base revision 33 로컬 후보

- 작업 대상 URL: `/`의 `#about`
- 로컬 미리보기 URL: `http://127.0.0.1:4178/`
- 공개 URL: `https://archilab.ai.kr/` — 이번 요청에서는 배포하지 않음
- 대상 revision: 기본 포트폴리오 base revision 33 로컬 후보
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 사실 출처: 사용자가 직접 제공한 `me.png`. 새 회사·역할·성과·수치는 추가하지 않는다.
- 원본 자산: Supabase 공개 PNG, `548×548px`, RGBA 투명 배경, 약 316KB

#### 1단계 — 요청·채용 신호 분석

| 우선순위 | 평가자가 확인할 신호 | 이번 revision의 방향 |
|---:|---|---|
| 1 | 포트폴리오의 주체가 누구인지 About에서 즉시 인지할 수 있는가 | 사용자 제공 실제 인물 이미지를 이름·자기소개를 보조하는 시각 근거로 배치 |
| 2 | 이미지가 경력 본문을 방해하지 않고 정보 위계를 강화하는가 | 데스크톱의 왼쪽 빈 공간을 사용하고 오른쪽 본문·역량 카드는 유지 |
| 3 | 모바일에서도 인물 이미지가 과도한 세로 공간이나 초기 로딩을 만들지 않는가 | 176→208→약 272px 반응형 크기, 지연 로딩, 명시 크기로 구성 |

핵심 판단:

- 이미지는 원형으로 마스킹된 투명 PNG이며 인물이 화면 오른쪽을 바라본다. About 왼쪽 제목 아래에 배치하면 시선이 오른쪽 본문으로 이어진다.
- 텍스트 배경이나 큰 배너로 사용하면 본문 대비와 채용 정보 탐색 속도를 해치므로 독립된 보조 이미지로만 사용한다.
- 이미지 자체가 경력 사실을 추가하지 않으므로 기존 About 카피와 역량 3개는 변경하지 않는다.

#### 2단계 — 증거 구조화

| 항목 | 확인값 | 적용 원칙 |
|---|---|---|
| 출처 | 사용자 제공 Supabase 공개 URL | 해당 URL을 그대로 사용 |
| 파일 계약 | PNG · 548×548 · 1:1 · alpha 포함 | `aspect-square`, `object-contain`, 명시적 width/height |
| 시각 내용 | 사람들 앞에서 발표 중인 이경민 | 대체 텍스트 `발표 중인 이경민` |
| 성능 | 약 316KB, 응답은 `no-cache` | About은 첫 화면 아래이므로 `loading=lazy`, `decoding=async` |
| 공개 사실 | 인물 식별과 발표 장면만 확인 가능 | 특정 회사·프로젝트·성과로 귀속하지 않음 |

#### 3단계 — 배치안 비교

| 안 | 구성 | 가독성 | 반응형 | 판단 |
|---|---|---|---|---|
| 1 | 왼쪽 제목 아래 원형 이미지, 오른쪽 본문 유지 | 제목→인물→본문으로 위계가 명확 | 모바일은 제목 아래 중앙, 데스크톱은 왼쪽 정렬 | 채택 |
| 2 | 오른쪽 본문 사이에 이미지 삽입 | 의미 단락의 흐름을 끊음 | 태블릿에서 본문 폭이 좁아짐 | 제외 |
| 3 | About 전체 배경 이미지 | 텍스트 대비를 위해 강한 오버레이 필요 | 인물 크롭과 위치 변동이 큼 | 제외 |

- 최종안: 왼쪽 열 H2 아래에 이미지 전용 `figure`를 배치한다.
- 크기: 모바일 `176px`, `sm` `208px`, `lg` 약 `272px`.
- 표현: 얇은 흰색 테두리, 낮은 코럴 halo와 그림자만 적용해 기존 검정·코럴 톤을 유지한다.

#### 4단계 — 웹사이트 적용 계획

| 필드 | 적용값 | 위치 |
|---|---|---|
| 이미지 URL | `https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/me.png` | `About.tsx` |
| 이미지 크기 | 원본 `548×548`, 렌더 `176/208/272px` | 반응형 wrapper |
| 대체 텍스트 | `발표 중인 이경민` | `<img alt>` |
| 로딩 | `loading="lazy"`, `decoding="async"` | `<img>` |
| 크롭 | `object-contain object-center` | 원형 alpha·손동작 보존 |
| 회귀 계약 | URL·alt·width·height·lazy 속성과 About 내부 순서 | `src/test/index.test.tsx` |

#### 1차 진단 — 수정 전

base revision 32 로컬 후보를 같은 브라우저에서 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `11,513px` | `9,880px` | `6,839px` |
| About 높이 | `926px` | `800px` | `526px` |
| About grid | 327px 단일 열 | 657px 단일 열 | `438px / 778px` 2열 |
| About 인물 이미지 | 0개 | 0개 | 0개 |
| 실제 가로 오버플로 | 0 | 0 | 0 |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE33-001 | About 왼쪽 열 | 데스크톱에서 제목 아래 큰 빈 공간이 남고 인물 식별 이미지가 없음 | 포트폴리오 주체에 대한 개인적 인지와 좌우 시각 균형이 약함 | 보통 | 제목 아래 사용자 제공 이미지를 독립 배치 | 발견 |
| QA-BASE33-002 | 이미지 계약 | 원본 크기·alpha·크롭·지연 로딩 계약이 코드에 없음 | 레이아웃 이동, 원형 가장자리 잘림, 불필요한 초기 로딩 가능 | 높음 | 명시 크기·`object-contain`·lazy/async 적용 | 발견 |
| QA-BASE33-003 | 반응형 | 모바일·태블릿 이미지 크기와 본문 순서가 아직 미정 | 이미지가 소개글보다 과도하게 커지거나 세로 탐색을 지연할 수 있음 | 보통 | 176/208/272px 크기와 중앙→좌측 정렬을 같은 3폭에서 검증 | 발견 |

- 기존 About H2·3개 본문·역량 3개는 세 너비에서 잘림과 가로 오버플로가 없다.
- 위 문제와 수정 방향을 먼저 기록했으며, 이제 About·문서·회귀 테스트만 최소 수정한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE33-001 | `src/components/About.tsx` | 왼쪽 H2 아래에 사용자 제공 원형 이미지를 배치하고 모바일 중앙·데스크톱 왼쪽 정렬, 기존 검정·코럴 톤의 낮은 테두리·halo를 적용했다. | 새 경력 사실 없음 | 통과 |
| QA-BASE33-002 | `src/components/About.tsx`, `src/test/index.test.tsx` | 원본 `548×548`, 의미 있는 alt, `object-contain`, lazy/async와 URL 회귀 테스트를 추가했다. React 18 경고를 만드는 불필요한 `fetchPriority`는 사용하지 않았다. | 없음 | 통과 |
| QA-BASE33-003 | `src/components/About.tsx` | 이미지 frame을 `176/208/272px`로 제한하고 1:1 비율을 고정했다. 제목·본문·역량 카드 순서와 폭은 보존했다. | 없음 | 통과 |
| 문서 | `product.md`, `design.md`, `deploy.md` | About 이미지의 역할·크기·크롭·성능·비귀속 원칙과 QA 결과를 문서화했다. | 공개 사실 변경 없음 | 완료 |

#### 동일 조건 재검사

수정 전과 동일한 Codex In-app Browser에서 `#about`을 직접 열어 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `11,721px` | `10,124px` | `6,893px` |
| About 높이 | `1,134px` | `1,044px` | `580px` |
| 이미지 frame | `176×176px`, 중앙 | `208×208px`, 중앙 | `272×272px`, 왼쪽 |
| 실제 이미지 | `166×166px` | `198×198px` | `262×262px` |
| 원본 로드 | `548×548`, 완료 | `548×548`, 완료 | `548×548`, 완료 |
| About / 루트 가로 오버플로 | `0 / 0` | `0 / 0` | `0 / 0` |
| 역량 카드 | 3개 유지 | 3개 유지 | 3개 유지 |

- 데스크톱은 기존 `438px / 778px` grid를 유지하며 이미지가 왼쪽 빈 공간을 채우고 오른쪽 본문·카드 폭을 변경하지 않는다.
- 모바일은 제목 → 176px 이미지 → 소개 본문 → 역량 카드 순서로 읽히며 잘림·의도하지 않은 크롭·텍스트 오버플로가 없다.
- 이미지 URL, `alt="발표 중인 이경민"`, lazy/async, 원본 자연 크기 `548×548`을 실제 DOM과 회귀 테스트에서 확인했다.
- 새 브라우저 탭의 fresh load console warning/error는 0이며 이미지 요청 실패도 없다.
- Vitest `53/53`, 변경 파일 ESLint 오류·경고 0, Vite 6.4.3 production build 성공, `git diff --check` 통과.
- build의 기존 `web` 청크 500KB 경고는 이번 About 이미지 변경과 무관하며 새 차단 문제는 아니다.
- QA-BASE33-001~003은 모두 해결했다. 이번 요청에는 배포 지시가 없으므로 공개 URL·Git에는 반영하지 않고 로컬 확인 상태로 둔다.
- 배포 가능 여부: `가능` — 사용자 확인 후 배포 요청 시 commit·push·실제 URL 3폭 재검사 진행.

---

### 2026-08-22 / 핵심 수치·경력 범위·섹션 모션 정리 / base revision 32

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 로컬 미리보기 URL: `http://127.0.0.1:4178/`
- 대상 revision: 기본 포트폴리오 base revision 32
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 배포 상태: 사용자 명시 요청에 따라 검사 통과 후 `origin/main` 배포 예정
- 사실 출처: 이번 사용자가 직접 확인한 `5+`, `3+`, `28억`, About 문구와 Adler 제외 범위. `28억`의 회사·기간·매출 유형은 별도 근거 없이 확대하지 않는다.

#### 1단계 — 요청·채용 신호 분석

| 우선순위 | 평가자가 확인할 신호 | 이번 revision의 방향 |
|---:|---|---|
| 1 | 첫 화면에서 프로젝트 폭·제품 책임·사업 기여를 빠르게 확인할 수 있는가 | Hero 지표를 `5+·3+·28억`으로 교체하고 새로고침 때 1회 카운트업 |
| 2 | 제너럴리스트와 AI 전문성의 관계가 간결한가 | About H2를 `저는 제너럴리스트이자 AI 스페셜리스트입니다.`로 압축 |
| 3 | 공개하려는 경력 범위가 정확한가 | 사용자 요청에 따라 Adler 객체를 데이터에서 제거하고 남은 6개 경력의 최신순 유지 |
| 4 | 긴 페이지에서 섹션 전환을 인지할 수 있는가 | 기존 About·Projects·Experience·Contact 진입 모션을 유지·통일하고 reduced motion에서 즉시 노출 |
| 5 | 마지막 Contact가 앞선 섹션과 같은 정보 축을 갖는가 | 바깥 컨테이너와 제목 왼쪽 기준선을 `max-w-7xl` 체계로 통일하고 폼은 읽기 폭 유지 |

#### 2단계 — 검증 근거 구조화

| 공개 값·변경 | 출처 등급 | 적용 범위 | 확대 금지 |
|---|---|---|---|
| `5+ / 수행 프로젝트` | 사용자 직접 확인 | Hero 집계값 | 공개 카드 5개를 전체 생애 총 프로젝트 수로 단정하지 않음 |
| `3+ / 제품 기획.운영` | 사용자 직접 확인 | Hero 집계값 | 특정 회사·프로젝트 3개로 임의 귀속하지 않음 |
| `28억 / 매출 기여` | 사용자 직접 확인 | Hero 집계값 | 매출 창출·계약액·GMV·특정 회사 성과로 임의 해석하지 않음 |
| Adler 제외 | 사용자 직접 요청 | 공개 경력 데이터·화면 | 다른 프로젝트·기간·역할을 함께 삭제하지 않음 |
| Project partner company 제외 | 사용자 직접 요청 | Hero의 제목·로고 8개 전체 | 협업 사실 자체를 다른 문구로 재가공하지 않음 |

#### 3단계 — Hero 콘텐츠 3안 비교

| 안 | Hero 방향 | 판단 |
|---:|---|---|
| 1 (채택) | 현재 `고객의 문제를 제품으로 해결합니다.`를 유지하고 지표만 `5+·3+·28억`으로 교체 | 사용자가 헤드라인 변경을 요청하지 않았고 가장 적은 변경으로 새 성과 구조를 전달 |
| 2 | `제품과 사업의 문제를 끝까지 해결합니다.`로 교체 | 제너럴리스트 신호는 강하지만 현재 승인 문구를 불필요하게 변경해 미채택 |
| 3 | `AI 제품의 기획·운영과 사업 성과를 연결합니다.`로 교체 | 수치와 직접 연결되지만 고객 문제 중심 메시지가 약해 미채택 |

- 카운트업은 최종 문자열을 접근성 이름으로 즉시 제공하고, 시각 숫자만 `0 → 목표값`으로 약 1.6초 동안 변한다.
- 숫자로 시작하지 않는 회사별 publication 지표는 애니메이션하지 않고 원문을 그대로 표시한다.
- `prefers-reduced-motion`에서는 카운트업과 진입 이동을 생략하고 최종 상태를 즉시 표시한다.

#### 4단계 — 웹사이트 적용 계획

| 범위 | 적용 내용 | 회귀 조건 |
|---|---|---|
| Hero | 협업사 영역 제거, 새 지표·카운트업 적용 | Hero 배경·역할·H1·키워드·프로젝트 ID 유지 |
| About | H2 한 문장으로 압축 | 본문·문제 탐색/우선순위/검증 3단계 유지 |
| Projects | H2를 `기여도가 높은 프로젝트를 소개합니다.`로 변경 | 5개 카드·문제/판단/실행/성과·링크 유지 |
| Experience | Adler 객체 전체 제외 | 남은 6개 최신순·기간·내부 ARIA ID 유지 |
| Contact | 다른 섹션과 같은 왼쪽 축·타이틀 리듬, 폼 `max-w-3xl` 유지 | label·입력 검증·EmailJS·fallback 변경 없음 |
| 모션 | 기존 in-view 지점에 동일한 reveal 표식·한 번 실행 | 전체 section 중첩 애니메이션과 긴 섹션 영구 opacity 0 방지 |

#### 1차 진단 — 수정 전 로컬 후보

base revision 31 로컬 후보를 390×844, 768×900, 1440×900에서 확인했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `11,992px` | `10,173px` | `7,028px` |
| Hero 지표 | `5개·3개·3억` | 동일 | 동일 |
| 협업사 제목 / 로고 | `1 / 8` | `1 / 8` | `1 / 8` |
| 경력 / Adler | `7 / 1` | `7 / 1` | `7 / 1` |
| Contact H2 왼쪽 | `24px` | `48px` | `328.5px` |
| 다른 섹션 H2 왼쪽 | `24px` | `48px` | `72.5px` |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE32-001 | Hero | 삭제 요청한 partner 제목과 로고 8개가 남음 | 첫 화면의 핵심 수치·정체성보다 협업사 시각 요소가 큰 공간 점유 | 차단 | Hero 렌더 블록·표시 prop·Index 전달 제거 | 발견 |
| QA-BASE32-002 | Hero | 지표가 `5개·3개·3억`이며 정적 표시 | 사용자 확인값과 새로고침 카운트업 요구 불일치 | 차단 | `5+·3+·28억`과 접근 가능한 1회 카운트업 적용 | 발견 |
| QA-BASE32-003 | About·Projects | 장문 About H2와 AI/PM 한정 Projects H2가 남음 | 사용자가 정한 간결한 제너럴리스트·프로젝트 메시지와 불일치 | 높음 | 두 H2를 지정 문구로 정확히 교체 | 발견 |
| QA-BASE32-004 | Experience | Adler를 포함한 7개 경력이 노출 | 공개 경력 범위가 사용자 요청과 불일치 | 차단 | 데이터 객체 전체 제거·테스트로 재유입 방지 | 발견 |
| QA-BASE32-005 | Contact | 1440px에서 Contact H2가 다른 섹션보다 `256px` 안쪽 | 영역마다 제목 축과 크기가 달라 페이지 마무리의 일관성 저하 | 높음 | 바깥 `max-w-7xl`, 헤더 `max-w-4xl`, 폼 `max-w-3xl`로 축 통일 | 발견 |
| QA-BASE32-006 | 모션 | 네 섹션에 기존 개별 in-view 모션은 있으나 일관된 회귀 표식·카운트 reduced-motion 계약이 없음 | 스크롤 전환 감각과 접근성 상태를 자동·브라우저 검사로 고정하기 어려움 | 보통 | 기존 모션을 중첩하지 않고 reveal 표식·reduced-motion 계약 보강 | 발견 |

1차 진단을 기록했으며, 다음 단계에서 위 여섯 항목만 직접 수정한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE32-001 | `Hero.tsx`, `Index.tsx` | `Project partner company` 제목·로고 렌더와 `showExperienceLogos` 표시 prop을 제거했다. 로고 데이터·원본 파일은 비파괴로 보존하되 런타임 import는 없앴다. | 사용자가 지정한 UI 범위만 제거 | 통과 |
| QA-BASE32-002 | `portfolio.ts`, `Hero.tsx`, `CountUpValue.tsx`, `countUp.ts` | 지표를 `5+·3+·28억`으로 교체하고 숫자+접미사 parser, 1.6초 ease-out 카운트업, tabular number, 최종값 전용 스크린리더 텍스트를 추가했다. 문자형 publication 값은 정적으로 fallback한다. | 사용자 직접 확인값 반영, 귀속 확대 없음 | 통과 |
| QA-BASE32-003 | `About.tsx`, `ImageCards.tsx` | About H2를 `저는 제너럴리스트이자 AI 스페셜리스트입니다.`, Projects H2를 `기여도가 높은 프로젝트를 소개합니다.`로 정확히 교체했다. | 사용자 지정 문구 반영 | 통과 |
| QA-BASE32-004 | `src/data/portfolio.ts` | Adler 경력 객체 전체를 공개 배열에서 제거했다. 다른 6개 경력과 프로젝트 5개의 순서·ID는 유지했다. | 사용자 지정 공개 범위 반영 | 통과 |
| QA-BASE32-005 | `Contact.tsx` | 바깥 컨테이너를 `max-w-7xl`, header를 `max-w-4xl`, form을 왼쪽 정렬 `max-w-3xl`로 구성하고 제목 타이포를 Projects와 같은 리듬으로 맞췄다. | 없음 | 통과 |
| QA-BASE32-006 | `About.tsx`, `ImageCards.tsx`, `Experience.tsx`, `Contact.tsx`, `App.tsx` | 기존 in-view 단위를 중첩하지 않고 `data-section-reveal` 회귀 표식을 추가했다. 각 요소의 `initial`을 `useReducedMotion`에서 `false`로 전환하고 전역 `MotionConfig reducedMotion=user`를 유지했다. | 없음 | 통과 |
| 회귀 검사 | `index.test.tsx`, `portfolio.test.ts`, `count-up-value.test.tsx` | 새 수치·문구, partner 0, 경력 6·Adler 0, reveal 표식, Contact 폭, parser fallback과 reduced-motion 즉시 최종값을 고정했다. | 없음 | `53/53` 통과 |
| 문서화 | `product.md`, `design.md`, `deploy.md` | 새 정보 구조·수치 귀속 금지·카운트업·섹션 진입·Contact 정렬·Adler 제외 기준을 동기화했다. | 없음 | 완료 |

#### 동일 조건 재검사

최종 production build를 동일한 390×844, 768×900, 1440×900에서 위→아래 직접 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `11,513px` | `9,880px` | `6,839px` |
| 최종 지표 | `5+ · 3+ · 28억` | 동일 | 동일 |
| stat 카드 높이 | `120 · 120 · 120px` | `126 · 126 · 126px` | `126 · 126 · 126px` |
| partner 제목 / 로고 | `0 / 0` | `0 / 0` | `0 / 0` |
| 경력 / Adler | `6 / 0` | `6 / 0` | `6 / 0` |
| About·Projects·Experience·Contact H2 왼쪽 | 모두 `24px` | 모두 `48px` | 모두 `72.5px` |
| Contact form 왼쪽 / 폭 | `24 / 327px` | `48 / 657px` | `72.5 / 768px` |

- 390px 새로고침 직후 시각 지표는 `0+·0+·0억`, 650ms에 `4+·2+·22억`, 1,850ms에 `5+·3+·28억`으로 종료됐다. DOM의 최종값 계약은 로드 첫 순간부터 `5+·3+·28억`이다.
- About·Projects·Experience·Contact의 대표 reveal 요소는 진입 전 `opacity:0`, `translateY(18px)`였고 실제 scroll 진입 650ms 뒤 모두 `opacity:1`, `transform:none`이 됐다. `once:true`로 재진입 때 반복하지 않는다.
- reduced motion unit test에서 `28억`이 첫 렌더부터 최종 상태로 표시되고, 문자형 `검증` 값은 카운트 DOM 없이 원문 그대로 표시되는 것을 확인했다.
- 세 너비 모두 새 About·Projects 문구, 경력 6개, 프로젝트 5개, Hero 배경·Navbar·단일 `AI에게 묻기`를 유지하며 가로 오버플로가 없다.
- production preview의 `/p/not-real-slug`, `/admin/links`, `/not-a-real-page`는 390px에서 모두 `390 / 390`, `noindex, nofollow`, Typebot·ambient·Google script 0으로 통과했다. 무효 맞춤 링크는 최종 `유효하지 않은 링크입니다` 상태로 전환됐다.
- Vitest `53/53`, 변경 파일 ESLint 오류·경고 0, 전체 `src` ESLint 오류 0·기존 UI scaffold Fast Refresh 경고 7, `git diff --check`, Vite production build가 통과했다.
- production build gzip은 HTML `1.16kB`, main `138.52kB`, CSS `14.02kB`, Typebot wrapper `1.27kB`, Typebot web runtime `199.27kB`다. 기존 500kB raw runtime 경고만 유지된다.
- 재사용 중인 로컬 `node_modules`에서만 변경하지 않은 `chart.tsx`·`input-otp.tsx`의 기존 타입 해석 오류가 재현됐다. GitHub Actions의 clean frozen install이 `tsc --noEmit`을 필수 실행하므로 해당 job 성공 전에는 배포 완료로 판단하지 않는다.
- production preview console warning/error 0. QA-BASE32-001~006은 모두 수정·재검사 완료이며 소스·화면 차단 문제는 없다.

#### 배포 후 실제 URL 점검

- 배포 커밋: `a215712eacb0dcff131bac2e8fd686eeb28fb377` (`Refine portfolio metrics careers and motion`)
- GitHub Actions: [Run #36](https://github.com/gmbro/portfolio/actions/runs/32559925249) `success`
  - `build` job `96999844287`: clean frozen install, `tsc --noEmit`, test, production build 모두 통과
  - `deploy` job `96999932233`: GitHub Pages 배포 통과
- 실제 URL: `https://archilab.ai.kr/` → `HTTP/2 200`, `server: GitHub.com`
- 배포 asset: `/assets/index-D_U9-hyG.js`, `/assets/index-t5MseBJA.css`

| 실제 배포본 | clientWidth / scrollWidth | 문서 높이 | Contact H2 / form 왼쪽 |
|---|---:|---:|---:|
| 390×844 | `375 / 375` | `11,513px` | `24 / 24px` |
| 768×900 | `753 / 753` | `9,880px` | `48 / 48px` |
| 1440×900 | `1425 / 1425` | `6,839px` | `72.5 / 72.5px` |

- 실제 배포본에서 `5+·3+·28억`, partner 제목·로고 0, 경력 6개·Adler 0, 새 About·Projects 문구를 재확인했다.
- 라이브 새로고침 직후 카운트업은 진행 중 값에서 시작해 650ms에 `4+·2+·23억`, 약 1.9초 뒤 `5+·3+·28억`으로 종료됐다.
- About·Projects·Experience·Contact는 각각 진입 전 `opacity:0 / translateY(18px)`, 진입 뒤 `opacity:1 / transform:none`으로 전환됐다.
- 실제 `/p/not-real-slug`, `/admin/links`, `/not-a-real-page`는 390px에서 오버플로 0, `noindex, nofollow`, Typebot·ambient 0을 유지했다.
- 실제 공개 URL의 브라우저 warning/error는 0이다. QA-BASE32-001~006 배포 후 재검사까지 모두 통과했다.

---

### 2026-08-22 / 65개 주석 콘텐츠 개정·증거 이미지 등록 규격 / base revision 31

- 작업 대상 URL: `/`
- 제외 URL: 유효한 `/p/:slug`, `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 로컬 미리보기 URL: `http://127.0.0.1:4178/`
- 대상 revision: 기본 포트폴리오 base revision 31 후보
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 배포 상태: 사용자가 이번 요청에서 배포를 지시하지 않았으므로 로컬 수정·검증 후 확인 대기
- 사실 출처: 이번 브라우저 주석 65개는 사용자가 직접 확인한 공개 문구·기간·수치·역할·기술 정보로 분류한다. 내부 프로젝트 ID·URL·분석 ID는 공개 카피와 분리해 보존한다.

#### 1단계 — 사용자 과업·채용 신호 분석

| 우선순위 | 핵심 역량 신호 | 사용자 주석 근거 | 숨은 의도 | 포트폴리오용 키워드 | 필요한 증거 | 신뢰도 |
|---:|---|---|---|---|---|---|
| 1 | AI 스페셜리스트이자 IT 제너럴리스트로 고객 문제 해결 | Hero·About 주석 2–10 | 직함보다 고객 문제와 사업 효과를 우선하는 PM 정체성 전달 | 고객 문제 · 제품 판단 · 사업 효과 | About 접근 방식과 프로젝트 CAR | 높음 |
| 2 | 직접 개발한 AI 제품의 기술·사용 검증 | 아키 주석 13–20 | Gemini·MediaPipe·Voice/Vision 동기화와 15명 베타를 현재 제품의 구체적 증거로 제시 | Gemini API · MediaPipe · 15명 베타 | 제품 화면·기록 화면·아키텍처 PNG | 높음 |
| 3 | 프로젝트별 담당 책임과 기여 범위 | 프로젝트 주석 21–42 | 프로젝트 제목·수행 조직·담당 책임을 더 빠르게 스캔 | 프로젝트 관리 · STT 제품 기획 · 사업 제휴 · 운영 효율화 | 문제·판단·실행·성과와 공개 산출물 | 높음 |
| 4 | 다양한 직무 경험과 재직 기간의 맥락 | Experience 주석 43–65 | 잦은 이직을 숨기지 않고 기간·역할·학습 방향을 투명하게 설명 | 기간 · 역할 확장 · 조직 선택 기준 | 회사별 기간 배지·역할·설명 | 높음 |
| 5 | 실제 증거 이미지의 일관된 등록·탐색 | 사용자 최종 요청 | 다음 단계에서 PNG를 추가해 텍스트 주장을 화면 근거로 확장 | 16:10 · 자동 슬라이드 · 확대 보기 | 프로젝트당 공개 PNG 3장 | 높음 |

| Pain Point | 근거 | 해석 | 포트폴리오 대응 방향 |
|---|---|---|---|
| 현재 카피가 사용자의 실제 문제 해결 관점과 최신 역할·수치를 충분히 반영하지 못함 | Hero·About·5개 프로젝트·7개 경력의 직접 교체 주석 | 채용 담당자가 현재 정체성과 프로젝트별 기여를 오래 해석해야 함 | 사용자 지정 카피를 모바일 가독성에 맞게 교정하고 필드 위계를 유지해 전면 교체 |
| 프로젝트 증거 영역이 모두 빈 상태 | 라이브의 `증거 이미지 준비 중` 5개 | 기술·성과 문장이 시각 자료로 검증되지 않음 | 기존 갤러리를 유지하고 `1600×1000px / 16:10` PNG 등록 경로·필드를 문서화 |

#### 2단계 — 역량 구조화·증거 매칭

| 경험명 | 출처 등급 | Challenge | Action | Result | 도구·방식 | 역량 태그 | 한 줄 포지셔닝 | 보강 필요 메모 |
|---|---|---|---|---|---|---|---|---|
| 아키 AI 기록 솔루션 | 검증됨 | 운동 강사 기록의 파편화·휘발과 회원 공유 부재 | Gemini API·MediaPipe 33개 관절 추적·Voice/Vision 동기화·AI 요약/분석 | 2026.06 개발 시작, 2026.08 기준 강사 15명 베타와 기능 고도화 | Gemini API, MediaPipe, 인터뷰·현장 피드백 | B2C 제품 · AI 개발 · 베타 검증 | 기술을 현장 기록·공유 문제에 연결한 직접 개발 제품 | 수익은 기대 수준이며 실제 매출로 확대 금지. 화면·아키텍처 PNG 필요 |
| Vision AI 품질 검사 | 검증됨 | 신발 아웃솔 수작업 검사 비효율 | 제안서·산출물·프로젝트 관리 | PoC 종결·정산 지원 | Vision AI, NIPA AI 바우처 | B2G · 프로젝트 관리 | 제안부터 종결까지 조율한 AI 프로젝트 | 실제 PoC 정확도·시간 개선 수치는 확인 필요 |
| STT 데이터셋 구축 | 검증됨 | 대규모 수작업 음성 전사 병목 | 프로젝트 수행·STT 제품 기획·수행사 커뮤니케이션 | 맨먼스 약 1/10, 원가 70%+ 절감 | STT, Python, 운영 품질 기준 | AI 데이터 · 제품 기획 · 운영 | 데이터 구축을 제품·운영 구조로 바꾼 프로젝트 | 200명은 상세 행동·경력에는 유지하되 요청대로 상단 metric에서는 제외 |
| AI 상담사 PoC | 검증됨 | B2B AI 기술의 B2C 경험 확장 | Retrieval 기반 PRD·대화 흐름·PoC·사업 제휴 | 0→1 구축 후 고객사 사업 제휴 | Retrieval, STT·TTS, 챗봇 | Product 0 to 1 · 제휴 | 기술 데모를 고객사 사업 제휴로 연결한 PoC | 제휴 회사명·계약 규모는 공개하지 않음 |
| Syrup Wallet 광고 운영 | 검증됨 | 낮은 푸시 수신 효율·과부하·수작업 | 유효 토큰 타기팅·분산 발송·광고팀 직접 에셋 등록 | 수신율 2배, 열람률 1.5배, 운영 시간 1/10 | 타기팅, 분산 발송, 운영 어드민 | 350만 MAU · 광고 운영 · 효율화 | 대규모 서비스의 광고 기능과 운영 프로세스를 함께 개선 | 상세 산식·기간 PNG 필요 |

| 핵심 신호 | 대표 경험 | 근거 강도 | 노출 위치 | Gap |
|---|---|---|---|---|
| 고객 문제 탐색·집중 | 아키, About 3단계 | 강함 | Hero → About → 첫 프로젝트 | 인터뷰 원문 공개 범위 확인 필요 |
| 기술을 제품 가치로 전환 | 아키, AI 상담사 PoC | 강함 | 첫·네 번째 프로젝트 | 기술 아키텍처·PRD 이미지 필요 |
| 프로젝트 관리·이해관계자 조율 | Vision AI, STT | 강함 | 두·세 번째 프로젝트 | 고객사 비공개 정보 마스킹 필요 |
| 운영 효율·사업 효과 | STT, Syrup Wallet | 강함 | 세·다섯 번째 프로젝트 | 원시 지표·산식 이미지 필요 |
| 조직 선택 기준과 경력 맥락 | 7개 Experience | 보통 | Experience 상단·하단 선호 조직 | 향후 지원 JD별 우선순위는 별도 맞춤 필요 |

#### 3단계 — Hero 콘텐츠 설계 3안

| 안 | 역할 라벨 | 헤드라인 | 강조 키워드 | 연결 근거 | 판단 |
|---:|---|---|---|---|---|
| 1 (채택) | `AI Product Manager with 7 years of experience` | `고객의 문제를 제품으로 해결합니다.` | `고객` · `제품` · 기존 경험 태그 | 사용자가 주석으로 직접 확정 | 가장 짧고 5초 안에 역할·경력·기여 방식이 연결됨 |
| 2 | `AI Product Manager · 7 years` | `기술과 제품으로 고객의 시간을 아낍니다.` | 기술 · 제품 · 시간 | About 신규 카피 | 의미는 맞지만 사용자 지정 문장과 다름 |
| 3 | `AI Specialist & IT Generalist` | `제품 기획부터 운영과 사업화까지 연결합니다.` | 기획 · 운영 · 사업화 | About·경력 전반 | 폭은 잘 보이나 고객 문제 해결의 우선순위가 약함 |

- 최종 선택안: 1안.
- Navbar 브랜드는 사용자 지정 `Kyoungmin Lee`로 단순화한다.
- Hero 첫 줄 `AI 역량이 우수한 제너럴리스트로서`는 삭제하고 `고객`, `제품` 두 단어만 코럴로 강조한다.
- Hero 경험 태그·검증 수치 3개는 이번 주석의 변경 대상이 아니므로 유지한다.

#### 4단계 — 웹사이트 적용 계획

| 섹션 | 현재 표현 | 변경 표현 또는 방향 | 경력 근거 | 작업 유형 |
|---|---|---|---|---|
| Navbar·Hero | `Lee Kyoungmin Portfolio`, 기존 역할·2줄 헤드라인 | `Kyoungmin Lee`, 7년 역할 라벨, 1줄 고객 문제 헤드라인, 다중 코럴 강조 | 사용자 주석 1–4 | 재작성 |
| 협업사 로고 | 작은 `수행 프로젝트 협업사` | 큰 `Project partner company` 제목 | 사용자 주석 5 | 재작성 |
| About | 기존 경력 폭 소개와 제품 3단계 | AI 스페셜리스트·IT 제너럴리스트 관점과 신규 3단계 문장 | 사용자 주석 6–10 | 재작성 |
| Projects 헤더 | 결정·변화 중심 문구 | PM 기여도가 높은 AI 프로젝트와 최신순 CAR 안내 | 사용자 주석 11–12 | 재작성 |
| 프로젝트 5개 | 이전 제목·조직·담당·CAR·metric·tag | 주석 13–42의 확인 문구와 15명 베타 반영 | 사용자 주석 13–42 | 재작성 |
| Experience | 현재/과거 1개 배지와 기존 역할 설명 | 7개 기간 배지, 역할·팀·설명, 선호 조직 문구 | 사용자 주석 43–65 | 재작성·추가 |
| 증거 이미지 | 5개 빈 상태 | 동일 16:10 프레임 유지, `public/evidence/<project-id>/` 및 `visual.items` 등록 가이드 | 기존 구현·사용자 요청 | 문서화 |

#### 사실성 체크

| 주장 또는 수치 | 출처 | 등급 | 공개 가능 | 조치 |
|---|---|---|---|---|
| 아키 베타 15명·2026.06 시작 | 사용자 주석 14·15·19 | 검증됨 | 가능 | 프로젝트·경력의 기존 6명·7월 값을 함께 교체 |
| Gemini API·MediaPipe 33개 관절 추적·Voice/Vision 동기화 | 사용자 주석 18 | 검증됨 | 가능 | 구현 행동에만 사용하고 정확도·성과를 새로 만들지 않음 |
| 상용화 수익 기대 | 사용자 주석 19 | 검증됨 | 제한적 | 실제 매출로 표현하지 않고 기대·수요 확인으로 한정 |
| 회사별 기간 3개월·1년 6개월·7개월·3개월·1년 7개월·2년·7개월 | 사용자 주석 45·47·48·51·54·58·60 | 검증됨 | 가능 | 자동 계산하지 않고 명시 데이터로 저장 |
| AI 상담사 고객사 사업 제휴 | 사용자 주석 31·57 | 검증됨 | 가능 | 고객사명·금액은 공개하지 않음 |

#### 1차 진단 — 수정 전 실제 URL

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 전체 문서 높이 | `11627px` | `10213px` | `7021px` |
| Hero / About / Projects / Experience 높이 | `1014 / 897 / 6438 / 2378px` | `1049 / 784 / 5658 / 1897px` | `934 / 486 / 3151 / 1625px` |
| Hero 제목 강조 | `AI 역량` 1개 | 동일 | 동일 |
| 협업사 제목 | `12px` 한국어 | `14px` 한국어 | `14px` 한국어 |
| Experience 기간 배지 | `재직 중` 1개 | 동일 | 동일 |
| 증거 이미지 | 빈 상태 5개 | 동일 | 동일 |
| 가로 오버플로 | 없음 | 없음 | 없음 |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE31-001 | Hero | 브랜드·역할·헤드라인이 사용자 확정 카피와 다르고 두 단어 동시 강조를 지원하지 않음 | 첫 5초 정체성과 경력 신호 불일치 | 높음 | 사용자 카피 교체, title case 역할 라벨, 다중 highlight 지원 | 발견 |
| QA-BASE31-002 | About | 문제 해결 관점과 최신 자기 설명이 반영되지 않음 | 제너럴리스트 경험이 직무 나열로 읽힘 | 높음 | 의미 단락 3개와 3단계 접근 문구 교체 | 발견 |
| QA-BASE31-003 | Projects | 5개 프로젝트의 최신 제목·조직·역할·수치·기술·성과가 주석과 다름 | 경력 근거가 최신 사실과 불일치 | 차단 | 30개 프로젝트 주석을 데이터 원장과 테스트에 동시 반영 | 발견 |
| QA-BASE31-004 | Experience | 기간 배지가 현재 1개뿐이고 역할·설명·선호 조직 문구가 이전 상태 | 짧은 재직과 역할 확장을 투명하게 파악하기 어려움 | 높음 | 명시 duration 필드 7개와 신규 카피 적용 | 발견 |
| QA-BASE31-005 | 반응형 | About·아키 Action·Experience 장문으로 모바일 세로 길이와 데스크톱 CAR 열 불균형이 커질 수 있음 | 훑어보기 속도 저하 가능 | 보통 | 의미 단락, `min-w-0`, 첫 카드 CAR 비균등 열, 3폭 재검사 | 발견 |
| QA-BASE31-006 | 증거 이미지 | 16:10 갤러리는 준비됐으나 자산 경로·파일명·등록 필드 가이드가 없음 | 사용자가 PNG 제공 시 일관된 등록이 어려움 | 보통 | 1600×1000px 규격과 `public/evidence`·`visual.items` 가이드 추가 | 발견 |

#### 직접 수정

| ID | 직접 수정 내용 | 적용 파일 | 결과 |
|---|---|---|---|
| QA-BASE31-001 | Navbar를 `Kyoungmin Lee`로 변경하고 역할 라벨·단일 Hero 문장·`고객`/`제품` 다중 코럴 강조를 적용했다. 협업사 제목은 `Project partner company`와 반응형 20/24px 위계로 높였다. | `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/types/portfolio.ts` | 완료 |
| QA-BASE31-002 | About을 3개 의미 문단으로 나누고 문제 탐색·태스크 구분·결과 검증 문구를 교체했다. 장문 H2와 capability 내부에 모바일 줄바꿈 안전값을 유지했다. | `src/components/About.tsx` | 완료 |
| QA-BASE31-003 | 아키·Vision AI·STT·AI 상담사·Syrup Wallet의 제목, 조직, 담당 책임, metric, CAR, tag를 사용자 확정 사실로 교체했다. 내부 프로젝트 ID와 아키 URL은 보존했다. | `src/data/portfolio.ts`, `src/components/ImageCards.tsx` | 완료 |
| QA-BASE31-004 | 7개 경력에 사용자 확정 duration을 명시 데이터로 추가하고 모든 기간 아래 동일한 배지를 표시했다. 회사 설명·직무·팀·본문·선호 조직 문구를 교체했다. | `src/data/portfolio.ts`, `src/components/Experience.tsx` | 완료 |
| QA-BASE31-005 | 첫 프로젝트의 장문 판단·실행 열을 넓힌 비균등 CAR 레이아웃으로 조정하고 About 내부 `min-w-0`·모바일 H2 크기를 적용했다. | `src/components/ImageCards.tsx`, `src/components/About.tsx` | 완료 |
| QA-BASE31-006 | 증거 이미지 공통 규격, 프로젝트별 폴더·파일명, `visual.items` 등록 예시, alt/caption·개인정보·등록 후 QA 절차를 문서화했다. | `evidence-images.md`, `product.md`, `design.md` | 완료 |
| 회귀 방지 | Hero 강조 2개, 5개 프로젝트의 최신 필드, 7개 기간 배지와 직무·팀 문구를 자동 테스트로 고정했다. | `src/test/index.test.tsx`, `src/test/portfolio.test.ts` | 완료 |

#### 동일 조건 재검사

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 전체 문서 높이 | `11992px` | `10173px` | `7028px` |
| Hero / About / Projects / Experience 높이 | `946 / 1031 / 6555 / 2561px` | `948 / 880 / 5674 / 1845px` | `900 / 526 / 3159 / 1617px` |
| Hero 제목·강조 | 신규 문장, `고객`·`제품` 2개 코럴 | 동일 | 동일 |
| 협업사 제목 | `Project partner company`, `20px` | 영문, `24px` | 영문, `24px` |
| Experience 기간 배지 | 7개, 화면 밖 항목 0 | 7개, 화면 밖 항목 0 | 7개, 화면 밖 항목 0 |
| 증거 이미지 | PNG 미등록으로 빈 상태 5개 | 동일 | 동일 |
| 로고 로드 / 깨진 이미지 | `8 / 0` | `8 / 0` | `8 / 0` |
| 가로 오버플로 | 없음 | 없음 | 없음 |

| 검사 | 결과 | 비고 |
|---|---|---|
| Vitest | `50/50` 통과 | 주석 카피·프로젝트 데이터·기간 배지 회귀 포함 |
| ESLint | 통과 | 변경한 TS/TSX 파일 9개 오류·경고 0 |
| production build | 통과 | Vite 6.4.3, 기존 500kB 초과 chunk 권고만 유지 |
| 브라우저 콘솔 | error 0 / warning 0 | 로컬 `http://127.0.0.1:4178/` |
| 시각 검사 | 통과 | 390px Hero·About·첫 프로젝트·Experience, 1440px Hero 직접 확인 |

| ID | 재검사 결과 | 상태 |
|---|---|---|
| QA-BASE31-001 | 브랜드·역할·Hero 문장·2개 강조·협업사 제목이 3개 폭에서 정확히 표시됨 | 해결 |
| QA-BASE31-002 | 장문 About이 의미 단락으로 읽히며 390px에서 잘림·가로 넘침 없음 | 해결 |
| QA-BASE31-003 | 5개 프로젝트 최신 필드가 테스트와 실제 DOM에 반영되고 기존 ID·링크 유지 | 해결 |
| QA-BASE31-004 | 7개 기간 배지가 한 줄로 표시되고 모바일·태블릿·웹에서 화면 밖 항목 0 | 해결 |
| QA-BASE31-005 | 첫 프로젝트와 장문 CAR가 모든 폭에서 줄바꿈되며 루트 가로 넘침 없음 | 해결 |
| QA-BASE31-006 | 16:10·1600×1000px 등록·검증 가이드 완료. 실제 PNG 등록은 사용자 파일 수신 후 진행 | 해결 |

#### 배포 후 실제 URL 점검

사용자 확인과 명시적 배포 요청 전에는 배포하지 않는다.

---

### 2026-08-22 / 협업사 투명 로고·영문 섹션·아키랩 표기 정리 / base revision 30

- 작업 대상 URL: `/`
- 제외 URL: 유효한 `/p/:slug`, `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 로컬 URL: `http://127.0.0.1:4177/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 30
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 새 JD·경력·성과 수치는 없다. 사용자가 지정한 공개 명칭·문장·정보 위계와 기존 로고의 표현 방식만 변경한다.

#### 1단계 — 사용자 과업·채용 신호 분석

| 우선순위 | 핵심 신호 | 사용자 요청 근거 | 포트폴리오 대응 방향 |
|---:|---|---|---|
| 1 | 수행 프로젝트의 협업 범위를 장식 카드보다 로고 자체로 빠르게 인지 | 레퍼런스처럼 배경 없이 로고와 텍스트만 노출하고 간격 확대 | 정확한 원본 표식을 보존한 투명 로고를 정적 grid로 표시하고 `수행 프로젝트 협업사` 제목 제공 |
| 2 | 메뉴와 섹션의 정보 구조를 같은 영문 체계로 인지 | 소개·프로젝트·경력을 Contact와 동일한 영문 폰트·표기로 변경 | `About → Projects → Experience → Contact`를 Navbar와 섹션 eyebrow에 동일 적용 |
| 3 | 현재 제품·회사 명칭을 한국어로 일관되게 인지 | `Arkylab→아키랩`, `Archi→아키` 전체 수정 | 공개 카피만 교체하고 실제 URL·도메인·분석 ID·내부 key는 기능 보호를 위해 유지 |
| 4 | 첫 화면을 더 짧게 스캔하면서 B2C 직접 기획·개발 경험까지 확인 | Hero 장문 삭제, 네 번째 태그 추가 | 빈 설명 영역을 렌더하지 않고 `B2C Product 기획·개발` 태그를 추가 |

- 핵심 Pain Point: Hero에서 장문 설명이 첫 화면의 스캔 속도를 늦추고, 불투명 흰 로고 카드가 제공 레퍼런스와 다른 시각 위계를 만든다. 한국어·영어 섹션 라벨과 `Arkylab/Archi` 혼용도 명칭 일관성을 낮춘다.
- 우선 키워드는 기존 `AI Product & Project Manager`, 제품 0→1·대규모 운영·B2B/B2G·B2C 직접 개발의 검증 범위를 유지한다.

#### 2단계 — 검증 근거 구조화

| 변경 대상 | 출처 등급 | 변경값 | 사실·기능 경계 |
|---|---|---|---|
| Hero 장문 | 사용자 직접 지정 | 전체 삭제 | 새 주장 없음 |
| Hero 태그 | 사용자 직접 지정 | `B2C Product 기획·개발` 추가 | 기존 아키 직접 기획·개발 경험 범위 안에서 사용 |
| 명칭 | 사용자 직접 지정 | 공개 `Arkylab→아키랩`, `Archi(아키)·Archi→아키` | `archi.best`, `archilab.ai.kr`, 내부 ID·분석 ID는 변경하지 않음 |
| 협업사 로고 | 사용자 제공 공개 자산 | NIPA→Busan→LG→KISA→Neo→NHN→Syrup→Fixness | 관계 유형·성과를 로고만으로 확대하지 않음 |
| Contact 위계 | 사용자 직접 지정 | eyebrow `Contact`, 제목 `채용·협업` | 문의 기능·개인정보 범위 변경 없음 |

- 원본 로고 8개는 모두 불투명 캔버스다. 7개는 흰 배경, Fixness는 청록 배경이므로 CSS blend만으로는 정확한 배경 제거가 불가능하다.
- 로고 표식을 다시 생성하지 않고 원본 픽셀의 배경만 alpha 처리한 로컬 WebP를 사용한다. 투명화 후 흰 단색 필터를 적용해 어두운 Hero에서도 형태와 텍스트 대비를 유지한다.

#### 3단계 — 콘텐츠·레이아웃 설계 3안

| 안 | Hero 설명 | 로고 표현 | 영문 정보 구조 | 판단 |
|---:|---|---|---|---|
| 1 (채택) | 사용자 요청대로 삭제하고 태그 4개만 유지 | 투명 단색 로고, 제목과 넓은 2/4열 간격 | Navbar·섹션 모두 `About / Projects / Experience / Contact` | 요청 일치·스캔 속도·대비가 가장 좋음 |
| 2 | 기존 장문 유지 | 흰 카드만 제거하고 원격 원본을 blend 처리 | Navbar만 영문화 | Fixness 배경과 회색 글자 품질이 낮고 정보 구조가 불일치 |
| 3 | 장문을 한 줄로 축약 | 원색 투명 로고 | 전체 영문화 | 사용자의 삭제 지시와 다르고 다크 Hero에서 어두운 원색 텍스트 대비가 부족 |

- 최종 선택안: 1안.
- Hero 헤드라인·역할 라벨·확인 수치 3개는 변경하지 않는다.

#### 4단계 — 웹사이트 적용 계획

| 섹션 | 현재 표현 | 변경 표현 또는 방향 | 작업 유형 |
|---|---|---|---|
| Navbar | `소개 / 프로젝트 / 경력 / Contact` | `About / Projects / Experience / Contact` | 재작성 |
| Hero 설명·태그 | 장문 1개·태그 3개 | 설명 삭제·`B2C Product 기획·개발` 포함 태그 4개 | 숨김·추가 |
| Hero 협업사 | 흰색 셀 8개·보이는 제목 없음 | `수행 프로젝트 협업사` 제목, 투명 단색 로고, 확대된 행·열 간격 | 재작성 |
| 본문 섹션 | 한국어 eyebrow | `About / Projects / Experience / Contact` | 재작성 |
| Contact | `채용·협업 / Contact` | `Contact / 채용·협업` | 재배치 |
| 프로젝트·경력·메타 | `Arkylab`, `Archi` 혼용 | 공개 표기 `아키랩`, `아키` | 재작성 |
| 제품·디자인 문서·테스트 | 이전 Hero·로고·명칭 계약 | revision 30 계약과 회귀 테스트 반영 | 재작성 |

#### 1차 진단 — 수정 전 로컬

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Navbar | `소개 / 프로젝트 / 경력 / Contact` | 동일 | 동일 |
| Hero 설명·태그 | 장문 1개·태그 3개 | 동일 | 동일 |
| 협업사 로고 | 흰 셀·2열·gap `8px` | 흰 셀·4열·gap `12px` | 흰 셀·4열·gap `12px` |
| 공개 명칭 | `Arkylab`, `Archi` 잔존 | 동일 | 동일 |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE30-001 | Hero 로고 | 흰색·청록 불투명 캔버스를 같은 흰 셀에 표시 | 레퍼런스의 직접 노출 방식과 다르고 Hero 시각 밀도가 높음 | 높음 | 원본 기반 투명 WebP, 셀 장식 제거, 단색 대비 적용 | 발견 |
| QA-BASE30-002 | Navbar·섹션 | 한국어와 영문 라벨 혼용 | 메뉴와 본문 대응을 한눈에 파악하기 어려움 | 보통 | 영문 라벨을 같은 폰트·순서로 통일 | 발견 |
| QA-BASE30-003 | 공개 명칭 | `Arkylab`, `Archi(아키)`, `Archi`가 혼용 | 제품·회사 이름이 일관되지 않음 | 높음 | 공개 카피 전수 교체, 기능 식별자는 보존 | 발견 |
| QA-BASE30-004 | Hero | 삭제 요청 장문과 태그 3개 고정 타입이 남아 있음 | 첫 화면이 길고 B2C 직접 개발 신호가 태그에 없음 | 높음 | 설명 조건부 렌더, 3~4개 태그 허용, 네 번째 태그 추가 | 발견 |
| QA-BASE30-005 | Contact | eyebrow가 `채용·협업`, 제목이 `Contact` | 사용자가 지정한 정보 위계와 반대 | 보통 | 두 표현의 위치 교체 | 발견 |

#### 직접 수정

| ID | 수정 파일·외부 설정 | 직접 수정 내용 | 사실 변경 | 결과 |
|---|---|---|---|---|
| QA-BASE30-001 | `src/components/Hero.tsx`, `src/data/heroLogos.ts`, `public/logos/partners/*` | 원본 픽셀의 배경만 alpha 처리한 로컬 WebP 8개로 교체하고 카드 배경·테두리·그림자를 제거했다. 제목을 `수행 프로젝트 협업사`로 추가하고 모바일 2열·태블릿 이상 4열, `32px` 또는 `40px 48px` 간격으로 재배치했다. | 없음 | 수정 완료 |
| QA-BASE30-002 | `src/components/Navbar.tsx`, `About.tsx`, `ImageCards.tsx`, `Experience.tsx`, `Contact.tsx` | Navbar와 각 섹션 eyebrow를 `About / Projects / Experience / Contact`로 통일했다. | 없음 | 수정 완료 |
| QA-BASE30-003 | `src/data/portfolio.ts`, `src/components/Experience.tsx`, `src/components/ImageCards.tsx`, `index.html`, `analytics.md` | 공개 카피의 `Arkylab`과 `Archi`를 `아키랩`과 `아키`로 변경했다. URL·도메인·내부 ID·분석 ID는 유지했다. | 없음 | 수정 완료 |
| QA-BASE30-004 | `src/components/Hero.tsx`, `src/types/portfolio.ts`, 테스트 | 기본 Hero 설명을 비우고 빈 설명은 렌더하지 않도록 했다. 태그 계약을 3~4개로 확장하고 `B2C Product 기획·개발`을 추가했다. 회사별 발행 데이터의 기존 3개 계약은 유지했다. | 없음 | 수정 완료 |
| QA-BASE30-005 | `src/components/Contact.tsx` | eyebrow를 `Contact`, 제목을 `채용·협업`으로 교체했다. | 없음 | 수정 완료 |
| QA-BASE30-006 | `product.md`, `design.md`, `analytics.md`, `deploy.md` | revision 30의 카피·레이아웃·분석 식별자 보존 원칙과 QA 결과를 문서화했다. | 없음 | 수정 완료 |

#### 동일 조건 재검사

| 항목 | 390×844 | 768×900 | 1440×900 | 판정 |
|---|---:|---:|---:|---|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` | 통과 |
| Navbar 충돌 | 없음 | 없음 | 없음 | 통과 |
| Hero 설명·태그 | 설명 `0`, 태그 `4` | 동일 | 동일 | 통과 |
| 협업사 로고 | 8개 로드·2열·gap `32px` | 8개 로드·4열·gap `40px 48px` | 8개 로드·4열·gap `40px 48px` | 통과 |
| 로고 슬롯 크기 | `147.5×48` | `128.25×64` | `220×64` | 통과 |
| 로고 배경·경로 | 투명 셀·로컬 WebP | 동일 | 동일 | 통과 |
| 섹션·Contact 위계 | 영문 eyebrow·`Contact / 채용·협업` | 동일 | 동일 | 통과 |
| 공개 `Arkylab`·`Archi` 잔존 | 없음 | 없음 | 없음 | 통과 |

- Vitest: `48/48` 통과.
- Vite production build: 통과. 기존 `web` 청크 크기 경고만 있으며 이번 변경의 blocker는 아니다.
- 변경한 TypeScript·TSX ESLint: 오류 `0`.
- `git diff --check`: 오류 `0`.
- 브라우저 콘솔 warning·error: `0`.
- 시각 점검: 모바일 390px의 2×4 로고 배열과 웹 1440px의 4×2 배열 모두 로고 비율·간격·가독성이 정상이다.
- 결론: blocker 없음. base revision 29의 미배포 변경을 포함한 revision 30을 함께 배포한다.

#### 배포 후 실제 URL 점검

- 배포 커밋: `176dca85455a6b3d2f40c905144bb8a00c96116d` (`feat: refine portfolio navigation and partner logos`).
- GitHub Actions: `Deploy Portfolio to GitHub Pages` run `#34` / `32551813309`, 결론 `success`.
- 실제 공개 URL: `https://archilab.ai.kr/`.
- 라이브 자산: `/assets/index-5gkHURKR.js`, `/assets/index-BbTJDWrR.css`.

| 라이브 항목 | 390×844 | 768×900 | 1440×900 | 판정 |
|---|---:|---:|---:|---|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` | 통과 |
| Navbar 요소 충돌 | 없음 | 없음 | 없음 | 통과 |
| Hero 설명·태그 | 설명 `0`, 태그 `4` | 동일 | 동일 | 통과 |
| 협업사 로고 | 8개 로드·2열·gap `32px` | 8개 로드·4열·gap `40px 48px` | 8개 로드·4열·gap `40px 48px` | 통과 |
| 로고 슬롯 | `147.5×48` | `128.25×64` | `220×64` | 통과 |
| 로고 순서·형식 | 지정 순서·로컬 투명 WebP | 동일 | 동일 | 통과 |
| 영문 섹션·Contact 위계 | `About / Projects / Experience / Contact`, `Contact / 채용·협업` | 동일 | 동일 | 통과 |
| 공개 `Arkylab`·`Archi` 잔존 | 없음 | 없음 | 없음 | 통과 |
| 콘솔 warning·error | `0` | `0` | `0` | 통과 |

- 모바일 390px 실제 화면에서 Hero 태그 4개가 2행으로 정리되고, 협업사 로고는 2×4로 카드 배경 없이 직접 노출된다. 웹 1440px에서는 4×2 배열과 넓은 간격을 유지한다.
- 무효 `/p/not-real-slug`는 로딩 후 `유효하지 않은 링크입니다`를 표시하고 `noindex, nofollow`를 유지한다.
- `/admin/links`는 로그인 화면, `noindex, nofollow`, Typebot 미포함 상태를 유지한다.
- 배포 blocker와 미해결 회귀는 없다. base revision 30 배포 완료.

---

### 2026-08-22 / 영문 포트폴리오 브랜드·프로젝트 경험 로고 그리드 / base revision 29

- 작업 대상 URL: `/`
- 제외 URL: 유효한 `/p/:slug`, `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 로컬 미리보기 URL: `http://127.0.0.1:4177/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 29
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 새 JD·경력·성과 수치는 없다. 사용자 지정 영문 브랜드와 사용자가 제공한 공개 로고 8개만 기본 포트폴리오 Hero에 추가한다.

#### 1단계 — 사용자 과업·채용 신호 분석

| 우선순위 | 핵심 신호 | 사용자 요청 근거 | 포트폴리오 대응 방향 |
|---:|---|---|---|
| 1 | 이경민의 포트폴리오 정체성을 상단에서 즉시 인지 | 기존 한국어 문구를 `Lee Kyoungmin Portfolio`로 크게 표시 | Navbar 홈 버튼의 가시 문구·접근성 이름을 교체하고 모바일 충돌 없는 반응형 크기 적용 |
| 2 | 수행 경험의 조직·서비스 폭을 시각적으로 스캔 | 지표 카드 아래에 지정 순서로 8개 로고 배치 | Hero 지표 바로 아래에 정적 로고 grid 추가 |
| 3 | 서로 다른 원본 비율에서도 정돈된 시각 위계 | 세 번째 첨부처럼 동일 간격·크기로 정렬 | 같은 크기의 흰색 셀, `object-fit: contain`, 로고별 시각 scale 보정 |

- 핵심 Pain Point: 현재 Navbar 브랜드는 모바일 `11px`, 데스크톱 `16px`이며 사용자가 요청한 영문 포트폴리오 정체성이 아니다. Hero 지표 아래에는 수행 경험을 한눈에 보여 주는 조직·서비스 로고가 없다.
- 우선 키워드는 기존 `AI Product & Project Manager`, 프로젝트·프로덕트 경험을 유지한다. 로고만으로 고객·파트너·재직 관계를 임의 단정하지 않고 중립적인 `프로젝트 경험 기관 및 서비스`로 설명한다.

#### 2단계 — 검증 근거 구조화

| 순서 | 자산 | 공개 파일 | 접근성 이름 | 사실 범위 |
|---:|---|---|---|---|
| 1 | NIPA | `logo/nipa.png` | `정보통신산업진흥원(NIPA) 로고` | 사용자 지정 프로젝트 경험 로고 |
| 2 | 부산광역시 | `logo/busan.png` | `부산광역시 로고` | 사용자 지정 프로젝트 경험 로고 |
| 3 | LG유플러스 | `logo/lg.png` | `LG유플러스 로고` | 사용자 지정 프로젝트 경험 로고 |
| 4 | KISA | `logo/kisa.jpg` | `한국인터넷진흥원(KISA) 로고` | 사용자 지정 프로젝트 경험 로고 |
| 5 | 네오사피엔스 | `logo/neo.jpg` | `네오사피엔스 로고` | 사용자 지정 프로젝트 경험 로고 |
| 6 | NHN Cloud | `logo/nhn.png` | `NHN Cloud 로고` | 사용자 지정 프로젝트 경험 로고 |
| 7 | Syrup Wallet | `logo/syrup.jpg` | `Syrup Wallet 로고` | 사용자 지정 프로젝트 경험 로고 |
| 8 | Fixness | `logo/fixness.png` | `Fixness 로고` | 사용자 지정 프로젝트 경험 로고 |

- 8개 공개 URL은 모두 HTTP 200이며 총 원본 용량은 약 `1.21MB`다. Supabase 이미지 변환 URL은 403이므로 원본 URL에 명시적 크기·`loading=lazy`·`decoding=async`를 사용한다.
- 원본은 모두 불투명 캔버스이며 KISA·NHN의 내부 여백이 특히 크다. 이미지 자체를 왜곡하거나 임의 재생성하지 않고 셀 내부 scale만 보정한다.

#### 3단계 — 콘텐츠·레이아웃 설계 3안

| 안 | 상단 브랜드 | 로고 배치 | 5초 명확성 | 판단 |
|---:|---|---|---|---|
| 1 (채택) | 사용자 지정 `Lee Kyoungmin Portfolio`를 크게 표시 | 모바일 2열×4행, 태블릿·웹 4열×2행 | 이름·문서 성격과 8개 경험 범위가 즉시 읽힘 | 채택 |
| 2 | 기존 한국어 브랜드 아래 작은 영문 부제 추가 | 4열×2행 | 브랜드 문구가 중복되고 사용자 지정 교체 요청과 불일치 | 제외 |
| 3 | 사용자 지정 영문 브랜드 | 데스크톱 8열×1행 | 긴 wordmark와 KISA·NHN이 지나치게 작아짐 | 제외 |

- Hero 역할 배지·헤드라인·설명·키워드·지표는 현재 검증된 내용을 그대로 유지한다.
- 로고는 자동 슬라이드·hover 의존 정보 없이 정적 grid로 제공한다.

#### 4단계 — 웹사이트 적용 계획

| 섹션 | 현재 표현 | 변경 표현 또는 방향 | 작업 유형 |
|---|---|---|---|
| Navbar | `7년차 PM 이경민의 포트폴리오입니다.` / 모바일 축약 | `Lee Kyoungmin Portfolio` 단일 가시 문구와 일치하는 접근성 이름 | 재작성 |
| Hero 지표 하단 | 로고 없음 | 사용자 지정 순서의 8개 동일 셀 로고 grid | 추가 |
| 회사별 맞춤 Hero | 공통 Hero 컴포넌트 | 로고 grid를 기본 `/`에만 표시해 회사별 publication 의미와 분리 | 유지·보호 |
| 디자인·제품 문서 | 한국어 Navbar 정체성 기준 | 새 영문 브랜드·중립적 로고 grid 계약 반영 | 재작성 |
| 회귀 테스트 | 기존 한국어 Navbar 이름만 검증 | 영문 브랜드·로고 8개 순서·대체 텍스트 검증 | 추가 |

#### 1차 진단 — 수정 전 라이브

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 가시 Navbar 브랜드 | `이경민 · 7년차 PM` | `7년차 PM 이경민의 포트폴리오입니다.` | 동일 |
| Navbar 브랜드 font / button | `11px / 78×44px` | `16px / 234×44px` | `16px / 234×44px` |
| Hero 높이 / 지표 하단 | `846 / 766px` | `900 / 791px` | `900 / 757px` |
| Hero 로고 | `0개` | `0개` | `0개` |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE29-001 | Navbar | 기존 한국어 브랜드가 작고 사용자 지정 영문 문구와 불일치 | 포트폴리오 정체성이 원하는 톤으로 보이지 않음 | 높음 | `Lee Kyoungmin Portfolio`로 교체하고 반응형 크기 확대 | 발견 |
| QA-BASE29-002 | Hero 지표 하단 | 프로젝트 경험 로고가 없음 | 조직·서비스 경험의 폭을 시각적으로 빠르게 스캔할 수 없음 | 높음 | 8개 로고 grid 추가 | 발견 |
| QA-BASE29-003 | 로고 원본 | 비율·내부 여백·배경이 서로 다름 | 같은 크기로 단순 렌더하면 일부 로고가 작거나 들쭉날쭉해 보임 | 높음 | 동일 흰색 셀, contain, 자산별 scale 보정 | 발견 |
| QA-BASE29-004 | 성능 | 원본 총량 약 1.21MB, Supabase cache-control은 `no-cache` | 첫 화면 전송량 증가 가능 | 보통 | 명시적 크기·lazy·async 적용, 추가 모션·스크립트 없음 | 발견 |

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE29-001 | `src/components/Navbar.tsx`, `src/test/index.test.tsx` | Navbar 홈 버튼을 `Lee Kyoungmin Portfolio`로 교체하고 모바일 `16px`, 태블릿 `20px`, 데스크톱 `24px` 반응형 크기와 일치하는 접근성 이름을 적용 | 없음 | 통과 |
| QA-BASE29-002 | `src/components/Hero.tsx`, `src/data/heroLogos.ts`, `src/pages/Index.tsx` | 지표 카드 바로 아래에 사용자 지정 순서의 8개 로고 grid를 추가하고 기본 `/`에서만 표시 | 없음 | 통과 |
| QA-BASE29-003 | `src/components/Hero.tsx`, `src/data/heroLogos.ts` | 동일한 흰색 셀, `object-contain`, 원본 비율 유지와 자산별 scale 보정으로 서로 다른 캔버스 여백을 정규화 | 없음 | 통과 |
| QA-BASE29-004 | `src/components/Hero.tsx`, `src/data/heroLogos.ts` | 원본 크기를 명시하고 `loading=lazy`, `decoding=async`를 적용해 추가 모션·런타임 스크립트 없이 렌더링 | 없음 | 통과 |
| QA-BASE29-005 | `product.md`, `design.md` | 새 Navbar 정체성, 중립적인 로고 의미, 기본 포트폴리오 전용 노출과 반응형 grid 계약을 문서화 | 없음 | 통과 |

#### 동일 조건 재검사

| 너비 | Navbar 브랜드 | 로고 grid | 동일 셀 | 로고 로드·순서 | 가로 스크롤·겹침 | 전체 결과 |
|---:|---|---|---|---|---|---|
| 390×844 | `16px`, `136×44px` | 2열×4행 | `159.5×64px` 8개 동일 | 8/8 로드, `nipa→busan→lg→kisa→neo→nhn→syrup→fixness` | 오버플로 0, 브랜드·AI CTA·메뉴 겹침 0 | 통과 |
| 768×900 | `20px`, `220.06×44px` | 4열×2행 | `155.25×80px` 8개 동일 | 8/8 로드, 순서 일치 | 오버플로 0, 브랜드·AI CTA·메뉴 겹침 0 | 통과 |
| 1440×900 | `24px`, `264.07×44px` | 4열×2행 | `247×80px` 8개 동일 | 8/8 로드, 순서 일치 | 오버플로 0, 브랜드·AI CTA 겹침 0 | 통과 |

- 로컬 시각 검사: 세 너비에서 Navbar와 Hero를 직접 확인했다. 로고는 늘어나거나 찌그러지지 않고 흰색 동일 셀 안에서 원본 비율을 유지한다.
- 접근성: 로고 8개 모두 비어 있지 않은 대체 텍스트가 있고, grid는 `프로젝트 경험 기관 및 서비스`로 명명한다.
- 프로덕션 빌드: Vite production build 통과. 기존 `web` 청크 500kB 경고 외 신규 오류 없음.
- 테스트·정적 검사: Vitest `48/48` 통과, 변경 TS/TSX ESLint 오류 0. 직접 `tsc --noEmit`에는 기존 pnpm 가상 저장소 환경의 `chart.tsx`·`input-otp.tsx` 외부 타입 오류가 남지만 이번 변경과 무관하며 production build와 회귀 테스트는 통과했다.
- 브라우저 오류: 로컬 console error/warning 0, 로고 8개 `naturalWidth > 0` 확인.
- 미해결 차단 문제: 없음.
- 배포 가능 여부: `가능` — 사용자 최종 확인 전이므로 커밋·푸시·실서비스 배포는 대기한다.

#### 배포 후 실제 URL 점검

- 상태: `대기` — 사용자가 배포를 요청하면 같은 세 너비로 실제 URL을 재검사한다.

---

### 2026-08-22 / Hero 배경 가시성 개선 / base revision 28

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 로컬 미리보기 URL: `http://127.0.0.1:4177/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 28
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 새 JD·경력·성과 사실은 없으며, 이번 작업은 사용자가 제공한 Hero 배경 이미지의 가시성만 개선한다.

#### 1단계 — 사용자 과업·채용 신호 분석

| 우선순위 | 사용자가 확인할 신호 | 이번 revision의 방향 |
|---:|---|---|
| 1 | 첫 화면에서 이경민의 실제 활동 맥락과 포트폴리오 톤이 보이는가 | Hero 배경 이미지 위의 검정 scrim을 소폭 완화 |
| 2 | 이름·역할·핵심 경력 문구는 계속 빠르게 읽히는가 | 기존 방향성 gradient와 텍스트 색상은 유지 |
| 3 | 변경이 배포 속도와 안정성을 해치지 않는가 | 컴포넌트·콘텐츠·이미지 요청은 건드리지 않고 CSS 한 줄만 변경 |

- 핵심 Pain Point: Hero 이미지 자체는 정상 로드되지만 `.portfolio-hero__scrim`의 계산 opacity가 `1`이고 기존 gradient도 모바일 `0.8→0.9`, 데스크톱 좌측 `0.94`까지 어두워 배경 맥락이 거의 보이지 않는다.
- North Star와 정보 구조는 base revision 27을 유지한다. 이번 수정은 채용 근거·CTA·챗봇·프로젝트 탐색 경로를 변경하지 않는다.

#### 2단계 — 검증 근거 구조화

| 근거 | 확인 상태 | 변경 원칙 |
|---|---|---|
| Hero 이미지 | Supabase `background.png`가 세 너비에서 정상 로드 | URL·crop·eager 로딩 유지 |
| 텍스트 대비 | 방향성 gradient 위 흰색·코럴 텍스트 | gradient 자체는 유지하고 레이어 전체 투명도만 소폭 조정 |
| 반응형 | 수정 전 clientWidth/scrollWidth `375/375`, `753/753`, `1425/1425` | 레이아웃 속성을 변경하지 않아 동일 폭 유지 |

#### 3단계 — 시각 조정안 비교

| 안 | 수정 방향 | 판단 |
|---:|---|---|
| 1 (채택) | 기존 scrim에 `opacity: 0.88` 추가 | 이미지가 약 12% 더 보이면서 기존 텍스트 보호 분포 유지 |
| 2 | 배경 이미지 brightness를 더 높임 | 밝은 이미지 영역의 텍스트 대비까지 함께 흔들릴 수 있어 제외 |
| 3 | desktop/mobile gradient 값을 각각 재작성 | 조정 범위가 커지고 회귀 검사가 늘어나 빠른 배포 요청과 불일치 |

- Hero 문구·수치·키워드·CTA는 변경하지 않는다.

#### 4단계 — 웹사이트 적용 계획

- `src/index.css`의 `.portfolio-hero__scrim`에 `opacity: 0.88` 한 줄을 추가한다.
- `design.md`의 Hero 배경 계약에 동일한 수치를 기록한다.
- 사용자 요청에 따라 전체 회귀 검사는 생략하고 production build, 세 너비의 scrim 계산값·가로 오버플로, GitHub Actions 배포 성공만 최소 확인한다.

#### 1차 진단 — 수정 전 라이브

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Hero scrim 계산 opacity | `1` | `1` | `1` |
| Hero media filter | `brightness(1.08) saturate(0.84) contrast(1.04)` | 동일 | 동일 |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE28-001 | Hero | 이미지 위 scrim이 불투명 상태로 강하게 적용돼 배경이 거의 보이지 않음 | 첫 화면의 실제 활동 이미지와 전체 톤이 전달되지 않음 | 높음 | 기존 scrim에 `opacity: 0.88` 추가 | 발견 |

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE28-001 | `src/index.css` | 기존 desktop/mobile gradient는 그대로 두고 `.portfolio-hero__scrim`에 `opacity: 0.88` 추가 | 없음 | 배경 활동 이미지 식별 가능 |
| QA-BASE28-001 | `design.md` | Hero scrim의 가시성 계약과 opacity 값을 동기화 | 없음 | 구현·디자인 기준 일치 |

- Hero 이미지 URL, media filter, object-position, 텍스트·지표·Navbar·챗봇·프로젝트·Contact는 변경하지 않았다.

#### 동일 조건 재검사

사용자 요청에 따라 전체 페이지·보호 route·챗봇 회귀 검사는 생략하고 변경 표면만 최소 확인했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Hero scrim 계산 opacity | `0.88` | `0.88` | `0.88` |
| Hero 이미지 로드 | 완료 | 완료 | 완료 |

- 1440px Hero 캡처에서 배경의 행사 문구·인물·공간 맥락이 이전보다 명확히 보이고, 흰색 본문과 코럴 강조의 가독성은 유지됐다.
- production build는 Vite 6.4.3에서 성공했다. CSS `76.83kB / gzip 13.91kB`, main `431.62kB / gzip 137.89kB`다.
- 코드 로직·DOM·콘텐츠·의존성은 변경하지 않아 사용자 요청에 따라 Vitest·ESLint·전체 route 검사는 실행하지 않았다.
- 미해결 배포 차단 없음. 배포 가능 여부: `가능`.

#### 배포 후 실제 URL 점검

- 구현 커밋 `1eec30792d9135a7832dae1129fc2077fd68d85c` (`Improve hero background visibility`)을 `origin/main`에 push했다.
- GitHub Actions `Deploy Portfolio to GitHub Pages` Run #33, ID `32548448651`은 `completed / success`다. 실행 기록: `https://github.com/gmbro/portfolio/actions/runs/32548448651`.
- 실제 `https://archilab.ai.kr/`은 새 main asset `/assets/index-C9jBd5Hy.js`와 CSS `/assets/index-C2CcA7qZ.css`를 응답했다.
- 라이브 390×844, 768×900, 1440×900에서 Hero scrim 계산 opacity는 모두 `0.88`, clientWidth/scrollWidth는 각각 `375/375`, `753/753`, `1425/1425`이며 배경 이미지 로드는 완료 상태다.
- 사용자 요청대로 그 외 전체 화면·챗봇·보호 route 반복 검증은 수행하지 않았다. 배포 차단 및 롤백 사유 없음. 최종 배포 상태: `완료`.

---

### 2026-08-22 / 핵심 정보 구조 단순화·프로젝트 증거 자동 슬라이드 준비 / base revision 27

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 로컬 미리보기 URL: `http://127.0.0.1:4177/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 27
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 새 JD·회사별 사실은 없으며, 이번 작업은 사용자가 확정한 정보 구조·표시명·이미지 탐색 방식만 변경한다.

#### 1단계 — 사용자 과업·채용 신호 분석

| 우선순위 | 사용자가 확인할 신호 | 이번 revision의 방향 |
|---:|---|---|
| 1 | 이경민이 어떤 PM인지 빠르게 이해하는가 | Hero 다음에 `소개`를 바로 배치해 역할·문제 해결 방식을 먼저 설명 |
| 2 | 대표 프로젝트에서 실제 책임과 결과를 확인하는가 | 독립 `Evidence Product` 아코디언을 제거하고 프로젝트 카드의 문제·판단·실행·성과·증거 이미지로 수렴 |
| 3 | 전체 경력과 다음 커리어 방향을 확인하는가 | 프로젝트 다음에 경력 타임라인과 기존 `커리어 방향` 블록 유지 |
| 4 | 채용·협업 연락 방법을 찾는가 | 마지막 섹션·메뉴명을 한국어 행동문이 아닌 `Contact`로 통일 |

- 핵심 Pain Point: Hero 바로 뒤의 1,475~1,998px `Evidence Product`가 About·프로젝트보다 먼저 등장해 같은 프로젝트 근거를 중복 탐색하게 한다.
- 목표 정보 구조: `Hero → 소개 → 프로젝트 → 경력(커리어 방향) → Contact`.
- North Star는 기존 **근거 기반 채용 판단 완료율**을 유지하되, 독립 역량 선택이 아니라 `소개 이해 → 관련 프로젝트 1개 확인 → 경력·Contact 중 다음 판단`의 짧은 경로로 측정한다.

#### 2단계 — 검증 근거 구조화·유지 범위

| 유지 근거 | 사용 위치 | 변경 원칙 |
|---|---|---|
| Hero 역할·헤드라인·5개·3개·3억 사용자 확인값 | Hero | 문구·수치·귀속 변경 없음 |
| 공개 프로젝트 5개의 문제·판단·실행·성과·본인 책임 | 프로젝트 | Evidence Product의 중복 매핑만 제거하고 원본 카드 유지 |
| 회사별 기간·직함·설명과 커리어 방향 | 경력 | 최신순·사용자 확인 직함·2~3년 방향 유지 |
| EmailJS 문의 기능과 개인정보 동의 | Contact | 섹션 표시명만 `Contact`; 제출 행동명 `문의하기`는 유지 |
| 프로젝트별 시각 자료 슬롯 | 프로젝트 | Evidence Product와 별개이므로 유지하고 여러 PNG 입력 구조·2초 자동 슬라이드를 준비 |

- 실제 PNG는 아직 제공되지 않았으므로 이미지·성과 화면을 새로 만들지 않는다.
- 자동 슬라이드는 유효 이미지가 2개 이상일 때만 작동하며, 키보드·확대 dialog·수동 탐색을 계속 제공한다.

#### 3단계 — Hero 콘텐츠 3안 비교

이번 요청은 Hero 카피 수정이 아니라 정보 구조 단순화이므로, 검증된 현재 Hero를 기준으로 세 방향을 비교했다.

| 안 | Hero 방향 | 판단 |
|---:|---|---|
| 1 (채택) | base revision 26의 `AI Product & Project Manager`·제너럴리스트 카피·지표 유지 | 사용자가 직전 주석으로 직접 확정했으며 새 정보 구조와 충돌하지 않음 |
| 2 | Hero를 `소개` 수준으로 축약 | 첫 화면의 역할·정량 신호가 약해져 미채택 |
| 3 | Hero에 프로젝트 자동 슬라이드 추가 | 첫 화면 무게·초기 로드가 커지고 실제 PNG도 없어 미채택 |

- Hero 카피·수치는 변경하지 않고, 다음 섹션 안내만 실제 순서에 맞춰 `프로젝트`에서 `소개`로 정정한다. Navbar의 얼굴 이미지가 있는 `AI에게 묻기` 단일 진입점도 유지한다.

#### 4단계 — 웹사이트 적용 계획

| 범위 | 적용 계획 |
|---|---|
| 정보 구조 | `EvidenceNavigator` 제거, `Hero → About → ImageCards → Experience → Contact` 순서 고정 |
| 내비게이션 | `소개 / 프로젝트 / 경력 / Contact`와 실제 `about / case-studies / experience / contact` 앵커를 1:1 연결 |
| Footer | `© 2026 이경민`과 Footer 전체 DOM 제거. 분석은 이미 기본 비활성이라 설정 동선 손실 없음 |
| 간격 | About·프로젝트·경력·Contact를 모바일 64px, 태블릿 이상 80px 패딩 기준으로 통일하고 섹션 헤더 여백 축소 |
| 이미지 | `visual.items` 배열을 추가하되 기존 단일 `visual.src`와 호환. 2초마다 수평 전환, 수동 일시정지·이전·다음·점·확대 유지 |
| 접근성·성능 | reduced motion 자동 재생 금지, hover·focus·확대·비가시·백그라운드 탭에서 일시정지, 자동 변경은 live announcement 금지 |

#### 1차 진단 — 수정 전

base revision 26 로컬 production build를 전체 페이지 위→아래로 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `13,786px` | `12,437px` | `8,864px` |
| 본문 순서 | Hero→Evidence→소개→프로젝트→경력→문의 | 동일 | 동일 |
| Evidence 높이 | `1,998px` | `1,879px` | `1,475px` |
| 프로젝트 상·하 패딩 | `96 / 96px` | `128 / 128px` | `128 / 128px` |
| Contact 상·하 패딩 | `96 / 96px` | `128 / 128px` | `128 / 128px` |
| 프로젝트 이미지 슬롯 / 가로 오버플로 | `5 / 0` | `5 / 0` | `5 / 0` |
| Footer 저작권 | 표시 | 표시 | 표시 |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE27-001 | 정보 구조 | Hero 직후 `Evidence Product`가 프로젝트 근거를 1,475~1,998px 반복 | 소개·실제 프로젝트 도달이 늦음 | 차단 | 컴포넌트·데이터·테스트·메뉴 연결을 함께 제거 | 발견 |
| QA-BASE27-002 | 섹션 순서·표시명 | 메뉴에 `역량·근거`, `문의`가 있고 목표 순서·`Contact`와 불일치 | 페이지 구조와 탐색 라벨이 다름 | 높음 | 소개→프로젝트→경력→Contact 순서·표시명 고정 | 발견 |
| QA-BASE27-003 | Footer | `© 2026 이경민` 독립 Footer가 남음 | 사용자가 제거 요청한 비핵심 영역 지속 | 높음 | Footer DOM·전용 컴포넌트 제거 | 발견 |
| QA-BASE27-004 | 간격 | 프로젝트·Contact만 모바일 96px·태블릿 이상 128px 패딩 | 섹션 전환이 길고 전체 탐색 속도 저하 | 보통 | About·Experience와 같은 64/80px 기준으로 축소 | 발견 |
| QA-BASE27-005 | 이미지 탐색 | 현재 단일 이미지 교체 구조이며 자동·수평 슬라이드가 없음 | 다음 단계 PNG 여러 장을 요구 방식으로 표시할 수 없음 | 높음 | 복수 이미지 데이터와 2초 수평 자동 전환 계약 추가 | 발견 |
| QA-BASE27-006 | 접근성 | 현재 polite live region에 자동 재생을 그대로 붙이면 2초마다 낭독될 수 있음 | 스크린리더 사용 방해 | 차단 | 자동 이동은 live off, 사용자 이동만 polite; 일시정지·reduced-motion·비가시 정지 적용 | 발견 |

- 세 너비의 실제 텍스트·문서 가로 오버플로는 0건이며 이를 회귀 조건으로 유지한다.
- Evidence Product와 프로젝트별 증거 이미지는 서로 다른 범위다. 전자는 삭제하지만 `EvidenceMediaGallery`와 5개 시각 자료 슬롯은 유지한다.
- 수정 전 기록을 완료했으며 이제 소스·테스트·제품·디자인·분석 문서를 직접 수정한다.

#### 직접 수정

- `Index`에서 `EvidenceNavigator`와 페이지 Footer 렌더를 제거하고, 본문을 `Hero → About → ImageCards → Experience → Contact`로 고정했다. 전용 `EvidenceNavigator`, 매핑 데이터, 회귀 테스트와 `Footer` 컴포넌트도 삭제했다.
- Navbar의 데스크톱·모바일 공통 항목을 `소개 / 프로젝트 / 경력 / Contact`로 바꾸고 실제 `about / case-studies / experience / contact` 앵커에 연결했다. About eyebrow는 `소개`, Contact H2는 `Contact`, Hero 하단 힌트는 `소개`로 통일했다.
- 프로젝트와 Contact의 상·하 패딩을 모바일 96px에서 64px, 태블릿 이상 128px에서 80px로 축소해 About·경력과 같은 간격 체계로 맞췄다. 섹션 헤더 여백도 32~40px로 줄였다.
- 프로젝트 visual에 복수 `items[]` 계약을 추가하고 기존 단일 `src` fallback을 유지했다. 실제 PNG는 아직 없으므로 5개 프로젝트의 `증거 이미지 준비 중` 슬롯과 요청 자료 목록은 그대로 남겼다.
- `EvidenceMediaGallery`는 유효 이미지 2개 이상에서 2,000ms마다 다음 이미지가 오른쪽에서 왼쪽으로 650ms 진입한다. 이전·다음·점·Home·End·방향키·확대 dialog·caption·다음 이미지 preload를 유지한다.
- 마우스 hover, 내부 focus, 확대 dialog, document hidden, viewport 밖에서는 자동 이동을 중지한다. 사용자 일시정지·재생을 제공하고 `prefers-reduced-motion`에서는 자동 이동과 전환 시간을 모두 끈다. 자동 이동은 `aria-live=off`, 사용자 직접 이동만 polite announcement를 사용한다.
- 전환 중 접근성 트리에 두 장이 남지 않도록 활성 slide 하나만 DOM에 유지했다. dialog의 초기 focus lifecycle과 key listener를 분리하고, dialog에서 이미지를 바꾼 뒤 닫아도 현재 확대 버튼으로 focus가 복귀하도록 보정했다.
- `product.md`, `design.md`, `analytics.md`를 새 정보 구조·2초 슬라이드·Navbar 챗봇 진입·Footer 부재와 동기화하고 분석 보존 설계의 `surface`를 `navbar`로 정정했다.
- 정보 구조·삭제 영역·복수 이미지·자동 이동·정지 조건·reduced motion·live region·dialog focus 회귀를 테스트로 고정했다.

#### 동일 조건 재검사

최종 production build를 수정 전과 같은 Codex In-app Browser에서 390×844, 768×900, 1440×900으로 위→아래 직접 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `11,459px` | `10,157px` | `6,988px` |
| 본문 순서 | Hero→소개→프로젝트→경력→Contact | 동일 | 동일 |
| Evidence Product / legacy anchor | `0 / 0` | `0 / 0` | `0 / 0` |
| 본문 상·하 패딩 | `64 / 64px` | `80 / 80px` | `80 / 80px` |
| 프로젝트 이미지 슬롯 / 가로 오버플로 | `5 / 0` | `5 / 0` | `5 / 0` |
| Footer 저작권 | 없음 | 없음 | 없음 |

- 수정 전 대비 문서 높이는 390px에서 `2,327px`, 768px에서 `2,280px`, 1440px에서 `1,876px` 줄었다. 세 너비 모두 문서 가로 오버플로 0이며 Navbar 항목·DOM 순서·화면 순서가 일치한다.
- About·프로젝트·경력·커리어 방향·Contact를 실제 화면에서 확인했다. `Evidence Product`, `#evidence`, `#product-proof`, `© 2026 이경민`은 0건이고 Contact H2는 정확히 `Contact`다.
- 실제 PNG가 아직 0장이므로 라이브 후보에서 자동 재생 UI가 숨겨지는 것은 정상이다. fixture 3장 기반 테스트에서 2초 자동 순환·수평 진입·hover/focus/dialog/hidden/offscreen 일시정지·명시적 재생·reduced motion·수동 announcement를 검증했다.
- 전체 Vitest `48/48`, 깨끗한 pnpm virtual store의 TypeScript `tsc --noEmit` 진단 0, 전체 `src` ESLint 오류 0·기존 Fast Refresh 경고 7, Vite production build가 통과했다.
- 최종 build gzip은 HTML `1.16kB`, main `137.89kB`, CSS `13.90kB`, Typebot wrapper `1.27kB`, Typebot web runtime `199.27kB`다. 기존 runtime raw 500kB 경고만 유지된다.
- `/p/not-real-slug`, `/admin/links`, `/not-a-real-page`를 390px에서 직접 검사했다. 세 경로 모두 `390 / 390`, `noindex, nofollow`, Typebot·ambient·분석 UI 0으로 통과했다.
- production preview console warning/error 0. QA-BASE27-001~006은 모두 수정·재검사 완료이며 미해결 배포 차단은 없다.

#### 배포 후 실제 URL 점검

- 구현 commit: `b0a2714558c6472cdc5f2d80cb644a934914ca5d` (`Simplify portfolio flow and add evidence carousel`). 기존 문서 전용 commit `a72271b`과 함께 `origin/main`에 push했다.
- GitHub Actions `Deploy Portfolio to GitHub Pages` Run #32, ID `32545583643`은 `completed / success`다. `build` job `96963327242`의 checkout·pnpm·Node 설정·의존성 설치·품질 검사·Pages artifact build/upload와 `deploy` job `96963415850`의 Pages 배포가 모두 성공했다. 실행 URL: `https://github.com/gmbro/portfolio/actions/runs/32545583643`.
- 실제 `https://archilab.ai.kr/`은 HTTP/2 `200`과 새 main asset `/assets/index-cVQexrzp.js`, CSS `/assets/index-COX1R33C.css`를 응답했다.
- 실제 URL의 clientWidth / scrollWidth는 390×844에서 `375 / 375`, 768×900에서 `753 / 753`, 1440×900에서 `1425 / 1425`다. 문서 높이는 각각 `11,459px`, `10,157px`, `6,988px`로 로컬 최종 후보와 일치한다.
- 세 너비 모두 `Hero → 소개 → 프로젝트 → 경력 → Contact`, Navbar `소개 / 프로젝트 / 경력 / Contact`, 프로젝트 이미지 슬롯 5개, Contact H2를 유지한다. `Evidence Product`, `#evidence`, `#product-proof`, `© 2026 이경민`은 모두 0건이다.
- 390px 최초 로드의 Typebot host는 0이다. Navbar의 얼굴 이미지가 있는 `AI에게 묻기`를 선택한 뒤 실제 채팅 guide가 `364×818px`, 직접 입력 form이 `334px`, 시작 질문이 4개로 viewport 안에 열렸고 문서 가로 오버플로는 0이다.
- 실제 PNG는 아직 제공되지 않아 5개 슬롯은 `증거 이미지 준비 중`을 표시한다. 다음 단계에서 각 visual의 `items[]`에 공개 PNG를 넣으면 검증된 2초 자동 수평 슬라이드가 별도 구조 변경 없이 활성화된다.
- 라이브 `/p/not-real-slug`, `/admin/links`, `/not-a-real-page`를 390px에서 직접 검사했다. 세 경로 모두 `390 / 390`, `noindex, nofollow`, Typebot·ambient·분석 UI 0이다.
- 라이브 브라우저 console warning/error 0. 배포 차단 및 롤백 사유 없음. 최종 publication은 기본 공개 포트폴리오 base revision 27이며 배포 상태는 `완료`다.

---

### 2026-08-22 / 제너럴리스트 Hero 카피·성과 지표 재구성 / base revision 26

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 로컬 미리보기 URL: `http://127.0.0.1:4177/`
- 배포 상태: 사용자 확인 전 `보류`
- 근거 출처: 기존 공개 경력 데이터와 2026-08-22 사용자가 브라우저 주석으로 직접 확인한 Hero 문구·`3개`·`3억` 수치. `3억`의 회사·프로젝트·기간·매출 유형은 이번 요청에서 추가 추론하지 않는다.

#### 1단계 — 요청·채용 신호 분석

| 우선순위 | 평가자가 확인할 신호 | 이번 revision의 방향 |
|---:|---|---|
| 1 | AI 제품과 프로젝트를 함께 맡아 온 제너럴리스트인가 | 역할 라벨을 `AI Product & Project Manager`로 바꾸고 문제 해결형 제너럴리스트 문장을 Hero 중심에 배치 |
| 2 | 제품 생애주기와 사업 영역의 폭이 구체적인가 | 제로투원·350만 MAU 운영·제품 기획·사업 개발·퍼포먼스 마케팅·B2B AI·직접 개발 B2C 제품을 한 문단으로 설명 |
| 3 | 수행량·제품 책임·사업 기여를 숫자로 빠르게 확인할 수 있는가 | `5개 수행 프로젝트`, `3개 프로덕트 기획 및 운영`, `3억 매출 기여`를 사용자 확인값 그대로 표시 |
| 4 | 첫 화면이 행동 버튼보다 정체성과 근거에 집중하는가 | Hero 설명 반복 문장과 Hero CTA 두 개를 모두 제거하고 Navbar의 단일 `AI에게 묻기`만 유지 |

#### 2단계 — 검증 근거 구조화

| Hero 주장 | 출처 등급 | 연결 근거·사용 범위 | 확대 금지 |
|---|---|---|---|
| 제로투원·약 350만 MAU 운영 | 기존 검증 데이터 | Archi·Skelter 0→1, SK Planet 약 350만 MAU | 모든 제품이 350만 MAU였다고 표현하지 않음 |
| 제품 기획·사업 개발·퍼포먼스 마케팅 | 기존 검증 데이터 | 공개 경력 7개의 역할 범위 | 동일 회사에서 모두 수행했다고 합치지 않음 |
| B2B AI Project 강점·직접 개발 B2C Product·헬스케어 데이터 휘발성 문제 | 사용자 직접 확인 | 이번 Hero 포지셔닝 문구로만 사용 | 출시·성장·의학적 효과로 확대하지 않음 |
| `5개 / 수행 프로젝트` | 공개 데이터+사용자 확인 | 공개 CAR 프로젝트 5개와 일치 | 전체 경력의 총 프로젝트 수로 확대하지 않음 |
| `3개 / 프로덕트 기획 및 운영` | 사용자 직접 확인 | 사용자가 지정한 Hero 집계값 | 집계 대상 프로젝트를 임의로 확정하지 않음 |
| `3억 / 매출 기여` | 사용자 직접 확인 단일 출처 | 사용자가 지정한 Hero 기여 수치 | 매출 창출·계약액·GMV·특정 회사 성과로 임의 귀속하지 않음 |

#### 3단계 — Hero 콘텐츠 3안 비교

| 안 | 헤드라인 | 서브카피 방향 | 판단 |
|---:|---|---|---|
| 1 (채택) | `AI 역량이 우수한 제너럴리스트로서 고객의 문제를 제품으로 해결합니다.` | 사용자가 지정한 제로투원·350만 MAU·다직무·B2B AI·B2C 헬스케어 문장을 그대로 사용 | 사용자 주석과 정확히 일치하며 이번 revision의 최종안 |
| 2 | `AI 제품·프로젝트 경험을 갖춘 제너럴리스트로서 고객의 문제를 제품으로 해결합니다.` | 객관적 경험 중심으로 축약 | 근거 표현은 더 보수적이지만 사용자 지정 `우수한` 포지셔닝과 달라 미채택 |
| 3 | `AI Product & Project Manager로서 고객 문제를 제품으로 해결합니다.` | 모바일 5초 이해에 맞춘 한 문장 | 짧지만 제너럴리스트 메시지가 약해 미채택 |

- 강조 범위는 새 헤드라인 안의 `AI 역량`으로 제한한다. 나머지 문장은 흰색으로 유지해 과도한 광고 톤을 피한다.
- Hero의 역할·문서 정체성은 Navbar의 `7년차 PM 이경민의 포트폴리오입니다.`와 함께 읽힌다. Hero 배지에서는 사용자가 교체를 지정한 `7년 경력`을 반복하지 않는다.

#### 4단계 — 웹사이트 적용 계획

| 필드 | 최종 입력값 | 적용 원칙 |
|---|---|---|
| 역할 라벨 | `AI Product & Project Manager` | Hero 배지 단일 문구, 경력 접미사 제거 |
| 헤드라인 | `AI 역량이 우수한 제너럴리스트로서 고객의 문제를 제품으로 해결합니다.` | 의미 단위 2행 데이터, 실제 줄바꿈은 반응형 허용 |
| 서브카피 | 사용자가 지정한 장문 1개 | 두 번째 탐색 안내 문장 삭제 |
| 키워드 | `프로덕트의 제로투원 경험` · `350만 MAU 제품 운영` · `B2B&B2G 프로젝트` | 문구 그대로 반영 |
| Hero CTA | 없음 | 프로젝트·챗봇 버튼 모두 삭제, Navbar 단일 챗봇 CTA 유지 |
| 지표 | `5개 / 수행 프로젝트` · `3개 / 프로덕트 기획 및 운영` · `3억 / 매출 기여` | 사용자 확인값 그대로 반영 |

#### 1차 진단 — 수정 전 로컬 후보

base revision 25 로컬 production preview를 390×844, 768×900, 1440×900과 사용자 주석 폭 946×1188에서 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Hero 높이 | `844px` | `938px` | `918px` |
| H1 크기 | `327×116.6px` | `657×180px` | `1152×160px` |
| 서브카피 | 2문단·`327×144px` | 2문단·`657×100px` | 2문단·`768×100px` |
| Hero CTA | `프로젝트 증거 보기` 1개 | 동일 | 동일 |
| stat 카드 | 약 `104×76px` | 약 `208×126px` | 약 `331×126px` |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE26-001 | Hero 카피 | 역할·헤드라인·서브카피·키워드가 주석 최종안과 불일치 | 사용자가 의도한 AI 제너럴리스트 포지셔닝이 전달되지 않음 | 차단 | 14개 주석의 정확한 값을 기본 Hero 데이터에 반영 | 발견 |
| QA-BASE26-002 | Hero 설명 | 삭제 요청한 두 번째 탐색 안내 문장이 남아 있음 | 같은 탐색 행동이 Navbar·Hero에서 반복 | 높음 | 서브카피를 1문단으로 축소 | 발견 |
| QA-BASE26-003 | Hero 행동 | 삭제 요청한 `프로젝트 증거 보기`가 남아 있음 | 첫 화면이 정체성보다 행동 버튼에 분산 | 차단 | Hero action 블록을 DOM에서 제거 | 발견 |
| QA-BASE26-004 | Hero 지표 | 기존 `5개·350만·70%+`가 새 `5개·3개·3억` 정의와 불일치 | 사용자 확인 성과 구조가 반영되지 않음 | 차단 | 값·라벨 3쌍을 정확히 교체 | 발견 |
| QA-BASE26-005 | 반응형 | 긴 새 H1·장문 서브카피·긴 가운데 stat 라벨이 네 폭에서 미검증 | 태블릿 글자 급증, 모바일 카드 높이 불균형 가능 | 높음 | H1 breakpoint를 완만하게 조정하고 카드 최소 높이·줄바꿈을 재검사 | 발견 |
| QA-BASE26-006 | 수치 출처 | `3개`·`3억`은 저장소의 기존 프로젝트 귀속 자료가 아니라 이번 사용자 직접 확인값 | 임의 귀속 시 사실 범위 확대 가능 | 높음 | UI에는 지정값만 표시하고 배포 기록에 단일 출처·확대 금지를 유지 | 발견 |

#### 직접 수정

- `src/types/portfolio.ts`의 기본 Hero를 사용자 주석의 역할·헤드라인·장문 1개·키워드 3개·지표 3쌍으로 교체했다. `careerLabel`과 기본 CTA 데이터는 제거했다.
- 회사별 publication 호환을 위해 Hero parser는 보조 문장 1~2개를 허용하고 CTA는 `label+target 모두 있음` 또는 `둘 다 없음`만 허용한다. 한쪽만 있거나 안전하지 않은 target은 계속 거절한다.
- `src/components/Hero.tsx`에서 Hero action 블록을 DOM에서 완전히 제거했다. Navbar의 얼굴 이미지가 있는 `AI에게 묻기` 1개만 대화 진입점으로 유지한다.
- 긴 새 헤드라인에 맞춰 글자 크기를 모바일 36px, 태블릿 52px, 1024px 56px, 1280px 이상 72px로 완만하게 확장했다. 서브카피·키워드·지표 간격을 줄여 CTA 삭제 공간을 정보에 재배분했다.
- 세 지표 카드는 모바일 최소 120px, 태블릿 이상 126px의 동일 높이 flex 카드로 만들고 긴 `프로덕트 기획 및 운영` 라벨에 어절 단위 줄바꿈을 적용했다.
- `src/test/portfolio.test.ts`, `src/test/index.test.tsx`에 새 카피·지표 쌍·Hero 버튼 0개·Navbar 챗봇 1개·삭제 문구 부재·CTA optional parser 계약을 고정했다.
- `product.md`, `design.md`에 Hero의 정보 책임, CTA 0개, 사용자 직접 확인 수치의 확대 금지와 Navbar 단일 챗봇 진입 원칙을 동기화했다.

#### 동일 조건 재검사

최종 production build를 수정 전과 같은 Codex In-app Browser에서 390×844, 768×900, 946×1188, 1440×900으로 직접 재검사했다.

| 항목 | 390×844 | 768×900 | 946×1188 | 1440×900 |
|---|---:|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `931 / 931` | `1425 / 1425` |
| 문서 높이 | `13,786px` | `12,437px` | `12,345px` | `8,864px` |
| Hero 높이 / 콘텐츠 하단 | `846 / 766px` | `900 / 804px` | `1,188 / 1,092px` | `900 / 804px` |
| H1 글자 / 추정 행 | `36px / 4행` | `52px / 4행` | `52px / 2행` | `72px / 2행` |
| stat 카드 | `104×120px` | `208×126px` | `268×126px` | `331×126px` |
| Hero 버튼 / 내부 오버플로 | `0 / 0` | `0 / 0` | `0 / 0` | `0 / 0` |

- 네 너비 모두 `AI Product & Project Manager`, 새 헤드라인, 장문 1개, 키워드 3개와 `5개·3개·3억` 지표를 정확히 표시한다. 삭제 대상 안내 문장과 `프로젝트 증거 보기`, `AI에게 경력 묻기`는 Hero에서 0건이다.
- 390px에서 Hero는 콘텐츠에 맞춰 viewport보다 약 2px 자연 확장되지만 콘텐츠 하단은 section 하단보다 80px 위에 있어 잘림이 없다. 세 stat 카드는 모두 120px로 같고 가운데 긴 라벨도 `clientWidth === scrollWidth`다.
- 768px H1은 의미 단위 4행, 946·1440px은 2행이다. 제공 Hero 배경은 네 너비 모두 `naturalWidth=1720`으로 로드되고 텍스트 대비와 인물 가시성을 함께 유지한다.
- Navbar는 390px에서도 모바일 브랜드와 얼굴 이미지 `AI에게 묻기`, 메뉴가 겹치지 않는다. 공개 루트의 Hero 버튼은 0개, Navbar 챗봇 진입점은 정확히 1개, 초기 Typebot host는 0개다.
- `/admin/links`, `/p/not-real-slug`, `/not-a-real-page`를 390px 직접 로드했다. 세 경로 모두 `390 / 390`, `noindex, nofollow`, Typebot·ambient·분석 UI·Google script 0으로 통과했다.
- 전체 Vitest `46/46`, 깨끗한 내부 virtual store의 TypeScript 5.9.3 `tsc --noEmit` 진단 0, 전체 `src` ESLint 오류 0·기존 Fast Refresh 경고 7, Vite production build와 `git diff --check`가 통과했다.
- 최종 build는 HTML `1.16kB`, main `138.05kB`, CSS `14.14kB`, Typebot wrapper `1.27kB`, Typebot web runtime `199.27kB` gzip이다. 초기 Typebot preload·분석 script는 0이며 기존 runtime raw 500kB 경고만 유지된다.
- production preview console warning/error는 0건이다. 미해결 배포 차단 없음. 현재 상태는 사용자 미리보기 확인 대기이며 commit·push·실제 배포는 진행하지 않는다.

#### 배포 후 실제 URL 점검

- 사용자 확인 전에는 commit·push·배포하지 않는다.

---

### 2026-08-22 / 단일 챗봇 진입점·대화 가용 면적·Hero 이미지 대비 / base revision 25

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 로컬 미리보기 URL: `http://127.0.0.1:4177/`
- 배포 상태: 사용자 확인 전 `보류`
- 새 JD·회사별 사실은 없다. 1차 사용자인 채용 담당자가 포트폴리오 정체성과 경력 근거 탐색 경로를 더 빨리 이해하도록 기존 검증 사실과 UI만 조정한다.

#### 1~4단계 기획 기준

- Step 1 사용자 과업: `7년차 PM 이경민의 포트폴리오`임을 상단에서 즉시 이해하고, 중복되지 않은 단일 CTA로 AI 경력 가이드를 연다.
- Step 2 검증 근거: 기존의 7년 경력, AI PM 역할, 대표 프로젝트 5개와 Typebot의 공개 경력 corpus를 그대로 사용한다. 새 수치·성과·직무 적합성 주장은 추가하지 않는다.
- Step 3 콘텐츠 설계: Hero 3안 중 현재 선택된 `고객의 문제를 제품으로 해결해 온 AI PM 이경민입니다.`가 근거 강도와 문제 해결 포지셔닝이 가장 높아 유지한다. 상단 브랜드만 `7년차 PM 이경민의 포트폴리오`로 명확화하고, 모바일 공간에서는 의미를 유지한 축약형을 사용한다.
- Step 4 웹사이트화: 상단 `AI에게 묻기`를 유일한 챗봇 진입점으로 만들고 얼굴 이미지를 왼쪽에 배치한다. 챗봇은 더 큰 panel, 축소 header와 가로 질문 rail로 대화 영역을 넓힌다. Hero scrim만 완화해 제공된 배경을 더 명확히 보이게 하되 텍스트 대비를 유지한다.

#### 1차 진단 — 수정 전 라이브

실제 `https://archilab.ai.kr/`을 Codex In-app Browser에서 390×844, 768×900, 1440×900으로 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 상단 브랜드 | `이경민 · AI PM 포트폴리오` | 동일 | 동일 |
| 상단 CTA / 얼굴 이미지 | 숨김 / 0 | 표시 / 0 | 표시 / 0 |
| 우하단 챗봇 버튼 | 표시 | 표시 | 표시 |
| Hero scrim | 세로 `80%→90%` | 좌측 `94%`, 중앙 `84%`, 우측 `60%` | 동일 |

- 390px 실제 chatbot panel은 `350×704px`, header는 `348×84px`, guide body는 618px, 첫 추천 질문 영역은 124px, 입력은 `318×50px`이다.
- header는 `AI PORTFOLIO / 경력·프로젝트 가이드` 두 줄을 사용한다. 답변 뒤 예상 질문 3개도 세로로 쌓여 native transcript 가용 높이를 줄인다.
- 상단 CTA와 우하단 launcher가 동시에 존재한다. 모바일에서는 상단 CTA가 숨고 우하단 launcher만 남아 사용자가 요청한 단일 상단 진입점과 반대다.
- Hero 원격 이미지는 정상 로드되지만 강한 검정 scrim 때문에 행사 이미지와 인물의 맥락이 희미하다.

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE25-001 | 챗봇 | panel 704px와 84px 이중 제목 header, 세로 질문 목록으로 답변 영역이 좁음 | 긴 경력 답변을 한눈에 읽기 어려움 | 높음 | panel을 viewport 안에서 확대하고 header를 한 줄로 축소, 후속 질문을 가로 rail로 전환 | 발견 |
| QA-BASE25-002 | 챗봇 진입 | 상단 CTA와 우하단 launcher가 중복되고 모바일 상단 CTA는 숨김 | 어디서 대화를 시작해야 하는지 일관되지 않음 | 높음 | 모든 너비의 상단 CTA 하나만 유지하고 local/native launcher를 항상 숨김 | 발견 |
| QA-BASE25-003 | 상단 CTA | 얼굴 이미지가 없음 | 포트폴리오 주체와 AI 가이드 연결이 약함 | 보통 | 기존 공개 chatbot 얼굴 이미지를 CTA 왼쪽에 28~32px로 표시 | 발견 |
| QA-BASE25-004 | Hero | scrim이 최대 94%로 배경 증거 이미지를 거의 가림 | 사용자가 제공한 현장 이미지의 맥락이 전달되지 않음 | 보통 | 채도 복원과 scrim 완화, 390/768/1440 대비·크롭 재검사 | 발견 |
| QA-BASE25-005 | Navbar 주석 | `7년차 PM 이경민의 포트폴리오` 설명이 상단에 직접 드러나지 않음 | 첫 5초 정체성 확인이 한 단계 늦음 | 보통 | 검증된 7년 경력을 사용해 브랜드·접근성 이름을 명확화 | 발견 |

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE25-001 | `src/components/TypebotBubble.tsx`, `src/data/chatbot.ts` | panel 최대 크기를 `480×820px`로 확대하고 header를 얼굴 이미지+`AI PM 이경민` 한 줄·62~64px로 축소했다. 답변 뒤 후속 질문 3개는 44px 가로 scroll-snap rail로 전환하고 16px·50px 입력을 채팅 가용 폭 전체에 유지했다. | 없음 | 통과 |
| QA-BASE25-002 | `src/components/TypebotBubble.tsx`, `src/components/Hero.tsx`, `src/components/Navbar.tsx`, `src/lib/chat.ts`, `src/index.css` | Typebot native button·로컬 우하단 launcher·Hero 보조 챗봇 CTA를 제거하고 Navbar `AI에게 묻기`만 남겼다. launcher DOM이 없는 상태에서도 실제 bot panel로 준비 완료를 판정하고, 닫은 뒤 해당 Navbar CTA로 포커스를 복귀시킨다. 이전 launcher·별도 pre-chat guide의 미사용 전역 CSS도 삭제했다. | 없음 | 통과 |
| QA-BASE25-003 | `src/components/Navbar.tsx`, `src/data/chatbot.ts` | 기존 공개 chatbot 얼굴 이미지를 공용 상수로 만들고 모든 화면 폭의 상단 CTA 왼쪽에 32px 원형 이미지로 표시했다. | 없음 | 통과 |
| QA-BASE25-004 | `src/index.css` | Hero 이미지의 밝기·채도를 보정하고 desktop scrim 우측 끝을 60%에서 34%로 완화했다. 작은 본문이 놓이는 좌측 60%와 모바일의 기존 강한 scrim·45% crop은 유지했다. | 장식 배경 표현만 변경 | 통과 |
| QA-BASE25-005 | `src/components/Navbar.tsx`, `src/test/index.test.tsx` | desktop 브랜드를 `7년차 PM 이경민의 포트폴리오입니다.`, mobile을 `이경민 · 7년차 PM`으로 표시하고 접근성 이름에 전체 문장을 유지했다. | 검증된 7년 경력 재배치 | 통과 |
| 문서화 | `product.md`, `design.md`, `deploy.md` | 단일 Navbar 진입점, compact chat, 후속 질문 rail, panel 크기와 배경 대비 원칙을 배포 전 기준 문서에 동기화했다. | 없음 | 완료 |

- 질문 원문·답변·회사명·URL query를 분석이나 prefilled variable로 보내지 않는 기존 privacy 경계를 유지했다.
- native Typebot input은 공식 bridge를 위해 DOM에 유지하되 `aria-hidden`, `tabIndex=-1`로 중복 키보드 탐색에서 제외했다.
- 회사별 publication·Supabase 경력 데이터·EmailJS·GA 기본 비활성 정책·프로젝트 사실은 변경하지 않았다.

#### 동일 조건 재검사

최종 production build를 수정 전과 같은 Codex In-app Browser 조건에서 재검사했다. 390px에서는 공개 근거 질문 `AI 제품 0→1 경험을 보여줘.`를 실제 Typebot에 제출해 답변 완료 뒤 상태까지 확인했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Navbar 브랜드 | `이경민 · 7년차 PM` | `7년차 PM 이경민의 포트폴리오입니다.` | 동일 |
| 상단 CTA / 얼굴 이미지 | `표시 / 1` | `표시 / 1` | `표시 / 1` |
| Hero·우하단 챗봇 CTA | `0 / 0` | `0 / 0` | `0 / 0` |
| Typebot panel | `366×820px` | `480×820px` | `480×820px` |
| native Typebot launcher | 0 | 0 | 0 |

- 390px 답변 완료 상태에서 header는 62px, 후속 질문은 3개, 가로 rail은 `340 / 562px`로 내부에서만 scroll한다. 입력은 `340×50px`, composer는 약 277px이며 panel에서 header·composer를 제외한 대화 기록 가용 높이는 약 481px이다.
- 390px 닫기 버튼과 후속 질문의 최소 터치 높이는 44px이다. Escape로 닫으면 실제 대화를 연 Navbar `AI에게 묻기`에 포커스가 복귀한다.
- 768·1440px의 첫 입력은 `442×50px`이며 panel은 viewport 안에 유지된다. 세 너비 모두 페이지 가로 오버플로와 native·local 우하단 launcher가 0이다.
- 사용자 주석과 같은 946×1188 조건은 `931 / 931px`로 통과했다. 브랜드 234px, 상단 CTA 118px, 메뉴 44px가 겹치지 않고 Hero 우측 배경은 더 선명해졌으며 좌측 카피 대비는 유지된다.
- `/admin/links`, `/p/not-real-slug`, 임의 404는 390px에서 `noindex, nofollow`, Typebot 0, portfolio ambient 0, analytics UI·Google script 0, 가로 오버플로 0이다. 무효 맞춤 링크는 `유효하지 않은 링크입니다`로 전환된다.
- 자동 검사: Vitest `44/44`, clean TypeScript 5.9.3 `tsc --noEmit` 통과, 변경 파일 ESLint 오류·경고 0, 전체 `src` ESLint 오류 0·기존 Fast Refresh 경고 7, `git diff --check` 통과.
- production build: Vite 6.4.3 성공. main `137.98kB gzip`, CSS `14.11kB gzip`, Typebot wrapper `1.27kB gzip`, Typebot web runtime `199.27kB gzip`. 미사용 launcher·pre-chat CSS 정리로 최종 직전 후보보다 CSS가 `2.09kB gzip` 감소했다. Typebot은 초기 HTML에 preload되지 않고 상단 CTA 선택 뒤에만 mount된다. 기존 web runtime raw 500kB 초과 경고는 유지된다.
- 로컬 production preview console warning/error는 0건이다.
- 현재 배포 가능 여부: `사용자 미리보기 확인 대기`. commit·push·실제 배포는 아직 하지 않는다.

#### 배포 후 실제 URL 점검

- 사용자 미리보기 확인 전에는 commit·push·배포하지 않는다.

---

### 2026-08-22 / Evidence-first 포트폴리오·지속형 챗봇 입력 경험 / base revision 24

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 24
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1~4단계 적용 기준

- 특정 회사 JD나 새로운 경력 사실은 제공되지 않았다. base revision 21의 검증된 `이경민 · AI Product Manager · 7년 경력`, 대표 프로젝트 5개, 350만 MAU, 운영 원가 70%+와 프로젝트 귀속을 유지한다.
- 사용자 승인 기획인 `채용 의사결정을 위한 경력 증거 탐색`을 1단계 제품 가치로 삼는다. 기본 문서는 Evidence-first로 구성하고, Navbar·Hero·플로팅 진입점에서 같은 근거를 묻는 Chat-first 경로를 병렬 제공한다.
- 이전 로컬 후보의 Hero·전역 미디어 배경·역량 탐색·프로젝트별 이미지 슬라이드/확대 영역을 함께 검증해 배포한다. 실제 프로젝트 PNG가 아직 없으므로 허위 화면을 만들지 않고 교체 가능한 영역만 표시한다.
- 챗봇은 첫 화면과 답변 이후가 같은 코랄·화이트·Pretendard 체계를 사용한다. 답변 뒤에도 헤더, 예상 질문 3개와 넓은 입력폼을 실제 Typebot 채팅창 안에 유지하고 공식 `setInputValue → submitInput` 경로만 사용한다.

#### 1차 진단 — 수정 전 라이브

실제 라이브 base revision 21을 동일 브라우저에서 390×844, 768×900, 1440×900으로 검사했다. 390px에서는 공개 근거만 포함한 고정 질문 `AI 제품 0→1 경험을 보여줘.`를 제출해 답변 이후의 실제 Typebot 입력 상태를 확인했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `9,917px` | `8,700px` | `6,597px` |
| 분석 배너 | 0 | 0 | 0 |
| 답변 후 Typebot panel | `350×704px` | 미실행 | 미실행 |
| 답변 후 기본 input form / 실제 input | `296×58 / 약 56×56px` | 미실행 | 미실행 |
| 답변 후 입력 폰트 | `Inter` | 미실행 | 미실행 |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|---|
| QA-BASE24-001 | 챗봇 답변 이후 | 초기 가이드가 사라지고 Typebot 기본 입력이 약 56px로 축소됨 | 후속 질문을 읽고 입력하기 어렵고 대화 흐름이 끊김 | 차단 | 실제 채팅창 안에 전폭 custom composer를 계속 유지 | 발견 |
| QA-BASE24-002 | 챗봇 답변 이후 | 추천 질문이 사라져 사용자가 다음 질문을 다시 생각해야 함 | 근거 탐색의 다음 단계가 불명확 | 높음 | 입력폼 바로 위에 검증 근거와 연결된 예상 질문 3개를 항상 표시 | 발견 |
| QA-BASE24-003 | 챗봇 전체 | 초기 코랄·Pretendard 가이드와 답변 이후 흰색·청록·Inter UI가 불일치 | 외부 위젯처럼 보이고 제품 신뢰·완성도 저하 | 높음 | 고정 코랄 헤더, 동일 font·bubble·focus·surface 토큰 적용 | 발견 |
| QA-BASE24-004 | 배포 | base revision 23 Evidence·미디어·배경 후보가 로컬 검증 후 커밋·푸시되지 않음 | 사용자가 승인한 제품 기획이 실제 URL에 반영되지 않음 | 차단 | 현재 챗봇 개선과 함께 전체 후보를 재검증해 commit·push·Pages 배포 | 발견 |

1차 진단 요약:

- 현재 라이브의 가로 오버플로와 분석 배너는 0건이며 이를 회귀 조건으로 유지한다.
- 답변 후 넓은 입력폼과 예상 질문 3개를 같은 채팅창 안에 지속시키고, native Typebot transcript는 그대로 살린다.
- 질문·답변·이름·이메일·회사명은 URL·GA·prefilled variables·console에 전달하지 않는 기존 개인정보 경계를 유지한다.

#### 직접 수정

- `src/components/TypebotBubble.tsx`의 실제 `[part="bot"]` 내부 portal을 첫 화면 전용 guide가 아니라 지속형 chat shell로 확장했다. 코럴 gradient 헤더와 Pretendard를 처음부터 답변 이후까지 유지한다.
- 첫 질문 뒤 native Typebot transcript는 중앙에 그대로 노출하고, native 축소 입력폼은 DOM·공식 입력 계약을 유지한 채 시각적으로만 1×1px로 숨겼다. 화면에는 390px 기준 324×50px, 768·1440px 기준 370×50px의 custom input과 50px 전폭 전송 버튼을 고정했다.
- `src/data/chatbot.ts`에 검증된 후속 질문 3개를 추가했다. `AI 제품 0→1`, `데이터·운영 개선`, `GenON B2B·B2G 사업화` 질문을 입력폼 위에 항상 표시하고 같은 `setInputValue → submitInput` 경로로 전달한다.
- Typebot `onNewInputBlock`을 로컬 타입과 상태 경계에 연결했다. 답변 중에는 composer를 제거하지 않고 `답변을 준비하고 있어요.` 상태로 비활성화하며 새 입력 블록이 준비되면 후속 질문과 입력을 다시 활성화한다.
- Typebot native transcript의 폰트와 action color를 Pretendard·코럴로 통일했다. `Made with Typebot` 배지를 가리지 않도록 composer 하단에 전용 공간을 두고 모바일 실제 교차 면적을 0으로 맞췄다.
- base revision 23의 `이경민 · AI PM 포트폴리오` Navbar/Hero, Supabase Hero·ambient 배경, 역량 근거 탐색, 대표 프로젝트 5개 PNG 슬라이드·확대 영역, `product.md`·`design.md`를 함께 유지했다. 새 경력 사실·이미지·수치는 만들지 않았다.
- `design.md`에 답변 이후 헤더·예상 질문 3개·전폭 입력을 지속하는 UI 계약을 추가했다. 분석 기본 비활성, 질문 원문 미수집, query 제거, 보호 route 격리는 변경하지 않았다.

#### 동일 조건 재검사

최종 production build를 Codex In-app Browser에서 390×844, 768×900, 1440×900으로 위→아래 및 실제 Typebot 답변 이후 상태까지 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `13,836px` | `12,475px` | `8,882px` |
| Typebot panel | `350×704px` | `400×704px` | `400×704px` |
| 지속 composer | `348×364px` | `398×368px` | `398×368px` |
| custom input | `324×50px` | `370×50px` | `370×50px` |
| 예상 질문 / 브랜드 배지 교차 | `3개 / 0px` | `3개 / 0px` | `3개 / 0px` |
| 분석 배너 / 가로 오버플로 | `0 / 0` | `0 / 0` | `0 / 0` |

- 첫 화면은 실제 Typebot 채팅창 안에 코럴 헤더, 추천 질문 4개, 직접 입력, 개인정보 안내를 표시했다. 질문 제출 뒤에는 같은 헤더와 Pretendard가 남고 native 답변, 예상 질문 3개, 후속 입력이 한 창 안에서 이어졌다.
- 390px 답변 이후 native input은 opacity 0·1×1px, custom input은 324×50px이며 bot·composer 모두 `scrollWidth === clientWidth`다. `Made with Typebot` 배지와 custom 전송 버튼의 교차 면적은 0px다.
- 768·1440px custom input은 370×50px, 예상 질문은 3개이며 같은 코럴·화이트 surface와 bubble 변수를 사용한다. 답변 완료 뒤 입력·후속 질문이 다시 활성화되는 것을 실제 Typebot 응답으로 확인했다.
- Hero에 이름·AI PM·포트폴리오 성격, 역량 근거 탐색, 대표 프로젝트 5개의 이미지 준비 영역, 배경 video가 세 너비에서 표시되고 전체 가로 오버플로는 0이다. 분석 배너·Google UI는 0건이다.
- `/admin/links`, `/p/not-real-slug`, 임의 404는 `noindex, nofollow`, Typebot·ambient·분석 UI 0을 유지한다. 모바일 404는 `390 = 390`으로 가로 오버플로가 없다.
- 전체 Vitest `47/47`, 변경 소스 ESLint 오류 0·기존 UI scaffold Fast Refresh 경고 7, 깨끗한 내부 pnpm virtual store의 `tsc --noEmit -p tsconfig.app.json` 진단 0, `git diff --check`, Vite 6.4.3 production build가 통과했다.
- 최종 build: HTML `1.16kB`, main `138.30kB`, CSS `16.10kB`, Typebot wrapper `1.27kB`, Typebot web runtime `199.27kB` gzip. Typebot은 초기 HTML preload 0이며 사용자 진입 뒤에만 로드된다.
- production preview console warning/error 0. 미해결 배포 차단 없음. 배포 가능 여부: `가능`.

#### 배포 후 실제 URL 점검

- 배포 commit: `b5d9d5e940f1d5cd0ffe4b9ae50bd679f86dd205` (`Build evidence-first portfolio and persistent chatbot composer`). 기존 문서 전용 commit `75a43b1`과 함께 `origin/main`에 push했다.
- GitHub Actions `Deploy Portfolio to GitHub Pages` Run #31, ID `32540872617`은 `completed / success`다. `build` job `96950504917`의 의존성 설치·품질 검사·Pages artifact build/upload와 `deploy` job `96950586362`의 Pages 배포가 모두 성공했다. 실행 URL: `https://github.com/gmbro/portfolio/actions/runs/32540872617`.
- 실제 URL은 새 main asset `/assets/index-CQ8xIF29.js`를 응답했다. 390×844, 768×900, 1440×900에서 clientWidth / scrollWidth는 각각 `375/375`, `753/753`, `1425/1425`로 가로 오버플로 0이며 문서 높이는 `13,836px`, `12,475px`, `8,882px`다.
- 라이브 Typebot에 고정 공개 질문 `AI 제품 0→1 경험을 보여줘.`를 제출했다. 답변 이후에도 예상 질문 3개, 같은 코럴 header와 Pretendard, 넓은 custom input이 유지됐다. panel은 `350×704px / 400×704px / 400×704px`, input은 `324×50px / 370×50px / 370×50px`, 전송 버튼과 `Made with Typebot` 배지 교차는 세 너비 모두 0px다.
- 실제 페이지에는 Hero·ambient 배경, Evidence Product 역량 탐색, 대표 프로젝트 5개의 `증거 이미지 준비 중` 영역이 표시되고 분석 배너는 0이다. 초기 Typebot host도 0이며 사용자 진입 뒤에만 mount된다.
- 라이브 `/admin/links`, `/p/not-real-slug`, `/not-a-real-page`를 390px에서 직접 검사했다. 세 경로 모두 `noindex, nofollow`, clientWidth / scrollWidth `390/390`, Typebot·ambient·분석 UI 0이다.
- 라이브 브라우저 console warning/error 0. 배포 차단 및 롤백 사유 없음. 최종 배포 상태: `완료`.

### 2026-08-19 / 전체 미디어 배경·Hero 증거 이미지·인윈도우 챗 가이드 / base revision 23

#### 범위·제품 판단

- 사용자 정정에 따라 `colorflow-animation.mp4`는 챗봇이 아니라 포트폴리오 전체 배경과 톤앤매너에 사용한다. `background.png`는 Hero 헤더 배경으로 배치하고 기존 검증 카피를 그 위에 유지한다.
- 챗봇은 별도 pre-chat guide를 먼저 노출하지 않는다. launcher 클릭으로 실제 Typebot 창을 열고, 안내·추천 질문·개인정보 문구는 같은 채팅 창 경계 안에 표시한다.
- 새 JD·경력·성과 사실은 없다. 확인된 대표 프로젝트 5개와 모든 수치·귀속은 유지하되, 합의한 1단계 `채용 의사결정을 위한 경력 증거 탐색`을 위해 Hero·Navbar의 정체성 문구와 정보 구조를 재배치한다.
- Evidence Product와 Chat-first Portfolio를 병행한다. 정적 경력 증거가 기본 경로이며 Navbar·Hero·플로팅 런처에서 같은 인윈도우 챗봇을 여는 병렬 탐색 경로를 제공한다.
- 이미지·차트는 실제 공개 PNG를 받기 전 `증거 이미지 준비 중` 슬롯으로 표시한다. 이후 동일 데이터 구조에서 슬라이드·키보드 탐색·클릭 확대 dialog로 교체할 수 있게 한다.
- 사용자 제공 공개 자산은 Supabase Storage `videi` bucket의 `background.png`와 `colorflow-animation.mp4`다. 로컬 확인 결과 이미지는 `1720×764 RGBA / 약 994KB`, 영상은 `2560×1920 / 3초 / 약 764KB`다.

#### 1차 진단 — 수정 전 라이브

실제 `https://archilab.ai.kr/`을 Codex In-app Browser에서 390×844, 768×900, 1440×900으로 검사했다.

| ID | 영역 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE23-001 | 전체 배경 | 페이지와 About·Projects·Experience·Contact가 각각 불투명 `#070707/#0a0a0a`이며 배경 영상이 없음 | 사용자가 요청한 파스텔 컬러 플로우 톤이 전체 경험에 반영되지 않음 | 높음 | 지연 로드·무음·반복 전역 video backdrop과 어두운 가독성 overlay를 추가하고 섹션 surface를 반투명화 | 발견 |
| QA-BASE23-002 | Hero | 세 너비 모두 Hero 이미지 0, 기존 검정 radial/grid만 표시 | 실제 활동 이미지가 첫 인상과 경력 증거에 연결되지 않음 | 높음 | `background.png`를 장식 배경으로 eager 렌더하고 모바일 crop·어두운 다중 overlay 위에 기존 텍스트 유지 | 발견 |
| QA-BASE23-003 | 챗봇 | launcher 클릭 뒤 실제 Typebot보다 별도 `경력·프로젝트 가이드` dialog가 먼저 표시됨 | 사용자가 기대한 하나의 채팅 창 경험과 다름 | 높음 | click-only lazy-load는 유지하되 클릭 시 Bubble을 직접 열고 guide를 Typebot window 내부 전용 mount에 렌더 | 발견 |
| QA-BASE23-004 | CSP | Supabase project host는 `connect-src`에만 있고 `img-src`, `media-src`에는 없음 | 새 이미지·영상이 브라우저에서 차단됨 | 차단 | `img-src`·`media-src`에 정확한 Supabase host만 추가 | 발견 |
| QA-BASE23-005 | 성능·접근성 | 994KB Hero PNG와 764KB 배경 영상은 그대로 초기 요청하면 이전 체감 속도 개선을 상쇄할 수 있음 | 느린 네트워크·데이터 절약·모션 민감 사용자 부담 | 높음 | Hero만 우선 로드, 영상은 첫 paint 뒤 지연 mount; reduced-motion·save-data에서는 정적 컬러 fallback | 발견 |

| 수정 전 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Hero 이미지 / 전체 배경 video | `0 / 0` | `0 / 0` | `0 / 0` |
| Hero H1 가시성 / opacity | `가시 / 1` | `가시 / 1` | `가시 / 1` |
| 챗봇 첫 화면 | 별도 guide dialog | 동일 | 동일 |

- 현재 세 너비의 가로 오버플로는 0이며 이 상태를 회귀 기준으로 유지한다.
- 이미지의 기존 행사 화면 문구와 새 Hero 텍스트가 경쟁할 수 있으므로 밝기·대비 overlay와 `object-position`을 너비별로 직접 검사한다.
- 수정 전 기록을 완료했다. 이제 전역 backdrop, Hero media layer, section surface, CSP와 Typebot window 내부 guide만 변경한다.

#### 직접 수정

- `product.md`, `design.md`를 새로 만들고 1·2·3차 사용자, 1단계 범위, North Star `근거 기반 채용 판단 완료율`, Evidence-first + Chat-first IA, 시각 자료·접근성·성능 원칙을 배포 기준으로 고정했다.
- Hero에는 Supabase `background.png` 장식 이미지를 적용하고 390px `object-position:45% center`, 데스크톱 중심 crop과 다중 dark scrim을 사용했다. H1은 `고객의 문제를 제품으로 해결해 온 AI PM 이경민입니다.`로 바꾸고 `이경민의 AI PM 포트폴리오 · 7년 경력`을 명시했다.
- Navbar 브랜드를 `이경민 · AI PM 포트폴리오`로 확장했다. Hero primary CTA는 프로젝트 증거, secondary CTA와 Navbar CTA는 동일한 Chat-first 진입점으로 연결했다.
- `PortfolioAmbient`를 Index에 한 번만 mount했다. Supabase `colorflow-animation.mp4`는 window load 후 300ms 지연, 무음·playsInline·1회 재생이며 reduced-motion·Data Saver에서는 URL 자체를 mount하지 않는다. 각 섹션은 반투명 surface로 바꾸고 Navbar blur를 제거했다.
- `EvidenceNavigator`와 역량 매핑 데이터를 추가했다. `제품 0→1 / 데이터·운영 / 대규모 성장 / B2B·B2G 사업화 / 프로젝트 실행`을 현재 대표 프로젝트 5개의 담당 책임·결과·metric과 직접 연결하고 프로젝트 앵커로 이동시킨다.
- `EvidenceMediaGallery`를 추가하고 대표 프로젝트 5개에 production placeholder를 표시했다. PNG 배열이 제공되면 이전·다음·점·Home/End/Arrow 탐색과 body portal 확대 dialog, Escape·focus trap·trigger focus 복귀를 지원한다.
- Typebot 전에 뜨던 별도 guide를 제거했다. launcher·Navbar·Hero 진입은 Bubble을 직접 열고, 안내·추천 질문·직접 입력·개인정보 문구를 실제 `[part=bot]` 내부 전용 portal에 렌더한다. native flow는 guide 동안 `inert/aria-hidden` 처리하고 제출·닫기 race는 취소한다.
- CSP `img-src`, `media-src`에 정확한 Supabase origin을 추가했다. 공개 기본 페이지 분석 OFF·배너 비노출, query 제거, 질문·답변 analytics 0 정책은 유지했다.

#### 동일 조건 재검사

- production build와 동일 소스를 Codex In-app Browser에서 390×844, 768×900, 1440×900으로 위→아래 재검사했다.

| 수정 후 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Hero 이미지 | `1720px 로드 / 45% crop` | 로드 / 중앙 crop | 로드 / 중앙 crop |
| 전체 배경 video | 지연 mount / no loop | 동일 | 동일 |
| 증거 역량 / 이미지 슬롯 | `5 / 5` | `5 / 5` | `5 / 5` |
| 분석 배너 / 초기 Typebot | `0 / 0` | `0 / 0` | `0 / 0` |

- 모바일·태블릿·데스크톱에서 Hero 이름·역할·문서 성격, CTA 2개와 3개 stat이 잘림 없이 보였다. Evidence accordion과 프로젝트 카드·이미지 슬롯의 가로 오버플로는 0이다.
- 모바일 실제 Typebot 창은 bot rect `350×704`, guide mount `348×702`로 border 1px을 제외한 경계가 일치했고 mount의 부모는 실제 `[part=bot]`이었다. 추천 질문 4개·직접 입력·개인정보 문구가 같은 창 안에 보이며 native child는 guide 동안 inert 처리된다.
- Typebot 직접 입력 준비 전 상태와 준비 완료, header 닫기, launcher focus 복귀를 확인했다. Navbar의 `AI에게 묻기`도 동일 인윈도우 guide를 열며 브라우저 console warning/error는 새 세션에서 0이었다.
- `/admin/links`, `/p/not-real-slug`, 임의 404는 모두 `noindex, nofollow`, ambient 0, Typebot 0, 분석 UI 0이며 가로 오버플로 0이다.
- 전체 Vitest `47/47`, 변경 파일 ESLint error 0, 깨끗한 내부 pnpm virtual store의 `tsc --noEmit` 진단 0, production build 성공을 확인했다. 현재 작업 폴더의 오래된 외부 pnpm symlink에서만 기존 `chart/input-otp` 오탐이 재현된다.
- 최종 자체 초기 자산은 HTML `1.16kB`, main `137.42kB`, CSS `16.10kB` gzip이다. Hero PNG 약 994KB는 main 실행 뒤 요청되고 MP4 약 764KB는 load+300ms 뒤 요청된다. Typebot은 초기 preload 0, wrapper `1.27kB`는 의도 시점, web runtime `199.27kB`는 Bubble mount 시 로드된다.
- 재검사 판단: 미해결 배포 차단 없음. 사용자 요청에 따라 `origin/main` push와 GitHub Pages 배포를 진행한다.

#### 배포 후 실제 URL 점검

- 2026-08-19 로컬 구현·검사는 완료했으나 `.git/index.lock` 생성을 위한 Codex 앱 권한 승인 단계에서 계정 사용 한도에 도달해 commit/push가 실행되지 않았다.
- 소스·문서 변경은 작업 폴더에 보존되어 있으며 사용자 소유 `node_modules 2/`, `tsconfig.*.tsbuildinfo`는 스테이징·수정하지 않았다.
- 배포 상태: `대기`. Git 쓰기 권한을 사용할 수 있는 다음 실행에서 의도한 파일만 commit → `origin/main` push → GitHub Actions success → 실제 URL 세 너비 재검사를 이어서 수행한다.

---

### 2026-08-19 / 근거 탐색형 챗봇 입력 가이드·체감 속도 개선 / base revision 22

#### 범위·제품 판단

- 대상 revision: 기본 공개 포트폴리오 base revision 22.
- 새 JD·경력·성과 수치가 제공되지 않았으므로 JD 분석, 역량 매칭, Hero 카피와 대표 프로젝트 5개의 사실은 base revision 21을 그대로 유지한다.
- 이번 변경의 사용자 과업은 채용 담당자가 빈 입력창 앞에서 질문을 고민하지 않고 `AI 제품 0→1`, `대규모 제품 운영`, `데이터·운영 개선`, `B2B·B2G 사업화` 중 필요한 검증 근거를 빠르게 찾는 것이다.
- 첨부 레퍼런스에서는 흰색 패널, 짧은 가이드, 추천 질문, 큰 입력 액션만 채택한다. 대학 장학금 내용, 블루 브랜드, 큰 영문 제목, 과도한 캐릭터와 화면을 잠식하는 거대한 입력 영역은 사용하지 않는다.
- 새 외부 폰트·이미지·분석 수집은 추가하지 않는다. 사이트의 Pretendard와 CSS `AI` 모노그램을 사용하고, 공개 `/`의 분석 비활성·배너 비노출을 회귀 조건으로 고정한다.

#### 1차 진단 — 수정 전 라이브

실제 `https://archilab.ai.kr/`의 Typebot을 열고 같은 브라우저에서 390·768·1440px을 직접 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Typebot panel | `350×704px` | `400×704px` | `400×704px` |
| launcher | `148×52px` | `176×52px` | `196×64px` |
| Typebot 입력 | `214×56px` | `264×56px` | `264×56px` |
| 입력 폰트 | `Inter` | `Inter` | `Inter` |
| placeholder / 전송 접근성 이름 | `질문을 입력해주세요! / Send` | 동일 | 동일 |
| 분석 배너·가로 오버플로 | `0 / 0` | `0 / 0` | `0 / 0` |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE22-001 | 첫 열기 | launcher 클릭 뒤 약 199KiB gzip Typebot web runtime이 준비될 때까지 보이는 로딩·가이드가 없음 | 클릭이 먹지 않았거나 느리다고 인식 | 높음 | 클릭 즉시 로컬 가이드 패널을 표시하고 hover·focus·click에는 1.27KiB gzip React wrapper만 준비; web runtime은 질문 제출 뒤 로드 | 발견 |
| QA-BASE22-002 | 질문 시작 | 첫 인사가 짧고 추천 질문·입력 범위 안내가 없음 | 채용 담당자가 무엇을 물을지 결정하는 비용이 큼 | 높음 | 검증 근거 4개와 1:1로 연결한 추천 질문, 직접 입력, 개인정보 안내 제공 | 발견 |
| QA-BASE22-003 | 시각 일관성 | 실제 대화 입력은 사이트 Pretendard가 아닌 Inter이고 레퍼런스 대비 위계·브랜드 연결이 약함 | 별도 외부 위젯처럼 보여 신뢰·완성도 저하 | 보통 | 로컬 가이드에 사이트 폰트·코랄 그라디언트·AI 모노그램 적용, Typebot shadow의 안정적 의미 클래스만 최소 보정 | 발견 |
| QA-BASE22-004 | 접근성·현지화 | 실제 입력 placeholder는 일반적이고 전송 버튼 이름은 `Send` | 한국어 사용자·스크린리더 경험 불일치 | 높음 | 구체적 한국어 placeholder·label·전송 이름, 2~500자 오류, 키보드·focus·reduced-motion 보장 | 발견 |
| QA-BASE22-005 | 개인정보·분석 | query 제거와 대화 본문 미수집은 유지되지만 질문 전 경고가 없음 | 비공개 회사 정보를 외부 Typebot에 넣을 위험 | 높음 | 제출 전에 Typebot 처리·개인정보/기밀 입력 금지 문구 노출; 자유 질문은 GA에 전달하지 않음 | 발견 |
| QA-BASE22-006 | 실패 복구 | 외부 로드 실패 시 짧은 상태만 있고 프로젝트 직접 탐색 경로가 없음 | 챗봇 장애가 핵심 증거 탐색을 막을 수 있음 | 보통 | 다시 시도와 `프로젝트 직접 보기` 정적 fallback 제공 | 발견 |
| QA-BASE22-007 | 첫 화면 체감 속도 | LCP 후보인 Hero H1이 초기 `opacity: 0`에서 80ms 지연 뒤 650ms 애니메이션으로 표시됨 | 네트워크가 빠른 환경에서도 핵심 메시지가 늦게 보일 수 있음 | 높음 | H1만 첫 프레임부터 정적으로 렌더하고 나머지 단계적 모션은 유지 | 발견 |

- 현재 장점인 클릭 후 lazy-load, URL query 제거, 외부 장애 격리, 문의·외부 CTA 구간의 닫힌 launcher 숨김, 분석 비활성, 기본 콘텐츠 접근 가능성은 유지한다.
- 수정 방향을 기록했으며 이제 `TypebotBubble`, 관련 스타일·타입·테스트만 최소 범위로 변경한다.

#### 직접 수정

| 파일 | 직접 수정 | 이유 |
|---|---|---|
| `src/data/chatbot.ts` | 헤더·안내·개인정보·상태 문구, 검증 근거와 연결된 추천 질문 4개, 2~500자 검증을 단일 데이터 소스로 추가 | 화면·테스트·외부 전달 질문이 서로 어긋나지 않게 함 |
| `src/components/TypebotBubble.tsx` | launcher 클릭 즉시 여는 로컬 guide dialog, 공식 `setInputValue`→`submitInput` bridge, 10초 timeout·실제 재시도·정적 프로젝트 fallback, query 제거, focus 복귀·Esc 취소를 구현 | 외부 runtime 대기 공백을 가리고 실패 시에도 포트폴리오 탐색을 유지 |
| `src/components/TypebotBubble.tsx`, `src/pages/Index.tsx` | 분석이 비활성인 기본 `/`에서는 consent DOM query·`MutationObserver`를 만들지 않도록 명시 prop으로 분기 | 비노출 분석 UI를 감시하던 상시 작업 제거 |
| `src/index.css` | 흰 패널, 포트폴리오 코랄 그라디언트, 기존 avatar+CSS `AI` fallback, Pretendard, 2×2 질문, 16px 입력·52px 액션, safe-area·reduced-motion 스타일 추가 | 레퍼런스의 명료한 입력 구조를 브랜드·모바일 제약에 맞게 적용 |
| `src/components/Hero.tsx` | LCP 후보 H1을 `motion.h1`에서 정적 `h1`으로 변경 | 첫 프레임 `opacity: 0`, 80ms delay, 650ms 진입 애니메이션 제거 |
| `src/types/typebot-react.d.ts` | 설치된 Typebot 0.10.7의 `BubbleProps`, `setInputValue`, `submitInput` 선언 추가 | 직접 API 우회 없이 SDK의 정상 입력·검증 경로를 타입 안전하게 사용 |
| `src/test/*` | guide·입력 검증·공식 bridge 순서·timeout·재시도·focus·분석 observer 조건·4개 추천 질문의 경력 근거 연결 테스트 추가 | 공개 근거 밖 질문, 중복 전송, 실패 복구·개인정보 회귀 방지 |

- 질문 원문·답변·이름·이메일·회사명은 GA, URL, `prefilledVariables`, console에 전달하지 않는다. `chat_open`의 고정 이벤트만 기존 정책 범위에서 유지한다.
- 실제 Typebot 내부 DOM에는 구조 주입을 하지 않고 placeholder·접근성 이름·공식 CSS 변수만 보정한다. Typebot 장애나 미실행 상태에서도 본문·프로젝트·문의 경로는 계속 작동한다.
- 기존 Typebot avatar를 재사용하되 48×48 크기를 고정하고 CSS `AI` fallback을 먼저 렌더한다. 새 이미지 공급자·새 웹폰트는 추가하지 않았다.

#### 동일 조건 재검사

최종 production build를 수정 전과 같은 Codex In-app Browser와 390·768·1440px 조건에서 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 로컬 guide panel | `335×539px` | `400×554px` | `400×554px` |
| 직접 입력 / 전송 버튼 | `301×52 / 301×52px` | `362×52 / 362×52px` | `362×52 / 362×52px` |
| 추천 질문 1개 | `147×62px` | `177×62px` | `177×62px` |
| 입력 폰트 / 초기 focus | `Pretendard / 입력` | 동일 | 동일 |
| 초기 Typebot host / 분석 배너 / Google script | `0 / 0 / 0` | `0 / 0 / 0` | `0 / 0 / 0` |
| H1 첫 프레임 opacity / 가로 오버플로 | `1 / 0` | `1 / 0` | `1 / 0` |

- guide는 세 너비 모두 viewport 안에 있고 자체 `clientHeight === scrollHeight`로 불필요한 내부 스크롤이 없다. 390px에서도 좌우 20px 안전 여백을 유지한다.
- 빈 질문 제출은 `질문을 2자 이상 입력해 주세요.`를 표시하고 입력으로 focus를 돌려보낸다. Esc와 닫기 버튼은 guide를 닫고 launcher로 focus를 복귀하며 Typebot host를 생성하지 않는다.
- 실제 질문을 외부 Typebot에 보내는 브라우저 동작은 수행하지 않았다. 대신 37개 자동 테스트에서 추천·자유 질문이 trim·검증을 거쳐 동일 ID에 `setInputValue`→`submitInput` 순으로 정확히 1회 전달되는 계약을 검증했다.
- `/p/not-real-slug`, `/admin/links`, 임의 404는 모두 `noindex, nofollow`, Typebot·로컬 launcher·분석 배너·Google script 0, 390px 가로 오버플로 0으로 통과했다.
- 클린 내부 virtual store의 pnpm 11.16.0·TypeScript 5.9.3에서 `tsc --noEmit -p tsconfig.app.json` 오류 0, Vitest `37/37`, 변경 파일 ESLint 오류·경고 0, 전체 tracked `src` ESLint 오류 0·기존 Fast Refresh 경고 7, `git diff --check`, Vite 6.4.3 production build가 통과했다. 로컬 `eslint .`은 사용자 소유 untracked `node_modules 2/`까지 검사해 제3자 번들 규칙 오류가 나므로 배포 판단에서 제외했으며 CI checkout에는 해당 폴더가 없다.
- 최종 build는 main `130.86kB gzip`, CSS `15.00kB gzip`, Typebot React wrapper `1.27kB gzip`, web runtime `199.27kB gzip`이다. 초기 HTML+main+CSS는 `147.01kB gzip`으로 base 21 대비 `+3.07kB(+2.14%)`; Typebot wrapper+web 합계는 `200.54kB gzip`으로 동일하다.
- 초기 HTML의 Typebot preload는 0이다. launcher hover·focus·click에는 작은 wrapper만 준비하고, 실제 199.27kB web runtime은 질문 제출 후 Bubble mount 시 로드한다. 따라서 이번 변경은 총 런타임 경량화가 아니라 `즉시 guide + 명확한 loading + H1 정적 렌더 + 불필요 observer 제거`로 체감 공백을 줄인 개선이다.
- production preview console warning/error 0. 현재 배포 가능 여부: `가능` — 콘텐츠·privacy·접근성·반응형·품질 검사 차단 없음.

#### 배포 후 실제 URL 점검

- 커밋 `4b79043944141d7bc54bd3bd705c6cab30886274`를 `origin/main`에 push했다. GitHub Actions `Deploy Portfolio to GitHub Pages` run #30(ID `32236793857`)은 2026-08-19 18:17 KST에 `completed / success`로 종료됐다. `build` job `96018463169`의 의존성 설치·품질 검사·Pages artifact build/upload와 `deploy` job `96018673472`의 `Deploy to GitHub Pages`가 모두 성공했다.
- 공개 `https://archilab.ai.kr/`가 새 initial asset `index-BidM7iqP.js`, `index-yqQhG0_A.css`를 제공하는 것을 확인했다. initial HTML에는 Typebot preload가 없고, 분석 배너와 Google Analytics script도 생성되지 않는다.

| 라이브 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 로컬 guide panel | `335×538px` | `399×552px` | `399×552px` |
| 직접 입력 / 전송 버튼 | `301×52 / 301×52px` | `361×52 / 361×52px` | `361×52 / 361×52px` |
| 추천 질문 1개 | `147×62px` | `177×62px` | `177×62px` |
| 입력 폰트 / 초기 focus | `Pretendard 16px / 입력` | 동일 | 동일 |
| 초기 Typebot host / 분석 배너 / Google script | `0 / 0 / 0` | `0 / 0 / 0` | `0 / 0 / 0` |
| H1 첫 프레임 opacity / 가로 오버플로 | `1 / 0` | `1 / 0` | `1 / 0` |

- 세 너비 모두 `경력·프로젝트 가이드` dialog, 추천 질문 4개, 개인정보 안내, 직접 입력과 전송 버튼이 viewport 안에 표시됐다. 390px 빈 질문 제출은 `질문을 2자 이상 입력해 주세요.`를 표시하고 입력으로 focus를 되돌렸으며, Esc는 guide를 닫고 `물어보기 열기` launcher로 focus를 복귀했다.
- 외부 Typebot에 실제 질문을 보내지는 않았다. 질문 제출 전까지 Typebot host는 0이었고, SDK 전달 계약은 배포 전 Vitest 37/37에서 `setInputValue`→`submitInput` 순서와 1회 전송으로 검증했다.
- `/p/not-real-slug`는 비동기 유효성 확인 뒤 한국어 무효 링크 화면과 `noindex, nofollow`, `/admin/links`는 관리자 화면과 `noindex, nofollow`, 임의 404는 한국어 404와 `noindex, nofollow`를 표시했다. 세 경로 모두 Typebot host·로컬 launcher·분석 배너·Google script 0, 390px 가로 오버플로 0이다.
- 전체 라이브 재검사 동안 browser console warning/error와 CSP 오류는 0이었다. 최종 publication은 기본 공개 포트폴리오 base revision 22이며 회사별 publication 신규 생성은 없다.
- 배포 결과: `성공`. 실행 기록: `https://github.com/gmbro/portfolio/actions/runs/32236793857`.

---

### 2026-08-15 / Arkylab·GenON 경력 직함 교정 / base revision 19

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 19
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 평가 기준: 특정 JD 없이 사용자 확인 직함의 사실 정확성, 채용 담당자의 경력 스캔, 390·768·1440px 가독성

#### 1단계 — 요청·채용 신호 분석

| 우선순위 | 평가자가 확인할 신호 | 이번 revision의 방향 |
|---:|---|---|
| 1 | 현재 회사에서 맡은 공식 역할이 즉시 읽히는가 | Arkylab 직함을 `대표`로만 표시 |
| 2 | GenON의 직급과 직무가 한눈에 읽히는가 | 사용자 요청 문장부호를 유지해 `프로.사업개발`로 표시 |
| 3 | 짧은 직함 교정이 기존 경력·프로젝트 서사를 흔들지 않는가 | 회사 설명·기간·성과·프로젝트 데이터는 유지 |

#### 2단계 — 검증 근거 구조화

| 회사 | 사용자 확인 값 | 공개 표기 | 변경하지 않는 근거 |
|---|---|---|---|
| Arkylab | 대표 | `대표` | 회사 설명 `AI 제품 개발·운영`, Archi 프로젝트와 1인 사업자 설명 유지 |
| GenON | 프로.사업개발 | `프로.사업개발` | 회사 설명 `클라우드 · AI 사업`, 기간·B2B·B2G 성과 유지 |

#### 3단계 — Hero 콘텐츠 유지 판단

| 안 | Hero 방향 | 판단 |
|---:|---|---|
| 1 (유지) | `고객의 문제를 제품으로 해결합니다.` | 이번 요청은 경력 직함 교정이므로 유지 |
| 2 | 직함을 Hero에 추가 | 핵심 가치 제안이 분산돼 제외 |
| 3 | GenON 사업개발을 Hero에 강조 | AI Product Manager 포지셔닝과 경쟁해 제외 |

- Hero·역량·프로젝트·경력 방향·문의 순서와 기존 검증 수치는 변경하지 않는다.

#### 4단계 — 웹사이트 적용 계획

- 경력 데이터의 Arkylab `team`을 비워 `대표`만 표시한다.
- GenON `title`을 `프로.사업개발`, `team`을 빈 값으로 두어 사용자 요청 문구를 그대로 표시한다.
- 공개 데이터와 실제 DOM 표시값을 테스트에 고정해 중복 직함 회귀를 방지한다.
- 동일한 390×844, 768×900, 1440×900에서 한 줄 표시·가로 오버플로·기존 챗봇과 경력 레이아웃을 다시 확인한다.

#### 1차 진단 — 수정 전

실제 라이브 base revision 18을 동일한 브라우저와 세 너비에서 직접 측정했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| Arkylab 공개 직함 | `대표 · 제품`, 295×24px | `대표 · 제품`, 433×24px | `대표 · 제품`, 1056×24px |
| GenON 공개 직함 | `사업개발`, 295×24px | `사업개발`, 433×24px | `사업개발`, 1056×24px |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE19-001 | Arkylab 경력 | `대표 · 제품`으로 요청하지 않은 직무가 함께 표시됨 | 공식 직함이 불필요하게 확장돼 보임 | 높음 | `대표`만 표시 | 수정 완료 |
| QA-BASE19-002 | GenON 경력 | `사업개발`만 표시되어 사용자 확인 직급 `프로`가 빠짐 | 확인된 직급·직무 표기가 불완전함 | 높음 | `프로.사업개발`로 표시 | 수정 완료 |
| QA-BASE19-003 | 반응형 | 새 복합 직함의 세 너비 한 줄 유지가 아직 미검증 | 모바일에서 부자연스러운 줄바꿈 가능 | 보통 | 수정 후 동일 조건 직접 측정 | 검증 완료 |

#### 직접 수정

| 범위 | 실제 수정 | 사실·보안 영향 | 결과 |
|---|---|---|---|
| Arkylab 직함 | `title: "대표"`를 유지하고 `team`의 `제품`을 제거 | 사용자 확인 직함만 반영, 회사·제품·기간·성과 변경 없음 | 공개 표기 `대표` |
| GenON 직함 | `title: "프로.사업개발"`, `team: ""`로 교정 | 사용자 요청의 문장부호까지 그대로 반영, 사업개발 성과 변경 없음 | 공개 표기 `프로.사업개발` |
| 회귀 테스트 | 데이터의 `title/team` 조합과 실제 Experience DOM 최종 문자열을 고정 | 개인정보·외부 전송·분석 변경 없음 | 불필요한 접미사·중복 표기 재발 방지 |

- 공통 Experience 렌더러, Hero·프로젝트·문의·Typebot·GA·EmailJS·Supabase 코드는 변경하지 않았다.

#### 동일 조건 재검사

최종 production build를 수정 전과 동일한 Codex In-app Browser 조건으로 직접 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 9,945px | 8,728px | 6,625px |
| Arkylab 공개 직함 | `대표`, 295×24px | `대표`, 433×24px | `대표`, 1056×24px |
| GenON 공개 직함 | `프로.사업개발`, 295×24px | `프로.사업개발`, 433×24px | `프로.사업개발`, 1056×24px |

- 세 너비 모두 직함 행은 24px 한 줄이며 `scrollWidth === clientWidth`, 문서 가로 오버플로 0이다.
- `대표 · 제품`과 `사업개발 · 사업개발` 잔존 0건이다.
- 첫 방문 분석 동의 배너가 보일 때 닫힌 챗봇은 의도대로 숨고, 거부 선택 직후 `물어보기 열기`가 복원됐다. 실제 Typebot을 열어 host 1개, `물어보기 닫기`, `aria-pressed=true`, 가로 오버플로 0을 확인했다.
- production preview console warning/error 0이다.
- 최종 검사: TypeScript 통과, Vitest `31/31`, ESLint 오류 `0`·기존 미사용 UI scaffold Fast Refresh 경고 `7`, production build 통과, `git diff --check` 통과, `pnpm audit --prod` 알려진 취약점 `0`.
- 번들: main `128.91KiB gzip`, CSS `13.94KiB gzip`, Typebot lazy chunk `199.27KiB gzip`.
- 배포 판정: `가능`.

#### 배포 후 실제 URL 점검

- 배포 커밋: `69ff312996d2103119fb200fe831d2d35311eed1` (`Correct Arkylab and GenON role labels`).
- GitHub Actions: run `#27`, ID `31826110647`, build·deploy 모두 `success`, 완료 `2026-08-15 02:54:39 KST`. 실행 기록: `https://github.com/gmbro/portfolio/actions/runs/31826110647`.
- 라이브 HTML은 main `index-CEezMC6F.js`, CSS `index-BKkcAryA.css`를 제공해 로컬 최종 production build와 일치한다.
- `https://archilab.ai.kr/`을 390×844, 768×900, 1440×900에서 다시 열어 clientWidth/scrollWidth `375/375`, `753/753`, `1425/1425`, 문서 높이 `9,945`, `8,728`, `6,625px`를 확인했다.
- Arkylab은 세 너비 모두 `대표`, GenON은 `프로.사업개발`로 표시되고 역할 행은 24px 한 줄이다. `대표 · 제품`, `사업개발 · 사업개발`, 가로 오버플로는 0건이다.
- 동의 선택 뒤 라이브 `물어보기 열기`를 눌러 Typebot host 1개, `물어보기 닫기`, `aria-pressed=true`, 가로 오버플로 0을 확인했다. console warning/error는 0이다.
- `/p/not-real-slug`, `/admin/links`, 임의 404는 모두 `noindex, nofollow`, Typebot local/host 0, Google tag script 0, 가로 오버플로 0을 유지한다.
- 기본 `/`은 indexable이며 회사별 publication 신규 생성은 없다.
- 최종 URL: `https://archilab.ai.kr/`.
- 배포 결과: `성공`.

---

### 2026-08-15 / 첫 화면 챗봇 가시성 복구 / base revision 18

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 18
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1단계 — 요청·채용 신호 분석

| 우선순위 | 평가자가 확인할 신호 | 이번 revision의 방향 |
|---:|---|---|
| 1 | 첫 화면에서 추가 질문 수단을 즉시 발견할 수 있는가 | Hero부터 `물어보기` 런처를 표시 |
| 2 | 고정 UI가 핵심 성과·CTA를 가리지 않는가 | 390·768·1440px에서 실제 경계와 교차 면적을 측정 |
| 3 | 문의 작성과 열린 대화가 서로 방해하지 않는가 | 문의 구간에서는 닫힌 런처만 숨기고 열린 대화는 유지 |
| 4 | 보호 경로와 개인정보 경계가 유지되는가 | 관리자·무효·404에는 Typebot을 렌더하지 않고 GA·Supabase·EmailJS 경계를 재검사 |

#### 2단계 — 기존 근거·기능 구조화

| 항목 | 검증된 현재 상태 | 변경 원칙 |
|---|---|---|
| Typebot | 외부 bot `gmbro`, 가시 문구 `물어보기`, 한국어 열기·닫기 이름 | bot id·대화 지식·이벤트 이름 변경 없음 |
| 공개 범위 | 기본 `/`와 유효한 회사별 `Index`에서만 렌더 | 관리자·무효·404 제외 유지 |
| 문의 | EmailJS 고정 수신자, honeypot·10초 제한·동의·fallback | 폼 로직 변경 없이 닫힌 런처만 충돌 방지 |
| 분석 | 공개 루트에서만 GA 허용, Typebot 최초 열기에 `chat_open` | slug·대화 본문·문의 입력을 분석에 보내지 않음 |

#### 3단계 — Hero 콘텐츠 유지 판단

| 안 | Hero 방향 | 판단 |
|---:|---|---|
| 1 (유지) | `고객의 문제를 제품으로 해결합니다.` | 사용자 승인 문구이며 이번 UI 수정과 무관 |
| 2 | 챗봇 안내를 Hero 카피에 추가 | 첫 화면 메시지가 분산돼 제외 |
| 3 | 챗봇 CTA를 Hero 본문 버튼으로 추가 | 프로젝트 CTA와 경쟁하므로 제외 |

- base revision 17의 `AI Product Manager · 7년 경력`, Archi·350만 MAU·70%+ 사실과 프로젝트·경력 서사는 변경하지 않는다.
- 챗봇은 Hero 본문의 새 문구가 아니라 고정 보조 인터페이스로 복원한다.

#### 4단계 — 웹사이트 적용 계획

- 분석 동의 배너가 없거나 선택을 마친 첫 화면에는 동일한 `물어보기` UI의 로컬 런처를 즉시 표시하고, 외부 Typebot 코드는 사용자가 클릭한 뒤에만 지연 로드한다.
- Typebot 로드 직전에 URL query를 제거해 패키지의 자동 prefilled-variable 병합으로 민감한 query가 전달되지 않게 한다.
- 문의 구간과 외부 프로젝트 CTA가 보일 때는 닫힌 런처만 숨기고, 이미 열린 대화는 스크롤 중 유지한다.
- 태블릿 Hero 지표와 런처 사이의 2px 간격을 넓히고 프로젝트 외부 CTA와의 교차도 실제로 확인한다.
- 구조 테스트와 Typebot 상태 전환 테스트를 보강하고, 동일한 세 너비·보호 경로·CSP·GA·EmailJS·Supabase 경계를 재검사한다.

#### 1차 진단 — 수정 전

실제 라이브 base revision 17을 같은 브라우저에서 직접 측정했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 9,945px | 8,728px | 6,625px |
| Hero Typebot host / button | `0 / 0` | `0 / 0` | `0 / 0` |
| Hero 지표 하단 | 734px | 814px | 789px |
| 기존 런처 예상 상단 | 786px | 816px | 816px |
| 지표와 런처 사이 | 52px | 2px | 27px |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE18-001 | Hero·역량·Archi | Hero가 화면에서 사라져야 `hasLoaded=true`가 되고, Hero·역량·Archi가 보이면 닫힌 런처를 다시 숨김 | 첫 화면과 핵심 본문 대부분에서 챗봇이 삭제된 것처럼 보임 | 차단 | 첫 렌더에는 로컬 런처를 표시하고 실제 Bubble은 사용자 클릭 뒤에만 마운트 | 수정 완료 |
| QA-BASE18-002 | 768px Hero | 복원된 196×64px 런처와 세 번째 지표는 겹치지는 않지만 수직 간격이 2px에 불과함 | 요소가 맞닿아 보이고 지표 스캔이 불편할 수 있음 | 높음 | 태블릿 런처를 176×52px·하단 4px로 조정 | 수정 완료 |
| QA-BASE18-003 | 390·768·1440px Contact | 상시 표시만 적용하면 고정 pill이 제출·동의 UI를 가릴 수 있음 | 문의 전환 방해 | 높음 | Contact가 보이고 대화가 닫힌 경우에만 launcher 숨김 유지 | 수정 완료 |
| QA-BASE18-004 | 프로젝트 CTA | Archi 외부 링크와 1440px 우하단 pill이 같은 영역을 사용할 가능성 | 제품 증거 링크 클릭 방해 가능 | 높음 | 외부 프로젝트 CTA를 관찰해 보이는 동안 닫힌 launcher 숨김 | 수정 완료 |
| QA-BASE18-005 | 접근성·브라우저 호환 | 기존 테스트가 모든 관찰 대상을 즉시 out-of-view로 만들어 Hero 미노출 결함을 놓침 | 같은 회귀가 재발할 수 있음 | 높음 | 초기 렌더·클릭 로드·query 제거·Contact/CTA·열린 대화·미지원·실패 격리 테스트 추가 | 수정 완료 |
| QA-BASE18-006 | 첫 방문 분석 동의 | 390px에서 동의 배너가 launcher의 88.5%, 768px에서 60.1%를 덮고 중심 클릭도 배너에 가로막힘 | 첫 방문에서 챗봇을 누를 수 없음 | 차단 | 동의 배너가 열린 동안 닫힌 launcher를 숨기고 선택 직후 복원 | 수정 완료 |

1차 진단 요약:

- Typebot 패키지나 bot 자체는 남아 있으나 현재 공개 첫 화면에서는 host조차 생성되지 않는다.
- 390px 다른 프로젝트·경력 구간에서는 `148×52px`, `물어보기 열기`로 정상 표시되므로 통합 삭제가 아니라 가시성 상태 로직의 문제다.
- 수정 전에 기록을 완료했으며, 다음 단계에서 가시성·충돌·테스트를 직접 수정한다.

#### 직접 수정

| 범위 | 실제 수정 | 보안·사실 영향 | 결과 |
|---|---|---|---|
| 첫 화면 발견성 | Hero부터 네이티브 DOM/CSS `물어보기` pill을 렌더하고 Hero·역량·Archi 숨김 조건을 제거 | 경력·프로젝트 사실 변경 없음 | 동의 배너가 없거나 선택 직후 세 너비 첫 화면에서 launcher 노출 |
| 지연 로딩·개인정보 | 외부 Typebot은 사용자의 launcher 클릭 뒤에만 dynamic import하고, 로드 직전 현재 URL query를 제거 | query·이메일·회사 식별자가 Typebot prefilled variable로 자동 전달되는 경계 차단 | 클릭 전 Typebot host·S3 요청·`chat_open` 0, 클릭 후만 실행 |
| 이벤트 정확성 | 로컬 launcher의 명시적 클릭 뒤 Typebot shadow button이 준비된 때만 `chat_open`을 1회 기록 | controlled 초기 open에서 호출되지 않는 `onOpen` 의존과 이전 세션 자동 복원·로드 실패 오집계를 함께 제거 | GA root-only·고정 page context 유지 |
| 장애 격리 | Typebot lazy chunk를 별도 Error Boundary로 감싸고 실패 시 포트폴리오는 유지한 채 한국어 상태 문구 표시 | 외부 서비스 장애가 본문·CTA를 중단하지 않음 | 실패 회귀 테스트 통과 |
| CTA 충돌 | Contact와 `data-chat-exclusion`이 붙은 외부 프로젝트 CTA가 보이고 대화가 닫혔을 때만 launcher 숨김 | 열린 대화는 강제로 닫지 않음 | Archi 링크·문의 제출과 교차 0 |
| 분석 동의 충돌 | 분석 동의 배너를 식별하고, 열린 동안 닫힌 launcher를 숨기며 설정을 다시 열면 열린 chat도 닫음 | 동의 선택 뒤 launcher 즉시 복원, 분석·문의 동의 목적 분리 유지 | 390·768px 배너와 launcher 교차 0 |
| 반응형 | 모바일 148×52px, 태블릿 176×52px, 데스크톱 196×64px으로 조정 | 없음 | 768px Hero 지표와 간격 `2px 수준 → 12px` |
| 접근성 | 로컬 버튼에 `물어보기 열기`, `aria-expanded`, `aria-busy`, 44px 이상 터치 영역을 부여하고 Typebot 준비 뒤 shadow 닫기 버튼으로 포커스를 이동 | Label-in-Name 유지 | 키보드·포커스·reduced-motion 정책 유지 |
| 테스트 | `typebot-bubble.test.tsx` 7개와 Index 구조 회귀를 추가·갱신 | 없음 | click-only 로드, query 제거, 동의·Contact·CTA 숨김, 열린 대화 유지, IO 미지원, 실패 격리 검증 |

#### 동일 조건 재검사

최종 production build를 수정 전과 동일한 Codex In-app Browser 조건으로 직접 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 9,945px | 8,728px | 6,625px |
| Hero 로컬 launcher | 148×52px | 176×52px | 196×64px |
| Hero Typebot host | 0 | 0 | 0 |
| Hero 지표와 launcher | 수직 34px 분리 | 수직 12px 분리 | 수평 113px 분리 |
| Archi 외부 CTA가 보일 때 닫힌 launcher | 숨김 | 숨김 | 숨김 |
| Contact 제출 CTA | 285×56px | 591×56px | 702×56px |
| Contact 닫힌 launcher | 숨김 | 숨김 | 숨김 |

- 390px 클릭 전에는 query가 있는 URL에서도 로컬 launcher만 있고 Typebot host는 `0`이다. 클릭 직후 URL의 `?email=private@example.com&company=secret`가 제거된 다음 host가 `1`개 생성됐다.
- 실제 Typebot을 연 뒤 390px panel은 `350×704px`, x=`25–375`, y=`70–774`로 viewport 안에 있고, 버튼은 `물어보기 닫기`, `aria-pressed=true`다.
- 768px 실제 panel은 `400×704px`, x=`333–733`, y=`128–832`로 viewport 안에 있으며 닫힌 launcher는 `176×52px`다.
- Typebot을 실제 열고 닫아 `물어보기 열기 → 닫기 → 열기`, `aria-pressed false → true → false`를 확인했다. 열린 대화는 Contact 진입 시 유지되며 닫으면 launcher가 숨는다.
- `/p/not-real-slug`, `/admin/links`, 임의 404는 모두 `noindex, nofollow`, Typebot local/host `0`, Google tag script `0`, 가로 오버플로 `0`이다.
- console warning/error와 CSP 위반은 `0`이다. 기본 콘텐츠·경력·프로젝트·수치·Typebot 지식은 base revision 17에서 변경하지 않았다.
- 분석 동의 배너가 열린 첫 방문에는 390·768·1440px 모두 닫힌 launcher가 숨겨져 교차 면적이 `0`이며, 거부 또는 허용 선택 직후 launcher가 다시 나타난다.
- 최종 검사: TypeScript 통과, Vitest `31/31`, ESLint 오류 `0`·기존 미사용 UI scaffold fast-refresh 경고 `7`, production build 통과, `git diff --check` 통과, `pnpm audit --prod` 알려진 취약점 `0`.
- 번들: main `128.90KiB gzip`, CSS `13.94KiB gzip`, Typebot `199.27KiB gzip`. Typebot chunk는 최초 HTML preload에 없고 사용자 클릭 뒤에만 로드된다.
- 배포 판정: `가능`.

#### 배포 후 실제 URL 점검

- 배포 커밋: `08de58d75c06dccb3aa84f6d2191e67ea376d279` (`Restore secure portfolio chatbot launcher`).
- GitHub Actions: run `#26`, ID `31825029141`, build·deploy 모두 `success`, 완료 `2026-08-15 02:40:52 KST`. 실행 기록: `https://github.com/gmbro/portfolio/actions/runs/31825029141`.
- 라이브 HTML은 main `index-C-Z442ya.js`, CSS `index-BKkcAryA.css`를 제공해 로컬 최종 production build와 일치한다.
- `https://archilab.ai.kr/`을 390×844, 768×900, 1440×900에서 다시 열어 clientWidth/scrollWidth `375/375`, `753/753`, `1425/1425`, 문서 높이 `9,945`, `8,728`, `6,625px`를 확인했다.
- 동의 선택 후 Hero의 로컬 launcher는 각 `148×52`, `176×52`, `196×64px`로 표시되고, 클릭 전 Typebot host는 `0`이다. 첫 방문·설정 재열기의 분석 동의 배너가 보일 때 launcher는 세 너비 모두 숨겨져 교차가 `0`이다.
- 390px 라이브에서 `?qa=base18` URL로 클릭했을 때 query가 먼저 제거된 뒤 Typebot host가 `1`개 생성됐다. panel은 `350×704px`, 버튼은 `물어보기 닫기`, `aria-pressed=true`, shadow 닫기 버튼으로 포커스가 이동했고 가로 오버플로는 없다.
- Archi 외부 CTA가 보일 때 닫힌 launcher는 숨고 링크는 `134×44px`로 클릭 가능하다. Contact에서는 launcher가 숨고 제출 CTA는 `285×56px`로 유지된다.
- `/p/not-real-slug`, `/admin/links`, 임의 404는 Typebot local/host `0`, Google tag script `0`, `noindex, nofollow`, 가로 오버플로 `0`을 유지한다.
- 라이브 console warning/error와 CSP 위반은 `0`이다. 기본 `/`은 indexable이고 회사별 publication 신규 생성은 없다.
- 최종 URL: `https://archilab.ai.kr/`.
- 배포 결과: `성공`.

---

### 2026-08-15 / Archi 프로젝트 통합·경력 선택 서사 정리 / base revision 17

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 무효 `/p/:slug`, 임의 404
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 17
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 평가 프로필: 특정 JD 없이 사용자 지정 목표 직무 `AI Product Manager`와 채용 담당자의 5초·30초 검토 기준

#### 1단계 — 요청·채용 신호 분석

| 우선순위 | 평가자가 확인할 질문 | 이번 revision의 답변 방향 |
|---:|---|---|
| 1 | 현재 만드는 제품과 과거 프로젝트가 하나의 PM 서사로 연결되는가? | Archi를 별도 `현재 제품`이 아닌 프로젝트 1번으로 통합 |
| 2 | 잦은 이동이 단순 이직인지, 의도적인 역량 확장인지? | 개인 성장·역량 향상을 위한 선택이었다는 사실을 한 번만 설명 |
| 3 | 짧은 재직의 배경이 무엇인지? | Adler는 정규직으로 근무했으나 회사 사정상 휴업하며 3개월 근무했다고 사실 범위 안에서 명시 |
| 4 | 다음 조직에서 무엇을 오래 책임지고 싶은가? | 조직의 목표를 우선하고, 향후 2~3년간 고객 문제를 확실히 해결하는 완성도 높은 제품에 기여 |

#### 2단계 — 검증 사실 구조화

| 항목 | 확인된 사실 | 공개 표현 원칙 |
|---|---|---|
| Archi | 제품 `Archi(아키)`, 운영 주체 `Arkylab`, 1인 제품·개발·사업·운영 전담, 6명 베타 | 완료·출시 성과로 확대하지 않고 `베타 검증 중`으로 표현 |
| 경력 이동 | 개인 성장과 역량 향상을 위한 선택 | 개별 회사의 문제로 귀속하거나 방어적으로 회사마다 반복하지 않음 |
| Adler | 정규직, 회사 사정상 휴업, 3개월 근무 | 폐업·해고·경영난으로 확대하지 않음 |
| Kakao Commerce | 인턴 | `모든 경력은 정규직`이라고 쓰지 않고 `2018년 이후 경력`으로 범위 한정 |
| 향후 방향 | 조직의 목표가 중요, 완성도 높은 문제 해결 제품을 만들고 싶음 | 재직 기간 보장이나 달성한 성과처럼 표현하지 않음 |
| Classting | 이번 공개 범위에서 제외 | 추정 기간·직함·성과를 만들지 않음 |

#### 3단계 — Hero 콘텐츠 3안

| 안 | 헤드라인 | 판단 |
|---:|---|---|
| 1 (유지) | `고객의 문제를 제품으로 해결합니다.` | 가장 간결하고 현재 AI Product Manager 포지셔닝과 일치 |
| 2 | `조직의 목표를 고객이 쓰는 제품으로 구체화합니다.` | 향후 선택 기준은 드러나지만 현재 성과 신호가 약함 |
| 3 | `문제를 정의하고, 완성도 높은 제품으로 답합니다.` | 지향점은 분명하지만 기존 승인 문구보다 추상적 |

- Hero는 1안을 유지하고 CTA만 통합된 `프로젝트` 섹션으로 연결한다.
- Archi의 현재 판단과 베타 사실은 프로젝트 첫 카드에서 보여 주며 Hero·역량·경력에서 반복하지 않는다.

#### 4단계 — 웹사이트 적용 계획

- 정보 구조: `Hero → 역량 → 프로젝트(Archi 1번) → 경력·커리어 방향 → 문의`.
- 독립 `현재 제품` 섹션과 내비게이션을 제거하고, Archi의 문제·실행·결과·베타·외부 URL을 첫 프로젝트 카드에 통합한다.
- 기존 회사별 publication의 `ctaTarget: product-proof` 호환을 위해 비가시 legacy anchor는 유지하되 새 기본 CTA는 `case-studies`를 사용한다.
- 경력 타임라인은 회사·직함·기간·한 줄 맥락만 유지하고, 이동 이유와 향후 목표는 타임라인 뒤 `커리어 방향` 블록에 한 번만 배치한다.
- Pretendard Variable 실제 family를 Tailwind에 연결하고 390·768·1440px에서 폰트 메트릭 변화와 줄바꿈을 다시 검사한다.

#### 1차 진단 — 수정 전

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE17-001 | 정보 구조 | Archi가 독립 `현재 제품`과 프로젝트 데이터에 이중으로 존재 | 현재 제품과 과거 프로젝트가 분리돼 하나의 PM 사례 흐름이 끊김 | 차단 | Archi를 프로젝트 1번 전폭 카드로 통합 | 수정 완료 |
| QA-BASE17-002 | 내비게이션·CTA | `현재 제품` 메뉴와 `product-proof` 기본 CTA가 별도 분류를 강화 | 사용자가 같은 사례를 두 경로로 탐색 | 높음 | 메뉴 제거, 기본 CTA를 프로젝트로 변경, legacy anchor만 호환 유지 | 수정 완료 |
| QA-BASE17-003 | 경력 | 이직 이유·짧은 Adler 재직 배경·향후 목표가 화면에 없음 | 잦은 이동을 평가자가 추측해야 함 | 높음 | 검증 사실만 사용한 커리어 방향 블록과 Adler 한 줄 설명 추가 | 수정 완료 |
| QA-BASE17-004 | 프로젝트 그리드 | Archi를 단순 추가하면 1440px에서 5개 중 마지막 카드가 반쪽 orphan으로 남음 | 데스크톱 카드 균형 저하 | 보통 | Archi만 전폭, 나머지 4개를 2×2 배치 | 수정 완료 |
| QA-BASE17-005 | Typebot·분석 | Archi 독립 섹션 제거 후 가시성 관찰·Archi 데모 이벤트가 유실될 수 있음 | 프로젝트 CTA 비가림·GA 채용 퍼널 누락 | 높음 | 실제 Archi 카드 교차 관찰과 Archi 링크 `select_content` 유지 | 수정 완료 |
| QA-BASE17-006 | 폰트 | 공식 CSS는 `Pretendard Variable`인데 Tailwind는 `Pretendard`만 지정 | 대부분의 텍스트가 환경별 generic sans-serif로 fallback 가능 | 차단 | variable family를 우선 지정한 뒤 동일 폭 재검사 | 수정 완료 |
| QA-BASE17-007 | 기존 publication | 과거 저장 Hero가 `product-proof`를 가리킬 수 있음 | 맞춤 링크의 CTA가 무반응이 될 수 있음 | 차단 | legacy anchor 유지 및 parser·맞춤 route 회귀 검사 | 수정 완료 |

수정 전 production preview 기준:

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 9,786px | 8,574px | 6,808px |
| 본문 순서 | Hero→역량→현재 제품→프로젝트→경력→문의 | 동일 | 동일 |
| 프로젝트 카드 | 4개, Archi 제외 | 4개, Archi 제외 | 4개, Archi 제외 |
| 실제 텍스트 오버플로 | 0건 | 0건 | 0건 |

#### 직접 수정

- `Index`에서 독립 `ProductProof` 렌더를 제거하고 `portfolioProjects`의 Archi를 프로젝트 1번으로 렌더했다. 실제 카드 ID `arkylab-ai-coach`와 구 publication CTA 호환용 `product-proof` alias를 함께 유지했다.
- 내비게이션의 `현재 제품`을 제거하고 기본 Hero CTA를 `프로젝트 보기 → case-studies`로 바꿨다. Archi 링크는 `select_content` 분석 이벤트와 외부 링크 접근성 이름을 유지한다.
- 프로젝트 그리드는 Archi만 전폭으로 강조하고 GenON·Selectstar·Skelter Labs·SK Planet을 2×2로 배치했다. 모든 카드에서 문제·판단·실행·성과와 담당 책임을 기본 노출한다.
- Typebot의 닫힌 launcher는 Hero·역량·Archi·문의 구간에서 숨기고, 실제 Archi 카드 교차 여부를 기준으로 전환한다. `물어보기` 가시 문구와 열기·닫기 접근성 이름은 유지했다.
- 경력에는 `2018년 이후 회사 경력은 정규직`, `2017년 Kakao Commerce 인턴`, `현재 Archi 1인 사업`을 구분해 표시했다. Adler는 확인된 사실인 `정규직·회사 사정상 휴업·3개월`까지만 설명했다.
- 경력 뒤에 `커리어 방향`을 한 번만 추가해 이직 이유를 개인 성장·역량 향상으로 설명하고, 다음 선택에서는 조직 목표를 중요한 기준으로 보며 향후 2~3년간 고객 문제를 확실히 해결하는 완성도 높은 제품을 만들고 싶다는 방향을 반영했다.
- Classting은 공개 데이터·화면에서 제외하고 회귀 테스트로 재유입을 막았다. 기존 회사·기간·역할·6명·350만 MAU·70%+ 수치는 변경하지 않았다.
- 한글 자연어의 `overflow-wrap:anywhere`를 `break-word`로 낮추고 제목은 어절 단위 줄바꿈을 유지했다. 서비스 화면은 `object-contain`으로 바꾸고 Tailwind의 실제 폰트를 `Pretendard Variable → Pretendard → sans-serif` 순서로 연결했다.
- base revision 16에서 시작한 줄바꿈·문장 중복 수정은 이번 구조 통합에 포함해 한 후보로 검증했다. base revision 16은 독립 배포하지 않고 base revision 17로 대체한다.

#### 동일 조건 재검사

production build를 같은 브라우저와 폭으로 다시 열어 전체 화면을 위에서 아래까지 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| 실제 viewport / clientWidth | `390 / 375` | `768 / 753` | `1440 / 1425` |
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 9,945px | 8,728px | 6,625px |
| 본문 순서 | Hero→역량→프로젝트→경력→문의 | 동일 | 동일 |
| 프로젝트 카드 | 5개, Archi 1번 | 5개, Archi 1번 | 5개, Archi 전폭+나머지 2×2 |
| 실제 텍스트 오버플로 | 0건 | 0건 | 0건 |
| H1 client / scroll | `327 / 327` | `657 / 657` | `1,152 / 1,152` |
| 본문 launcher | `148×52px` | `196×64px` | `196×64px` |

- 세 너비에서 H1 `고객의 문제를 제품으로 해결합니다.`, 역량 문단, Archi 카드, 담당 책임, 경력과 커리어 방향이 어절 중간에서 잘리지 않았다. 768px의 Contact section 내부 장식 광원만 자체 overflow 영역을 가지며 `overflow-hidden` 안에서 잘리고 문서 가로 폭에는 영향을 주지 않았다.
- 실제 계산 폰트는 세 너비 모두 `Pretendard Variable, Pretendard, sans-serif`였다. 이미지 자료 영역은 `object-contain`이고, 자료가 없는 production 카드에는 빈 placeholder를 노출하지 않는다.
- Hero CTA는 `case-studies` 상단으로 이동하고, legacy `product-proof` anchor와 실제 `arkylab-ai-coach` 카드 ID가 모두 존재한다. `현재 제품` 가시 문구는 0건이다.
- Typebot은 Archi 카드와 Contact가 보일 때 닫힌 launcher를 렌더하지 않는다. 다른 프로젝트 구간에서는 390px `148×52`, 768·1440px `196×64`, 우측·하단 20px(390px 하단 safe-area 적용)로 노출된다. `물어보기 열기 → 닫기 → 열기`, `aria-pressed false → true → false`를 확인했다.
- `/p/not-real-slug`는 로딩 후 한국어 무효 화면과 `noindex, nofollow`, `/admin/links`는 관리자 화면과 `noindex, nofollow`, 임의 404는 한국어 404와 `noindex, nofollow`를 표시했다. 세 경로 모두 Typebot 0, Google tag script 0이다.
- production preview console error/warn 0, `dist` source map 0, 클라이언트 `to_email` 0, Supabase 공개 페이지는 exact-slug RPC만 사용한다. 비밀키·service-role key·raw HTML/eval을 새로 추가하지 않았다.
- 최종 검사: TypeScript 통과, Vitest 5파일 24/24, ESLint 오류 0·기존 미사용 UI scaffold fast-refresh 경고 7, production build 통과, `git diff --check` 통과, `pnpm audit --prod` 알려진 취약점 0.
- build 크기: main `128.09KiB gzip`, CSS `13.53KiB gzip`, Typebot lazy chunk `199.27KiB gzip`. Typebot은 초기 HTML preload에 포함되지 않는다.
- 재검사 판단: 미해결 배포 차단 없음. 배포 가능.

#### 배포 후 실제 URL 점검

- 배포 커밋: `14a13c47cab79081038eb86a40e5d5d0f9f196f9` (`Integrate Archi into portfolio project narrative`).
- GitHub Actions `Deploy Portfolio to GitHub Pages` run #25, ID `31821660087`가 build·deploy 모두 성공했다: `https://github.com/gmbro/portfolio/actions/runs/31821660087`.
- 실제 공개 URL: `https://archilab.ai.kr/`. HTTPS는 `200`, HTTP는 `https://archilab.ai.kr/`로 `301` 이동한다.
- 라이브 asset: main `index-ChOb2zBu.js`, CSS `index-Dze_BbEg.css`. HTML `Last-Modified`는 2026-08-15 01:58 KST 이후이며 새 revision 문구·DOM과 일치한다.

라이브를 동일한 조건으로 다시 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 9,945px | 8,728px | 6,625px |
| Hero H1 client / scroll | `327 / 327` | `657 / 657` | `1,152 / 1,152` |
| 프로젝트 | Archi 1번 포함 5개 | Archi 1번 포함 5개 | Archi 전폭+나머지 2×2 |
| 텍스트 오버플로 | 0건 | 0건 | 0건 |

- Hero `AI Product Manager · 7년 경력`, `고객의 문제를 제품으로 해결합니다.`, Archi 첫 프로젝트, `조직의 목표를 중요한 기준`으로 보는 커리어 방향이 새 라이브에서 확인됐다. `현재 제품`·Classting 가시 문구는 0건이다.
- 계산 폰트는 세 너비 모두 `Pretendard Variable, Pretendard, sans-serif`이며 한글 어절 중간 잘림이 없다.
- 390px에서 Archi 카드가 보이면 닫힌 Typebot launcher가 숨고, 다른 프로젝트에서는 `물어보기`가 `148×52px`, 우측 20px·하단 safe-area 6px로 노출된다. `aria-pressed false → true → false`, `물어보기 열기 → 닫기 → 열기`를 확인했다. Contact에서는 launcher가 숨고 제출 버튼은 `285×56px` full width다.
- `/p/not-real-slug`는 한국어 무효 링크와 `noindex, nofollow`, `/admin/links`는 관리자 화면과 `noindex, nofollow`, 임의 404는 한국어 404와 `noindex, nofollow`를 표시한다. 세 경로 모두 Typebot 0, Google tag script 0이다.
- 공개 루트에서만 GA script가 활성화될 수 있고, 쿼리를 포함해 접근해도 앱은 고정 공개 루트 page context만 사용한다. 회사별 slug·문의 입력값을 이벤트로 전달하는 코드 경로는 없다.
- 라이브 console error/warn 0. Archi 외부 CTA `https://archi.best`는 HTTPS `200`으로 응답한다.
- 최종 publication: 기본 공개 포트폴리오 base revision 17. 회사별 publication 신규 생성 없음. 기본 `/`만 indexable이며 회사별·관리자·무효·404는 기존 noindex 정책을 유지한다.
- 배포 결과: `성공`.

---

### 2026-08-15 / 한글 줄바꿈·문장 중복·반응형 재점검 / base revision 16

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 임의 404
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 16
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 평가 기준: base revision 15의 `AI Product Manager · 7년 경력` 포지셔닝과 검증 사실은 유지하고, 한글 어절 단위 줄바꿈·문장 중복·보안 경계를 다시 검사한다.

#### 1차 진단 — 수정 전

- 현재 라이브와 `main`은 base revision 15로 일치한다. 직전 배포에서 직접 검사한 390·768·1440px 기준값은 각각 `clientWidth=scrollWidth`, 실제 텍스트 잘림 0건이었다.
- 이번 요청에서 사용자가 제공한 현재 화면은 중간 폭의 프로젝트 제목에서 `제품으 / 로`처럼 한 어절이 음절 단위로 분리되는 문제를 보여 준다. 같은 라이브를 현재 브라우저 1280×720에서도 다시 열어 프로젝트 제목·카드·문의 CTA와 DOM을 교차 확인했다.

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE16-001 | 전역 타이포·Hero·H2 | `body`의 `word-break: keep-all`과 `overflow-wrap:anywhere`, 제목의 `text-balance`가 함께 적용되어 정상 한글 어절에도 음절 단위 break 기회를 제공 | `제품으 / 로`처럼 조사가 아닌 단어 일부가 다음 줄로 밀려 문장이 잘린 듯 보임 | 차단 | 전역은 `break-word` fallback으로 낮추고 제목·highlight는 어절 단위 줄바꿈을 명시 | 발견 |
| QA-BASE16-002 | Hero·역량 | Hero의 `350만 MAU·AI 제품 0→1·70%+`와 Archi 현재 검증을 바로 다음 역량 문단이 거의 그대로 반복 | 첫 30초에 새 근거보다 같은 자기소개가 반복되어 정보 밀도 저하 | 높음 | 역량은 수치 대신 문제 정의·범위·검증 방식만 설명 | 발견 |
| QA-BASE16-003 | 역량 | `만들지 않을 기능`, `결과로 판단`, `결과를 결정으로 연결`이 제목·카드에서 연속 반복 | 표현이 기계적이고 천편일률적으로 읽힘 | 보통 | 카드 동사를 `문제 구체화 / 우선순위 / 결과 검증`으로 분리 | 발견 |
| QA-BASE16-004 | Archi | `기능의 추가와 제외 결정으로 연결합니다`가 명사와 조사가 겹치고, 네 번째 카드가 앞선 결정을 다시 설명 | 현재 제품의 핵심 판단이 장문에 묻힘 | 보통 | 베타 피드백으로 범위·우선순위를 조정한다는 문장과 구체 라벨로 단순화 | 발견 |
| QA-BASE16-005 | 프로젝트·경력 | 프로젝트 H2와 설명이 모두 `판단·결과`를 반복하고, 경력 H2의 `확장해 온`은 좁은 화면에서 한 음절 `온`이 고립될 수 있음 | 섹션 간 역할 구분과 줄 호흡이 약함 | 보통 | 프로젝트는 결정과 변화, 경력은 책임 범위의 확장으로 짧게 재작성 | 발견 |
| QA-BASE16-006 | 프로젝트 이미지 | 배포 기록은 UI 캡처를 `object-contain`으로 표시하지만 실제 image는 `object-cover` | 추후 제공할 서비스 캡처의 가장자리·텍스트가 잘릴 수 있음 | 보통 | 실제 이미지도 `object-contain`으로 통일 | 발견 |
| QA-BASE16-007 | 보안·개인정보 | GA·Supabase·EmailJS·Typebot 경계는 base revision 15에서 통과했으나 이번 타이포 변경 뒤 CSP·비밀값·민감 route 추적을 재확인해야 함 | UI 수정 과정의 보안 회귀 가능성 | 높음 | audit·CSP·GA root-only·exact slug·EmailJS payload를 변경 후 재검사 | 발견 |

수정 전 기준값(base revision 15 최종 라이브):

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `390 / 390` | `768 / 768` | `1440 / 1440` |
| 문서 높이 | 9,782px | 8,663px | 6,921px |
| 실제 텍스트 잘림 | 0건 | 0건 | 0건 |
| Hero H1 client / scroll | `342 / 342` | `672 / 672` | `1152 / 1152` |
| Contact 제출 버튼 | `300×56px` | `606×56px` | `702×56px` |

#### 직접 수정

[base revision 17에 통합] 이 기록의 줄바꿈·문장 중복·이미지 contain 수정은 Archi 프로젝트 통합과 함께 base revision 17 후보로 검증했다. base revision 16은 독립 배포하지 않는다.

#### 동일 조건 재검사

[base revision 17에 통합] 최종 동일 폭 재검사와 보안 결과는 base revision 17 기록을 따른다.

#### 배포 후 실제 URL 점검

[base revision 17에 통합] base revision 16의 독립 배포 없음.

---

### 2026-08-15 / 7년 경력·간결한 Hero·역량 소개 재작성 / base revision 15

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 임의 404
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 15
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 평가 프로필: 특정 JD 없이 사용자 지정 목표 직무 `AI Product Manager`와 채용 담당자의 5초·30초 검토 질문을 기준으로 한다.

#### 1단계 — 채용 담당자 예상 질문

| 시점 | 예상 질문 | 포트폴리오가 먼저 답해야 할 내용 |
|---|---|---|
| 5초 | 어떤 PM이며 어떤 문제를 해결하는가? | `고객의 문제를 제품으로 해결하는 AI Product Manager` |
| 5초 | 그 주장을 바로 믿을 근거는 무엇인가? | Archi 6명 베타, 350만 MAU 운영, 원가 70%+ 절감 |
| 30초 | 본인이 실제로 내린 제품 결정은 무엇인가? | Archi 기능 추가·시퀀스 제외, Selectstar·SK Planet 운영 개선 |
| 30초 | 넓은 경력이 하나의 PM 역량으로 어떻게 이어지는가? | 사용자 반응→제품 범위 결정→출시·운영 결과 학습 |
| 30초 | 우리 조직에서도 반복 가능한 방식이 보이는가? | 문제 정의·제품 우선순위·실사용 검증의 일관된 방식 |

#### 2단계 — 검증 경험 매칭

| 역량 | 대표 근거 | 근거 강도 | 노출 방향 |
|---|---|---|---|
| 문제 정의 | Kakao Commerce 사용자 반응, Archi 강사 피드백 | 강함 | 역량 첫 카드 |
| 제품 우선순위 | Archi 그리드 촬영 추가·시퀀스 제외 | 강함 | 역량 헤드라인과 현재 제품 사례 |
| 0→1 실행 | Skelter Labs AI 상담사 PoC, Archi 1인 전담 | 강함 | Hero 보조카피·프로젝트 |
| 운영 개선 | SK Planet 350만 MAU, Selectstar 원가 70%+ 절감 | 강함 | Hero 지표·프로젝트 성과 |

#### 3단계 — 콘텐츠 설계

| 안 | 소개 헤드라인 | 판단 |
|---:|---|---|
| 1 | `고객 반응을 읽고, 다음 제품 결정을 만드는 PM입니다.` | 명확하지만 일반적인 자기소개에 가까움 |
| 2 (채택) | `무엇을 만들지, 만들지 않을지까지 결정합니다.` | Archi의 기능 추가·제외라는 실제 판단이 보여 차별화됨 |
| 3 | `0→1부터 350만 MAU 운영까지, 제품의 서로 다른 단계를 맡아 왔습니다.` | 규모는 명확하지만 현재 사용자 문제 서사가 약함 |

- Hero는 사용자 지정 문구 `고객의 문제를 제품으로 해결합니다.`를 한 문장으로 사용한다.
- 기존 `제품으로 검증한 PM 역량`·`소개`는 `역량`으로 단순화한다.
- Hero는 역할과 증거, 역량은 반복 가능한 제품 판단 방식, 현재 제품은 실제 기능 추가·보류, 프로젝트는 과거 검증 결과만 담당하도록 중복을 줄인다.

#### 1차 진단 — 수정 전

수정 전 후보는 base revision 14와 같은 코드·화면이며, 해당 후보를 390·768·1440px에서 직접 검사한 측정값을 기준으로 재확인했다. 추가로 로컬 `http://127.0.0.1:4177/`의 공개 DOM에서 7년 경력·Archi·프로젝트 4개·경력 7개를 확인했다.

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE15-001 | 라이브 Hero | 라이브 공개본은 아직 `9년차`이며 로컬 후보만 `7년 경력` | 경력 사실 신뢰도 저하 | 차단 | 7년 경력 후보를 최종 검증·배포 | 발견 |
| QA-BASE15-002 | Hero | 헤드라인과 두 줄 보조카피가 길고 소개·프로젝트와 문제→제품→검증 표현을 반복 | 첫 5초 메시지가 분산됨 | 높음 | Hero를 사용자 지정 한 문장과 두 개의 증거 문장으로 압축 | 발견 |
| QA-BASE15-003 | 소개·메뉴 | `소개`와 연대기형 카드가 Experience를 다시 요약 | 새로운 PM 판단 증거가 늦게 나타남 | 높음 | 섹션·메뉴를 `역량`으로 바꾸고 세 가지 반복 가능한 판단 방식으로 재작성 | 발견 |
| QA-BASE15-004 | 현재 제품 | 이전 `기능 보류`는 사용자가 확인한 ‘시퀀스를 만들지 않기로 한 결정’보다 약하게 표현됨 | 제품 범위를 줄인 PM 판단이 드러나지 않음 | 높음 | `기능 제외`와 실제 피드백 근거를 짧게 명시 | 발견 |
| QA-BASE15-005 | 프로젝트·경력 | 섹션 제목이 Hero와 같은 문제→제품→검증 문장을 반복하고 경력 설명 일부가 번역투 | 스캔 시 같은 주장만 반복된다고 느낌 | 보통 | 프로젝트는 판단·결과, 경력은 회사별 역할 맥락만 설명 | 발견 |
| QA-BASE15-006 | 줄바꿈 | 현재 전체 가로 오버플로는 0이지만 Hero·About 장문을 바꾸면 390px 고립 줄 위험 | 모바일 가독성 저하 가능 | 보통 | 강제 줄바꿈 없이 balance/pretty wrapping과 안전 줄바꿈 유지 | 발견 |
| QA-BASE15-007 | GA4 | 루트에서 동의 후 활성화된 태그가 SPA 민감 경로 전환 시 살아 있을 수 있고 이벤트 기본 URL 경계가 미완료 | 회사별 slug·referrer 노출 가능 | 차단 | route 이탈 즉시 분석 중단·고정 page fields·회귀 테스트 추가 | 발견 |

수정 전 반응형 기준:

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 10,057px | 8,605px | 6,918px |
| 실제 가로 잘림 | 0건 | 0건 | 0건 |
| 닫힌 details | 0개 | 0개 | 0개 |
| 프로젝트 카드 | 4개 | 4개 | 4개 |

#### 직접 수정

| ID | 수정 파일·외부 설정 | 직접 수정 내용 | 사실 변경 | 결과 |
|---|---|---|---|---|
| QA-BASE15-001 | `src/types/portfolio.ts`, `src/data/portfolio.ts`, `index.html`, Typebot | 역할을 `AI Product Manager`, 경력을 `7년 경력`, 제품을 `Archi(아키)`, 운영 주체를 `Arkylab`으로 통일했다. Typebot 지식도 같은 사실로 수정·재발행하고 후속 대화용 Response ID를 연결했다. | 사용자 확인 사실 교정 | 웹·챗봇에서 `9년차`·제품명 혼동 제거 |
| QA-BASE15-002 | `src/types/portfolio.ts`, `src/components/Hero.tsx` | Hero를 `고객의 문제를 제품으로 해결합니다.`로 압축하고, 350만 MAU·AI 제품 0→1·원가 70%+와 Archi 현재 검증을 두 문단으로 분리했다. | 없음 | 첫 5초 역할·근거 분리 |
| QA-BASE15-003 | `src/components/About.tsx`, `src/components/Navbar.tsx`, `src/test/index.test.tsx` | `소개`를 `역량`으로 바꾸고 `무엇을 만들지, 만들지 않을지까지 결정합니다.`를 중심으로 문제 발견·범위 결정·결과 학습 3단계를 재작성했다. | 없음 | 연대기 반복 대신 재현 가능한 PM 판단 방식 노출 |
| QA-BASE15-004 | `src/components/ProductProof.tsx`, `src/data/portfolio.ts` | 참여자 6명·2026.07 베타·1인 전담을 유지하고, 그리드 촬영 추가와 복잡도를 높이는 시퀀스 제외를 한 화면에 대비시켰다. | 사용자 확인 사실 반영 | 현재 제품에서 실제 제품 결정이 보임 |
| QA-BASE15-005 | `src/components/ImageCards.tsx`, `src/components/Experience.tsx`, `src/data/portfolio.ts` | 프로젝트는 판단·실행·성과 중심, 경력은 7개 회사의 역할 맥락만 남겼다. GenON의 `사업개발 · 사업개발` 중복과 번역투 문장을 교정했다. | 없음 | 뒤쪽 반복 축소·최신 경력 가독성 개선 |
| QA-BASE15-006 | `src/index.css`, `About.tsx`, `ImageCards.tsx`, `Hero.tsx` | 한글 `word-break: keep-all`과 긴 토큰 fallback을 적용하고, 768px의 역량·증거 카드를 1열로 유지한 뒤 1440px에서만 3열로 전환했다. UI 캡처는 `object-contain`으로 바꿨다. | 없음 | 단어 중간 분리·태블릿 세로 토막·향후 이미지 잘림 방지 |
| QA-BASE15-007 | `src/lib/analytics.ts`, `src/pages/Index.tsx`, `src/test/analytics.test.tsx`, GA4 관리 화면 | 분석 허용 후에도 `/`을 벗어나면 즉시 GA를 비활성화하고, 모든 config·event의 URL·title·referrer를 공개 루트 고정값으로 제한했다. Enhanced Measurement는 관리 화면에서 전체 비활성화했다. | 개인정보 경계 강화 | `/p/*`·관리자·404의 slug·referrer 전송 차단 |
| 회사별 Hero | `src/types/portfolio.ts`, `src/test/portfolio.test.ts` | role·career·headline·subcopy·keyword·CTA·stat의 길이, 줄 수, 개수와 안전한 target ID를 검증하고 trim한 값만 반환하도록 parser를 강화했다. | 없음 | DB 변형의 긴 문장·4개 이상 지표로 인한 레이아웃 붕괴 차단 |
| 라이브 Typebot CSP | `index.html` | 첫 배포 후 Typebot 내부 Inter 폰트의 `fonts.bunny.net` CSS가 CSP에 차단되는 것을 발견했다. 실제 CSS의 font URL도 같은 host임을 확인하고 `style-src`·`font-src`에 해당 origin만 추가했다. | 없음 | 챗봇 열기 시 CSP console 오류 제거 |

#### 동일 조건 재검사

최종 후보를 같은 브라우저 조건으로 위에서 아래까지 다시 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `390 / 390` | `768 / 768` | `1440 / 1440` |
| 문서 높이 | 10,294px | 9,175px | 7,001px |
| 실제 텍스트 잘림 | 0건 | 0건 | 0건 |
| Hero H1 client / scroll | `342 / 342` | `672 / 672` | `1152 / 1152` |
| 역량 카드 열 | 1열 | 1열 | 3열 |
| 우선 프로젝트 증거 열 | 1열 | 1열 | 3열 |
| Contact 제출 버튼 | `300×56px` | `606×56px` | `702×56px` |

- 세 너비 모두 `AI Product Manager · 7년 경력`, 새 Hero, `역량`, Archi 기능 추가·제외와 프로젝트·경력 순서를 표시한다. `9년차`, standalone `Arky`, 기존 소개문구는 공개 소스와 화면에서 0건이다.
- 390px에서 Hero는 `고객의 문제를 / 제품으로 해결합니다`로 자연스럽게 나뉘며 한글 단어 중간 분리, 고립된 번호, 카드·CTA 오버플로가 없다.
- 768px은 역량·우선 프로젝트 근거를 1열로 유지해 140~187px 폭의 세로 토막을 제거하고, 1440px에서만 3열로 확장한다.
- GA4 실제 요청에서 `page_location=https://archilab.ai.kr/`, 고정 title, 빈 referrer만 확인했다. `/`에서 `/p/not-real-slug`로 SPA 전환한 뒤 Google 신규 요청은 0건이고 `noindex, nofollow`를 유지한다.
- Typebot은 `7년`, `Archi(아키) / Arkylab`, 1인 담당 책임을 답하며 `그렇게 해줘`, `더 짧게`, `2번째만 설명해줘`가 직전 대화 맥락을 이어간다. 무관 질문은 지정 폴백을 1회만 출력한다.
- 최종 정적 검사: TypeScript 통과, Vitest `23/23`, ESLint 오류 `0`·기존 미사용 UI scaffold fast-refresh 경고 `7`, production build 통과, `git diff --check` 통과, `pnpm audit --prod` 알려진 취약점 `0`이다.
- 최종 번들: main `127.97KiB gzip`, CSS `13.54KiB gzip`, Typebot `199.27KiB gzip` lazy chunk. Typebot과 GA는 첫 동의·상호작용 전 초기 페이지 로드를 막지 않는다.
- 배포 판정: `가능`.

#### 배포 후 실제 URL 점검

- 1차 배포 커밋 `d5ff15448b3725af49e1b66122d358bbe86288af`의 GitHub Actions run `31817367335`는 build·deploy 모두 성공했다.
- 1차 라이브에서 Typebot 내부 Inter 폰트 CSS가 CSP에 차단되는 console 오류를 발견했다. `fonts.bunny.net`의 CSS와 실제 font URL을 확인한 뒤 해당 host만 `style-src`·`font-src`에 추가했다.
- 보완 커밋 `4d7589292fd2fd36bfd7103693b26af2ccc4634c`의 GitHub Actions run `31817820173`도 build·deploy 모두 성공했다. 최종 Actions: `https://github.com/gmbro/portfolio/actions/runs/31817820173`.
- 실제 공개 URL `https://archilab.ai.kr/`은 HTTPS `200`, 최종 `Last-Modified`는 `2026-08-14 16:08:13 UTC`다. 라이브 asset은 `index-Cclp52x5.js`, `index-Sxg2FYZJ.css`이며 HTML title은 `이경민 | AI Product Manager`다.

최종 라이브를 같은 조건으로 다시 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `390 / 390` | `768 / 768` | `1440 / 1440` |
| 문서 높이 | 9,782px | 8,663px | 6,921px |
| 실제 텍스트 잘림 | 0건 | 0건 | 0건 |
| Hero H1 client / scroll | `342 / 342` | `672 / 672` | `1152 / 1152` |
| 역량 카드 열 | 1열 | 1열 | 3열 |
| 우선 프로젝트 증거 열 | 1열 | 1열 | 3열 |
| Contact 제출 버튼 | `300×56px` | `606×56px` | `702×56px` |

- 세 너비 모두 `고객의 문제를 제품으로 해결합니다`, `AI Product Manager · 7년 경력`, `무엇을 만들지, 만들지 않을지까지 결정합니다.`와 Archi·프로젝트·경력을 최신 revision으로 표시한다. `9년차`, standalone `Arky`, 기존 소개문구는 라이브 JavaScript에서 0건이다.
- GA 분석 허용 상태에서 외부 script는 1개, `page_view`는 1건이다. 실제 collect 요청에는 고정 `https://archilab.ai.kr/`, 고정 title, 빈 referrer만 있으며 Google Signals·광고 개인화는 비활성 상태다. `/`에서 `/p/not-real-slug`로 SPA 전환한 뒤 신규 Google 요청은 0건이고 `ga-disable`과 consent denied가 적용된다.
- Enhanced Measurement는 GA4 관리 화면에서 전체 비활성화했다. 직접 진입한 `/p/not-real-slug`, `/admin/links`, 404에도 분석 UI·script·Google 요청이 0건이다.
- 390px Typebot launcher는 `148×52px`, 가시 문구 `물어보기`, 접근성 이름 `물어보기 열기`다. 열기 후 `aria-pressed=true`, 이름 `물어보기 닫기`, bot panel 1개를 확인했고 최종 console CSP 오류는 0건이다.
- `/p/not-real-slug`, `/admin/links`, 임의 404는 `noindex, nofollow`, Typebot 0개, GA 0건을 유지한다. GitHub Pages의 SPA fallback 특성상 직접 요청 HTTP status는 `404`지만 최신 shell이 실행되어 의도한 화면을 표시한다.
- 최종 publication: 기본 공개 포트폴리오 base revision 15. 활성 회사별 publication은 0건이며 기본 `/`만 indexable이다.
- 배포 결과: `성공`.

---

### 2026-08-14 / GA4 공개 포트폴리오 분석 연동 / base revision 14

- 작업 대상 URL: `/`
- 분석 제외 URL: `/p/:slug`, `/admin/links`, 404
- 배포 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 14
- 측정 ID: `G-C8EPGBXDJE` (공개 클라이언트 식별자)
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 적용 원칙

- Google Analytics는 기본 공개 포트폴리오 `/`에서만, 방문자가 분석 쿠키를 허용한 뒤 로드한다.
- 회사별 지원 slug·JD·publication 정보가 포함될 수 있는 `/p/*`, 관리자 `/admin/links`, 무효 링크와 404는 분석 스크립트를 로드하지 않는다.
- 이름·이메일·문의 본문·챗봇 대화·실제 방문 URL·회사명은 이벤트 파라미터로 보내지 않는다.
- 광고 저장소·광고 사용자 데이터·광고 개인화·Google Signals는 사용하지 않는다.
- Enhanced Measurement의 자동 page view와 중복되지 않도록 초기 자동 전송을 끄고, 공개 루트의 고정 canonical 정보로 page view를 한 번만 전송한다.

#### 1차 진단 — 수정 전

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE14-001 | 전체 코드 | GA 측정 ID·초기화 코드·동의 UI가 없음 | GA4 웹 스트림에서 데이터 수집이 활성화되지 않음 | 높음 | `VITE_GA_MEASUREMENT_ID` 기반 지연 로더와 기본 동의 모드 구현 | 발견 |
| QA-BASE14-002 | `index.html` | CSP `script-src`·`connect-src`·`img-src`에 Google Analytics origin이 없음 | 표준 태그를 추가해도 브라우저가 차단 | 높음 | 기능에 필요한 Google origin만 최소 허용 | 발견 |
| QA-BASE14-003 | 회사별·관리자 경로 | 경로별 분석 제외 경계가 없음 | 지원 회사 slug·관리 경로가 GA에 전송될 위험 | 차단 | `/`의 `Index`에서만 분석 컴포넌트 활성화 | 발견 |
| QA-BASE14-004 | 문의·챗봇·제품 CTA | 채용 퍼널 이벤트 정의가 없음 | 페이지뷰 외 실제 관심·전환을 구분할 수 없음 | 보통 | PII 없는 allowlist 이벤트만 추가 | 발견 |
| QA-BASE14-005 | 개인정보·접근성 | 분석 동의·거부·설정 변경 UI가 없음 | 방문자가 데이터 수집을 선택하거나 철회할 수 없음 | 높음 | 44px 이상 동의 UI와 Footer 설정 버튼 제공 | 발견 |
| QA-BASE14-006 | 배포 | 외부 Typebot이 아직 `9년차 PM`, `아키랩 MVP`로 답변 | 사이트의 7년·Archi 사실과 충돌 | 차단 | Typebot 수정·재발행 또는 사용자 승인 후 일시 비활성화 | 차단 유지 |

수정 전 동일 조건 기준은 base revision 13의 최신 후보와 같다: 390px `375/375`·10,029px, 768px `753/753`·8,576px, 1440px `1425/1425`·6,890px이며 세 너비에서 가로 잘림과 닫힌 details는 0건이다. 세 너비 및 `/`, `/p/not-real-slug`, `/admin/links` 모두 `gtag`, Google tag script, GA collect 요청은 0건이다.

#### 직접 수정

| 범위 | 실제 수정 | 개인정보·사실 영향 | 결과 |
|---|---|---|---|
| GA4 로더 | `VITE_GA_MEASUREMENT_ID` 형식 검증, 공식 `gtag` dataLayer, 외부 async script 1회 로드, `send_page_view:false`와 고정 canonical `page_view` 구현 | 실제 URL·referrer·회사 slug를 보내지 않음 | 동의 전 Google script 0개, 허용 뒤 `G-C8EPGBXDJE` script 1개 |
| 분석 동의 | 별도 `방문 분석 설정` 배너에 `거부`·`분석 허용`, Google 개인정보처리방침, Footer 재설정 버튼과 철회 후 reload 구현 | Contact의 EmailJS 동의와 목적을 분리 | 미선택·거부 시 Google 네트워크 0, 철회 후 다음 로드에서 태그 미실행 |
| 경로 경계 | `Index analyticsEnabled`를 기본 `/`에서만 켜고 회사별 `CompanyPortfolio`는 명시적으로 끔 | 회사별 지원 정보·DB title·slug 전송 차단 | `/p/not-real-slug`, `/admin/links`에서 배너·script 모두 0 |
| 핵심 이벤트 | `page_view`, `select_content`, `chat_open`, `contact_start`, `generate_lead`를 세션당 1회 allowlist 파라미터로 구현 | 이름·이메일·문의 본문·챗봇 대화·URL을 파라미터로 받지 않음 | 공개 포트폴리오 방문→제품 확인/질문→문의 시작→전송 퍼널 측정 가능 |
| 이벤트 정의 | `analytics.md`에 핵심 이벤트 5개와 보조 이벤트 5개의 정의·조건·파라미터·우선순위·해석 기준을 표로 저장 | 개인정보·민감정보 금지 기준 명시 | 이벤트명·파라미터명을 소문자 스네이크 케이스로 통일 |
| CSP·배포 환경 | Google Tag·Analytics에 필요한 script/img/connect origin만 추가하고 workflow·env 예시·Vite 타입에 측정 ID 연결 | 측정 ID는 공개 클라이언트 식별자이며 API secret을 추가하지 않음 | `unsafe-eval`, 광고·DoubleClick origin, Measurement Protocol secret 없음 |
| CTA 연결 | Archi 데모 클릭, Typebot 최초 열기, 문의 첫 입력, EmailJS 성공 직후에만 이벤트 호출 | UI 원문·폼 값은 이벤트에 전달하지 않음 | 기존 CTA·문의·챗봇 기능 유지 |

- GA4 관리 화면에서는 Enhanced Measurement의 브라우저 기록 기반 page view와 폼 상호작용을 꺼 수동 이벤트 중복을 방지해야 한다. Google Signals·광고 개인화·Ads 연결은 사용하지 않는다.
- 기존 경력·수치·기간·프로젝트 순서·Archi/Arkylab 표기와 EmailJS/Supabase 경계는 변경하지 않았다.

#### 동일 조건 재검사

최종 production build를 Codex In-app Browser의 동일 iframe 조건에서 직접 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 10,057px | 8,605px | 6,918px |
| 실제 가로 잘림 | 0건 | 0건 | 0건 |
| 동의 배너 크기 | `351×282px` | `705×210px` | `768×186px` |
| 거부 버튼 | `151×44px` | `58×44px` | `58×44px` |
| 허용 버튼 | `151×44px` | `84×44px` | `84×44px` |
| 동의 전 Google script | 0개 | 0개 | 0개 |

- 공개 `/`에서 동의 전 dialog 1개·Google script 0개, `분석 허용` 뒤 dialog 0개·script 1개를 확인했다. 브라우저 console 경고·오류는 0건이다.
- unit test는 consent default가 config·page event보다 먼저 큐에 들어가고, `send_page_view:false`, 고정 `https://archilab.ai.kr/`, 빈 referrer, 광고 저장소·Signals 비활성, page view·이벤트 중복 방지를 검증한다.
- `/p/not-real-slug`는 한국어 무효 링크 화면, `/admin/links`는 관리자 로그인 화면을 유지하며 두 경로 모두 동의 UI·Google script가 0개다.
- TypeScript 통과, Vitest `20/20`, ESLint 오류 `0`·기존 미사용 UI scaffold fast-refresh 경고 `7`, production build 통과, `git diff --check` 통과, `pnpm audit --prod` 알려진 취약점 `0`이다.
- 번들: main `127.60KiB gzip`, CSS `13.50KiB gzip`, Typebot `199.27KiB gzip` lazy chunk. GA는 허용 전 초기 네트워크와 별도 npm 의존성 증가가 없다.
- 배포 판정: `중단`. GA4 코드·보안·반응형 검증은 통과했지만 base revision 13의 외부 Typebot 사실 오류가 아직 공개 배포 차단으로 남아 있다.

#### 배포 후 실제 URL 점검

아직 배포하지 않았다. Typebot에서 `Archi(아키) / Arkylab / 7년 경력 / 담당 책임`을 수정·재발행하거나, 사용자 승인으로 Typebot을 임시 비활성화한 뒤 배포한다. 배포 후 `https://archilab.ai.kr/`의 새 asset, 동의 전/후 Google 요청, Realtime 또는 DebugView의 단일 `page_view`, 다섯 핵심 이벤트와 제외 경로 0건을 확인한다.

---

### 2026-08-14 / Archi 중심 AI Product Manager 서사 재구성 / base revision 13

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`
- 배포 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 13
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 평가 프로필: 회사별 JD가 제공되지 않아 사용자 지정 목표 직무 `AI Product Manager`를 채용 평가 기준으로 사용한다.

#### 1단계 — 목표 직무 역량 구조화

| 우선순위 | 핵심 역량 | 채용 담당자의 숨은 확인 의도 | 포트폴리오 키워드 | 필요한 증거 |
|---:|---|---|---|---|
| 1 | 고객 문제 발견·제품 판단 | 실제 사용자 피드백을 기능 우선순위로 전환했는가 | 사용자 피드백 · 범위 결정 | Archi 그리드 촬영 추가·시퀀스 제외 결정 |
| 2 | 0→1 제품 설계·실행 | 문제 정의부터 작동하는 AI 제품까지 책임졌는가 | 0→1 · AI Product Management | Archi 1인 전담, Skelter Labs AI 상담사 PoC |
| 3 | 운영 데이터 기반 개선 | 출시 후 비용·시간·반응 지표로 개선했는가 | 제품 운영 · 데이터 기반 개선 | Selectstar 70%+ 절감, SK Planet 350만 MAU 운영 |
| 4 | 이해관계자·사업 실행 | 기술·고객·개발·공공 조건을 실행 계획으로 연결했는가 | B2B·B2G · 프로젝트 실행 | GenON·NIPA Vision AI 프로젝트, 제안·산출물·조율 |

- 핵심 pain point: `AI를 안다`는 주장보다 `고객의 문제를 발견하고, 무엇을 만들고 만들지 않을지 결정하며, 실제 사용으로 학습하는 PM`이라는 증거가 먼저 보여야 한다.
- 우선 노출 키워드: `AI Product Manager`, `사용자 피드백`, `제품 우선순위`, `0→1`, `운영 개선`.
- 보조 키워드: `STT·TTS·OCR·Supabase·Codex`는 제품 의사결정과 실행을 설명하는 수단으로만 사용한다.

#### 2단계 — 검증 경력 인벤토리

| 경험 | 맥락 | Challenge | Action | Result | 도구·방식 | 담당 책임 | 한 줄 포지셔닝 | 보강 자료 |
|---|---|---|---|---|---|---|---|---|
| Archi(아키) | 2026.06–진행 중, 2026.07 베타 시작, 사용자 6명 | 운동 유형마다 다른 기록과 강사의 영상 기록·체형 분석 요구 | 그리드 촬영 기능 추가, 복잡도를 높이는 시퀀스 기능 보류 | 실제 피드백으로 범위를 좁혀 베타 개선 중 | Codex·Supabase·실사용 인터뷰 | 제품 기획·개발·사업·운영 전담 | 고객 피드백으로 만들 것과 만들지 않을 것을 결정하는 현재 제품 | 익명화 제품 화면·베타 로그 필요 |
| GenON Vision AI | 2025.06–2025.12 | 수작업 품질 검사 개선 | 제안·PoC·산출물·3자 커뮤니케이션 관리 | 프로젝트 종결·정산 지원 | Vision AI·PoC·문서화 | 제안·산출물·이해관계자 관리 | 기술 프로젝트를 고객·개발·지원사업 실행으로 연결 | 공개 가능한 PoC 흐름·산출물 필요 |
| Selectstar STT | 2024.06–2025.01 | 수작업 전사 병목 | STT 전환, 전·후처리 기준, 약 200명 운영·품질 체계 | 맨먼스 약 1/10, 운영 원가 70%+ 절감 | STT·Python·운영 설계 | STT 전환 기획·운영 품질 관리 | 운영 병목을 제품·프로세스 구조로 바꾼 사례 | 전후 프로세스·산식 필요 |
| Skelter Labs AI 상담사 | 2021.09–2023.04 | B2B AI 엔진의 B2C 사용자 가치 정의 | PRD·대화 흐름·와이어·대화 데이터·제휴 설계 | 0→1 PoC 구축 | STT·TTS·Retrieval | 제품·대화 설계 및 제휴 주도 | AI 기술을 사용자 경험으로 번역한 0→1 사례 | 공개 가능한 PRD·데모 필요 |
| SK Planet Syrup Wallet | 2018.04–2020.04 | 푸시 효율·서버 부하·수작업 운영 | 타기팅·분산 발송·리타기팅·운영 재설계 | 수신율 2배, 열람률 1.5배, 운영 시간 1/10 | 대규모 B2C 운영 | 푸시 기능 기획·운영 개선 | 350만 MAU에서 지표와 운영을 함께 개선 | 기준 시점·대시보드 필요 |

- 공식 제품명은 `Archi(아키)`, 운영 주체는 `Arkylab`, 공개 URL은 `https://archi.best`로 구분한다.
- 경력은 사용자 확인에 따라 `9년차`가 아닌 `7년 경력`으로 표기한다.
- 모든 퍼센트형 기여도는 산정 기준이 불명확하므로 `담당 책임`과 구체적인 소유 범위로 교체한다.
- 클래스팅은 현재 제공 자료·저장소·Git 이력에서 기간·직함·업무·성과 근거를 확인할 수 없어 이번 공개 revision에 임의 추가하지 않는다.

#### 3단계 — 콘텐츠 설계

Hero 후보:

| 안 | 헤드라인 | 서브카피 방향 | 키워드 | 판단 |
|---:|---|---|---|---|
| 1 (채택) | `사용자 문제를 AI 제품으로 만들고, 실제 사용에서 다음 결정을 찾습니다.` | 7년 경력과 현재 Archi 1인 전담·6명 베타를 연결 | 고객 문제 정의 · 제품 우선순위 · 출시·학습 | AI PM의 판단과 현재 제품 증거가 가장 빠르게 연결됨 |
| 2 | `고객의 문제에서 시작해, 쓰이는 AI 제품을 만듭니다.` | 사용성과 제품화 강조 | 문제 발견 · 0→1 · 실사용 | 간결하지만 운영 개선 경력이 약하게 보임 |
| 3 | `AI 제품의 전 과정을 설계하고, 운영 데이터로 개선합니다.` | 제품 생애주기와 데이터 강조 | 제품 설계 · 운영 · 개선 | 전문적이지만 사용자 관점이 약함 |

- 정보 구조: `Hero → 소개(7년의 의도적 확장) → 현재 제품 Archi → 프로젝트 4개 → 경력 → 문의`.
- Archi는 독립 플래그십으로 한 번만 상세 노출하고 프로젝트 목록에서 중복 제거한다.
- 프로젝트는 `GenON Vision AI → Selectstar → Skelter Labs → SK Planet`으로 구성한다. 최신 프로젝트와 강한 정량·0→1·대규모 운영 근거를 모두 앞단에서 확인할 수 있게 한다.
- 경력은 회사·역할·기간·고유 강점만 남겨 프로젝트 상세와 같은 성과 문장을 반복하지 않는다.
- 실제 시각 자료가 없는 박스는 프로덕션에서 렌더링하지 않는다. 이번 revision은 Archi 라이브 URL을 증거로 유지하고, 향후 제품 화면·전후 프로세스·대시보드를 추가한다.

#### 1차 진단 — 수정 전

수정 전 라이브 base revision 12를 같은 브라우저에서 390·768·1440px iframe viewport로 직접 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 10,242px | 9,169px | 7,492px |
| 텍스트 가로 잘림 | 0건 | 0건 | 0건 |
| 닫힌 details / 전체 | `12 / 12` | `12 / 12` | `12 / 12` |
| 프로젝트 순서 | Arkylab→Skelter→Selectstar→SK Planet→학습 기록→Vision AI | 동일 | 동일 |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE13-001 | Hero·현재 제품 | 라이브는 제품명보다 운영 주체 `Arkylab`이 앞서고 로컬 후보에는 잘못된 `Arky`가 남아 있음 | 제품·회사 관계와 공식명이 혼동됨 | 차단 | 제품 `Archi(아키)`, 회사 `Arkylab`, CTA `Archi 베타 보기`로 분리 | 발견 |
| QA-BASE13-002 | Hero·메타 | `프로덕트 매니저 · 9년차`가 사용자 확인값 `AI Product Manager · 7년 경력`과 불일치 | 지원 포지션과 경력 신뢰도 저하 | 차단 | Hero·SEO·테스트·외부 챗봇 지식에서 전면 교정 | 발견 |
| QA-BASE13-003 | About·PM 역량·프로젝트 | 문제 정의→제품 설계→성과 검증이 세 섹션에서 반복되고 Archi도 프로젝트·경력에서 재서술 | 실제 판단 증거 도달이 늦고 제너럴리스트로 읽힘 | 높음 | ProductProof를 Archi 플래그십으로 전환하고 중복 사례·문장 제거 | 발견 |
| QA-BASE13-004 | 프로젝트 | 6개 사례 중 필수 근거 5개가 닫힌 details에 있고 GenON Vision AI가 마지막 | 핵심 AI PM 근거를 스캔만으로 확인하기 어려움 | 높음 | 핵심 4개만 남기고 문제·판단·성과를 모두 기본 노출 | 발견 |
| QA-BASE13-005 | 기여 표기 | 90%·100%가 산정 기준 없이 반복 | 과장 또는 자의적 수치로 보일 수 있음 | 높음 | 전 프로젝트를 `담당 책임`과 검증된 범위로 변경 | 발견 |
| QA-BASE13-006 | Archi 증거 | 사용자 6명·7월 베타·피드백 기반 기능 추가/보류·1인 전담이 공개 서사에 없음 | 현재 제품의 end-to-end PM 판단이 증명되지 않음 | 차단 | 플래그십 사례에 네 가지 확인 사실을 전면 반영 | 발견 |
| QA-BASE13-007 | Experience | 프로젝트와 동일한 성과 카드가 다시 접혀 반복되고 12개 details가 모두 닫힘 | 페이지가 길지만 새로운 정보는 적음 | 보통 | 각 회사의 고유 역할 신호를 항상 보이는 compact timeline으로 전환 | 발견 |
| QA-BASE13-008 | 클래스팅 | 공개 가능한 사실 근거가 없음 | 임의 추가 시 경력 허위 위험 | 차단 | 사용자에게 기간·직함·제품·결정·결과 자료를 받은 뒤 별도 revision에 추가 | 발견 |
| QA-BASE13-009 | 시각 증거 | Archi 외부 URL 외 제품 화면·전후 프로세스·대시보드가 없음 | 텍스트 주장 대비 실물 증거가 약함 | 보통 | 빈 박스는 배포하지 않고 필요한 자료 목록만 확정 | 발견 |

#### 직접 수정

| 범위 | 실제 수정 | 사실 변경 여부 | 결과 |
|---|---|---|---|
| Hero·SEO | 목표 직무를 `AI Product Manager`, 경력을 `7년 경력`으로 통일하고 현재 Archi·6명 베타·제품 판단을 첫 화면에 배치 | 사용자 확인 사실 반영 | 채용 담당자가 첫 화면에서 지원 직무·현재 제품·대표 운영 성과를 함께 확인 |
| Archi 플래그십 | 제품 `Archi(아키)`와 운영 주체 `Arkylab`을 분리하고, 2026.07부터 참여자 6명 베타·1인 전담·그리드 촬영 추가·시퀀스 제외 결정을 독립 섹션에 반영 | 사용자 확인 사실 반영 | 실제 피드백으로 만들 것과 만들지 않을 것을 결정한 PM 근거를 기본 노출 |
| 프로젝트 | Archi 중복 카드를 제거하고 `GenON Vision AI → Selectstar → Skelter Labs → SK Planet` 4개만 문제·판단·실행·성과까지 기본 노출 | 기존 검증 근거의 위계만 변경 | 닫힌 상세 12개를 0개로 줄이고 핵심 프로젝트를 스크롤만으로 확인 |
| 담당 범위 | 90%·100% 기여도 표기를 모두 삭제하고 `담당 책임`과 구체적인 소유 범위로 변경 | 수치 삭제, 사실 범위 유지 | 산정 근거가 불분명한 퍼센트 과장 위험 제거 |
| 경력 | Arkylab·GenON·Selectstar·Adler·Skelter Labs·SK Planet·Kakao Commerce를 회사·직함·기간·고유 역할 한 문장으로 정리 | Kakao Commerce 직함은 사용자 확인에 따라 `퍼포먼스 마케팅 인턴`으로 교정 | 프로젝트 상세의 반복을 제거하면서 전체 경력 맥락 유지 |
| 반응형·챗봇 | 긴 본문 안전 줄바꿈을 유지하고, 닫힌 Typebot launcher는 Hero·소개·현재 제품·문의에서 숨기고 프로젝트·경력에서만 표시 | 없음 | 서사·CTA 위에 고정 launcher가 겹치는 문제 방지 |
| 클래스팅 | 검증 가능한 기간·직함·제품·성과 자료가 없어 이번 revision에 추가하지 않음 | 허위 방지 | 사용자 자료를 받은 뒤 별도 revision에서 반영 |
| 시각 자료 | `src`가 없는 시각 자료 슬롯은 production에서 계속 숨기고 Archi 공개 URL만 연결 | 없음 | 빈 박스 배포 없이 텍스트 완성도 유지 |

- Supabase SQL Editor에서 현재 유효한 `published` publication을 조회한 결과 `0건`, 이전 `9년차·Arky·아키랩·기여도·90%·100%` 잔존 publication도 `0건`이다.
- `https://archi.best/`는 `Archi - Fitness Asset Platform`으로 열리고 제품명이 일치한다. 다만 공개 랜딩의 `기존 30분 → Archi 3분` 옆 감소율이 `0% 감소`로 표시되어 제품 사이트에서 별도 교정이 필요하다.
- 외부 Typebot `gmbro`는 실제 질의에서 아직 `9년차 PM`, `아키랩 MVP`로 답변한다. Typebot 편집 화면이 로그아웃 상태라 이번 코드 수정만으로 지식을 교정할 수 없으며, 로그인·수정·재발행 전까지 배포를 중단한다.

#### 동일 조건 재검사

최신 production build를 수정 전과 동일한 Codex In-app Browser iframe 조건으로 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 10,029px | 8,576px | 6,890px |
| 실제 텍스트 가로 잘림 | 0건 | 0건 | 0건 |
| 닫힌 details | 0개 | 0개 | 0개 |
| 프로젝트 카드 | 4개 | 4개 | 4개 |
| 프로젝트 순서 | GenON→Selectstar→Skelter Labs→SK Planet | 동일 | 동일 |
| 본문 Typebot launcher | 148×52px | 196×64px | 196×64px |
| Contact launcher | 숨김 | 숨김 | 숨김 |
| Contact 제출 버튼 | 285×56px | 591×56px | 702×56px |

- Hero는 세 너비 모두 `AI Product Manager · 7년 경력`, Archi 베타 6명·350만 MAU·70%+ 지표를 표시하며 가로 오버플로가 없다.
- Archi는 독립 플래그십으로 한 번만 노출되고 네 프로젝트의 문제·판단·실행·성과가 모두 기본 노출된다.
- Experience는 7개 회사를 모두 보이는 타임라인으로 렌더링하며 프로젝트 상세 성과 카드와 태그를 반복하지 않는다.
- Typebot launcher는 프로젝트·경력에서 `물어보기`로 노출되고, Hero·소개·현재 제품·문의에서는 닫힌 상태일 때 숨는다. Contact 제출 CTA와 교차하지 않는다.
- TypeScript 통과, Vitest `16/16`, ESLint 오류 `0`·기존 fast-refresh 경고 `7`, production build 통과, `git diff --check` 통과, `pnpm audit --prod` 알려진 취약점 `0`이다.
- 배포 판정: `중단`. 웹 코드와 반응형 검증은 통과했지만 외부 Typebot 지식 정합성이 차단 조건으로 남아 있다.

#### 배포 후 실제 URL 점검

아직 배포하지 않았다. Typebot에서 `Archi(아키) / Arkylab / 7년 경력 / 담당 책임`을 반영하고 아래 질의가 일치하는지 확인한 뒤 배포·라이브 재검사를 수행한다.

- `경력이 몇 년인가요?`
- `현재 만드는 제품과 운영 회사는 무엇인가요?`
- `Archi에서 어떤 책임을 맡았나요?`
- `베타 현황과 사용자 피드백으로 바꾼 기능은 무엇인가요?`

---

### 2026-08-14 / 자연스러운 본문 줄바꿈·문의 검증 개선 / base revision 12

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`
- 배포 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 12
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1~4단계 적용 기준

- 새 JD나 새로운 경력 근거가 제공되지 않았으므로 base revision 11의 PM 포지셔닝·경력·수치·프로젝트 순서는 변경하지 않는다.
- 이번 revision은 검증된 콘텐츠의 의미를 유지하면서 본문 줄바꿈, 섹션 명칭, 문의 내용 최소 길이와 Typebot launcher 문구만 개선한다.
- 사용자 지정 문구는 `대표 PM 사례 → 프로젝트`, `메시지 → 물어보기`를 그대로 적용한다. `문의하기` 가시 문구는 유지하고 문의 본문의 최소 입력 길이를 10자에서 5자로 조정한다.

#### 1차 진단 — 수정 전

| ID | 너비·섹션 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE12-001 | 1440px 소개 | 첫 소개 문단의 마지막 줄이 전체 폭의 19%, 두 번째 문단은 13%만 차지 | 문장이 잘린 듯 보이고 줄 끝 호흡이 부자연스러움 | 높음 | 본문에 pretty wrapping과 긴 토큰 안전 줄바꿈 적용 | 발견 |
| QA-BASE12-002 | 390px PM 역량·프로젝트 소개 | 마지막 줄 폭이 각각 27%로 짧게 남음 | 모바일에서 줄글이 토막 난 인상 | 보통 | 본문 `break-keep` 의존을 제거하고 문장 단위의 자연스러운 wrapping 적용 | 발견 |
| QA-BASE12-003 | 768px 첫 프로젝트 실행 근거 | `CESK·FIXNESS·HEALTHBOYGYM`이 포함된 본문의 `scrollWidth 204px > clientWidth 181px` | 실제 텍스트가 카드 안에서 가로로 잘림 | 차단 | 본문·성과·경력 카드에 `overflow-wrap:anywhere` 적용 | 발견 |
| QA-BASE12-004 | 전체 내비게이션·프로젝트 | `대표 PM 사례`가 내비게이션과 섹션 eyebrow에 반복 | 사용자가 원하는 간결한 섹션명과 불일치 | 보통 | 두 위치를 `프로젝트`로 통일하고 테스트 갱신 | 발견 |
| QA-BASE12-005 | 문의 폼 입력 검증 | 문의 내용의 최소 길이가 10자로 설정됨 | 짧고 명확한 문의도 제출할 수 없음 | 보통 | 최소 길이·검증 문구를 5자로 조정하고 4자 거부·5자 허용을 테스트 | 발견 |
| QA-BASE12-006 | 전체 Typebot | launcher 가시 문구와 접근성 이름이 `메시지`, `메시지 열기/닫기` | 요청한 기능명과 불일치 | 보통 | 가시 문구·접근성 이름을 `물어보기`로 통일하고 모바일 폭 재조정 | 발견 |

수정 전 반응형 측정:

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 10,372px | 9,193px | 7,516px |
| 소개 첫 문단 마지막 줄 비율 | 40% | 34% | 19% |
| 소개 둘째 문단 마지막 줄 비율 | 40% | 33% | 13% |
| 실제 본문 가로 잘림 | 0건 | 1건 | 0건 |
| Typebot launcher | `메시지`, 132×52px | `메시지`, 196×64px | `메시지`, 196×64px |

- 수정 전 공개 페이지에서 전체 문서 가로 스크롤은 없지만, 768px 프로젝트 3열 내부의 긴 브랜드 토큰이 개별 본문 폭을 초과한다.
- `문의하기` 가시 문구는 유지하고, 문의 본문 입력의 기존 `minLength=10`과 수동 검증 기준만 5자로 낮춘다. `대표 PM 사례`는 내비게이션·프로젝트 섹션 2곳에서 확인했다.

#### 직접 수정

| 범위 | 실제 수정 | 사실 변경 여부 | 결과 |
|---|---|---|---|
| 소개·섹션 본문 | 소개 본문 폭을 `max-w-xl`로 조정하고 짧은 서술에는 `text-wrap: balance`, 일반 본문에는 안전 줄바꿈을 적용 | 없음 | 390·768·1440px에서 마지막 줄이 짧게 고립되지 않고 균형 있게 배치됨 |
| 프로젝트·경력 근거 | 문제·실행·성과, 수행 회사, 역할 범위, metric, tag, 경력 성과에 `overflow-wrap:anywhere`와 최대 폭 규칙 적용 | 없음 | 768px의 `CESK·FIXNESS·HEALTHBOYGYM` 실제 가로 잘림 제거 |
| Hero·상태 화면 | Hero 제목·설명과 회사별 상태 문구에 balance/pretty wrapping 적용하고 stat 값의 강제 한 줄 고정 제거 | 없음 | 회사별 긴 카피·긴 stat에서도 카드 밖 오버플로를 방지 |
| 프로젝트 명칭 | 내비게이션과 프로젝트 섹션의 `대표 PM 사례`를 `프로젝트`로 변경하고 소개문·테스트를 맞춤 | 없음 | 공개 소스의 구 문구 0건, `case-studies` anchor는 유지 |
| 문의 입력 검증 | 문의 본문 `minLength`와 수동 검증을 10자에서 5자로 낮추고 오류 문구 및 4자 거부·5자 허용 테스트 추가 | 없음 | 짧고 명확한 5자 문의부터 정상 전송 가능 |
| Typebot launcher | 가시 문구와 접근성 이름을 `물어보기`, `물어보기 열기/닫기`로 통일하고 모바일 폭을 132px에서 148px로 확대 | 없음 | 390px에서도 문구·아이콘·프로필 이미지가 겹치지 않고 Label-in-Name 유지 |
| Contact 상태 문구 | 전송 상태·fallback 이메일에 긴 토큰 안전 줄바꿈 적용 | 없음 | 좁은 화면에서도 이메일과 안내 전문 유지 |

- 경력·수치·기간·프로젝트 순서·조직 귀속·성과 문구는 변경하지 않았다.
- `contact`, `case-studies`, 개별 프로젝트 id, EmailJS `message` 필드와 템플릿 변수는 변경하지 않았다.
- EmailJS의 honeypot·10초 제한·개인정보 동의·고정 수신자 구조와 Supabase exact-slug 공개 경계는 그대로 유지했다.

#### 동일 조건 재검사

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 10,242px | 9,169px | 7,492px |
| 소개 첫 문단 마지막 줄 비율 | 78% | 77% | 77% |
| 소개 둘째 문단 마지막 줄 비율 | 78% | 71% | 71% |
| 프로젝트 소개 마지막 줄 비율 | 98% | 82% | 70% |
| 실제 텍스트 가로 잘림 | 0건 | 0건 | 0건 |
| 문의 본문 `minLength` | 5 | 5 | 5 |
| 본문 Typebot launcher | `148×52px` | `196×64px` | `196×64px` |
| Contact Typebot launcher | 숨김 | 숨김 | 숨김 |
| Contact 제출 CTA | `285×56px` | `591×56px` | `702×56px` |

- 세 너비에서 실제 텍스트 노드의 `scrollWidth > clientWidth` 항목과 전체 문서 가로 스크롤이 모두 0건이다.
- 390px Typebot의 가시 pseudo content는 `물어보기`, 접근성 이름은 `물어보기 열기`이며 `aria-pressed=false→true→false`, 이름 `물어보기 열기→닫기→열기`를 실제로 확인했다.
- Typebot은 Hero와 Contact의 닫힌 상태에서 숨고 본문에서만 나타나며, Contact 제출 버튼과 교차하지 않는다.
- 공개 소스·최종 번들에서 `대표 PM 사례`, 구 Typebot `메시지 열기/닫기`, 임시 `문의 남기기`, 기존 10자 검증 문구는 0건이다.
- 최종 검사: TypeScript 통과, Vitest 16/16, ESLint 오류 0·기존 미사용 UI scaffold fast-refresh 경고 7, production build 통과, `git diff --check` 통과.
- 번들: main 126.72KiB gzip, CSS 13.39KiB gzip, Typebot 199.27KiB gzip lazy chunk. 이번 변경으로 초기 로딩 구조의 유의미한 증가는 없다.
- 보안·접근성 독립 감사에서 CSP·XSS·EmailJS·Supabase·앵커 회귀와 배포 차단 항목 0건을 확인했다.
- 배포 판단: `가능`.

#### 배포 후 실제 URL 점검

- GitHub Actions `Deploy Portfolio to GitHub Pages` 실행 `31801644660`이 커밋 `a2b092129d5c3922022befba67f9ecda1b65c3a7`에서 build·deploy 모두 성공했다.
- 실제 공개 URL: `https://archilab.ai.kr/`. HTML과 새 JavaScript asset의 `Last-Modified`는 `2026-08-14 12:45:48 UTC`, HTTPS 응답은 모두 `200`이다.
- 라이브 asset은 `index-O1vRDCh_.js`, `index-BfbNT63E.css`이며, 배포 전 production build와 일치한다.
- 실제 라이브를 390×844, 768×900, 1440×900에서 재검사한 결과 clientWidth/scrollWidth는 `375/375`, `753/753`, `1425/1425`, 텍스트 노드 가로 잘림은 모두 0건이다.
- 라이브 소개 문단 마지막 줄 비율은 390px `78%/78%`, 768px `77%/71%`, 1440px `77%/71%`로 수정 전의 13~40% 고립 줄을 해소했다. 프로젝트 소개는 `98%/82%/70%`다.
- 프로젝트 섹션과 내비게이션에 `프로젝트`가 반영됐고 `대표 PM 사례`는 라이브 본문 0건이다. `case-studies` anchor와 Hero CTA 이동은 유지된다.
- 문의 textarea의 live `minLength=5`, 버튼명 `문의하기`, 390px 제출 CTA `285×56px`를 확인했다. Vitest에서 4자 거부·5자 전송을 검증했으며 EmailJS payload·보안 구조는 변경하지 않았다.
- 390px Typebot은 `148×52px`, 가시 문구 `물어보기`, 접근성 이름 `물어보기 열기`로 표시된다. 실제 열기·닫기에서 `aria-pressed false→true`, 이름 `물어보기 열기→닫기`와 panel 렌더를 확인했다. Contact에서는 닫힌 launcher가 사라져 제출 CTA를 가리지 않는다.
- `/p/not-real-slug`는 최종적으로 `유효하지 않은 링크입니다`, `noindex, nofollow`, Typebot 0개를 표시한다. `/admin/links`와 임의 404도 `noindex, nofollow`, Typebot 0개, 가로 오버플로 0을 유지한다.
- 실제 루트 로드 후 브라우저 dev log는 경고·오류 0건이다. 새 CSS·JS·Pretendard 자원도 정상 로드됐다.
- 최종 publication: 기본 공개 포트폴리오 base revision 12. 회사별 신규 publication 생성 없음. 기본 `/`은 indexable이며 무효 링크·관리자·404는 noindex를 유지한다.
- 배포 결과: `성공`.

---

### 2026-08-12 / 보안 헤더 보강·최종 전달 / base revision 11

- 작업 대상 URL: `/`, 유효한 `/p/:slug`, `/admin/links`
- 배포 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 11
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex

#### 1~4단계 적용 기준

- 특정 회사 JD나 새로운 경력 자료가 제공되지 않았으므로 base revision 10의 PM 서사·경력·수치·프로젝트 내용은 변경하지 않는다.
- 이번 revision은 공개 자원 공급망과 브라우저 보안 경계를 보강하고, 동일한 390·768·1440px 조건에서 UI·문의·챗봇·보호 경로를 다시 검사하는 배포 작업이다.
- GitHub Pages가 커스텀 응답 헤더를 지원하지 않는 제약 안에서 적용 가능한 meta CSP·Referrer Policy와 외부 폰트 SRI를 사용한다.

#### 1차 진단 — 수정 전

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE11-001 | `index.html` | 외부 Pretendard CSS가 CSS `@import`로 로드되어 파일 버전은 고정됐지만 Subresource Integrity를 적용할 수 없음 | CDN 자원 변조 시 브라우저 무결성 검증 불가 | 보통 | HTML stylesheet 링크로 이동하고 실제 파일 SHA-384 SRI 적용 | 수정 완료 |
| QA-BASE11-002 | 전체 공개 페이지 | Referrer Policy가 브라우저 기본값에만 의존 | 외부 링크·API 요청 시 출처 정보 정책이 명시적이지 않음 | 낮음 | `strict-origin-when-cross-origin` 명시 | 수정 완료 |
| QA-BASE11-003 | GitHub Pages | 응답 CSP·HSTS·frame 보호 헤더를 저장소에서 직접 설정할 수 없음 | XSS·클릭재킹 방어가 호스팅 제약에 좌우됨 | 보통 | 기능 origin을 최소 허용한 meta CSP 적용, 응답 헤더 한계는 잔여 위험으로 기록 | 부분 완화 |

수정 전 기준은 base revision 10 라이브와 동일하다: 390px `375=375`·10,372px, 768px `753=753`·9,193px, 1440px `1425=1425`·7,516px, 세 너비 가로 오버플로 0.

#### 직접 수정

| 범위 | 실제 수정 | 사실 변경 여부 | 결과 |
|---|---|---|---|
| 외부 폰트 공급망 | Pretendard variable dynamic subset CSS를 정확한 `1.3.9` URL의 HTML stylesheet로 이동하고, CDN 원본과 대조한 SHA-384 `integrity` 및 `crossorigin=anonymous` 적용 | 없음 | 변조·불일치 시 브라우저가 폰트 CSS 차단 |
| 브라우저 보안 정책 | `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`를 기본으로 EmailJS·Supabase·Typebot·Pretendard에 필요한 HTTPS/WSS/frame/image origin만 허용한 meta CSP 적용 | 없음 | 로컬 production preview에서 CSP 위반 0, Typebot 열기 정상 |
| Referrer Policy | `strict-origin-when-cross-origin`을 명시 | 없음 | 동일 출처는 전체 URL, 교차 출처는 origin만 전송 |
| 기존 CSS 정리 | SRI를 우회하던 `@import` 제거 | 없음 | 중복 네트워크 요청 없이 동일 Pretendard 렌더 유지 |

#### 보안·사실 검증

- `pnpm audit --prod`: 알려진 취약점 0건. 전체 dependency 감사도 0건이다.
- Git 추적 파일·전체 이력에서 private key, Supabase service-role key, GitHub token 노출 0건이다. `.env.local`은 Git 제외 상태이고 파일 권한은 `0600`이다.
- 빌드 결과에 source map과 비공개 키가 없다. EmailJS public/service/template 식별자와 Supabase publishable key는 브라우저 공개 전제의 식별자다.
- 실제 Supabase anon 검사에서 `applications`와 `portfolio_publications` 직접 조회는 `401`, exact-slug RPC만 `200`이다. RPC는 `slug`, `noindex`, `published_content`만 반환한다.
- 클라이언트 EmailJS payload에는 `to_email`이 없고 수신자는 템플릿의 `gmbro7942@gmail.com`으로 고정돼 있다. honeypot·10초 제한·입력 길이 제한·본문 보존 fallback을 유지한다.
- `dangerouslySetInnerHTML`, `eval`, 직접 `innerHTML` 사용은 0건이며 DB 문자열은 React text rendering으로 출력한다.
- 기존 회사·기간·역할·350만 MAU·70%+·0→1 성과와 프로젝트 귀속을 변경하지 않았다.

#### 동일 조건 재검사

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | 10,372px | 9,193px | 7,516px |
| H1 client / scroll width | `327 / 327` | `657 / 657` | `1152 / 1152` |
| Hero 닫힌 launcher | 없음 | 없음 | 없음 |
| 본문 launcher | 132×52px | 196×64px | 196×64px |
| Contact 닫힌 launcher | 없음 | 없음 | 없음 |
| Contact 제출 CTA | 285×56px | 591×56px | 702×56px |

- 세 너비 모두 텍스트·카드·CTA·섹션에서 가로 오버플로와 챗봇 교차가 0이다.
- Typebot을 실제로 열어 `aria-pressed=true`, 대화 panel 렌더, CSP 위반 0을 확인했다. Contact에서는 닫힌 launcher가 사라져 CTA를 가리지 않는다.
- `/p/not-real-slug`, `/admin/links`, 임의 404는 각각 한국어 화면과 `noindex, nofollow`, Typebot 0개, 가로 오버플로 0을 유지한다.
- 최종 검사: TypeScript 통과, Vitest 15/15, ESLint 오류 0·기존 미사용 UI scaffold fast-refresh 경고 7, production build 통과, `git diff --check` 통과.
- 번들: main 126.65KiB gzip, CSS 13.35KiB gzip. Typebot 199.27KiB gzip chunk는 lazy-load 상태이며 첫 HTML preload에 포함되지 않는다.
- 배포 판단: `가능`.

#### 잔여 비차단 위험

- EmailJS 무료 플랜은 서버 측 도메인 허용 목록·reCAPTCHA를 지원하지 않아 클라이언트 제한을 우회한 스팸·쿼터 소진 위험이 남는다. 트래픽 증가 시 유료 allowlist 또는 서버 측 CAPTCHA를 적용한다.
- GitHub Pages는 HSTS·`frame-ancestors`·Permissions-Policy 같은 응답 헤더를 직접 추가할 수 없다. 더 강한 헤더 정책이 필요하면 Cloudflare 같은 프록시 또는 커스텀 헤더 지원 호스팅으로 이전한다.
- 회사별 slug와 `noindex`는 접근 통제가 아니다. 회사별 publication에는 계속 외부 공개 가능한 정보만 저장한다.
- Typebot lazy chunk와 미사용 shadcn scaffold·다중 lockfile은 기능 차단이 아닌 후속 경량화·공급망 정리 항목이다.

#### 배포 후 실제 URL 점검

- GitHub Actions `Deploy Portfolio to GitHub Pages` 실행 `31583508145`가 build·deploy 모두 성공했다.
- 배포 커밋: `f833bca272ab9c4938a8a9a84b361692922aa3b5` (`security: harden portfolio resource policy`).
- 실제 공개 URL: `https://archilab.ai.kr/`. GitHub Pages 응답의 `Last-Modified`는 `2026-08-12 09:35:16 UTC`다.
- 라이브 asset은 `index-CVRxPw0Z.js`, `index-Dd5tZLAE.css`이며 둘 다 HTTPS `200`이다. 라이브 HTML에서 새 CSP·Referrer Policy·Pretendard SRI·canonical을 확인했다.
- 1.1.1.1·8.8.8.8에서 apex A 4개, `www → gmbro.github.io.` CNAME을 확인했다. HTTP apex는 HTTPS canonical로 `301`, TLS 검증을 포함한 HTTPS root는 `200`이다.
- 라이브 asset과 동일한 최종 production build를 390×844, 768×900, 1440×900에서 재실행한 결과 clientWidth와 scrollWidth가 각각 `375=375`, `753=753`, `1425=1425`로 가로 오버플로 0이다. Hero·본문·Contact의 launcher 정책과 CTA 크기는 배포 전 표와 동일하다.
- Typebot을 실제 열어 대화 panel·접근성 상태를 확인했고 console CSP 위반은 0이다. `/p/not-real-slug`, `/admin/links`, 임의 404는 한국어 화면·`noindex, nofollow`·Typebot 0개를 유지한다.
- 문의 폼에서 `보안 배포 QA 11`을 전송해 `문의가 전송되었습니다` 상태를 확인했다. Gmail에서 제목 `[포트폴리오 문의] 보안 배포 QA 11`, 고정 수신자 `gmbro7942@gmail.com`, 이름·회신 이메일·본문 치환을 실수신으로 확인했다.
- 이 실행 환경의 시스템 DNS resolver에는 이전 NXDOMAIN negative cache가 남아 인앱 브라우저에서 사용자 지정 도메인 직접 재탐색이 일시적으로 실패했다. 권한 DNS와 두 공용 resolver, GitHub Pages edge 직접 TLS 검증, 실제 최신 HTML·asset 응답으로 배포 상태를 교차 확인했다.
- 최종 publication: 기본 공개 포트폴리오 base revision 11. 회사별 publication 신규 생성 없음. 기본 `/`은 indexable이며 관리자·무효/회사별 링크·404는 런타임 정책에 따라 noindex를 유지한다.
- 배포 결과: `성공`.

---

### 2026-08-16 / 비-Archi 제품 성장 지표 전면 배치 / base revision 20

- 작업 대상 URL: `/`, 유효한 `/p/:slug`
- 제외 URL: `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 20
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 평가 기준: 특정 JD 없이 사용자 요청인 `Archi가 아닌 제품의 성장 수치를 채용 담당자가 첫 화면에서 확인`하는 공통 채용 신호

#### 1단계 — 요청·채용 신호 분석

| 우선순위 | 핵심 역량 | 요청 근거 | 숨은 의도 해석 | 포트폴리오 키워드 | 필요한 증거 | 신뢰도 |
|---:|---|---|---|---|---|---|
| 1 | 운영 중인 제품의 성장 지표 개선 | `아키가 아닌 다른 프로덕트`의 `제품 성장에 관한 수치 결과` | 초기 베타 규모보다 이미 운영된 제품에서 실제로 개선한 결과를 먼저 확인하려는 요청 | 제품 성장 · 활성화 개선 | 개선 전후 배수와 본인 행동 | 높음 |
| 2 | 대규모 B2C 제품 운영 | 채용 담당자 관점 명시 | 작은 베타만이 아니라 규모 있는 제품 환경의 실행 경험을 증명해야 함 | 350만 MAU · 푸시 운영 | 서비스 규모와 담당 기능 | 높음 |
| 3 | 지표 기반 제품 판단 | 수치 결과를 Hero에 배치 | 단순 운영 규모가 아니라 제품 기능 변경으로 움직인 결과 지표가 필요함 | 타기팅 · 수신율 개선 | Challenge–Action–Result 연결 | 높음 |

핵심 Pain Point:

- 현재 Hero 첫 지표 `6명 / Archi 베타`는 현재 제품의 검증 규모이지만, 다른 제품에서 만든 성장·활성화 결과를 보여 주지 못한다.
- `6명`은 두 번째 Hero 문장과 Archi 첫 프로젝트 카드에서도 확인할 수 있어 첫 화면 지표로 중복된다.
- 검증된 SK Planet Syrup Wallet 경험에는 `약 350만 MAU`, `푸시 수신율 2배`, `열람률 1.5배`, `운영 시간 1/10`이 있어 사용자의 요청에 직접 대응할 수 있다.

우선순위 키워드:

| 키워드 | 우선순위 | 반복 위치 | 사용 조건 |
|---|---:|---|---|
| 푸시 수신율 2배 | 1 | Hero 지표, SK Planet 프로젝트 | 유효 토큰 타기팅 결과로만 귀속 |
| 350만 MAU | 2 | Hero 지표, SK Planet 프로젝트·경력 | 운영한 서비스 규모로만 표현 |
| 운영 원가 70%+ 절감 | 3 | Hero 지표, Selectstar 프로젝트 | STT 운영 원가 범위로 한정 |

#### 2단계 — 역량 구조화·증거 매칭

| 경험명 | 출처 등급 | 맥락 | Challenge | Action | Result | 도구·방식 | 역량 태그 | 한 줄 포지셔닝 | 보강 필요 메모 |
|---|---|---|---|---|---|---|---|---|---|
| SK Planet Syrup Wallet | 검증됨 | 약 350만 MAU B2C 서비스의 광고 푸시 운영·기능 개선 | 낮은 푸시 효율, 서버 과부하, 반복 수작업 | 유효 토큰 타기팅·분산 발송·리타기팅·운영 재설계 | 수신율 2배, 열람률 1.5배, 운영 시간 1/10 | 타기팅·발송 구조·운영 자동화 | 제품 성장 · 대규모 운영 · 데이터 기반 개선 | 대규모 제품의 활성화 지표와 운영 효율을 함께 개선 | 수치는 충분. Hero에서는 `수신율`을 푸시 수신율로 명시해 범위 확대 방지. 기준 기간·대시보드는 추가 보강 가능 |
| Selectstar STT 운영 | 검증됨 | 수작업 음성 전사 운영 | 많은 인력과 반복 작업 | STT 전환·전후처리 기준·약 200명 품질 운영 체계 | 맨먼스 약 1/10, 운영 원가 70%+ 절감 | STT·Python·운영 설계 | 운영 개선 · 원가 개선 | 복잡한 운영 구조를 정량적으로 개선 | 강한 수치이나 제품 성장보다 운영 효율 증거에 가까워 기존 세 번째 지표 유지 |
| Archi 실사용 베타 | 검증됨 | 1인 제품의 초기 실사용 검증 | 운동 강사의 반복 기록 문제 | 제품 기획·개발·사업·운영, 피드백 기반 기능 선택 | 베타 참여자 6명·제품 범위 조정 | Codex·Supabase·실사용 피드백 | 0→1 · 실사용 검증 | 현재 제품에서 다음 결정을 만드는 증거 | 사용자가 비-Archi 지표를 요청했으므로 Hero 첫 지표에서는 제외. 상세 프로젝트와 Hero 문장에는 유지 |

| 요청 핵심 역량 | 매칭 경험 | 근거 강도 | 선택 이유 | 노출 위치 | Gap |
|---|---|---|---|---|---|
| 비-Archi 제품 성장 결과 | SK Planet Syrup Wallet | 강함 | 푸시 수신율 2배는 기능 개선 행동과 직접 연결된 활성화 결과 | Hero 첫 지표 | 기준 기간·원시 대시보드는 향후 보강 가능 |
| 대규모 제품 운영 | SK Planet Syrup Wallet | 강함 | 약 350만 MAU 서비스 규모가 같은 프로젝트에 연결 | Hero 두 번째 지표 | 없음 |
| 운영 효율 개선 | Selectstar STT | 강함 | 운영 원가 70%+ 절감이 별도 프로젝트의 검증 결과 | Hero 세 번째 지표 | 운영 원가 범위 유지 필요 |

#### 3단계 — Hero 콘텐츠 설계

기존 역할 라벨·헤드라인·두 문장 서브카피·키워드·CTA는 유지하고, 사용자 지정 대상인 첫 성과 지표만 서로 다른 검증 결과로 비교했다.

| 안 | 헤드라인 1줄 | 서브카피 최대 2줄 | 강조 키워드 3개 | 연결 역량 | 연결 검증 경험 |
|---|---|---|---|---|---|
| 1 (채택) | `고객의 문제를 제품으로 해결합니다.` | 기존 검증 문장 2개 유지 | `문제 정의` · `제품 우선순위` · `실사용 검증` | 제품 성장·활성화 개선 | SK Planet `푸시 수신율 2배` |
| 2 | `고객의 문제를 제품으로 해결합니다.` | 기존 검증 문장 2개 유지 | `문제 정의` · `제품 우선순위` · `실사용 검증` | 사용자 반응 개선 | SK Planet `푸시 열람률 1.5배` |
| 3 | `고객의 문제를 제품으로 해결합니다.` | 기존 검증 문장 2개 유지 | `문제 정의` · `제품 우선순위` · `실사용 검증` | 제품 운영 효율 | SK Planet `운영 시간 1/10` |

| 안 | 요청 적합도 | 근거 강도 | 5초 명확성 | 전문성·비광고성 | 판단 |
|---|---|---|---|---|---|
| 1 | 높음 | 강함 | `2배`가 즉시 읽힘 | 구체적인 지표명으로 과장 범위 제한 | 채택 |
| 2 | 높음 | 강함 | 명확 | `1.5배`는 1안보다 시각적 임팩트가 낮음 | 보류 |
| 3 | 보통 | 강함 | 명확 | 성장보다 운영 효율 신호가 강함 | 제외 |

- 최종 선택안: `2배 / 푸시 수신율 개선`
- 선택 이유: Archi가 아닌 350만 MAU 제품에서 본인이 기획한 타기팅 개선과 직접 연결되고, 채용 담당자가 5초 안에 제품 지표 개선 결과를 이해할 수 있다.
- 보강 필요 메모: 공개 가능한 기준 기간·전후 대시보드를 확보하면 프로젝트 카드에 추가한다. 확보 전에는 `푸시 수신율 2배` 이상으로 의미를 확대하지 않는다.

#### 4단계 — 웹사이트 적용 계획

| 필드 | 최종 입력값 | 근거 | 적용 위치 |
|---|---|---|---|
| 역할 라벨 | `AI Product Manager` 유지 | 기존 사용자 확인 | Hero |
| 헤드라인 | `고객의 문제를 제품으로 해결합니다.` 유지 | 기존 사용자 승인 | Hero |
| 서브카피 1·2 | 기존 문장 유지 | 기존 검증 사실 | Hero |
| 강조 키워드 | `문제 정의` · `제품 우선순위` · `실사용 검증` 유지 | 기존 PM 서사 | Hero |
| CTA | `프로젝트 보기` 유지 | 기존 동작 | Hero |
| 검증된 성과 지표 | `2배 / 푸시 수신율 개선`, `350만 / MAU 제품 운영`, `70%+ / 운영 원가 절감` | SK Planet·Selectstar 검증 경력 | Hero 지표 3개 |

- 기본 `/`을 사용자가 직접 지정했으므로 공통 Hero를 base revision 20으로 갱신한다.
- 회사별 publication 구조·Supabase 데이터·route는 변경하지 않는다.
- Archi의 `6명`은 Hero 두 번째 문장과 첫 프로젝트 상세에 유지해 현재 제품 검증 사실을 삭제하지 않는다.
- `src/types/portfolio.ts`와 회귀 테스트만 최소 수정하고 반응형 카드 구조는 보존한다.

#### 1차 진단 — 수정 전

실제 라이브 base revision 19를 같은 브라우저에서 전체 페이지 위→아래로 스크롤하며 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `390 / 390` | `768 / 768` | `1440 / 1440` |
| 문서 높이 | `9,819px` | `8,680px` | `6,625px` |
| 현재 첫 지표 카드 | `6명 / Archi 베타`, 109×76px | `6명 / Archi 베타`, 213×126px | `6명 / Archi 베타`, 331×126px |
| 실제 텍스트 오버플로 | 0건 | 0건 | 0건 |
| 공개 이미지 | 0개 | 0개 | 0개 |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE20-001 | Hero 첫 지표 | `6명 / Archi 베타`가 초기 검증 규모를 보여 주지만 다른 제품의 성장 결과가 아님 | 채용 담당자가 대규모 제품에서 만든 성장·활성화 성과를 첫 화면에서 확인할 수 없음 | 높음 | SK Planet의 `2배 / 푸시 수신율 개선`으로 교체 | 발견 |
| QA-BASE20-002 | 사실 귀속 | `2배`만 단독 노출하면 Archi 또는 일반 제품 성장률로 오해할 수 있음 | 성과 범위가 확대돼 신뢰 저하 가능 | 차단 | 라벨에 `푸시 수신율`을 명시하고 상세 SK Planet 근거·테스트와 연결 | 발견 |
| QA-BASE20-003 | 반응형 | 현재 3개 카드는 세 너비에서 오버플로가 없지만 새 라벨은 모바일에서 아직 미검증 | 390px에서 라벨 줄바꿈·카드 높이 불균형 가능 | 보통 | 기존 grid를 유지하고 동일 세 너비에서 카드 client/scroll 크기 직접 재검사 | 발견 |

1차 진단 요약:

- 세 너비 전체 페이지에 가로 스크롤, 텍스트 잘림, console warning/error는 없다.
- 첫 지표의 정보 선택이 사용자 요청과 불일치하는 것이 이번 변경의 핵심 문제다.
- 수정 후 동일한 390·768·1440px에서 Hero 카드, 전체 페이지, CTA, 챗봇·분석 동의 배너, 보호 route를 다시 검사한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 콘텐츠 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE20-001 | `src/types/portfolio.ts` | Hero 첫 지표를 `6명 / Archi 베타`에서 `2배 / 푸시 수신율 개선`으로 교체 | 검증된 SK Planet 성과로 교체 | 통과 |
| QA-BASE20-002 | `src/test/portfolio.test.ts` | Hero 첫 지표가 SK Planet 프로젝트 metric `수신율 2배`와 경력 achievement `유효 토큰 타기팅으로 푸시 수신율 2배 향상`에 동시에 연결되는 회귀 테스트 추가 | 사실 귀속 명시 | 통과 |
| QA-BASE20-003 | 기존 `src/components/Hero.tsx` 유지 | 검증된 기존 3열 grid·카드 타이포를 변경하지 않고 새 카피만 주입 | 레이아웃·기능 변경 없음 | 세 너비 통과 |
| 문서화 | `deploy.md` | 4단계 분석, 수정 전 진단, 수정·재검사·배포 후 점검을 base revision 20 기록으로 추가 | 공개 페이지 사실 변경 없음 | 완료 |

- Hero의 두 번째 문장과 Archi 첫 프로젝트의 `베타 참여자 6명`은 그대로 유지했다.
- 회사별 publication, Supabase, EmailJS, Typebot, GA, 라우팅, 의존성은 변경하지 않았다.

#### 동일 조건 재검사

최종 production build를 수정 전과 같은 Codex In-app Browser 조건에서 전체 페이지 위→아래로 스크롤하며 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `390 / 390` | `768 / 768` | `1440 / 1440` |
| 문서 높이 | `9,819px` | `8,680px` | `6,625px` |
| 첫 지표 카드 | `2배 / 푸시 수신율 개선`, 109×76px | `2배 / 푸시 수신율 개선`, 213×126px | `2배 / 푸시 수신율 개선`, 331×126px |
| 첫 지표 label client / scroll | `91 / 91px` | `163 / 163px` | `281 / 281px` |
| 실제 텍스트 오버플로 | 0건 | 0건 | 0건 |
| 전체 가로 오버플로 | 0 | 0 | 0 |

- 세 지표는 모든 너비에서 같은 높이를 유지했다. `2배`, `350만`, `70%+` 값과 각 라벨의 `scrollWidth === clientWidth`를 확인했다.
- Hero의 `Archi 베타` 지표 문구는 0건이고 새 `푸시 수신율 개선`이 표시된다. Hero 두 번째 문장과 Archi 프로젝트 상세의 `베타 참여자 6명`은 유지된다.
- Hero `프로젝트 보기` CTA를 클릭하면 부드러운 스크롤 완료 후 `#case-studies` 상단이 80px에 정렬된다.
- `/p/not-real-slug` 직접 로드·새로고침은 `유효하지 않은 링크입니다`, `noindex, nofollow`, Typebot host 0, 가로 오버플로 0이다.
- `/admin/links`는 관리자 로그인 화면, `noindex, nofollow`, 390px 가로 오버플로 0이다.
- 로컬 production preview console warning/error는 0건이다.
- 프로덕션 빌드: Vite 6.4.3 성공. main `128.86KiB gzip`, CSS `13.94KiB gzip`, Typebot lazy chunk `199.27KiB gzip`. 기존 500kB 초과 chunk 경고만 유지된다.
- 테스트·정적 검사: Vitest `32/32`, ESLint 오류 `0`·기존 UI scaffold Fast Refresh 경고 `7`, `git diff --check` 통과.
- `pnpm audit --prod`: 알려진 취약점 0건.
- 미해결 문제: 배포 차단 없음. 공개 가능한 기준 기간·전후 대시보드가 제공되면 SK Planet 프로젝트의 시각 증거를 보강할 수 있다.
- 배포 가능 여부: `가능`.

#### 배포 후 실제 URL 점검

- 배포 커밋: `215532a18440726d5afee7bd25ac0fdbca86dd96` (`Prioritize verified product growth metric`).
- GitHub Actions: `Deploy Portfolio to GitHub Pages` run `#28`, ID `31925638110`의 `build`·`deploy` job이 모두 성공했다 — `https://github.com/gmbro/portfolio/actions/runs/31925638110`.
- 라이브 asset: `index-Bku4G9Rk.js`, `index-BKkcAryA.css`. 공개 Hero에서 `2배 / 푸시 수신율 개선`을 확인했고 `6명 / Archi 베타` 지표 문구는 제거됐다. Hero 설명과 Archi 프로젝트의 `베타 참여자 6명`은 유지됐다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `9,945px` | `8,728px` | `6,625px` |
| 첫 지표 카드 | `2배 / 푸시 수신율 개선`, 104×76px | `2배 / 푸시 수신율 개선`, 208×126px | `2배 / 푸시 수신율 개선`, 331×126px |
| 첫 지표 label client / scroll | `86 / 86px` | `158 / 158px` | `281 / 281px` |
| 실제 텍스트·가로 오버플로 | `0 / 0` | `0 / 0` | `0 / 0` |

- 세 너비에서 전체 페이지를 위에서 아래까지 스크롤해 새 지표의 표시·카드 높이·라벨 폭을 확인했다. 브라우저의 15px 세로 스크롤바를 제외한 실제 콘텐츠 폭에서 `scrollWidth === clientWidth`다.
- 390px에서 Hero `프로젝트 보기` CTA를 실행한 뒤 `#case-studies` 상단이 80px에 정렬됐다.
- `/p/not-real-slug` 직접 로드·새로고침은 `유효하지 않은 링크입니다`, `noindex, nofollow`, Typebot host 0, Google script 0, `390 / 390`으로 통과했다.
- `/admin/links`는 관리자 로그인 화면, `noindex, nofollow`, Typebot host 0, Google script 0, `390 / 390`으로 통과했다.
- 실제 URL의 console warning/error는 0건이다.
- 최종 publication: 기본 공개 포트폴리오 base revision 20. 회사별 publication 신규 생성 없음. 기본 `/`은 indexable이고 관리자·무효 맞춤 링크는 noindex를 유지한다.
- 배포 결과: `성공`.

---

### 2026-08-16 / PM 제너럴리스트 프로젝트 신호·분석 배너 제거 / base revision 21

- 작업 대상 URL: `/`
- 제외 URL: 유효한 `/p/:slug`, `/admin/links`, 무효 `/p/:slug`, 임의 404
- 수정 전 라이브 URL: `https://archilab.ai.kr/`
- 배포 예정 URL: `https://archilab.ai.kr/`
- 대상 revision: 기본 포트폴리오 base revision 21
- 검사 브라우저: Codex In-app Browser
- 검사 담당: Codex
- 평가 기준: `푸시 수신율 2배 대신 프로젝트 경험 횟수`, `GenON을 포함한 PM 제너럴리스트의 폭`, `방문 분석 설정 배너 비노출`

#### 1단계 — 요청·채용 신호 분석

| 우선순위 | 핵심 역량 | 요청 근거 | 숨은 의도 해석 | 포트폴리오 키워드 | 필요한 증거 | 신뢰도 |
|---:|---|---|---|---|---|---|
| 1 | 다양한 PM 프로젝트 경험 | 프로젝트 경험을 횟수로 표시 | 한 제품의 단일 성과보다 여러 문제·산업을 다룬 폭을 먼저 확인 | 대표 프로젝트 · 제품 0→1 | 공개 CAR 프로젝트의 재현 가능한 개수 | 높음 |
| 2 | 프로젝트 실행·운영 개선 | GenON 경험도 프로젝트라고 명시 | 제품 기획뿐 아니라 제안·산출물·이해관계자·운영을 연결한 경험을 평가 | 프로젝트 실행 · 운영 개선 | GenON Vision AI, Selectstar, SK Planet | 높음 |
| 3 | PM 제너럴리스트 | 전체적으로 잘 보여야 함 | 제품·데이터·운영·사업화 사이를 연결하는 역할 범위를 5초 안에 확인 | 운영·사업화 · B2B·B2G | About·프로젝트·경력의 일관된 범위 | 높음 |

핵심 Pain Point:

- Hero 첫 지표 `2배 / 푸시 수신율 개선`은 강한 정량 성과지만 SK Planet 한 사례에 시선이 몰려 전체 PM 경험의 폭을 대표하지 못한다.
- 공개 첫 방문에서 분석 동의 배너가 390px 기준 351×282px로 화면 하단을 크게 점유해 Hero와 다음 콘텐츠 탐색을 방해한다.
- GenON의 CSAP·나라장터·자동화 업무를 각각 독립 프로젝트로 셀 기준은 저장소에 없으므로 총 프로젝트 수로 임의 합산하지 않는다.

우선순위 키워드:

| 키워드 | 우선순위 | 반복 위치 | 사용 조건 |
|---|---:|---|---|
| 대표 프로젝트 5개 | 1 | Hero 지표, 프로젝트 카드 | 공개 CAR 카드 5개만 집계 |
| 프로젝트 실행 | 2 | Hero 키워드, GenON 프로젝트 | 제안·산출물·이해관계자 관리 근거와 연결 |
| 운영·사업화 | 3 | Hero·About·Experience | SK Planet·Selectstar·GenON·Arkylab 근거 범위에서 사용 |

#### 2단계 — 역량 구조화·증거 매칭

| 경험명 | 출처 등급 | 맥락 | Challenge | Action | Result | 도구·방식 | 역량 태그 | 한 줄 포지셔닝 | 보강 필요 메모 |
|---|---|---|---|---|---|---|---|---|---|
| Archi | 검증됨 | 1인 AI 제품·실사용 베타 | 운동 기록·회원 관리 문제 | 기획·개발·사업·운영, 피드백 기반 범위 결정 | 참여자 6명 베타·제품 학습 | Codex·Supabase | 제품 0→1 · 실사용 · 사업 | 문제에서 제품과 운영까지 직접 연결 | 초기 베타이므로 성장 총량으로 확대 금지 |
| GenON Vision AI | 검증됨 | NIPA 지원 사업, 7개월 | 수작업 품질 검사 개선 | 제안·산출물·고객 피드백·3자 조율 | PoC 종결·정산 지원 | Vision AI·문서·조율 | 프로젝트 관리 · B2B/B2G | 제안부터 종결까지 관리한 프로젝트 | GenON의 다른 업무를 독립 프로젝트 수로 임의 합산 금지 |
| Selectstar STT | 검증됨 | AI 데이터 운영 병목 | 반복 수작업·높은 원가 | STT·Python·약 200명 운영 체계 | 맨먼스 약 1/10·원가 70%+ 절감 | STT·Python | 데이터 · 운영 · 개선 | 기술과 운영 구조를 함께 바꾼 사례 | 수치는 STT 운영 범위로 한정 |
| Skelter Labs AI 상담사 | 검증됨 | B2B 엔진의 B2C 확장 | 사용자 경험 정의 | PRD·대화·제휴 설계 | 0→1 PoC | STT·TTS·Retrieval | 제품 0→1 · 제휴 | AI 기술을 사용자 제품으로 전환 | 공개 가능한 화면은 추가 보강 가능 |
| SK Planet Syrup Wallet | 검증됨 | 약 350만 MAU 제품 | 푸시·서버·운영 병목 | 타기팅·분산 발송·리타기팅 | 수신율·열람률·운영 시간 개선 | B2C 운영 | 대규모 제품 · 성장 · 운영 | 규모 있는 제품의 기능과 운영 개선 | Hero 첫 지표에서는 제외하되 프로젝트 근거 유지 |

| 요청 핵심 역량 | 매칭 경험 | 근거 강도 | 선택 이유 | 노출 위치 | Gap |
|---|---|---|---|---|---|
| 프로젝트 경험의 폭 | 공개 CAR 프로젝트 5개 | 강함 | 코드·테스트·실제 카드 수가 모두 5개 | Hero 첫 지표 | 전체 경력의 총 프로젝트 수가 아니라 공개 대표 사례 수 |
| GenON 프로젝트 실행 | Vision AI PoC, GenON 경력 | 강함 | 프로젝트 카드와 경력에서 수행 회사·역할을 확인 가능 | 프로젝트 2번·Experience | 다른 GenON 업무별 프로젝트 경계는 확인 필요 |
| PM 제너럴리스트 | 5개 프로젝트·7개 경력 | 강함 | 제품 0→1, 데이터, 운영, 프로젝트, 사업화가 서로 다른 근거로 연결 | Hero·About·Projects·Experience | 없음 |

#### 3단계 — Hero 콘텐츠 설계

| 안 | 헤드라인 1줄 | 서브카피 최대 2줄 | 강조 키워드 3개 | 연결 역량 | 연결 검증 경험 |
|---|---|---|---|---|---|
| 1 (채택) | `고객의 문제를 제품으로 해결합니다.` | `AI 제품 0→1, 350만 MAU 운영, 데이터 프로젝트와 B2B·B2G 사업화까지 제품과 프로젝트 전 과정을 경험했습니다.`<br>`현재는 Archi(아키)를 1인으로 기획·개발·사업·운영하며, 6명의 베타 참여자 피드백으로 다음 결정을 내립니다.` | `제품 0→1` · `프로젝트 실행` · `운영·사업화` | PM 제너럴리스트 | 대표 프로젝트 5개·경력 7개 |
| 2 | `제품의 시작부터 운영까지 연결합니다.` | 대규모 제품 운영과 AI 0→1, 데이터 운영 개선을 전면 배치<br>현재 Archi 실사용 학습 유지 | `문제 정의` · `제품 우선순위` · `운영 개선` | 제품 생애주기 | Archi·Selectstar·SK Planet |
| 3 | `복잡한 프로젝트를 실행 가능한 제품과 결과로 연결합니다.` | GenON 제안·조율과 AI·데이터 프로젝트를 전면 배치<br>B2B·B2G 사업화 경험 연결 | `프로젝트 관리` · `이해관계자 조율` · `사업화` | 프로젝트 PM | GenON·Skelter Labs·Arkylab |

| 안 | 요청 적합도 | 근거 강도 | 5초 명확성 | 전문성·비광고성 | 판단 |
|---|---|---|---|---|---|
| 1 | 높음 | 강함 | 경험 폭과 현재 역할을 함께 확인 | 검증 범위가 구체적 | 채택 |
| 2 | 보통 | 강함 | 제품 생애주기는 명확 | GenON·사업화 폭이 약함 | 보류 |
| 3 | 높음 | 강함 | 프로젝트 PM 신호가 선명 | AI Product Manager보다 프로젝트 역할로 좁아질 수 있음 | 보류 |

- 최종 선택안: 기존 헤드라인을 유지하고 첫 서브카피·키워드·첫 지표만 제너럴리스트 관점으로 교체한다.
- 첫 지표: `5개 / 대표 프로젝트`.
- 선택 이유: 현재 공개 프로젝트 `Archi → GenON → Selectstar → Skelter Labs → SK Planet` 5개와 정확히 일치하며, 경험 폭·제품 규모·운영 성과를 `5개 · 350만 · 70%+`로 균형 있게 보여 준다.
- 제외: 과거 타인 템플릿의 `12개`와 프로젝트 경계가 없는 GenON 업무 합산은 사용하지 않는다.

#### 4단계 — 웹사이트 적용 계획

| 필드 | 최종 입력값 | 근거 | 적용 위치 |
|---|---|---|---|
| 역할 라벨 | `AI Product Manager · 7년 경력` 유지 | 사용자 확인 | Hero |
| 헤드라인 | `고객의 문제를 제품으로 해결합니다.` 유지 | 기존 승인 | Hero |
| 서브카피 1 | `AI 제품 0→1, 350만 MAU 운영, 데이터 프로젝트와 B2B·B2G 사업화까지 제품과 프로젝트 전 과정을 경험했습니다.` | 공개 경력 7개 | Hero |
| 서브카피 2 | 현재 Archi 1인 운영·6명 피드백 문장 유지·압축 | 사용자 확인 | Hero |
| 강조 키워드 | `제품 0→1` · `프로젝트 실행` · `운영·사업화` | 5개 프로젝트·GenON 경력 | Hero |
| 성과 지표 | `5개 / 대표 프로젝트`, `350만 / MAU 제품 운영`, `70%+ / 운영 원가 절감` | 공개 프로젝트 수·검증 성과 | Hero |
| 분석 UI | 공개 `/`의 analytics 기본값을 비활성화해 배너·Footer 설정 버튼·GA 전송을 모두 중지 | 사용자 요청·privacy-safe 기본값 | Index·analytics 문서·테스트 |

- 기본 `/`만 base revision 21로 갱신한다. 회사별 publication·Supabase·EmailJS·Typebot·route는 변경하지 않는다.
- 분석 코드는 향후 명시적 재활성화를 위해 보존하되 기본 공개 페이지에서는 마운트·전송하지 않는다.

#### 1차 진단 — 수정 전

실제 라이브 base revision 20을 분석 미선택 첫 방문 상태로 두고 같은 브라우저에서 전체 페이지 위→아래로 검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `9,945px` | `8,728px` | `6,625px` |
| 첫 지표 | `2배 / 푸시 수신율 개선` | 동일 | 동일 |
| 분석 배너 | 351×282px | 705×210px | 768×210px |
| 방문 분석 설정 버튼 | 1개 | 1개 | 1개 |
| 공개 프로젝트 카드 | 5개 | 5개 | 5개 |
| GenON·B2B/B2G 근거 | 표시 | 표시 | 표시 |
| 텍스트·가로 오버플로 | `0 / 0` | `0 / 0` | `0 / 0` |

| ID | 범위 | 발견한 문제 | 사용자 영향 | 심각도 | 수정 방향 | 상태 |
|---|---|---|---|---|---|---|
| QA-BASE21-001 | Hero 첫 지표 | SK Planet 푸시 수신율 한 사례가 첫 수치 | PM 경험의 폭보다 특정 기능 성과로 먼저 인식 | 높음 | 공개 CAR 프로젝트 수와 일치하는 `5개 / 대표 프로젝트`로 교체 | 발견 |
| QA-BASE21-002 | Hero 서사 | 첫 문장에 대규모 제품·AI·STT는 있으나 GenON B2B/B2G 사업화가 없음 | 제너럴리스트의 제품·프로젝트·사업 범위가 첫 화면에서 약함 | 높음 | 첫 서브카피와 키워드를 전체 경력 범위로 재작성 | 발견 |
| QA-BASE21-003 | 분석 UI | 첫 방문에 고정 배너와 Footer 설정 버튼 표시 | 390px에서 282px 높이로 콘텐츠 탐색 방해 | 차단 | 공개 기본 analytics를 비활성화하고 UI·Google 전송 모두 0으로 유지 | 발견 |
| QA-BASE21-004 | 반응형 | 현재 오버플로는 없지만 새 카피·라벨은 미검증 | 모바일 줄바꿈·카드 높이 회귀 가능 | 보통 | 같은 세 너비와 관련 route를 재검사 | 발견 |

- 수정 전 console warning/error는 0건, 미선택 상태 Google script는 0개다.
- 수정 방향을 기록했으며 이제 Hero·분석 기본값·관련 테스트·`analytics.md`만 최소 수정한다.

#### 직접 수정

| ID | 수정 파일 | 실제 수정 내용 | 사실 변경 여부 | 결과 |
|---|---|---|---|---|
| QA-BASE21-001 | `src/types/portfolio.ts`, `src/test/portfolio.test.ts` | 첫 지표를 `5개 / 대표 프로젝트`로 교체하고 공개 `portfolioProjects` 5개 및 GenON 포함을 회귀 테스트로 고정 | 공개 CAR 프로젝트 수와 일치 | 통과 |
| QA-BASE21-002 | `src/types/portfolio.ts`, `src/test/portfolio.test.ts` | 첫 서브카피를 AI 0→1·350만 MAU·데이터 프로젝트·B2B/B2G 사업화 범위로 재작성하고 키워드를 `제품 0→1 · 프로젝트 실행 · 운영·사업화`로 교체 | 기존 경력 근거만 재배치 | 통과 |
| QA-BASE21-003 | `src/pages/Index.tsx`, `src/test/analytics.test.tsx`, `analytics.md` | 공개 기본 analytics를 `false`로 바꿔 배너·Footer 설정·Google 태그를 기본 비활성화하고 회귀 테스트·운영 문서를 갱신 | 분석 수집을 중지하는 기능 변경 | 통과 |
| QA-BASE21-004 | 기존 Hero·About·Projects·Experience 구조 유지 | 레이아웃은 바꾸지 않고 콘텐츠와 분석 기본값만 최소 수정 | 없음 | 세 너비 재검사 통과 |

- `portfolioProjects`의 순서는 Archi, GenON, Selectstar, Skelter Labs, SK Planet으로 유지했다.
- `350만 MAU`, `운영 원가 70%+ 절감`, Archi 참여자 6명은 기존 범위와 위치를 유지했다.
- 회사별 publication, Supabase, EmailJS, Typebot, 문의 폼 개인정보 동의, route는 변경하지 않았다.

#### 동일 조건 재검사

최종 production build를 수정 전과 같은 브라우저 조건에서 전체 페이지 위→아래로 재검사했다.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `9,917px` | `8,700px` | `6,597px` |
| 첫 지표 카드 | `5개 / 대표 프로젝트`, 104×76px | `5개 / 대표 프로젝트`, 208×126px | `5개 / 대표 프로젝트`, 331×126px |
| 첫 지표 label client / scroll | `86 / 86px` | `158 / 158px` | `281 / 281px` |
| 분석 배너 / Footer 설정 / Google script | `0 / 0 / 0` | `0 / 0 / 0` | `0 / 0 / 0` |
| 공개 프로젝트 / GenON 근거 | `5개 / 표시` | `5개 / 표시` | `5개 / 표시` |
| 텍스트·가로 오버플로 | `0 / 0` | `0 / 0` | `0 / 0` |

- Hero에서 `AI 제품 0→1`, `350만 MAU 운영`, `데이터 프로젝트`, `B2B·B2G 사업화`, `제품 0→1 · 프로젝트 실행 · 운영·사업화`를 확인했다.
- 390px `프로젝트 보기` CTA 완료 후 `#case-studies` 상단은 80px에 정렬됐다.
- `/p/not-real-slug` 직접 로드·새로고침은 유효하지 않은 링크, `noindex, nofollow`, Typebot 0, 배너 0, Google script 0, `390 / 390`으로 통과했다.
- `/admin/links`는 로그인 화면, `noindex, nofollow`, 배너 0, Google script 0, `390 / 390`으로 통과했다.
- production preview console warning/error는 0건이다.
- Vitest `33/33`, 변경 파일 ESLint 오류·경고 0, 전체 ESLint 오류 0·기존 Fast Refresh 경고 7, Vite 6.4.3 production build 성공. main `128.84KiB gzip`, CSS `13.94KiB gzip`, Typebot lazy `199.27KiB gzip`이다.
- 기존 외부 `virtual-store-dir`에서는 React 선언 경로가 프로젝트 밖에서 해석돼 변경하지 않은 `src/components/ui/chart.tsx`, `input-otp.tsx` 오류가 재현됐다. 같은 lock·현재 소스를 프로젝트 내부 기본 virtual store에 클린 설치한 결과 pnpm 11.16.0·11.19.0과 TypeScript 5.9.3에서 `tsc --noEmit -p tsconfig.app.json`이 모두 통과했다. GitHub Actions도 같은 내부 구조를 사용한다.
- 현재 배포 가능 여부: `가능` — 코드·콘텐츠·privacy·반응형·CI 조건 차단 없음.

#### 배포 후 실제 URL 점검

- 배포 커밋: `8a33030b00b17e9f8cf998d14b25757a77d8a558` (`Show PM project breadth and disable analytics prompt`).
- GitHub Actions: `Deploy Portfolio to GitHub Pages` run `#29`, ID `31927080053`의 품질 검사·build·deploy가 모두 성공했다 — `https://github.com/gmbro/portfolio/actions/runs/31927080053`.
- 실제 공개 URL: `https://archilab.ai.kr/`.
- 라이브 asset: `index-CL2WLLPN.js`, `index-BKkcAryA.css`.

| 항목 | 390×844 | 768×900 | 1440×900 |
|---|---:|---:|---:|
| clientWidth / scrollWidth | `375 / 375` | `753 / 753` | `1425 / 1425` |
| 문서 높이 | `9,917px` | `8,700px` | `6,597px` |
| 첫 지표 카드 | `5개 / 대표 프로젝트`, 104×76px | `5개 / 대표 프로젝트`, 208×126px | `5개 / 대표 프로젝트`, 331×126px |
| 첫 지표 label client / scroll | `86 / 86px` | `158 / 158px` | `281 / 281px` |
| 분석 배너 / Footer 설정 / Google script | `0 / 0 / 0` | `0 / 0 / 0` | `0 / 0 / 0` |
| 공개 프로젝트 / GenON 근거 | `5개 / 표시` | `5개 / 표시` | `5개 / 표시` |

- 세 너비 모두 Hero의 AI 제품 0→1·350만 MAU·데이터 프로젝트·B2B·B2G 사업화 문장과 `제품 0→1 · 프로젝트 실행 · 운영·사업화` 키워드를 표시하고, 가로 오버플로는 0건이다.
- 390px에서 `프로젝트 보기` CTA 실행 후 `#case-studies` 상단은 80px에 정렬됐다.
- `/p/not-real-slug` 직접 로드·새로고침은 `유효하지 않은 링크입니다`, `noindex, nofollow`, Typebot 0, 분석 배너 0, Google script 0, `390 / 390`으로 통과했다.
- `/admin/links`는 관리자 로그인 화면, `noindex, nofollow`, Typebot 0, 분석 배너 0, Google script 0, `390 / 390`으로 통과했다.
- 라이브 기본·보호 경로의 console warning/error는 0건이다.
- 최종 publication: 기본 공개 포트폴리오 base revision 21. 회사별 publication 신규 생성 없음. 기본 `/`은 indexable이고 관리자·무효 맞춤 링크는 noindex를 유지한다.
- 배포 결과: `성공`.
