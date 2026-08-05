# Codex rules — AI 활용 웹콘텐츠 실무역량 과정 미니 프로젝트

Overrides `~/.codex/AGENTS.md` for this repo.

**Deeper context:** read `./CLAUDE.md` when you need the full picture — course schedule, the
portfolio-vs-product framing for 냥BTI, the planning pipeline, and why each decision was made
(`DECISIONS.md` too). Skip its Figma/MCP tooling sections; those tools are Claude's, not yours.

## Do not write into `team-project/` before 2026-08-15

It is the **graded deliverable**, presented 2026-08-14. Read it freely; do not edit, create, or
delete anything under it. An autonomous edit there is not a risk worth taking for the sake of
saving quota. `nyangbti/` is fine to work in.

## Two projects, one repo — never mix them

| Folder | What it is |
| --- | --- |
| `nyangbti/` | 냥BTI, the instructor's worked example. A **portfolio piece, not a service to launch.** |
| `team-project/` | The graded deliverable. Frozen until 08-15 (above). |

Each has its own `docs/`, `src/`, `assets/`. Research, personas, and design for one never go in
the other, even if the topics end up similar — they have different constraints.

## Stack limits — course scope, not preference

**Plain HTML, CSS, and JavaScript. No React, no Vue, no framework.** It's outside what the
course covers, so a framework answer is wrong here even when it would be better engineering.
Target a web app that runs in a browser without installation.

**Mobile-first (confirmed 2026-08-04).** The phone is the primary environment and
desktop is the adaptation — not the other way round, and not "responsive if time
allows." Design and test at phone width first. This also rules out designs that
quietly assume a mouse, a keyboard, a large viewport, or a filesystem: hover-only
affordances, dense tables, and drag-and-drop all need a touch answer or they don't
ship.

**iOS is a design target the team cannot test (established 2026-08-05).** Nobody on
the team owns an iPhone, so "check mobile-Safari feasibility" means *check the
documentation*, not *run it*. Two consequences, both mandatory:

- Prefer the **documented intersection** of iOS Safari and Android Chrome over any
  API that only one of them supports. Where they differ, take the WebKit-safe
  option even if Chrome offers something better — the untestable platform is the
  one we must never push against.
- Never write or imply that iOS behaviour was verified. Android Chrome is the
  tested platform; iOS is designed-for and **unverified**. Say so in the
  presentation rather than implying coverage that doesn't exist.

See `team-project/docs/07-music-player-plan.md` for the resulting platform table.

## The deck is generated, not hand-edited

`nyangbti/presentation/build_deck.py` renders the outline to a `.pptx`. Edit the script and
re-run — never edit the `.pptx`, or the next build discards the change. It self-verifies after
saving and fails the build if any shape crosses `CONTENT_BOT = 5.08"`. **Do not weaken that
check**; a build-time-only version of it already missed three real overflows inside panels.

## Never output a wireframe or mockup as a flat image

The instructor's own demo failed exactly there: AI emitted the wireframe as an image, it had a
missing screen link, and it couldn't be fixed without rebuilding from scratch. Structure goes in
`<project>/docs/` as text; Srit does visual execution himself in Figma.

## Language convention

English identifiers and filenames; Korean comments and user-facing strings. The audience and the
instructor are Korean, so UI copy is Korean, while code reads normally in English.

## Repo is public

No course paperwork, no personal details, no recordings, and **no GitHub URLs to Srit's Obsidian
vault** — that repo is private, so links would dead-end and expose its structure. Reference notes
by path only.
