# Project rules — AI 활용 웹콘텐츠 실무역량 과정 미니 프로젝트

Read this first. Context established 2026-08-03; see `docs/DECISIONS.md` for why
each choice was made.

## What this is

A web app built AI-assisted end to end (planning → design → code) as the
deliverable for a 10-day intensive course.

| | |
| --- | --- |
| Course | AI 활용 웹콘텐츠 실무역량 과정, 2026-08-03 → 08-14 |
| Presentation | 2026-08-14 — mandatory attendance |
| Usable build days | ~7.5 (presentation day, field trip, diagnostic eat the rest) |
| Stack | plain HTML · CSS · JavaScript — **no React/Vue** (course scope) |
| Form factor | web app: runs in a browser without install; responsive if time allows |
| Instructor | 이수경 선생님 |

**Still undecided as of day 1:** the topic (08-03 was market research only) and
whether this is solo or a 2-person team (decided 08-04). Don't scaffold app
structure on a guess — wait for the topic.

## Git identity — read before committing

| | |
| --- | --- |
| Remote | `git@github.com:Special-Srit/AI-Web-Content-Practical-Skills-Project.git` (public) |
| Repo owner | `Special-Srit` |
| Commit author | `srit <coder.srit@gmail.com>` |
| Push credential | devwriet's SSH key — devwriet is a collaborator |

The author identity comes from `includeIf "gitdir:~/Projects/"` in `~/.gitconfig`,
which pulls in `~/.gitconfig-srit`. **A clone placed outside `~/Projects/`
silently commits as `Wriet <coder.wriet@gmail.com>` (the devwriet identity).**
Verify with `git config --get user.email` before the first commit in a new clone.

The repo is public. Don't commit anything private — no course paperwork, no
personal details, no recordings.

## Layout

```
docs/     planning artifacts, in pipeline order
src/      web app source
assets/   images · icons
```

Planning pipeline taught in class, and the order `docs/` should follow:

1. 주제 선정 · 시장조사 · 경쟁사 분석
2. 페르소나
3. 공감 지도 · 고객 여정 지도
4. 유저 시나리오
5. IA (정보구조 = 화면 구조도)
6. 유저 플로우
7. 와이어프레임
8. 무드보드
9. 디자인 → 코딩

## Class notes live in a separate private vault

Notes are in Srit's Obsidian vault (`devwriet/Obsidian_Vault`, **private**) under
`Study/AI-Web-Content-Practical-Skills/`. That folder has its own `CLAUDE.md`
covering the recording/transcription workflow and note conventions.

**Never put GitHub URLs to the vault in this repo** — it's private, so links
dead-end and expose its structure. Reference notes by path only, as the README's
관련 노트 table does.

## Language convention

Following the same split used in Project-CX: **English identifiers and
filenames, Korean comments and user-facing strings.** The app's audience and the
mentor are Korean, so UI copy is Korean; code stays English so it reads normally.

## Things the instructor flagged as graded

- AI output has real errors (his wireframe was missing a link between screens).
  Fixing them by hand is the point — and **saying in the presentation which AI
  limits you hit is itself credit**. Keep a note of them as they come up.
- A slide operator is needed during the presentation, which is part of why he
  leans toward 2-person teams.
