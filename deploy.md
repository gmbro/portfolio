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
