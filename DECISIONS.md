# Decisions log

Newest first. Records *why*, so choices aren't re-litigated later.

## 2026-08-05 — team name is **Clova (클로바)**

Team name for the graded project, distinct from the app name (**Music Diary** /
음악 일기). Both appear on the deck: the team presents, the app is what was built.

**Worth knowing before it goes on a slide:** `CLOVA` is NAVER's AI platform brand
(CLOVA X, CLOVA Note). A team name is not a product and this is a course project,
so the collision is low-risk — but in a Korean AI-themed course the audience will
recognise it, and it may read as a reference rather than an original name. Kept
because Srit chose it knowingly; noted here so nobody is surprised by the
association on 08-14.

## 2026-08-05 — team project app name is **Music Diary**. Frozen.

Korean display name **음악 일기**. `localStorage` prefix `musicdiary:`.

**Do not rename again.** It changed three times in one day — Warm Vinyl →
Vibe Vinyl → TuneBox → Music Diary. Today each rename cost a `git mv` and a
find-replace because no code existed. That window is closing: once the teammate
starts, the same change drags component names, the storage key, deploy paths,
the Figma file and the deck along with it. The storage key is the worst of
them — changing it after anyone has saved data means writing a migration into a
four-day project.

If it must change anyway, it changes **before** the name reaches the
presentation, and the storage prefix moves in the same commit.

`Warm Vinyl` is kept as the **theme** name in 설정, where the teammate's layout
already had a row for it. One theme only; no switching.

**Known tension, decided deliberately:** the app is named after one of its own
five tabs (`일기`). A fifth of the product owns the title. Accepted because the
diary is exactly what makes this pass `03`'s input → decision → result → saved
reflection test — the reason it is not a Melon clone. The name points at the
differentiator, which `TuneBox` did not. Screens say `일기` for the tab and
`음악 일기` for the app.

**Prompt records keep the old names.** `team-project/docs/prompts/` is a
verbatim log of instructions actually sent to a model, and 3-2 makes it a
graded artifact. Rewriting it to match a later decision would make the record
disagree with what happened.

## 2026-08-03 — deck is generated from a script, per Srit's design system

Srit supplied his own **Slide Design Prompt Rev 7** (in the vault at
`Inbox/Personal_1.md`) — a 16:9 system with fixed anchors, a single blue accent, an
equal-tile formula, and a hard content ceiling. Its geometry is fully deterministic,
so the deck is **built by `build_deck.py`** rather than assembled by hand. Editing the
`.pptx` directly is a mistake: the next build overwrites it.

This supersedes the earlier "Srit assembles it" split for this deck only — the
division still holds for Figma and app visuals.

**Font trap, worth remembering:** Rev 7 named the families `Paperlogy 1 Thin` …
`Paperlogy 9 Black`. What's installed is Srit's **Filled** build (stock Paperlogy
doesn't cover every 한글 syllable), whose families are `Paperlogy Filled <Weight>`.
Using the spec'd names causes silent font substitution — the exact failure the Filled
build exists to prevent. The vault note is corrected; every run in the deck sets
`a:latin`, `a:ea`, and `a:cs` so Korean text doesn't fall back.

**Build-time bounds checks aren't enough.** The first version checked panel
rectangles only and passed, while three persona slides had inner textboxes running to
5.38" — into the footer zone. The script now re-opens the saved file and walks every
shape, exempting only full-bleed backgrounds, the footer row, and Rev 7's
bottom-flush closing strip.

## 2026-08-03 — presentation tool: PowerPoint (.pptx)

The instructor left the tool to each trainee. Chose **PowerPoint** for offline
reliability — no browser or network dependency on presentation day — and because
it's the tool he named first.

Rejected: **Canva** (MCP is connected and could generate a draft deck, and being
account-based would survive the academy PC resetting — but it needs a browser and
network in the room); **Google Slides** (best for 2-person concurrent editing, worth
revisiting for the team project); **Markdown → PDF** (fastest and git-friendly, but
weak as portfolio material).

The one tradeoff I'd noted — losing a local file to an academy PC reset — **does not
apply**: all work is done on Srit's own MacBook, which he carries with him.
PowerPoint is installed on it, so there's no conversion step either. The
account-based argument that favoured Canva therefore carries no weight for this
project.

**Division of labour: content here, assembly by Srit.** The slide-by-slide content
goes in `<project>/docs/presentation-outline.md`; Srit builds the deck and owns
layout, colour, and images — the same split already used for Figma and Unity. It
also matches the instructor's instruction to focus on arranging content rather than
polishing visuals.

## 2026-08-03 — 2인 1조 confirmed; 냥BTI is the template for the graded work

Settled in 1-4, earlier than the 08-04 date previously recorded. Teams are
**2 people**; the instructor rejected larger groups as inefficient.

He also stated the relationship between the two projects explicitly: 냥BTI is not
the main deliverable, but **the team project must follow the same order and format**
that 냥BTI is built in, and 냥BTI itself can serve as portfolio material if done
well. So the pipeline artifacts in `nyangbti/docs/` are a template, not a
throwaway — which raises the bar on them rather than lowering it.

Schedule: 08-04 is a **현장 학습** with no progress; from 08-05 it's 오전 냥BTI /
오후 팀 프로젝트.

Two corrections to previously recorded class content, both from 1-4:

- **AS-IS is 동기 + 니즈**, not 페인포인트 + 니즈. Pain points are a later addition
  and not Cooper's original, and since these personas describe people who haven't
  used the product yet, pain points may be merged with 목표·동기·니즈.
- **More personas is not better.** 1-2 was recorded as "더 많을수록 예측 범위가
  넓어진다"; the instructor corrected this to one persona per core case, with his
  own three being 초보 집사 / 맞벌이 집사 / 다묘가정 집사.

Both fixes are applied in `.claude/agents/ux-researcher.md`.

## 2026-08-03 — 냥BTI is a portfolio piece, not a service

Stated explicitly so downstream stages don't optimise for the wrong thing. It
will not ship, so market-timing pressure is irrelevant — including DBTI's
announced CBTI, which the research had framed as a closing window.

What replaces it as the bar: stage-to-stage traceability, sourced claims, visible
finish, and being able to defend each choice out loud. Fabricated competitors or
statistics get *worse*, not better, under this framing — a reviewer can search
them.

Consequence for the open Feline Five question: take the MBTI-style 4축/16유형
(matching the instructor's example) and **document the mismatch with the paper's
5 factors** rather than claiming a research basis the structure doesn't support.
Knowing the limit is the more credible position.

## 2026-08-03 — split into two project folders

**`nyangbti/` and `team-project/`, each with its own `docs/` `src/` `assets/`.**
The instructor assigned 냥BTI — his own demo topic — as a full run through the
planning pipeline, while the graded team project's topic isn't decided until
08-04. Two live projects in one repo, so a flat `docs/` would interleave two
sets of 01~04 artifacts and destroy the stage-to-stage traceability that the
whole method depends on.

Repo root now holds only `README.md`, `CLAUDE.md`, `DECISIONS.md`; `DECISIONS.md`
moved up from `docs/` because it's repo-wide, not per-project.

Rejected: separate repos (splits one course's work across two portfolio entries,
and doubles the git/identity setup); branches (the two are concurrent, not
alternatives). `team-project/` is a placeholder name — renamed once the topic
lands, which git handles cleanly.

**Subagents now take the project folder as an argument** rather than hardcoding
`docs/…`; each one asks instead of guessing if it isn't told.

## 2026-08-03 — repo created

**Host account: `Special-Srit`, commits authored `srit`, pushed with devwriet's key.**
Two GitHub accounts exist: `Special-Srit` (holds most project repos) and
`devwriet` (used for team/school work, e.g. WeaAir). Only devwriet had working
push auth on this MacBook — one SSH key, authenticating as devwriet, and the
global git identity is devwriet's.

Rather than set up a second SSH key mid-sprint, the repo was created under
Special-Srit with **devwriet added as a collaborator**, so the existing key
pushes fine. Author identity is set per-path via `includeIf "gitdir:~/Projects/"`
→ `~/.gitconfig-srit`, so the commits credit Special-Srit's graph while the push
uses devwriet's key. Push permission and author identity are independent.

Rejected: creating under devwriet (would fragment the portfolio); adding a second
SSH key now (setup cost during a 10-day sprint with a hard deadline). If the
portfolio should consolidate differently later, GitHub repo transfer preserves
history and redirects the old URL — cheaper than getting it "right" now.

**Known trap:** the identity rule is keyed to the path, so a clone outside
`~/Projects/` commits as devwriet with no warning.

**Initial commit deliberately minimal** — README, `.gitignore`, empty
`docs/` `src/` `assets/`. The project topic isn't decided (08-03 was market
research only) and solo-vs-team is decided 08-04, so any app structure now would
be a guess.

**README references the class notes by path, not by link.** The vault repo is
private; URLs would dead-end for readers and leak its structure.

## 2026-08-03 — class-note workflow (context, not a repo change)

Recordings are named `<day>-<period>` (7 periods/day, ~40–50 min each) and
transcribed locally with whisper.cpp `large-v3-turbo` + Silero VAD.

**`-mc 0` is mandatory.** whisper.cpp defaults `--max-context` to unlimited and
feeds its own output back as decoding context; on the first recording that caused
one hallucinated line to repeat for 33 straight minutes (1445 identical segments,
7.4% unique lines). Proven to be context poisoning rather than bad audio by
transcribing minute 20 in isolation, where the same audio decoded cleanly. With
`-mc 0` the same file came out 95.2% unique.

Notes live in the private vault, not here — see that folder's `CLAUDE.md`.
Transcripts are working files and are never committed.
