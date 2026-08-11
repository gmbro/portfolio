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
- EmailJS 실발송: SDK mock 전송과 GitHub Secrets 연결 통과. 실제 Pages URL에서 1회 전송 결과를 배포 후 확인한다.
- 미해결 문제: EmailJS 템플릿의 실제 Gmail 수신 여부는 성공 응답 후 사용자의 Gmail에서 최종 확인이 필요하다. Typebot 웹 컴포넌트 청크 약 696KB와 메인 청크 약 1.56MB는 후속 성능 최적화 대상으로 기록한다.
- 배포 가능 여부: `가능`

#### 배포 후 실제 URL 점검

| 항목 | 390px | 768px | 1440px |
|---|---|---|---|
| 실제 URL 로드 |  |  |  |
| 전체 콘텐츠·route 새로고침 |  |  |  |
| AI 프로젝트·링크 |  |  |  |
| 문의 폼·fallback |  |  |  |
| 콘솔·네트워크 |  |  |  |

- 최종 공개 URL:
- 발행 revision:
- EmailJS 상태:
- 배포 결과: `성공` / `롤백` / `중단`
- 남은 낮은 우선순위 항목:
