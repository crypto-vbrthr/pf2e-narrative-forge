# Narrative Forge Content Guidelines

## Purpose

Narrative Forge enriches tabletop combat with short narrative descriptions and optional Director's Notes.

The goal is not to replace the Game Master. The goal is to provide small narrative building blocks that inspire descriptions while preserving the GM's creativity and authority.

> Narrative Forge supports storytelling. It never tells the story for the Game Master.

## General Writing Rules

These rules apply to all narration content.

- Keep text short and immediately usable at the table.
- Avoid game mechanics, numerical values, conditions, bonuses, penalties, armor class, hit points, or tactical advice.
- Prefer observable details over internal thoughts or fixed emotions.
- Avoid repeated wording inside the same library.
- Keep descriptions system-neutral enough to work with different weapons, spells, and situations.
- Do not override the GM's interpretation of the scene.

## Director's Notes

Director's Notes are optional prompts for the Game Master. They are not facts, not rules text, and not tactical instructions.

They should feel like short directorial prompts:

- *Describe how...*
- *Let...*
- *Maybe...* (use sparingly)

### Rule #1 - Never Describe Intentions

Bad:

> *Describe how the bandit decides to flee.*

Good:

> *Describe how the bandit takes a cautious step back.*

### Rule #2 - Describe Only Observable Details

Bad:

> *Describe how the wolf becomes afraid.*

Good:

> *Describe how the wolf lowers its body and keeps its eyes fixed on the attacker.*

### Rule #3 - Never Include Mechanics

Director's Notes must not mention rules, conditions, bonuses, penalties, damage values, actions, armor class, hit points, weaknesses, resistances, or tactical recommendations.

### Rule #4 - One Idea Per Note

Bad:

> *Describe how the enemy stumbles, looks at an ally, raises a shield, and changes position.*

Good:

> *Describe how the enemy hastily adjusts their guard.*

### Rule #5 - Use Open Wording

Preferred openings:

- *Describe how...*
- *Let...*
- *Maybe...* (sparingly)

These openings make it clear that the text is inspiration, not a fixed event.

### Rule #6 - The Two-Second Rule

A Director's Note must be fully understood within about two seconds during combat.

If the Game Master needs to read it twice, it is too long.

### Rule #7 - Preserve the GM's Agency

A Director's Note must never remove narrative choices from the Game Master.

Bad:

> *Describe how the creature retreats from the fight.*

Good:

> *Describe how the creature briefly shifts its weight backward.*

## Metadata Reference

Director's Notes should use the following structure:

```js
{
  id: "director_construct_04",
  category: "posture",
  key: "PF2E_NARRATIVE_FORGE.Director.construct.4",
  weight: 1,
  tags: ["director", "construct", "posture"],
  conditions: {}
}
```

### `id`

Stable internal identifier. Do not change it once released unless absolutely necessary.

### `category`

A broad descriptive category used for future variation logic.

Recommended categories:

- `movement`
- `posture`
- `sound`
- `surface`
- `energy`
- `reaction`

### `key`

Localization key used by Foundry.

### `weight`

Relative selection weight. Default should be `1`.

### `tags`

Useful descriptors for future filtering and diagnostics.

### `conditions`

Reserved for future contextual filtering. Use `{}` unless a note must only appear in a specific context.

## Creature Identity

Each creature type should have a distinct narrative identity.

| Creature Type | Narrative Focus |
| --- | --- |
| Humanoid | Stance, guard, breath, hesitation, weapon grip |
| Animal | Instinct, posture, sound, fur, feathers, scales |
| Undead | Persistence, necromancy, bones, decay, unnatural movement |
| Construct | Precision, machinery, runes, metal, stone, artificial motion |
| Plant | Vines, roots, leaves, pollen, thorns, slow organic motion |
| Ooze | Fluidity, deformation, bubbles, ripples, surface tension |
| Elemental | Manifested energy, shifting form, turbulence, raw natural force |
| Dragon | Presence, scales, ancient power, breath, dominance |
| Fey | Grace, illusion, misdirection, unsettling beauty |
| Fiend | Infernal presence, menace, heat, shadow, cruel confidence |
| Celestial | Radiance, composure, purity, divine presence |
| Aberration | Alien anatomy, unnatural motion, wrongness, distortion |
| Monitor | Balance, cosmic order, inevitability, detached precision |
| Fungus | Spores, mycelium, damp growth, soft tissue |
| Spirit | Ethereal motion, fading edges, echoes, cold presence |

## Good Contribution Checklist

Before submitting new content, check:

- Does it follow the Two-Second Rule?
- Does it contain only one idea?
- Does it avoid mechanics?
- Does it preserve GM agency?
- Does it avoid describing intent?
- Does it match the creature identity?
- Is the wording distinct from other entries in the same library?
- Does the English and German localization carry the same meaning?
