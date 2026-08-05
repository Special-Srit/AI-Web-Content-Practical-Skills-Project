You are a UI pattern researcher. Research how established design systems and professional product teams design a specific set of mobile components, and write the findings to one file.

## Why this is needed

We are designing **TuneBox**, a mobile-first **web** app (React + Vite + shadcn/ui, deployed as a static site). shadcn/ui supplies our form controls, dialogs, drawers and so on — those are settled and are **not** what you are researching.

What shadcn does **not** provide is the mobile app shell and the media/list patterns. We are currently inventing those, which is the wrong way round. Research what professional designers actually do.

## Read first, for context only

- `team-project/docs/08-concept-tunebox.md` — the product, the five tabs, the data model
- `team-project/docs/09-implementation-spec.md` — architecture constraints, especially §1
- `nyangbti/docs/06-design-system.md` §3 — the mobile touch-target work already done

Do **not** re-research anything already settled in those files: shadcn's default sizes, the 44×44 / 48×48 target rationale, the 16px input floor. Those are decided. Cite them, don't redo them.

## Components to research

For each, find what real design systems and shipped products do:

1. **Bottom tab bar (5 destinations)** — height, icon+label vs icon-only, active-state treatment (indicator pill, colour, weight), label truncation with longer words, safe-area handling, whether 5 is comfortable or crowded, elevation/divider treatment.
2. **Persistent mini-player above the tab bar** — height, what it contains at minimum, how it stacks with the tab bar, how it expands to full screen, what happens to it on screens where it is irrelevant, and how it behaves when nothing is playing.
3. **Full-screen player** — layout order, artwork sizing relative to viewport, transport control sizing and spacing, scrubber design and its touch target, where secondary actions go.
4. **Track/list row with artwork** — row height, artwork size, one-line vs two-line, where the overflow menu goes, how the currently-playing row is indicated, how long titles truncate.
5. **Generative/derived cover art placeholder** — when a media item has no artwork, what do products actually render? Look for real approaches: initial letters, deterministic colour from a hash, gradient generation, pattern systems. What makes it read as intentional rather than broken?
6. **Selectable chip / filter group** (our mood picker, 5 options, single-select) — size, spacing, selected-state treatment, scrolling vs wrapping.
7. **Empty states** — structure, whether illustration is required, where the primary action goes, tone of copy.
8. **Journal/entry card with an attached media reference** — how a text entry that links to a media item is composed.

## Sources — prioritise in this order

1. **Material Design 3** and **Apple Human Interface Guidelines** — the two normative sources. Quote their actual numbers.
2. **Published design systems** with public documentation (e.g. Polaris, Carbon, Base, Fluent, Primer, Atlassian) where they cover the pattern.
3. **Shipped music/media products** — Spotify, Apple Music, YouTube Music, Melon, Bandcamp, Pocket Casts. Describe observable design decisions; do not claim access to internal specs.

**When Material and Apple disagree, say so explicitly and give both numbers.** We are a web app, not a native app on either platform, so we choose deliberately rather than inheriting.

## Constraints that bound the answer

- **Mobile web, not native.** No native transitions, no platform-provided tab bars. Anything requiring a native shell is out.
- Touch targets already fixed at **≥44×44**, bottom tabs **≥48×48**.
- **Korean labels.** Our five tabs are 홈 · 라이브러리 · 탐색 · 일기 · 마이 — note that 라이브러리 is 5 characters where the others are 2. Flag any pattern that breaks on longer labels, and say how professionals handle uneven label lengths.
- No icon library chosen yet. If icon conventions matter to a pattern, say so.
- Two people, roughly four working days. Where a pattern has an expensive and a cheap version, give both and say what is lost.

## Output

Write **one file only**: `team-project/docs/11-component-patterns-research.md`

- **Korean, 개조식** — match the style of `09-implementation-spec.md`
- One section per component. For each: what the normative sources say (with numbers), what shipped products do, the recommendation for us, and the cheap-vs-expensive tradeoff
- **Every factual claim needs a URL.** Where you could not verify, write `확인 못 함` and say what you tried
- Distinguish clearly between a **documented specification** and an **observed product behaviour**
- End with a table: component → recommended size/structure → source
- If a pattern turns out to have no consensus, say so plainly rather than manufacturing one

## Prohibited

- Do not modify any file other than the one output file
- Do not touch `team-project/src/` or `nyangbti/`
- No git commands
- No package installs
