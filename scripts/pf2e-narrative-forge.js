const MODULE_ID = "pf2e-narrative-forge";
const MODULE_VERSION = "0.0.6";

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

const DAMAGE_NARRATIONS = {
  slashing: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.3"
  ],
  piercing: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.3"
  ],
  bludgeoning: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.3"
  ],
  fire: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.3"
  ],
  cold: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.3"
  ],
  electricity: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.3"
  ],
  acid: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.3"
  ],
  force: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.force.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.force.2"
  ],
  mental: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.mental.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.mental.2"
  ],
  poison: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.poison.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.poison.2"
  ],
  spirit: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.spirit.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.spirit.2"
  ],
  vitality: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.vitality.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.vitality.2"
  ],
  void: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.void.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.void.2"
  ],
  fallback: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fallback.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fallback.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fallback.3"
  ]
};

const CRITICAL_NARRATIONS = [
  "PF2E_NARRATIVE_FORGE.Narration.Critical.1",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.2",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.3"
];

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
  const hasDamageRollClass = content.includes("damage-roll") || Boolean(root?.querySelector?.(".damage-roll"));
  const hasDamageApplication = Boolean(
    root?.querySelector?.("[data-action='applyDamage']") ||
    root?.querySelector?.("[data-action='apply-damage']") ||
    content.includes("data-action=\"applyDamage\"") ||
    content.includes("data-action=\"apply-damage\"")
  );

  if (hasDamageRollClass && hasDamageApplication) {
    console.debug(`${MODULE_ID} | Accepted damage message via rendered damage card fallback.`, message);
    return true;
  }

  console.debug(`${MODULE_ID} | Ignored non-damage chat message.`, {
    contextType,
    messageType: message.type,
    hasDamageRollClass: Boolean(hasDamageRollClass),
    hasDamageApplication,
    message
  });
  return false;
}

function resolveActorFromUuid(uuid) {
  if (!uuid || typeof fromUuidSync !== "function") return null;
  try {
    const document = fromUuidSync(uuid);
    return document?.actor ?? document;
  } catch (error) {
    console.debug(`${MODULE_ID} | Could not resolve UUID.`, uuid, error);
    return null;
  }
}

function getActorName(message) {
  const originActor = resolveActorFromUuid(getMessageFlag(message, "flags.pf2e.origin.actor"));
  const actor = originActor ?? message.actor ?? game.actors?.get(message.speaker?.actor);
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
    getMessageFlag(message, "flags.pf2e.origin.item")?.name ??
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
    flavors: message.rolls?.map((roll) => roll?.options?.flavor ?? roll?.flavor),
    instances: getMessageFlag(message, "flags.pf2e.context.damage.instances")
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
    entry.includes("outcome:critical") ||
    entry === "critical"
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

function simplifyRollTerms(term) {
  if (!term) return null;
  return {
    class: term.constructor?.name ?? null,
    formula: term.formula ?? null,
    total: term.total ?? null,
    number: term.number ?? null,
    faces: term.faces ?? null,
    modifiers: term.modifiers ?? null,
    options: term.options ?? null,
    flavor: term.flavor ?? null
  };
}

function getRollDiagnostics(message) {
  return (message.rolls ?? []).map((roll, index) => ({
    index,
    class: roll?.constructor?.name ?? null,
    formula: roll?.formula ?? null,
    total: roll?.total ?? null,
    options: roll?.options ?? null,
    flavor: roll?.options?.flavor ?? roll?.flavor ?? null,
    domains: roll?.options?.domains ?? null,
    dice: roll?.dice?.map((die) => ({
      class: die.constructor?.name ?? null,
      formula: die.formula ?? null,
      total: die.total ?? null,
      number: die.number ?? null,
      faces: die.faces ?? null,
      modifiers: die.modifiers ?? null,
      options: die.options ?? null,
      flavor: die.flavor ?? null
    })) ?? [],
    terms: roll?.terms?.map(simplifyRollTerms) ?? []
  }));
}

function getPf2eContextDiagnostics(message) {
  return {
    context: getMessageFlag(message, "flags.pf2e.context") ?? null,
    origin: getMessageFlag(message, "flags.pf2e.origin") ?? null,
    target: getMessageFlag(message, "flags.pf2e.target") ?? null,
    damageRoll: getMessageFlag(message, "flags.pf2e.damageRoll") ?? null,
    modifiers: getMessageFlag(message, "flags.pf2e.modifiers") ?? null
  };
}

function collectDamageInstances(message) {
  const contextDamage = getMessageFlag(message, "flags.pf2e.context.damage") ?? {};
  const candidates = [
    contextDamage.instances,
    contextDamage.rolls,
    getMessageFlag(message, "flags.pf2e.damageRoll.instances"),
    getMessageFlag(message, "flags.pf2e.damageRoll.rolls")
  ];

  const instances = [];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const entries = Array.isArray(candidate) ? candidate : Object.values(candidate);
    for (const entry of entries) {
      if (!entry || typeof entry !== "object") continue;
      instances.push({
        type: entry.type ?? entry.damageType ?? entry.damageTypeId ?? entry.category ?? null,
        category: entry.category ?? null,
        formula: entry.formula ?? entry.value ?? null,
        total: entry.total ?? entry.damage ?? null,
        precision: entry.precision ?? null,
        persistent: entry.persistent ?? null,
        traits: entry.traits ?? entry.options ?? null,
        label: entry.label ?? entry.name ?? null
      });
    }
  }

  return instances;
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
    damageTypesLabel: getLocalizedDamageTypes(damageTypes),
    damageInstances: collectDamageInstances(message),
    diagnostics: {
      speaker: message.speaker,
      pf2e: getPf2eContextDiagnostics(message),
      rolls: getRollDiagnostics(message)
    }
  };

  console.groupCollapsed(`${MODULE_ID} | Damage message data v${MODULE_VERSION}`);
  console.log("Extracted", data);
  console.log("PF2e diagnostics", data.diagnostics.pf2e);
  console.log("Roll diagnostics", data.diagnostics.rolls);
  console.log("ChatMessage", message);
  console.groupEnd();

  return data;
}

function chooseRandom(entries) {
  if (!Array.isArray(entries) || entries.length === 0) return null;
  return entries[Math.floor(Math.random() * entries.length)];
}

function choosePrimaryDamageType(data) {
  const instanceTypes = data.damageInstances
    .map((instance) => String(instance.type ?? "").toLowerCase())
    .filter((type) => type in DAMAGE_NARRATIONS);

  if (instanceTypes.length) return instanceTypes[0];

  const detectedType = data.damageTypes.find((type) => type in DAMAGE_NARRATIONS);
  return detectedType ?? "fallback";
}

function createNarrativeText(data) {
  const damageType = choosePrimaryDamageType(data);
  const narrationKey = chooseRandom(DAMAGE_NARRATIONS[damageType] ?? DAMAGE_NARRATIONS.fallback);
  const criticalKey = data.outcome === "critical" ? chooseRandom(CRITICAL_NARRATIONS) : null;

  const sentences = [
    narrationKey ? localize(narrationKey) : localize("PF2E_NARRATIVE_FORGE.Narration.Damage.fallback.1"),
    criticalKey ? localize(criticalKey) : null
  ].filter(Boolean);

  return sentences.join(" ");
}
async function createNarration(message) {
  const data = collectNarrationData(message);
  const text = createNarrativeText(data);

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
