You are a researcher investigating how real projects use `python-pptx`
specifically to produce well-designed decks — not general presentation-design
theory (already researched separately), and not general slide-tooling options
(also already researched separately). This is about **practitioner patterns**:
what people who actually generate polished-looking `.pptx` files
programmatically do differently from a naive from-scratch build. **You have
scoped network access — use it for research, nothing else.**

## Why this is needed

Team Clova is building a Music Diary pitch deck with a hand-written
`python-pptx` script (`team-project/presentation/build_deck.py`) that draws
every shape/textbox from scratch with manual coordinates — the same approach
as a sibling project's script (`nyangbti/presentation/build_deck.py`). A first
design pass already found real problems: dead whitespace, a decorative shape
overlapping text, imbalanced table columns. Two prior research passes covered
(a) general presentation design principles and (b) specific helper libraries
(Pillow measurement, icon conversion, font embedding). This pass is different:
find out how people who ship *actually good-looking* python-pptx output do it
in practice — the workflow and code patterns, not the design theory.

## Questions to answer

1. **Template-based vs. from-scratch generation** — `python-pptx` can open an
   existing `.pptx`/`.potx` as a starting template (with pre-built slide
   masters/layouts, placeholder styles) and populate it, instead of building
   every shape from a blank presentation. How common is this pattern in real
   projects? What's the actual workflow (design the master in PowerPoint by
   hand once, then script only fills placeholders vs. sets text)? Find real
   examples (GitHub repos, blog posts, Stack Overflow patterns with real
   authors) — cite them.
2. **Reusable component/helper libraries built on python-pptx** — Are there
   maintained open-source libraries or code patterns (beyond raw `python-pptx`)
   that wrap it for building consistent, styled decks programmatically —
   things like a "slide builder" abstraction, layout-grid helpers, or design
   token systems specifically for python-pptx? (e.g. search for terms like
   "python-pptx template", "python-pptx design system", "python-pptx slide
   builder", "python-pptx report generator".) For each, note whether it's
   actively maintained (check last commit/release date) or abandoned.
3. **Real production use cases** — Find real-world write-ups (engineering
   blog posts, conference talks, GitHub READMEs) from teams/companies that
   generate presentations or reports programmatically with python-pptx at
   scale (e.g. automated weekly report decks, data-driven slide generation).
   What specific techniques do they mention for keeping the output looking
   professional rather than "obviously generated"? (Consistent master slides,
   avoiding shape-collision, automated QA/screenshot diffing, etc.)
4. **Visual QA / regression-testing patterns for generated decks** — Since
   there's no way to "see" the output without opening PowerPoint, do any
   projects render `.pptx` to images programmatically for automated visual
   review (e.g. via LibreOffice headless `--convert-to png`, or a cloud
   rendering API) as part of their build pipeline? Is LibreOffice headless
   conversion a reliable, commonly-used pattern for this, and what's the exact
   command? This machine currently has neither PowerPoint nor LibreOffice
   installed — is there a lightweight way to get one of them (e.g. `brew
   install --cask libreoffice`, or a minimal headless-only package) that would
   let a build script self-verify visually, not just structurally?
5. **Common failure patterns specifically noted by practitioners** — What do
   people who've done this at scale say goes wrong most often with
   from-scratch python-pptx builds specifically (not general design mistakes)?
   E.g. text overflow because python-pptx doesn't do live text measurement,
   z-order/layering bugs, font-substitution issues when a custom font isn't
   embedded, autofit behavior differences between python-pptx output and how
   PowerPoint actually renders it on open.

## Constraints that bound the answer

- The current build is a from-scratch script, not template-based — if
  template-based turns out to be clearly better practice, say so plainly, but
  also note the migration cost (would require designing a `.potx` master by
  hand in PowerPoint first, which conflicts with "script-generated, not
  hand-built" — flag this tension explicitly rather than picking a side for us).
- Prefer sources that show actual code or describe actual implementation
  detail over generic "best practices" listicles — this research is about
  what practitioners actually did, not slide-design theory (already covered).

## Output

Write **one file only**: `team-project/docs/KR/17-pptx-builder-practices-research.md`

- Korean, 개조식
- One section per question above. For each: what the source actually shows/says
  (with URL), and a concrete recommendation or explicit "not worth adopting
  now" verdict for this specific from-scratch `build_deck.py` pipeline
- Every factual claim needs a URL. Where you could not verify something, write
  `확인 못 함`
- Label your own synthesis `[내 판단]`
- End with a prioritized list: given the deck is due 2026-08-14 and already has
  a working from-scratch script, what (if anything) from this research is
  worth adopting now vs. later vs. never

## Prohibited

- Do not modify, create, or delete any file other than the one output file
- Do not touch `team-project/src/`, `nyangbti/`, or any other file
- No git commands
- No package installs (research only — note what *would* need installing,
  including whether LibreOffice is actually a viable install here, but don't
  install it)
