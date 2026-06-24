const MODULE_ID = "pf2e-narrative-forge";
const MODULE_VERSION = "0.0.4";

const DAMAGE_TYPE_LABELS = {
  acid: "PF2E_NARRATIVE_FORGE.DamageTypes.acid",
  bludgeoning: "PF2E_NARRATIVE_FORGE.DamageTypes.bludgeoning",
  cold: "PF2E_NARRATIVE_FORGE.DamageTypes.cold",
  electricity: "PF2E_NARRATIVE_FORGE.DamageTypes.electricity",
  fire: "PF2E_NARRATIVE_FORGE.DamageTypes.fire",
  force: "PF2E_NARRATIVE_FORGE.DamageTypes.force",
  mental: "PF2E_NARRATIVE_FORGE.DamageTypes.mental",
  piercing: "PF2E_NARRATIVE_FORGE.DamageTypes.piercing",
  poison: "PF2E_NARRATIVE_FORGE.DamageTypes.poison",
  slashing: "PF2E_NARRATIVE_FORGE.DamageTypes.slashing",
  spirit: "PF2E_NARRATIVE_FORGE.DamageTypes.spirit",
  vitality: "PF2E_NARRATIVE_FORGE.DamageTypes.vitality",
  void: "PF2E_NARRATIVE_FORGE.DamageTypes.void"
};

function isEnabled() {
  return game.settings.get(MODULE_ID, "enabled");
}

function getMessageFlag(message, path) {
  return foundry.utils.getProperty(message, path);
}

function localize(key) {
  return game.i18n.localize(key);
}

function format(key, data = {}) {
  return game.i18n.format(key, data);
}

function escapeHtml(value) {
  const text = String(value ?? "");
  return text.replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  }[character]));
}

function flattenStrings(value, results = []) {
  if (value === null || value === undefined) return results;

  if (typeof value === "string") {
    results.push(value);
    return results;
  }

  if (Array.isArray(value)) {
    for (const entry of value) flattenStrings(entry, results);
    return results;
  }

  if (typeof value === "object") {
    for (const entry of Object.values(value)) flattenStrings(entry, results);
  }

  return results;
}

function isPf2eDamageMessage(message, root = null) {
  const contextType = String(getMessageFlag(message, "flags.pf2e.context.type") ?? "").toLowerCase();
  const acceptedContextTypes = new Set([
    "damage-roll",
    "spell-damage-roll",
    "persistent-damage-roll"
  ]);

  if (acceptedContextTypes.has(contextType)) {
    console.debug(`${MODULE_ID} | Accepted damage message via PF2e context type: ${contextType}`, message);
    return true;
  }

  const content = String(message.content ?? "");
  const hasDamageRollClass = content.includes("damage-roll") || root?.querySelector?.(".damage-roll");
  const hasDamageApplication =
    root?.querySelector?.("[data-action='applyDamage']") ||
    root?.querySelector?.("[data-action='apply-damage']") ||
    content.includes("data-action=\"applyDamage\"") ||
    content.includes("data-action=\"apply-damage\"");

  if (hasDamageRollClass && hasDamageApplication) {
    console.debug(`${MODULE_ID} | Accepted damage message via rendered damage card fallback.`, message);
    return true;
  }

  console.debug(`${MODULE_ID} | Ignored non-damage chat message.`, {
    contextType,
    messageType: message.type,
    hasDamageRollClass: Boolean(hasDamageRollClass),
    hasDamageApplication: Boolean(hasDamageApplication),
    message
  });
  return false;
}

function getActorName(message) {
  const actor = message.actor ?? game.actors?.get(message.speaker?.actor);
  return actor?.name ?? localize("PF2E_NARRATIVE_FORGE.Chat.UnknownActor");
}

function getTargetName(message) {
  const targetName =
    getMessageFlag(message, "flags.pf2e.context.target.name") ??
    getMessageFlag(message, "flags.pf2e.context.target.token.name") ??
    getMessageFlag(message, "flags.pf2e.target.name") ??
    getMessageFlag(message, "flags.pf2e.origin.target.name");

  return targetName ?? localize("PF2E_NARRATIVE_FORGE.Chat.UnknownTarget");
}

function getItemName(message) {
  return getMessageFlag(message, "flags.pf2e.context.item.name") ??
    getMessageFlag(message, "flags.pf2e.origin.item.name") ??
    getMessageFlag(message, "flags.pf2e.item.name") ??
    "";
}

function getDamageTotal(message) {
  const totalFromMessage = Number(message.rolls?.[0]?.total);
  if (Number.isFinite(totalFromMessage)) return totalFromMessage;

  const rollTotals = message.rolls
    ?.map((roll) => Number(roll?.total))
    ?.filter((total) => Number.isFinite(total)) ?? [];

  if (rollTotals.length) return rollTotals.reduce((sum, total) => sum + total, 0);
  return null;
}

function getDamageTypes(message) {
  const knownTypes = Object.keys(DAMAGE_TYPE_LABELS);
  const strings = flattenStrings({
    flags: message.flags?.pf2e,
    rollOptions: getMessageFlag(message, "flags.pf2e.context.options"),
    formulae: message.rolls?.map((roll) => roll?.formula),
    flavors: message.rolls?.map((roll) => roll?.options?.flavor ?? roll?.flavor)
  });

  const found = new Set();
  for (const text of strings) {
    const lower = String(text).toLowerCase();
    for (const type of knownTypes) {
      if (lower === type || lower.includes(type) || lower.includes(`damage:type:${type}`) || lower.includes(`[${type}]`)) {
        found.add(type);
      }
    }
  }

  return Array.from(found);
}

function getOutcome(message) {
  const rawOutcome = getMessageFlag(message, "flags.pf2e.context.outcome") ??
    getMessageFlag(message, "flags.pf2e.context.degreeOfSuccess") ??
    getMessageFlag(message, "flags.pf2e.origin.outcome") ??
    "";

  const strings = flattenStrings({
    rawOutcome,
    options: getMessageFlag(message, "flags.pf2e.context.options"),
    domains: getMessageFlag(message, "flags.pf2e.context.domains")
  }).map((entry) => String(entry).toLowerCase());

  const isCritical = strings.some((entry) => (
    entry.includes("criticalsuccess") ||
    entry.includes("critical-success") ||
    entry.includes("degree-of-success:critical") ||
    entry.includes("outcome:critical")
  ));

  if (isCritical) return "critical";
  return "hit";
}

function getLocalizedDamageTypes(damageTypes) {
  return damageTypes
    .map((type) => DAMAGE_TYPE_LABELS[type] ? localize(DAMAGE_TYPE_LABELS[type]) : type)
    .filter(Boolean)
    .join(", ");
}

function collectNarrationData(message) {
  const damageTypes = getDamageTypes(message);
  const data = {
    attacker: getActorName(message),
    target: getTargetName(message),
    item: getItemName(message),
    outcome: getOutcome(message),
    damage: getDamageTotal(message),
    damageTypes,
    damageTypesLabel: getLocalizedDamageTypes(damageTypes)
  };

  console.log(`${MODULE_ID} | Damage message data`, data, message);
  return data;
}

function createSimpleNarration(data) {
  const hasDamage = Number.isFinite(Number(data.damage));
  const hasDamageTypes = data.damageTypesLabel.length > 0;
  const itemText = data.item ? format("PF2E_NARRATIVE_FORGE.Chat.WithItem", { item: data.item }) : "";
  const damageText = hasDamage ? format("PF2E_NARRATIVE_FORGE.Chat.DamageText", { damage: data.damage }) : localize("PF2E_NARRATIVE_FORGE.Chat.DamageTextUnknown");
  const typeText = hasDamageTypes ? format("PF2E_NARRATIVE_FORGE.Chat.DamageTypeText", { damageTypes: data.damageTypesLabel }) : "";

  const key = data.outcome === "critical"
    ? "PF2E_NARRATIVE_FORGE.Chat.SimpleCriticalNarration"
    : "PF2E_NARRATIVE_FORGE.Chat.SimpleHitNarration";

  return format(key, {
    attacker: data.attacker,
    target: data.target,
    itemText,
    damageText,
    typeText
  });
}

async function createNarration(message) {
  const data = collectNarrationData(message);
  const text = createSimpleNarration(data);

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: message.actor }),
    content: `<div class="pf2e-narrative-forge-card"><strong>${escapeHtml(localize("PF2E_NARRATIVE_FORGE.Chat.Title"))}</strong><p>${escapeHtml(text)}</p></div>`
  });
}

function injectNarrationButton(message, html) {
  if (!isEnabled()) return;
  const root = html instanceof HTMLElement ? html : html?.[0];
  if (!root) return;
  if (!isPf2eDamageMessage(message, root)) return;
  if (root.querySelector(".pf2e-narrative-forge-button")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("pf2e-narrative-forge-button");
  button.innerHTML = `<i class="fa-solid fa-feather"></i> ${localize("PF2E_NARRATIVE_FORGE.Chat.DescribeButton")}`;
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    await createNarration(message);
  });

  const actions = root.querySelector(".message-content") ?? root;
  actions.appendChild(button);
}

Hooks.once("init", () => {
  console.log(`${MODULE_ID} | Initializing v${MODULE_VERSION}`);

  game.settings.register(MODULE_ID, "enabled", {
    name: localize("PF2E_NARRATIVE_FORGE.Settings.Enabled.Name"),
    hint: localize("PF2E_NARRATIVE_FORGE.Settings.Enabled.Hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
});

Hooks.on("renderChatMessageHTML", (message, html) => {
  injectNarrationButton(message, html);
});

Hooks.on("renderChatMessage", (message, html) => {
  injectNarrationButton(message, html);
});

Hooks.once("ready", () => {
  if (!isEnabled()) {
    console.log(`${MODULE_ID} | Module is disabled via settings.`);
    return;
  }

  console.log(`${MODULE_ID} | Ready.`);
});
