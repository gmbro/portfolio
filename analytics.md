# 포트폴리오 GA4 이벤트 설계

- 운영 상태(2026-08-22): 공개 `/`을 포함한 모든 경로에서 GA4를 기본 비활성화했으며 방문 분석 동의 UI도 표시하지 않는다. 아래 내용은 향후 명시적으로 분석을 재활성화할 때 적용할 보존 설계다.
- 측정 ID: `G-C8EPGBXDJE`
- 측정 범위: 공개 기본 포트폴리오 `/`만
- 제외 범위: `/p/*`, `/admin/links`, 404
- 개인정보 원칙: 이름, 이메일, 문의 내용, 회사명, JD, 회사별 slug, 챗봇 질문·답변, 전체 URL·referrer를 이벤트 파라미터로 보내지 않는다.
- 명명 원칙: 이벤트명과 파라미터명은 소문자 스네이크 케이스를 사용한다.

## 반드시 추적하는 핵심 이벤트 5개

| 우선순위 | 이벤트명 | 이벤트 정의 | 발생 조건 | 추천 파라미터 | 분석 시 해석 포인트 |
|---:|---|---|---|---|---|
| 1 | `page_view` | 공개 포트폴리오 방문 | 분석 허용 후 공개 `/`에서 세션당 1회 | `page_location=https://archilab.ai.kr/`, `page_title=이경민 \| AI Product Manager`, `page_referrer=""` | 포트폴리오의 실제 도달 규모. 새로고침·SPA 이중 집계를 만들지 않는다. |
| 2 | `select_content` | 아키 제품 데모에 관심을 보인 행동 | `아키 베타 보기`를 클릭할 때 세션당 1회 | `content_type=product_demo`, `content_id=archi` | 텍스트를 읽는 데서 실제 제품 확인으로 넘어간 비율을 본다. |
| 3 | `chat_open` | 경력·제품에 추가 질문하려는 행동 | Navbar의 얼굴 이미지가 있는 `이경민 AI`를 처음 열 때 세션당 1회 | `surface=navbar` | 포트폴리오만으로 해소되지 않은 질문 의도와 고관심 방문을 본다. 대화 본문은 수집하지 않는다. |
| 4 | `contact_start` | 문의 의사가 발생한 행동 | 문의 폼의 이름·이메일·문의 중 첫 유효 입력 시 세션당 1회 | `form_id=portfolio_contact` | 문의를 시작했지만 제출하지 않은 이탈을 `generate_lead`와 비교한다. 입력값은 보내지 않는다. |
| 5 | `generate_lead` | 실제 문의 전환 | EmailJS가 성공 응답한 직후 세션당 1회 | `lead_source=portfolio_contact` | 최종 채용·협업 문의 전환. GA4에서 핵심 이벤트로 지정한다. |

## 있으면 좋은 보조 이벤트 5개

아래 이벤트는 기본 연동 안정화 후 필요한 것만 단계적으로 추가한다. 자동 스크롤·이탈 클릭과 중복되지 않게 Enhanced Measurement 설정을 먼저 확인한다.

| 우선순위 | 이벤트명 | 이벤트 정의 | 발생 조건 | 추천 파라미터 | 분석 시 해석 포인트 |
|---:|---|---|---|---|---|
| 6 | `section_view` | 주요 서사를 실제로 읽은 범위 | allowlist 섹션이 50% 이상 2초 노출될 때 섹션별 세션당 1회 | `section_id=about\|case_studies\|experience\|contact` | 어느 구간에서 관심이 끊기는지, 프로젝트까지 도달하는지 본다. |
| 7 | `project_view` | 개별 프로젝트 증거를 실제로 본 행동 | allowlist 프로젝트 카드가 50% 이상 2초 노출될 때 카드별 세션당 1회 | `project_id=arkylab_ai_coach\|nipa_vision_ai_poc\|selectstar_stt_operations\|skelter_ai_counselor\|sk_planet_syrup_wallet` | 어떤 경력 증거가 채용 담당자의 관심을 얻는지 비교한다. |
| 8 | `navigation_click` | 상단 메뉴로 특정 섹션을 찾은 행동 | 메뉴 버튼 클릭 시 세션당 타깃별 1회 | `target_id=about\|case_studies\|experience\|contact` | 방문자가 먼저 찾는 정보와 현재 정보 구조의 우선순위가 맞는지 본다. |
| 9 | `chat_close` | 챗봇을 닫은 행동 | `chat_open` 이후 닫을 때 세션당 1회 | `surface=navbar` | 열기 대비 즉시 닫기 비율이 높으면 첫 응답·질문 유도 문구를 점검한다. |
| 10 | `contact_delivery_error` | 문의 전송이 완료되지 않은 상태 | EmailJS 실패 분류가 확정될 때 유형별 세션당 1회 | `error_type=rate_limited\|browser_blocked\|configuration\|delivery_failure` | 기술 문제 때문에 리드가 유실되는지 본다. 오류 원문과 입력값은 보내지 않는다. |

## GA4 관리 화면 설정

1. `generate_lead`만 핵심 이벤트로 지정한다.
2. Enhanced Measurement는 2026-08-15 관리 화면에서 전체 비활성화했다. 이 사이트는 고정 공개 URL의 `page_view`와 개인정보 없는 폼 이벤트만 직접 보낸다.
3. Google Signals, 광고 개인화, Ads 연결은 사용하지 않는다.
4. 데이터 보관 기간을 필요한 최소 기간으로 설정하고 이메일·URL query parameter 데이터 삭제 기능을 보조 방어층으로 켠다.
5. Realtime 또는 DebugView에서 `page_view → select_content/chat_open → contact_start → generate_lead` 퍼널을 확인한다.

## 경로·개인정보 경계

- 사용자가 분석을 허용해도 `/`을 벗어나는 즉시 태그를 비활성화하고 런타임 전송을 중지한다. 저장된 선택은 공개 루트에 다시 방문할 때만 적용한다.
- `/p/*`, `/admin/links`, 404에서는 동의 UI·Google script·이벤트를 시작하지 않는다.
- `page_location`, `page_title`, `page_referrer`는 모든 config·이벤트에서 공개 루트의 고정값만 사용한다. 실제 URL, query, hash, 회사별 slug와 유입 referrer는 전송하지 않는다.
