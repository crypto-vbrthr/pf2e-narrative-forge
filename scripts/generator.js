import { DAMAGE } from "./content/damage.js";
import { CREATURES } from "./content/creatures.js";
import { COMBINATIONS } from "./content/combinations.js";
import { CRITICAL } from "./content/critical.js";
import { pickLocalized } from "./selector.js";
import { getSetting } from "./settings.js";

export function generateNarration(data) {
  const style = getSetting("style") ?? "normal";
  const lines = [];

  const combinationKey = `${data.damageType}-${data.creatureType}`;
  const combination = pickLocalized(COMBINATIONS[combinationKey]);

  if (combination) {
    lines.push(combination);
  } else {
    const damage = pickLocalized(DAMAGE[data.damageType] ?? DAMAGE.fallback);
    if (damage) lines.push(damage);

    if (style !== "short") {
      const creature = pickLocalized(CREATURES[data.creatureType]);
      if (creature) lines.push(creature);
    }
  }

  if (data.critical && style !== "short") {
    const critical = pickLocalized(CRITICAL);
    if (critical) lines.push(critical);
  }

  if (style === "epic" && !data.critical) {
    const flourish = pickLocalized([
      "PF2E_NARRATIVE_FORGE.Narration.Flourish.1",
      "PF2E_NARRATIVE_FORGE.Narration.Flourish.2",
      "PF2E_NARRATIVE_FORGE.Narration.Flourish.3"
    ]);
    if (flourish) lines.push(flourish);
  }

  return renderNarration(lines);
}

export function generateDirectorNote(_data) {
  return null;
}

function renderNarration(lines) {
  const body = lines.filter(Boolean).map((line) => `<p>${line}</p>`).join("");
  return `<div class="pf2e-narrative-forge-chat-card"><strong>⚔ ${game.i18n.localize("PF2E_NARRATIVE_FORGE.Chat.title")}</strong>${body}</div>`;
}
