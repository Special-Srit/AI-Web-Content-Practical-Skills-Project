You are a presentation-structure researcher for a Korean vocational-high-school
AI/web bootcamp. Research how to structure a short student-project pitch deck and
what Korean academy/bootcamp evaluators actually grade, then write the findings to
one file. **You have full network access for this task — use it.**

## Why this is needed

Team Clova is building **Music Diary** (음악 일기), a React + Vite + shadcn/ui local
music player with a mood-based diary, for a 10-day course (2026-08-03 → 08-14) that
ends in a mandatory live presentation on 08-14. We have never built this team's deck
before and have no structural reference — right now we only have content (product
concept, competitor research, personas, journey maps), not a slide-by-slide shape to
pour it into.

A sibling project in the same repo (냥BTI) already has a **visual** slide-design spec
(colors, type, layout grid — "Slide Design Prompt Rev 7") built with python-pptx. This
research is explicitly **not** about visuals or that spec. It is about **structure**:
how many slides, what order, what each slide needs to do, and what a Korean academy
panel is actually scoring — so a build_deck.py script (written after this research)
renders content into a shape the request/consumer of it consulting is likely to
reward, not just cover the topic.

## Read first, for context only

- `team-project/docs/KR/12-mentor-resource-summary-KR.md` — everything decided so
  far: team/product name, why this topic, competitor research, 4 personas, journey
  maps. This is the raw content the deck will need to compress and sequence.
- `team-project/docs/prompts/README.md` — the instructor's explicit requirement that
  the deck must show **which prompts produced which deliverables**, not just the
  deliverables themselves. This is a structural constraint on the deck, not
  optional flavor.
- `team-project/docs/KR/03-idea-scan-positioning-KR.md`, section 2 (그린 플래그
  bullet list) — already cites one source on what Korean project evaluations grade
  (문제 명확성, 데모 신뢰성, 스토리텔링, 역할 분담, Git 활동, README, 회고). **Verify
  that source still resolves, and find at least 2-3 more independent sources on
  Korean bootcamp/academy/국비지원 project evaluation criteria** — don't just repeat
  the one citation already in hand.

## Questions to answer

1. **Structure/arc** — What slide order do effective short tech-product pitches use
   (problem → solution → demo → differentiation → roadmap, or some other arc)? Cite
   real frameworks (YC-style pitch structure, Guy Kawasaki's 10/20/30, or similar) —
   not just your own synthesis.
2. **Slide count and pacing** — For a presentation this short (Korean academy demo
   days are typically 5-10 minutes per team, verify the actual norm rather than
   assuming), what's a realistic slide count? What's the failure mode of too many
   slides for the time budget?
3. **Korean academy/bootcamp evaluation norms** — What do Korean 국비지원/부트캠프/학원
   project evaluations explicitly grade? Find primary sources if possible (academy
   syllabi, evaluation rubrics) — secondary/blog sources are acceptable but must be
   labeled as such.
4. **Where AI-prompt disclosure goes** — Given the instructor's hard requirement that
   prompts used to produce deliverables must be shown in the presentation, how do
   other AI-assisted project presentations (student or professional) typically
   surface "here's what I asked the AI and why" without it reading as an appendix
   nobody watches? Is there a convention for weaving it into the main narrative vs.
   a dedicated section?
5. **Demo placement and risk** — Where in the deck structure does a live demo
   typically go, and what's the standard fallback if a live demo breaks (recorded
   backup, screenshots-as-story)? This app has no backend and runs entirely
   client-side — note if that changes the usual demo-risk advice.
6. **Team-of-3 presentation logistics** — Is there guidance on how a small team
   splits speaking roles during a pitch (one narrator vs. rotating per section)?
   Team Clova is 3 people as of 2026-08-06.

## Constraints that bound the answer

- Audience is a Korean vocational-high-school instructor and classmates, not
  investors — don't import pure VC-pitch conventions uncritically; flag where
  investor-pitch advice doesn't transfer to a classroom evaluation context.
- The product has zero backend, zero accounts — some standard "traction/metrics"
  slide types (funding ask, user growth chart) don't apply. Say so rather than
  forcing them in.
- This research feeds a **content outline**, not the visual design. Do not propose
  colors, fonts, or layout grids — that's a separate pass.

## Output

Write **one file only**: `team-project/docs/KR/13-pitch-deck-research.md`

- **Korean, 개조식** — match the style of `09-implementation-spec.md` and
  `11-component-patterns-research.md`
- One section per question above. For each: what the sources say (with URLs), and
  a concrete recommendation for this specific deck (Music Diary, 3-person team,
  short class demo slot)
- **Every factual claim needs a URL.** Where you could not verify something, write
  `확인 못 함` and say what you tried
- Distinguish clearly between **normative guidance** (a named framework/rubric) and
  **your own synthesis/opinion** — label the latter `[내 판단]`, matching the
  convention already used in `03-idea-scan-positioning-KR.md`
- End with a proposed slide-by-slide skeleton (section name → purpose → source
  backing it), not full copy — that's the next step, not this one

## Prohibited

- Do not modify any file other than the one output file
- Do not touch `team-project/src/`, `nyangbti/`, or any `.md` file outside the one
  output path
- No git commands
- No package installs
