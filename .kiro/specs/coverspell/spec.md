# Spec: CoverSpell
## Goal
Help short-video creators write cover headlines that create curiosity without spoiling the video's twist.
## Inputs
- premise: public setup text
- twist: secret payoff text (used ONLY by the spoiler checker, never rendered into a headline)
- draft: user's own headline for checking
## Behavior
- Generate 5 headline frames from the premise only.
- Spoiler check flags: spoiler-word list matches, result-number patterns, and any significant word (>= 4 chars) shared between the draft and the secret twist.
- Pure static site: index.html + style.css + app.js, no build step, no backend.
