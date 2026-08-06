# 09. 구현 명세 — 냥BTI

작성 2026-08-06. 팀 프로젝트의 `09-implementation-spec.md`와 같은 목적 — 냥BTI에는 지금까지
데이터 모델 문서가 없었다. **이번 코딩 패스는 오세진 주 경로만** — 범위는
`docs/prompts/11-main-flow-build-prompt.md`와 `DECISIONS.md` 2026-08-06 참고.

## 1. 데이터 모델 — `localStorage`, 키 접두사 `nyangbti:v1:`

```js
// Cat (개체) — nyangbti:v1:cats
{ id, name, createdAt }

// QuizSession — 진행 중 1건만, nyangbti:v1:session
{ catId, catName, index,                    // 0-15
  answers: [{ questionId, poleId | null }], // null = 모르겠음
  dontKnowCount }

// SavedResult — nyangbti:v1:results (배열, 개체당 최대 2건 — 최신 + 직전)
{ id, catId, catName, typeCode,             // 4글자, 예: "NEDT"
  axisScores: { neuroticism, extraversion, dominance, impulsiveness }, // 0-4
  dontKnowCount, tentative,                 // dontKnowCount > 4
  testedAt }
```

- 삭제는 이 3개 키만 — `localStorage.clear()` 금지(같은 오리진의 다른 데이터까지 지움)
- 보관 정책 — 저장 시 같은 `catId`에 이미 2건이 있으면 오래된 것부터 제거(F4 판단, `04-design.md` §3)
- `QuizSession`은 완료(S3 도달) 또는 명시적 "새로 시작"에서 지움. 진행 세션은 항상 1개뿐
  (S1-a 이어하기는 이번 패스에서 UI는 없지만, 이 모양은 나중에 다중 세션 없이도 그대로 쓸 수 있음)

## 2. 채점 — `src/lib/scoring.js`, 순수 함수

- 16문항, 축당 정확히 4문항. 각 선택지는 그 문항 축의 극(`poleId`) 하나에 매핑, 모르겠음만 `poleId: null`
- 축별로 `null`이 아닌 답변의 극을 세어 **다수결**. 2:2 동점(4문항 중 2문항만 답한 경우가 아니라
  순수 2:2)이면 **더 부드러운 극을 기본값**으로 선택(안심형 톤 유지, 임의 무작위 아님)
- `typeCode` = 4축의 승리 극 글자를 이어붙임. 글자 고정:

  | 축 | high | low |
  | --- | --- | --- |
  | 신경성 | `N`(예민) | `C`(안정) |
  | 외향성 | `E`(활발) | `I`(차분) |
  | 우월성 | `D`(우세) | `G`(온순) |
  | 충동성 | `P`(즉흥) | `T`(신중) |

- `dontKnowCount > 4` → `tentative: true`. S3는 처방을 전부 보여주되 잠정 표기만 인라인으로 추가
  (S3-a 배너 컴포넌트 자체는 이번 패스에서 제외 — 데이터 플래그와 인라인 표기만 구현)

## 3. 콘텐츠 — `src/content/questions.json` · `src/content/types.json`

- 문항 16개(축당 4개), "최근 일주일 동안…" 관찰형 프레이밍, 2줄 이내, 선택지 4개 + 모르겠음(항상 마지막)
- 유형 16개(4글자 코드로 키), 각각: 이름 · 한줄요약 · 처방 3블록(★ "이것부터 1종" 1개 표시) ·
  금지 목록 2~3개(**절대 훈계·죄책감 유발 금지** — 03 §11-6, 이 프로젝트의 하드 룰) · 서사(짧은 문단)
- 처방 근거는 `03-ux-research.md`의 보호자 권고 인용에서: 신경성 높음→은신처 제공, 외향성 높음→
  환경 풍부화, 충동성 높음→스트레스 요인 점검, 우월성 높음→자원 분리. 근거 없이 지어내지 않음

## 4. 이번 패스에서 뺀 것

T3 비교·T4 알아보기·S1-a 이어하기 오버레이·S3-a/S3-b 배너·S3-d 공유 시트·다크 모드·
자원 분리 권고 콘텐츠. 이유와 범위 결정은 `DECISIONS.md` 2026-08-06 참고.

## Related

- `04-design.md` §2·§4·§6 — 화면 구조·도달성·와이어프레임 (레이아웃 정본)
- `06-design-system.md` §3·§5·§9 — 치수·컴포넌트 매핑·시각적 밀도 보정
- `03-ux-research.md` — 처방 콘텐츠의 보호자 권고 출처
- `docs/prompts/11-main-flow-build-prompt.md` — 이 구현을 생성한 프롬프트
