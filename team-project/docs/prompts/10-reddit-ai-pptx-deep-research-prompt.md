You are a deep-research investigator. Go deeper than a prior quick pass on the
same topic: how people actually use AI to make better-looking PowerPoint decks,
with a focus on real practitioner discussion (Reddit especially), not
marketing content. **You have scoped network access — use it for research,
nothing else.**

## First: test whether you can actually reach Reddit

Before the main research, run a few diagnostic checks and report the exact
result of each (status code, error message, or content received) — this
matters independently of the research itself:

1. `curl -sI --max-time 8 https://old.reddit.com/r/PowerPoint/`
2. `curl -sI --max-time 8 https://www.reddit.com/r/PowerPoint/.json`
3. `curl -s --max-time 8 -A "Mozilla/5.0" https://old.reddit.com/r/PowerPoint/search.json?q=AI%20design&restrict_sr=on&limit=5` — check if this returns real JSON or a block page
4. If your environment has a web-search tool (not just curl), try searching for `site:reddit.com r/PowerPoint AI slop presentation design` and report whether results actually come from reddit.com or are blocked/filtered

Report plainly whether curl-based access to Reddit worked, partially worked
(e.g. old.reddit.com HTML loads but the `.json` API doesn't), or failed
entirely, and what the failure looked like if it failed. This is a genuine
open question — a previous Claude Code session found WebSearch/WebFetch/curl
all blocked for reddit.com domains in its own sandbox, but your runtime and
network path may differ. Do not assume the answer either way — test it.

## Then: the actual research (use whatever access you have — Reddit directly if it works, otherwise Google-cached/indexed Reddit content, other forums, or adjacent sources)

A prior pass already found and summarized (do not repeat, go beyond it):

- `r/PowerPoint` — "Spent 8 years as a Presentation Design Lead at McKinsey" (AI output has a "fingerprint": generic box grids, hollow bullet points; real failure mode is narrative not visual)
- `r/PowerPoint` — "I spent a week building a 25-slide deck with Claude" (workflow: plan in chat first, don't edit the pptx file directly, one-slide-per-conversation; a top comment flags Claude's "signature boxy/squarish" default look)
- `r/PowerPoint` — "Hot take: AI slide generators are solving a problem most of us don't actually have" (real bottleneck is the "make it not ugly tax" — font hierarchy, spacing consistency)
- Anthropic's own official docs, found via a Reddit comment: [Prompting Claude Sonnet 5 — Design and frontend defaults](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5#design-and-frontend-defaults) — covers why Claude defaults to a generic look, and two fixes: (a) give concrete specs not vague instructions, (b) have the model propose 3-4 distinct visual directions before building and pick one. Also references an anti-"AI slop" system-prompt snippet and the `frontend-design` skill.

Go deeper on:

1. **More subreddits and threads** — `r/graphic_design`, `r/PowerPointCreators` (if it exists), `r/ArtificialInteligence`, `r/ChatGPT`, `r/ClaudeAI`, `r/consulting` (consultants talk about deck quality constantly). Find specific, concrete, high-signal threads (real upvote/comment counts, not marketing). Skip anything that reads like product self-promotion (multiple similar accounts pushing the same tool — a prior pass already found and discarded one such thread).
2. **The `frontend-design` skill itself** — fetch and summarize `https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md` (referenced by the Sonnet 5 docs above but not yet read in full). What specific, actionable anti-generic-design techniques does it contain that could transfer from frontend/web design to a python-pptx-generated slide deck?
3. **Concrete before/after examples** — has anyone posted a specific "AI-generated deck vs. hand-fixed deck" comparison, or specific critique of what exactly reads as "AI slop" in a slide (beyond the general "boxy" complaint)? Look for specifics: font choices people call out by name, layout patterns people call cliché, color patterns beyond "purple gradient."
4. **Python-pptx specifically, not just AI chat tools** — is there Reddit/forum discussion specifically about generating *good-looking* decks with `python-pptx` (not Canva/Gamma/ChatGPT-native slide tools)? A prior separate research pass already covered general python-pptx tooling/practices — this question is narrower: has anyone on Reddit specifically discussed avoiding a generic/AI look *from a python-pptx script*, as opposed to a chat-based generator?
5. **Layout variety specifically** — the prior pass's self-assessment found our own deck uses table/box-grid layouts on 5 of 8 slides, which overlaps with the "three boxes" complaint. Research: what do good presentation designers use *instead* of tables/box-grids for comparison or process content, when they want to avoid a monotonous, boxy rhythm across a deck? (e.g., timelines, radial layouts, annotated diagrams, asymmetric splits.)

## Output

Write **one file only**: `team-project/docs/KR/19-reddit-ai-pptx-deep-research.md`

- Korean, 개조식 — match the style of `18-reddit-ai-pptx-design-research.md`
- Start with the Reddit-access diagnostic results (§ above), stated plainly
- One section per research question above. For each: what the source actually
  says (with URL), and whether/how it applies to our specific pipeline
  (python-pptx script, Paperlogy Filled font, warm ivory + terracotta palette,
  8-slide deck, 5 of 8 slides currently table/box-grid layouts)
- Every factual claim needs a URL. Where you could not verify something, write
  `확인 못 함`
- Label your own synthesis `[내 판단]`
- Flag and discard anything that looks like marketing/self-promotion rather
  than genuine practitioner discussion, same as the prior pass did
- End with a prioritized list: given our deck's specific weak spot (layout
  monotony, 5/8 slides are tables/box-grids), what's the single most valuable
  thing from this research to apply next

## Prohibited

- Do not modify, create, or delete any file other than the one output file
- Do not touch `team-project/src/`, `nyangbti/`, or any other file
- No git commands
- No package installs
