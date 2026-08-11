# Project rules — AI 활용 웹콘텐츠 실무역량 과정 미니 프로젝트

Read this first. Context established 2026-08-03; see `DECISIONS.md` for why
each choice was made.

**Tell any subagent which project folder it's working in.** They all default to
asking rather than guessing, and a misfiled artifact breaks the traceability the
`critic` agent checks.

## What this is

Web apps built AI-assisted end to end (planning → design → code) for a 10-day
intensive course. **Two projects, one folder each — keep them separate.**

| Folder | Project | Why it exists |
| --- | --- | --- |
| `nyangbti/` | 냥BTI — 고양이 성격 유형 검사 웹앱 | The instructor's own worked example. Assigned 08-03 so the class rehearses the full planning pipeline on a topic he has already demoed. **A portfolio piece, not a service to launch.** |
| `team-project/` | The graded deliverable presented 08-14 | Topic undecided; work starts 08-05. Folder renamed once the topic lands. |

### 냥BTI is a portfolio piece — judge decisions accordingly

It will not ship. So the test for any decision is **"would a reviewer or
interviewer find this convincing?"**, not "would this win the market."

- **Doesn't matter:** speed to market, beating DBTI's announced CBTI, user
  acquisition, monetisation, retention.
- **Does matter:** the planning stages actually connecting to each other, every
  claim traceable to a source, visible finish, and being able to explain why each
  choice was made.
- **Still matters more than ever:** no invented competitors or statistics. A
  reviewer can search them. The market research is a real course requirement and
  an unsourced plan is the first thing anyone attacks.
- Where a tradeoff has no clean answer, **document the tension rather than hiding
  it** — showing you knew the limit reads better than papering over it. The
  Feline Five 5-factor vs. MBTI 4-axis mismatch is the live example; see
  `nyangbti/docs/02-market-research.md`.

Never mix artifacts between them. Research, personas, and design for 냥BTI stay
in `nyangbti/docs/` even if the team later picks a similar topic — the two have
different constraints and the 냥BTI work is bounded by the instructor's example.

| | |
| --- | --- |
| Course | AI 활용 웹콘텐츠 실무역량 과정, 2026-08-03 → 08-14 |
| Presentation | 2026-08-14 — mandatory attendance |
| Usable build days | ~7.5 (presentation day, field trip, diagnostic eat the rest) |
| Stack | **React, Vue, Svelte all approved 2026-08-05** by the instructor, superseding the earlier plain-HTML-only scope rule. 냥BTI goes React + shadcn/ui (`nyangbti/docs/06-design-system.md`). **Confirmed 2026-08-05 (evening) that it covers `team-project/` as well** — Music Diary is React + Vite + shadcn |
| Form factor | web app: runs in a browser without install. **Mobile-first — the phone layout is the primary target, desktop is the adaptation.** Not "responsive if time allows" |
| Team name | **Clova (클로바)** — the team. The app is **Music Diary** (음악 일기); the two are different names and both go on the deck |
| Instructor | 이수경 선생님 |

**Settled 08-03 (1-4):** **2인 1조 teams** — confirmed, not solo. The instructor
judged larger groups inefficient.

**Schedule as of 08-03:**

| Date | What happens |
| --- | --- |
| 08-04 (화) | **현장 학습** — no class progress, no time for team work |
| 08-05 (수) onward | 오전 = 냥BTI · 오후 = 팀 프로젝트 |

**Still undecided:** the team project's topic. Don't scaffold `team-project/` app
structure on a guess — wait for it. 냥BTI is fixed and can proceed.

**냥BTI's status, in the instructor's own words:** it is *not* the main project —
the team project is. But "잘 만들면 얘도 포폴로 쓰셔도 되고요," and the team project
must follow **the same order and format** 냥BTI is built in. So 냥BTI doubles as
the template for the graded work; sloppiness here propagates.

Immediate 냥BTI task he set: turn the competitor analysis into a **발표 자료**,
pulling out only the important parts. He said explicitly **don't polish the
visuals** — focus on arranging the content.

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
nyangbti/         DECISIONS.md and the two README/CLAUDE files are the only
  docs/           root-level files. Everything else belongs to a project.
  src/
  assets/
  presentation/   build_deck.py + generated .pptx
team-project/     same subfolders
```

**The deck is generated, not hand-built.** `nyangbti/presentation/build_deck.py`
renders the outline to a Rev 7-compliant `.pptx`. Edit the script and re-run rather
than editing the file by hand, or the next build overwrites the change. It needs
`python-pptx` (a venv lives in the session scratchpad, outside the repo) and
self-verifies after saving: it walks every shape and fails the build if anything
crosses `CONTENT_BOT = 5.08"`. Don't weaken that check — a build-time-only version
of it already missed three real overflows inside panels.

Planning pipeline taught in class, and the order each project's `docs/` should
follow — the numbering is what the subagents in `.claude/agents/` read and write:

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

## Tooling — who does what

**Srit does the visual design himself, in Figma.** Don't generate finished
visuals or make aesthetic calls for him; produce the structural spec and let him
design from it. Same principle he applies to Unity Editor work — doing it by hand
is how he learns the tool.

| Need | Use |
| --- | --- |
| Author/edit Figma nodes (grey-box scaffolds, auto-layout) | `figma-bridge` MCP |
| Read a Figma file, design context, codegen | official `claude_ai_Figma` MCP |
| Wireframe of record | text structure in `<project>/docs/04-design.md` |
| Presentation deck | **PowerPoint (.pptx)**, assembled by Srit |

**Deck workflow:** produce the slide-by-slide content — titles, bullets, tables,
speaker script — in Korean, as a markdown outline in
`<project>/docs/presentation-outline.md`. **Srit assembles it in PowerPoint and
does the layout, colour, and images.** Same division as Figma and Unity: structure
from here, visual execution by hand.

Chosen over Canva and Google Slides for offline reliability — it's also the tool
the instructor named first. **Microsoft PowerPoint is installed on the MacBook**
(along with Word and Excel), so no conversion step is needed.

**All work happens on Srit's own MacBook, which travels with him** — so the academy
PC's reset behaviour is irrelevant here, and a local file carries no loss risk. Treat
"the academy PC might wipe on shutdown" (noted in 1-3) as not applying to this
project's artifacts.

The instructor's instruction for the 냥BTI deck is **don't polish the visuals —
focus on arranging the content.** So depth of content over slide count, and don't
suggest visual flourishes.

**Never output a wireframe or mockup as a flat image.** The instructor's demo
failed precisely there — AI emitted the wireframe as an image, it had a missing
screen link, and it couldn't be corrected without rebuilding in Figma. Editable
Figma nodes are the fix, and are worth citing in the presentation's AI-limits
section since it's an improvement on his own example.

### Codex — how to invoke it in this repo

`AGENTS.md` is Codex's own entry point (model, `team-project/src/` lock, stack).
This section is the other half: how a **Claude Code session** should launch and
supervise Codex here, written from patterns that already worked in this repo —
see `nyangbti/docs/prompts/README.md` for the full log of every prompt actually
run, which model, and what review caught. Read that file before writing a new
Codex prompt; don't reinvent the pattern from scratch each session.

**The established shape, in order:**

1. For research or a review pass, write the prompt inline. For anything that
   creates or edits real files, write it to
   `<project>/docs/prompts/NN-<slug>-prompt.md` first — numbered next in that
   project's sequence, one file per Codex task. This is not just a log; 3-2
   made "the prompts used to produce results" a **graded presentation
   deliverable**, so the saved file is the record of what was actually asked,
   not a tidied-up version.
2. State the model and effort at the top of the prompt: `luna` high for
   research/build, `sol` high for review, per the routing table in
   `~/.claude/CLAUDE.md`. **A model never reviews its own work** — luna
   researches, sol reviews; this caught real defects twice (`02`, `07` in the
   prompts log) and once found Claude's own error, not Codex's.
3. Big builds (anything past a small fix) go through a **Plan-mode plan file**
   first (`~/.claude/plans/*.md`), approved by Srit, *then* a short Codex
   prompt that mostly just points at the plan and calls out the handful of
   details most likely to be gotten wrong — see
   `nyangbti/docs/prompts/11-main-flow-build-prompt.md` for the shape. Don't
   hand Codex a build task without a written spec it can be checked against.
4. **Prompt language is English**, since GPT is an LLM like any other and
   follows English instructions more reliably — decided 2026-08-05, applies
   from prompt `06` onward. The two exceptions: (a) prompts that are
   themselves 3-2's graded deliverable stay in **whatever language was
   actually typed** — rewriting `01`/`02`/`04`/`05` to English after the fact
   would make the record disagree with what happened, so they stay Korean;
   (b) a prompt whose entire *output* is Korean prose for a Korean audience
   may still be written in Korean if that's genuinely clearer to give it —
   judge case by case, and default to English when unsure.

**Verified failure modes in this repo — check for these, don't assume they
won't recur:**

- **`codex-companion.mjs task --background` can silently fail to register.**
  Confirmed 2026-08-05: it printed a task ID, but no `jobs/` entry was ever
  created for this workspace and nothing landed. Prefer `task --write`
  (no `--background`) wrapped in Claude Code's own `Bash run_in_background` —
  that path is harness-tracked and reliably notifies. Verify with `ls` on the
  expected output file before trusting a "started" message either way.
- **Codex's default sandbox has no network access**, so it cannot run
  `npm install` or `shadcn add` itself. The 08-06 build round shipped
  hand-rolled lookalike components under `src/components/ui/` because the
  real installer couldn't run — undiscovered until someone read
  `src/lib/utils.js` and the `Drawer` source looking for actual Radix/vaul
  underneath and found none. **After any Codex pass that touches
  `components/ui/`, verify the real library is there — don't trust the
  filenames matching.** If Codex genuinely needs the installer to run, use
  the raw `codex exec` network-capable path in
  `~/.claude/CLAUDE-codex-subagents.md`, not the default sandboxed agent.
- **`shadcn add` skips writing the theme CSS block if `components.json`
  already exists** (from a prior partial run) — caused a fully transparent
  `Drawer` in the 08-06 round. If a shadcn component renders unstyled, check
  `index.css` for the missing `:root` / `@theme inline` block before assuming
  the component itself is broken.
- **Never take a Codex report as verification.** Every fix in the 08-06 round
  was accepted only after a human read the diff, rebuilt, and traced the
  changed logic — not on the agent's own "done, build passes" message. This
  matches the global rule that a model never reviews its own work; it applies
  to trusting its self-report just as much as to grading its own output.
- **Codex never commits here.** Build prompts end with "leave changes
  uncommitted, review/commit happens separately" (see `11`) — matches the
  global invariant that only Claude commits, and `git add -A` is never used
  even then.

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
