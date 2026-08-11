# 프롬프트 기록 — 발표 자료용 (팀 프로젝트)

강사 지시 (3-2, 2026-08-05): **결과물을 도출하는 데 사용한 프롬프트를 발표에 포함해야
한다.** "여정맵 만들어줘" 수준으로는 발표가 불가능하고, "이런 결과물을 만들기 위해
프롬프트에 이러이러한 내용을 썼다"의 형태로 제시해야 한다.

**이 폴더의 파일은 작업 부산물이 아니라 제출·발표 대상 산출물이다.**
냥BTI의 `nyangbti/docs/prompts/`와 같은 규칙을 따른다.

프롬프트 4요소 (강사 지시) — ① 롤 부여 ② 만들려는 것 ③ 앱의 목표 ④ 작업 대상 구체화

## 파일

| 파일 | 무엇을 만든 프롬프트인가 | 실행 |
| --- | --- | --- |
| `01-plan-review-prompt.md` | `08`·`07` 계획의 타당성·사실 검증 (BLOCKER 4건 포함 18건 발견) | Codex gpt-5.6-sol, effort high |
| `02-component-patterns-research-prompt.md` | `../KR/11-component-patterns-research.md` — shadcn에 없는 컴포넌트의 업계 패턴 조사 | Codex gpt-5.6-luna, effort high |
| `03-pattern-research-review-prompt.md` | 위 조사의 검증 (§1은 Claude가 먼저 검증해 404·labs 문제 발견) | Codex gpt-5.6-sol, effort high |
| `04-pitch-deck-research-prompt.md` | `../KR/13-pitch-deck-research.md` — 발표 구조·국내 학원/부트캠프 평가 기준 조사 (플러그인 샌드박스는 네트워크 없음 — 터미널에서 직접 실행, `danger-full-access`) | Codex, 터미널 직접 실행 |
| `05-deck-tooling-research-prompt.md` | `../KR/14-deck-tooling-research.md` — python-pptx 기반 빌드 스크립트를 도와줄 도구 조사(표·아이콘·폰트 임베딩·오버플로 QA·여정맵 다이어그램) | Codex gpt-5.6-luna, effort high, 터미널 직접 실행 |
| `06-presentation-outline-review-prompt.md` | `presentation-outline.md`이 근거 문서 4개(`12`~`15`)와 실제로 일치하는지, 과장·표류·인용 오류 검증 | Codex gpt-5.6-sol, effort high, scoped network(`sandbox_workspace_write.network_access`) |
| `07-deck-visual-design-review-prompt.md` | `build_deck.py`가 만든 실제 8슬라이드 렌더(PNG) 시니어 디자인 관점 검토 — 여백·충돌·타이포 위계·표 비율 | Codex gpt-5.6-sol, effort high, 이미지 8장 첨부(`-i`), scoped network |
| `08-great-ppt-design-research-prompt.md` | `../KR/16-great-ppt-design-research.md` — 여백·타이포 위계·그리드·색상 비율·표 레이아웃의 실제 디자인 원칙 조사 | Codex gpt-5.6-luna, effort high, scoped network |
| `09-pptx-builder-practices-research-prompt.md` | `../KR/17-pptx-builder-practices-research.md` — python-pptx로 실제 잘 만든 사람들의 관행(템플릿 기반 생성·헬퍼 라이브러리·시각 QA 렌더링) 조사 | Codex gpt-5.6-luna, effort high, scoped network |
| `10-reddit-ai-pptx-deep-research-prompt.md` | `../KR/19-reddit-ai-pptx-deep-research.md` — Reddit AI·PPT 디자인 조사 심화(+ Codex 자체의 Reddit 접근 가능 여부 진단) | Codex gpt-5.6-terra, effort high, scoped network |

## 언어 — 영어로 쓴 이유

파일 본문은 영어다. 2026-08-05부터 **모델에게 주는 작업 지시는 영어로** 쓰기로 정했다.
GPT 계열도 LLM이고 영어 지시를 더 정확히 따르기 때문이다.

**실행한 프롬프트를 그대로 보관한다.** 보기 좋게 번역해 두면 기록이 사실과 달라지고,
무엇을 물었는지가 곧 채점 대상이므로 원문 유지가 맞다. 각 파일이 무엇을 만든 것인지는
위 표의 한국어 설명으로 따라갈 수 있다.

## 발표에서 쓸 만한 지점

- **모델이 자기 결과를 검토하지 않게 분리했다** — luna가 조사하고 sol이 검토한다.
  같은 모델이 자기 작업을 검토하면 결함을 못 찾는다는 전제로 운영했다
- **검토가 "일정 안에 못 만든다"는 답을 냈고, 그것도 기록에 남겼다** (`01`).
  프롬프트에 *"Be blunt. If the scope cannot fit, say so and say precisely what to
  cut."* 라고 명시했기 때문에 나온 답이다. **듣기 좋은 답을 유도하지 않는 것**이
  프롬프트 설계의 일부라는 사례
- **검토가 법적 문제를 잡았다** (`01`) — 번들 음원 후보로 적었던 Pixabay가 CC가 아니라
  자체 라이선스이고 단독 재배포를 금지한다는 것. 공개 저장소에 올렸으면 그대로 문제가
  됐다
- **"만들 수 없는 것"과 "안 만들기로 한 것"을 구분하게 시켰다** — 이퀄라이저·크로스페이드·
  장르 분류는 취향 문제가 아니라 데이터나 구조가 없어서 불가능한 항목이다. 발표에서
  AI 산출물을 그대로 쓰면 안 되는 이유로 쓸 수 있다

## Related

- `../Eng/08-concept-music-diary.md` — 제품 결정
- `../KR/09-implementation-spec.md` — 구현 명세
- `../../nyangbti/docs/prompts/README.md` — 같은 규칙의 냥BTI 쪽 기록
