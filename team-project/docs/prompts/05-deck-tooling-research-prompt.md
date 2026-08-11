You are a tooling researcher for a Python-generated Korean presentation deck.
**You have full network access for this task — use it.**

## Why this is needed

Team Clova needs a presentation deck for Music Diary, due 2026-08-14. A sibling
project in the same repo (냥BTI) already built its deck with a working reference
architecture: `nyangbti/presentation/build_deck.py`, using `python-pptx` directly
(shapes, text boxes, tables coded by hand), a Korean font family ("Paperlogy
Filled"), a fixed color/spacing token set, and a self-verifying build step that
asserts no content crosses a fixed vertical boundary. Team Clova will build the
Music Diary deck the same way (already decided — see
`team-project/docs/KR/13-pitch-deck-research.md` once it exists, and
`team-project/docs/prompts/04-pitch-deck-research-prompt.md` for the structure
research that preceded this).

That reference script works but is entirely hand-coded: every table, every icon
badge, every layout rule is manually positioned with `Inches()`/`Pt()` math. This
research asks whether there are actual tools/libraries that would make writing
*this next* build script faster or the result better, without abandoning the
python-pptx approach itself (that platform choice is settled — do not
re-relitigate Canva/Gamma/etc. here).

## Read first, for context only

- `nyangbti/presentation/build_deck.py` — the working reference architecture.
  Note its actual pain points: colors/fonts as hardcoded constants, tables built
  cell-by-cell, no chart objects, no icon system, overflow checking is a single
  hand-written assert.
- `team-project/docs/KR/12-mentor-resource-summary-KR.md` — the content that has
  to fit into slides: a 5-service competitor comparison table, a 4-persona
  behavioral-axis table, and 4 separate 6-column customer journey map tables.
  These are wide, dense tables — the current reference script has no tooling for
  laying out anything this wide well.

## Questions to answer

1. **Table/chart rendering into pptx** — Beyond manually building
   `slide.shapes.add_table()` cell by cell, are there libraries or patterns for
   rendering dense comparison tables and journey-map grids into a pptx slide
   more legibly (e.g., auto-sizing columns, wrapping long Korean cell text,
   converting a wide table into a rendered image via matplotlib/Pillow and
   inserting that instead of a native pptx table)? Compare native pptx tables vs.
   rendered-image tables for a 5-column x 6-row Korean-text-heavy table
   specifically — which handles overflow better?
2. **Icon/badge systems usable from Python** — `python-pptx` has no icon support
   natively. Are there SVG icon sets (lucide, Material Symbols, Heroicons, etc.)
   with a known path to render as PNG and drop into a pptx shape
   programmatically? What's the actual conversion step (cairosvg? resvg? a CLI
   tool?) and does it handle Korean-adjacent icon labeling needs, if any.
3. **Korean font packaging/embedding** — the reference script depends on a
   specific installed font family. Is there a reliable way to *embed* a font
   inside the generated `.pptx` so it renders correctly on a machine that doesn't
   have "Paperlogy Filled" installed (e.g., the presentation classroom's PC)?
   `python-pptx` itself has no font-embedding API — is there a known workaround
   (post-processing the `.pptx` zip/XML, a separate tool, or is "install the font
   on the presentation machine beforehand" genuinely the only real option)?
4. **Overflow/layout QA beyond one hand-written assert** — the reference script's
   only safety net is `CONTENT_BOT = 5.08"` with a single assert. Is there a
   library or technique for actually measuring rendered text height for a given
   font/size/box-width in Python *before* generating the slide (not just
   asserting a fixed content-area boundary), so text overflow can be caught for
   variable-length Korean content specifically?
5. **Diagram rendering for the customer journey map** — the mentor-resource doc
   has 4 six-stage journey maps as markdown tables. Is there tooling for turning
   a structured journey-map data (stage → action/touchpoint/emotion/pain
   point/opportunity) into a visual swimlane diagram (not just a table) that
   could be rendered to an image and dropped into a slide? Consider
   Mermaid-to-image rendering (mmdc/Kroki) as one candidate, and note whether
   Mermaid's journey-map or timeline diagram types actually support Korean text
   correctly.
6. **What's genuinely not worth adding** — for a 3-person team with a few days of
   runway before 08-14, which of the above are worth the setup cost and which are
   over-engineering for what's ultimately an 8-12 slide deck? Be honest about
   this — don't recommend a tool just because it exists.

## Constraints that bound the answer

- Python-based only — the build pipeline is `python-pptx` in a venv, not a
  JS/web-based deck tool. Anything requiring Node.js tooling is acceptable only
  as an offline pre-processing step (e.g., generate an image once, embed it),
  never as part of the live build_deck.py execution path.
- Everything must work **offline at presentation time** — no runtime API calls
  from the generated deck itself. Research-time network calls (installing a
  library, generating an image once) are fine.
- Free/open tools only — no new paid subscriptions for an 8-12 slide student deck.

## Output

Write **one file only**: `team-project/docs/KR/14-deck-tooling-research.md`

- Korean, 개조식 — match the style of `13-pitch-deck-research.md` and
  `09-implementation-spec.md`
- One section per question above. For each: what the tool/library actually does,
  a URL, and a concrete recommendation (adopt / skip and why) for this specific
  build_deck.py-based pipeline
- Every factual claim needs a URL. Where you could not verify something, write
  `확인 못 함` and say what you tried
- Label your own synthesis/opinion `[내 판단]`
- End with a prioritized short list: if the next build_deck.py only adopts one or
  two things from this research, what should they be

## Prohibited

- Do not modify any file other than the one output file
- Do not touch `team-project/src/`, `nyangbti/`, or any other `.md` file
- No git commands
- No package installs (research only — note what *would* need installing, don't
  install it)
