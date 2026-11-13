# CoverSpell 🕯️

Turn any video twist into a curiosity-driven cover headline — **questions only, never spoilers.**

Short-video covers die when they reveal the twist. CoverSpell formalizes the rule
"tease, don't spoil": it builds headlines from the **premise only**, ends each one
with an unanswered question, and its spoiler checker flags outcome words, result
numbers, and words leaked from your secret twist.

## Run it
Open `index.html` in any browser. No build step, no backend.

## How it was built with Kiro
- **Spec-driven development**: `.kiro/specs/coverspell/spec.md` defines inputs and behavior; the twist is used *only* by the checker, never rendered.
- **Steering docs**: `.kiro/steering/cover-rules.md` keeps every generated headline inside the question-only rule.
- **Agent hooks**: `.kiro/hooks/spoiler-lint.json` lints headline copy against the spoiler-word list on save.

## Category
Kiroween 2026 — **Costume Contest**: a haunted-manor interface (moonlight, candle-gold accents, ghost microcopy) wrapped around a practical creator tool.

MIT licensed.
