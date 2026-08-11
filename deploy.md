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
