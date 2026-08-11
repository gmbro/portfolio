# 데이터와 링크 관리

회사별 포트폴리오를 Supabase에 저장하고 링크를 발행할 때 적용한다.

## 데이터 모델

하나의 긴 JSON 레코드에 모든 정보를 덮어쓰지 않는다. 비공개 작업 데이터와 공개 페이지 데이터를 분리한다.

### `career_evidence`

여러 JD에서 재사용하는 검증 경력 원본이다.

- `id`: UUID
- `title`, `context`, `challenge`, `action`, `result`, `tools`
- `metrics`: 검증된 수치 JSON
- `evidence_status`: `verified`, `needs_review`, `blocked`
- `source_note`, `is_public_safe`

### `applications`

회사·직무·JD 한 건당 한 행을 만든다. 내부 작업용이며 공개하지 않는다.

- `id`: UUID
- `company_name`, `role_title`
- `jd_source_url`, `jd_text`
- `jd_analysis`: Step 1 결과 JSON
- `status`: `draft`, `review`, `published`, `archived`
- `created_at`, `updated_at`

### `portfolio_revisions`

수정 요청마다 덮어쓰지 않고 새 행을 추가하는 불변 스냅샷이다.

- `id`, `application_id`
- `revision_no`: 지원 건 안에서 1부터 증가
- `competency_structure`: Step 2 결과 JSON
- `hero_options`, `selected_hero`: Step 3 결과 JSON
- `page_content`: Step 4 전체 페이지 JSON
- `change_summary`, `created_at`

`unique(application_id, revision_no)`를 적용한다.

### `portfolio_publications`

브라우저가 읽을 수 있는 공개 안전 데이터만 둔다. 내부 JD 원문과 분석표를 넣지 않는다.

- `id`, `application_id`, `current_revision_id`
- `slug`: 고유하고 추측하기 어려운 문자열
- `published_content`: 현재 공개할 페이지 JSON
- `status`: `draft`, `published`, `paused`, `archived`
- `noindex`: 기본 `true`
- `published_at`, `expires_at`, `updated_at`

선택적으로 `portfolio_view_events`에 publication ID, 시각, 익명화된 referrer 정도만 기록한다. 원시 IP나 불필요한 개인정보는 저장하지 않는다.

## 링크 규칙

- 기본 포트폴리오는 `/`로 보존한다.
- 회사별 링크는 `/p/{company-role}-{random}` 형식을 사용한다. 예: `/p/acme-pm-k7m4q2`.
- 순번이나 DB UUID를 그대로 URL에 노출하지 않는다.
- 새 회사 또는 새 JD는 새 `application`과 새 `publication`을 만든다.
- 같은 지원 건의 문구 수정은 `revision_no + 1`로 저장하고 `current_revision_id`만 바꾼다. URL은 유지한다.
- 사용자가 별도 A/B 링크를 원할 때만 같은 application 아래 publication을 하나 더 만든다.
- slug는 발행 후 바꾸지 않는다. 링크를 중단할 때는 삭제보다 `paused` 또는 `archived`를 사용한다.
- 만료가 필요한 링크는 `expires_at`을 설정하고 만료 페이지를 보여준다.

## 발행 트랜잭션

1. 새 revision을 저장한다.
2. 빌드와 화면 검증을 통과한다.
3. 공개 가능한 필드만 `published_content`에 복사한다.
4. publication의 `current_revision_id`와 `published_content`를 한 트랜잭션에서 갱신한다.
5. `/p/{slug}`를 직접 열어 revision과 콘텐츠를 확인한다.
6. 사용자에게 URL, revision 번호, 상태를 전달한다.

수정이 실패하면 기존 publication 포인터를 유지해 현재 링크가 깨지지 않게 한다.

## 접근 제어

- Supabase RLS를 모든 테이블에 활성화한다.
- 브라우저의 anon key는 `published` 상태이고 만료되지 않은 publication의 공개 필드만 읽을 수 있게 한다.
- 생성, 수정, 발행은 인증된 관리자 또는 서버 측 작업만 허용한다.
- service role key를 Vite 환경 변수나 브라우저 번들에 넣지 않는다.
- 관리자 화면을 만들면 Supabase Auth 뒤에 두고 단일 소유자 정책을 적용한다.

## 관리 화면 기준

지원 건 목록에서 회사, 직무, 상태, 현재 revision, 공개 링크, 최근 수정일을 보여준다. 기본 작업은 다음으로 제한한다.

- 미리보기
- 동일 링크에 새 revision 발행
- 링크 복사
- 일시 중지·재발행
- 보관

물리 삭제는 잘못 만든 테스트 데이터처럼 명확한 경우에만 수행한다.
