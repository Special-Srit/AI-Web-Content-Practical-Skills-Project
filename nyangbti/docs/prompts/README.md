# 프롬프트 기록 — 발표 자료용

강사 지시 (3-2, 2026-08-05): **결과물을 도출하는 데 사용한 프롬프트를 발표에 포함해야
한다.** "여정맵 만들어줘" 수준으로는 발표가 불가능하고, "이런 여정맵을 만들기 위해
프롬프트에 이러이러한 내용을 썼다"의 형태로 제시해야 한다. 따라서 이 폴더의 파일들은
작업 부산물이 아니라 **제출·발표 대상 산출물**이다.

프롬프트에 반드시 들어가야 하는 4요소 (강사 지시):

1. 롤 부여
2. 만들려는 것
3. 앱의 목표
4. 수정·작업 대상 내용을 구체적으로

## 파일

| 파일 | 무엇을 만든 프롬프트인가 | 실행 |
| --- | --- | --- |
| `01-ia-structure-research-prompt.md` | `04-ia-structure-research.md` — IA 구조 연구 | Codex gpt-5.6-luna, effort high |
| `02-ia-research-review-prompt.md` | 위 연구의 검토 (결함 10건 발견, 전부 반영) | Codex gpt-5.6-sol, effort high |
| `04-design-review-prompt.md` | `04-design.md`의 검토 | Codex gpt-5.6-sol, effort high |
| `05-figma-wireframe-prompt.md` | 피그마 와이어프레임 제작 | Codex, 포그라운드 |
| `06-mobile-ui-library-research-prompt.md` | `07-mobile-ui-libraries-research.md` — 모바일 우선 UI 라이브러리 조사 | Codex gpt-5.6-luna, effort high |
| `07-design-system-review-prompt.md` | `06-design-system.md`와 `07`의 사실 검증 | Codex gpt-5.6-sol, effort high |
| `08-ui-mockup-generation-prompt.md` | 주요 화면 6장 고해상도 UI 목업 생성 (`nyangbti/assets/ui-mockup/`) | Codex imagegen 스킬 |
| `09-design-critique-prompt.md` | 위 목업 6장의 디자인 품질 검토("너무 단순함" 진단) | Codex gpt-5.6-sol, effort high |
| `10-design-polish-research-prompt.md` | elevation·아이콘·타이포·색상 표면화 근거 조사 → `06-design-system.md` §9 | Codex gpt-5.6-luna, effort high |
| `11-main-flow-build-prompt.md` | 오세진 주 경로 실제 코딩 — 스캐폴드·데이터 모델·채점·콘텐츠·컴포넌트 | Codex gpt-5.6-luna, effort high, `--write` |

`04-design.md` 자체는 `.claude/agents/ux-ui-designer.md` 역할 정의를 그대로 쓰는
서브에이전트가 작성했으므로, 그 프롬프트는 **역할 파일 + 전달한 결정 사항**의 조합이다.
역할 파일이 곧 프롬프트의 절반이라는 점을 발표에서 밝히는 편이 정확하다.

## 프롬프트 언어에 대해 — 발표에서 물어볼 수 있는 지점

`06`·`07`은 **영어로 작성**되어 있고 `01`·`02`·`04`·`05`는 한국어다. 의도된 차이다.

- 2026-08-05부터 **모델에게 주는 작업 지시는 영어로** 쓰기로 정했다. GPT 계열도 결국
  LLM이고 영어 지시를 더 정확히 따르기 때문
- 여기 파일은 **실제로 실행한 프롬프트를 그대로** 보관한다. 보기 좋게 번역해 두면
  기록이 사실과 달라진다 — 무엇을 물었는지가 채점 대상이므로 원문 유지가 맞다
- 각 파일이 무엇을 만든 것인지는 위 표의 한국어 설명으로 따라갈 수 있다

## 발표에서 쓸 만한 지점

- **같은 모델이 자기 결과를 검토하지 않게 분리했다** — luna가 조사하고 sol이 검토.
  검토에서 실제로 결함이 나왔고(출처 오귀속, iOS 15에서 이미 수정된 버그를 현재 위험으로
  제시 등) 전부 반영했다.
- **검토가 구조를 바꾼 사례가 있다** — 03의 `첫 화면에 노출 금지`를 연구가 `기본
  destination 아님`으로 약화시킨 것을 검토가 잡아냈고, 그 결과 첫 화면을 탭 셸 밖으로
  빼는 구조로 수정됐다. AI 산출물을 그대로 쓰면 안 되는 이유의 실물 증거.
- **검토가 Claude 자신의 오류도 잡았다** (08-05, `07-design-system-review-prompt.md`).
  `06-design-system.md`에서 Tabs가 36px에 고정되어 하단 탭을 못 만든다고 썼는데,
  `h-9`는 `TabsList`의 값이고 trigger는 컨테이너를 따르므로 **근거가 틀렸다.**
  결론(직접 제작)은 유지됐지만 이유는 전부 바뀌었다. 사람이든 AI든 **자기 결과를
  자기가 검토하면 안 된다**는 것의 사례.
- **조사 결과가 "적합한 대안 없음"으로 끝난 것도 그대로 남겼다** (`06`). 억지로
  추천을 만들지 않는 편이 조사로서 정직하다.
- **세 방향에서 독립적으로 검토해 같은 결론에 수렴한 사례** (08-06, `09`·`10`). UI
  목업이 "너무 단순하다"는 지적에 대해 ① Claude(스릿과 같은 화면을 직접 봄) ② sol(이미지
  검토, 그림자·서피스·아이콘·타이포·색 5개 지적) ③ luna(같은 5개를 Material 3·Atlassian·
  Fluent 등 실제 출처로 뒷받침)가 서로 모르는 채로 같은 결론에 도달했다. 세 검토 중
  하나가 이미지를 만든 모델과 겹치지 않게 배치한 것도 의도적이다.
