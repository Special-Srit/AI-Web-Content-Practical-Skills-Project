# AI 활용 웹콘텐츠 실무역량 과정 — 미니 프로젝트

AI를 활용해 기획부터 코딩까지 진행하는 웹앱 미니 프로젝트.

## 현황

| 항목 | 내용 |
| --- | --- |
| 과정 | AI 활용 웹콘텐츠 실무역량 과정 (2026-08-03 → 08-14) |
| 발표 | 2026-08-14 (필수) |
| 팀/개인 | **2인 1조** — 08-03 확정 |
| 진행 | 08-04 현장 학습 · 08-05부터 오전 냥BTI / 오후 팀 프로젝트 |
| 스택 | HTML · CSS · JavaScript (리액트·뷰 미사용) |
| 형태 | 웹앱 — 설치 없이 웹에서 앱처럼 동작, 반응형 목표 |

## 프로젝트 2개

한 저장소에 두 프로젝트를 폴더로 분리해서 진행.

| 폴더 | 프로젝트 | 상태 |
| --- | --- | --- |
| `nyangbti/` | **냥BTI** — 고양이 성격 유형 검사 웹앱. 강사 예제를 따라가며 기획 파이프라인 연습. **실제 출시가 아닌 포트폴리오용** | 08-03 시장조사 · 경쟁사 분석 진행 |
| `team-project/` | **팀 프로젝트** — 발표 대상 본 과제(2인 1조). 주제 미정 | 08-05 시작 |

- 두 폴더는 각각 `docs/` `src/` `assets/` 를 따로 가짐
- 팀 프로젝트 주제 확정 시 폴더명 변경 예정

## 기획 순서

수업에서 제시된 파이프라인:

1. 주제 선정 · 시장조사 · 경쟁사 분석
2. 페르소나
3. 공감 지도 · 고객 여정 지도
4. 유저 시나리오
5. IA (정보구조 = 화면 구조도)
6. 유저 플로우
7. 와이어프레임
8. 무드보드
9. 디자인 → 코딩

## 구조

```
nyangbti/         냥BTI
  docs/           기획 산출물 — 위 기획 순서대로 01~04 번호
  src/            웹앱 소스
  assets/         이미지 · 아이콘
team-project/     팀 프로젝트 (동일 구조)
DECISIONS.md      결정 기록 — 저장소 전체 공통
```

저장소 루트에는 공통 문서(`README.md` · `CLAUDE.md` · `DECISIONS.md`)만 두고,
산출물은 전부 프로젝트 폴더 안에 둠.

## 관련 노트 (Obsidian)

수업 내용은 개인 Obsidian 볼트에 회차별로 기록. **비공개 저장소이므로 링크가 아닌
경로로 표기** — 볼트 루트 기준.

| 회차 | 노트 경로 |
| --- | --- |
| 1-1 (OT) | `Study/AI-Web-Content-Practical-Skills/KR/오리엔테이션-KR.md` (영문: `Eng/Orientation-Eng.md`) |
| 1-2 | `Study/AI-Web-Content-Practical-Skills/KR/Week-1/Periods/1-2-기획-프로세스와-웹앱-KR.md` |
| 1-3 | `Study/AI-Web-Content-Practical-Skills/KR/Week-1/Periods/1-3-계정-세팅과-프로젝트-기능-KR.md` |
| 1-4 | `Study/AI-Web-Content-Practical-Skills/KR/Week-1/Periods/1-4-페르소나와-UX-KR.md` |
| 1-5 | `Study/AI-Web-Content-Practical-Skills/KR/Week-1/Periods/1-5-페르소나-발표자료-만들기-KR.md` |
| 1-6 | `Study/AI-Web-Content-Practical-Skills/KR/Week-1/Periods/1-6-여정맵-만들기-KR.md` |
| 1일차 종합 | `Study/AI-Web-Content-Practical-Skills/KR/Week-1/1일차-종합-KR.md` (영문: `Eng/Week-1/Day-1-Summary-Eng.md`) |
| 폴더 규칙 | `Study/AI-Web-Content-Practical-Skills/CLAUDE.md` |

회차 노트는 `KR/Week-<주차>/Periods/<일>-<교시>-<주제>-KR.md` 규칙으로 쌓이므로, 위 표에
없는 회차는 해당 폴더에서 교시 번호로 찾으면 됨. 일자별 종합 노트는
`KR/Week-N/N일차-종합-KR.md` 와 `Eng/Week-N/Day-N-Summary-Eng.md`.

각 프로젝트의 기획 산출물(`<프로젝트>/docs/`)은 위 노트의 기획 파이프라인 순서를 따라감.

---

# AI Web Content Practical Skills — Mini Project

A web app built AI-assisted end to end, from planning through code, for a
10-day intensive course (2026-08-03 → 08-14). Presented on the final day.

Two projects live here, one folder each. **`nyangbti/`** is 냥BTI, a cat
personality-test web app that follows the instructor's own worked example as
planning practice. **`team-project/`** is the graded deliverable presented on
08-14; its topic is undecided and work starts 08-05. Teams of 2 were confirmed
08-03. Stack is plain HTML/CSS/JavaScript with no framework, targeting a
responsive web app that runs without installation.

Class notes live in a private Obsidian vault under
`Study/AI-Web-Content-Practical-Skills/` — see 관련 노트 above for per-period
paths. Referenced by path rather than link because that vault is private.
