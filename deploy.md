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

배포 후 기록한다.
