import { DAMAGE } from "./content/damage.js";
import { CREATURES } from "./content/creatures.js";
import { COMBINATIONS } from "./content/combinations.js";
import { CRITICAL, FLOURISH } from "./content/critical.js";
import { pickLocalized } from "./selector.js";
import { getSetting } from "./settings.js";

export function generateNarration(data) {
  const style = getSetting("style") ?? "normal";
  const lines = [];
  const sources = [];

  const combinationKey = `${data.damageType}-${data.creatureType}`;
  const combination = pickLocalized(COMBINATIONS[combinationKey], `combination:${combinationKey}`);

  if (combination) {
    lines.push(combination);
    sources.push(`combination:${combinationKey}`);
  } else {
    const damageLibrary = DAMAGE[data.damageType] ?? DAMAGE.fallback;
    const damage = pickLocalized(damageLibrary, `damage:${data.damageType}`);
    if (damage) {
      lines.push(damage);
      sources.push(`damage:${data.damageType}`);
    }

    if (style !== "short") {
      const creature = pickLocalized(CREATURES[data.creatureType], `creature:${data.creatureType}`);
      if (creature) {
        lines.push(creature);
        sources.push(`creature:${data.creatureType}`);
      }
    }
  }

  if (data.critical && style !== "short") {
    const critical = pickLocalized(CRITICAL, "critical");
    if (critical) {
      lines.push(critical);
      sources.push("critical");
    }
  }

  if (style === "epic" && !data.critical) {
    const flourish = pickLocalized(FLOURISH, "flourish");
    if (flourish) {
      lines.push(flourish);
      sources.push("flourish");
    }
  }

  if (getSetting("debug")) {
    console.log("pf2e-narrative-forge | Generator sources", {
      damageType: data.damageType,
      creatureType: data.creatureType,
      critical: data.critical,
      sources
    });
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
