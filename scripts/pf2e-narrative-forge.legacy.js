const MODULE_ID = "pf2e-narrative-forge";
const MODULE_VERSION = "0.1.2";

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
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.3",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.4",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.5",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.6",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.7",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.8",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.9",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.10",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.11",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.12",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.13",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.14",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.slashing.15"
  ],
  piercing: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.3",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.4",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.5",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.6",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.7",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.8",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.9",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.10",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.11",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.12",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.13",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.14",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.piercing.15"
  ],
  bludgeoning: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.3",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.4",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.5",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.6",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.7",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.8",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.9",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.10",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.11",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.12",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.13",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.14",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.bludgeoning.15"
  ],
  fire: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.3",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.4",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.5",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.6",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.7",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.8",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.9",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.10",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.11",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.fire.12"
  ],
  cold: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.3",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.4",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.5",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.6",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.7",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.cold.8"
  ],
  electricity: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.3",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.4",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.5",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.6",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.7",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.electricity.8"
  ],
  acid: [
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.1",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.2",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.3",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.4",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.5",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.6",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.7",
    "PF2E_NARRATIVE_FORGE.Narration.Damage.acid.8"
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
  "PF2E_NARRATIVE_FORGE.Narration.Critical.3",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.4",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.5",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.6",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.7",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.8",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.9",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.10",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.11",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.12",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.13",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.14",
  "PF2E_NARRATIVE_FORGE.Narration.Critical.15"
];

const TARGET_NARRATIONS = {
  undead: [
    "PF2E_NARRATIVE_FORGE.Narration.Target.undead.1",
    "PF2E_NARRATIVE_FORGE.Narration.Target.undead.2",
    "PF2E_NARRATIVE_FORGE.Narration.Target.undead.3"
  ],
  construct: [
    "PF2E_NARRATIVE_FORGE.Narration.Target.construct.1",
    "PF2E_NARRATIVE_FORGE.Narration.Target.construct.2",
    "PF2E_NARRATIVE_FORGE.Narration.Target.construct.3"
  ],
  ooze: [
    "PF2E_NARRATIVE_FORGE.Narration.Target.ooze.1",
    "PF2E_NARRATIVE_FORGE.Narration.Target.ooze.2",
    "PF2E_NARRATIVE_FORGE.Narration.Target.ooze.3"
  ],
  plant: [
    "PF2E_NARRATIVE_FORGE.Narration.Target.plant.1",
    "PF2E_NARRATIVE_FORGE.Narration.Target.plant.2",
    "PF2E_NARRATIVE_FORGE.Narration.Target.plant.3"
  ],
  animal: [
    "PF2E_NARRATIVE_FORGE.Narration.Target.animal.1",
    "PF2E_NARRATIVE_FORGE.Narration.Target.animal.2",
    "PF2E_NARRATIVE_FORGE.Narration.Target.animal.3"
  ],
  elemental: [
    "PF2E_NARRATIVE_FORGE.Narration.Target.elemental.1",
    "PF2E_NARRATIVE_FORGE.Narration.Target.elemental.2",
    "PF2E_NARRATIVE_FORGE.Narration.Target.elemental.3"
  ],
  humanoid: [
    "PF2E_NARRATIVE_FORGE.Narration.Target.humanoid.1",
    "PF2E_NARRATIVE_FORGE.Narration.Target.humanoid.2",
    "PF2E_NARRATIVE_FORGE.Narration.Target.humanoid.3"
  ]
};


const COMBINATION_NARRATIONS = {
  "slashing-undead": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.slashingUndead.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.slashingUndead.2"
  ],
  "bludgeoning-undead": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.bludgeoningUndead.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.bludgeoningUndead.2"
  ],
  "fire-undead": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.fireUndead.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.fireUndead.2"
  ],
  "bludgeoning-construct": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.bludgeoningConstruct.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.bludgeoningConstruct.2"
  ],
  "electricity-construct": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.electricityConstruct.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.electricityConstruct.2"
  ],
  "acid-ooze": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.acidOoze.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.acidOoze.2"
  ],
  "fire-elemental": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.fireElemental.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.fireElemental.2"
  ],
  "cold-elemental": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.coldElemental.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.coldElemental.2"
  ],
  "slashing-plant": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.slashingPlant.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.slashingPlant.2"
  ],
  "fire-plant": [
    "PF2E_NARRATIVE_FORGE.Narration.Combination.firePlant.1",
    "PF2E_NARRATIVE_FORGE.Narration.Combination.firePlant.2"
  ]
};

const TARGET_CATEGORY_TRAITS = {
  undead: ["undead"],
  construct: ["construct"],
  ooze: ["ooze"],
  plant: ["plant", "fungus"],
  animal: ["animal", "beast"],
  elemental: ["elemental"],
  humanoid: ["humanoid", "human", "elf", "dwarf", "gnome", "goblin", "halfling", "orc", "leshy", "catfolk", "ratfolk", "kobold"]
};


function isEnabled() {
  return game.settings.get(MODULE_ID, "enabled");
}

function getAutoMode() {
  return game.settings.get(MODULE_ID, "autoMode");
}

function getNarrationStyle() {
  return game.settings.get(MODULE_ID, "narrationStyle");
}

function isDebugEnabled() {
  return game.settings.get(MODULE_ID, "debug");
}

function debugLog(...args) {
  if (isDebugEnabled()) console.debug(`${MODULE_ID} |`, ...args);
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
    debugLog(`Accepted damage message via PF2e context type: ${contextType}`, message);
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
    debugLog("Accepted damage message via rendered damage card fallback.", message);
    return true;
  }

  debugLog("Ignored non-damage chat message.", {
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
    debugLog("Could not resolve UUID.", uuid, error);
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

  if (targetName) return targetName;

  const discoveredNames = extractNameCandidates({
    contextTarget: getMessageFlag(message, "flags.pf2e.context.target"),
    pf2eTarget: getMessageFlag(message, "flags.pf2e.target"),
    originTarget: getMessageFlag(message, "flags.pf2e.origin.target")
  });

  return discoveredNames[0] ?? localize("PF2E_NARRATIVE_FORGE.Chat.UnknownTarget");
}


function normalizeTrait(value) {
  return String(value ?? "").trim().toLowerCase();
}

function getTraitArrayFromActor(actor) {
  const traitSources = [
    actor?.system?.traits?.value,
    actor?.system?.traits?.traits?.value,
    actor?.system?.details?.creatureType,
    actor?.system?.details?.ancestry?.trait,
    actor?.system?.details?.ancestry?.name,
    actor?.system?.details?.class?.name
  ];

  const traits = new Set();
  for (const source of traitSources) {
    if (!source) continue;
    const values = Array.isArray(source) ? source : source instanceof Set ? Array.from(source) : [source];
    for (const value of values) {
      const trait = normalizeTrait(value);
      if (trait) traits.add(trait);
    }
  }

  return Array.from(traits).sort();
}

function extractUuidCandidates(value, results = []) {
  if (value === null || value === undefined) return results;

  if (typeof value === "string") {
    if (/^(Actor|Token|Scene)\./.test(value)) results.push(value);
    return results;
  }

  if (Array.isArray(value)) {
    for (const entry of value) extractUuidCandidates(entry, results);
    return results;
  }

  if (typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (["uuid", "actor", "token", "actorUuid", "tokenUuid"].includes(key)) extractUuidCandidates(entry, results);
      else if (typeof entry === "object") extractUuidCandidates(entry, results);
    }
  }

  return results;
}

function extractNameCandidates(value, results = []) {
  if (value === null || value === undefined) return results;

  if (typeof value === "string") return results;

  if (Array.isArray(value)) {
    for (const entry of value) extractNameCandidates(entry, results);
    return results;
  }

  if (typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (key === "name" && typeof entry === "string") results.push(entry);
      else if (typeof entry === "object") extractNameCandidates(entry, results);
    }
  }

  return results;
}

function resolveTargetActorFromFlags(message) {
  const targetData = {
    contextTarget: getMessageFlag(message, "flags.pf2e.context.target"),
    pf2eTarget: getMessageFlag(message, "flags.pf2e.target"),
    originTarget: getMessageFlag(message, "flags.pf2e.origin.target")
  };

  const explicitCandidates = [
    getMessageFlag(message, "flags.pf2e.context.target.actor.uuid"),
    getMessageFlag(message, "flags.pf2e.context.target.actor"),
    getMessageFlag(message, "flags.pf2e.context.target.token.actor.uuid"),
    getMessageFlag(message, "flags.pf2e.context.target.token.uuid"),
    getMessageFlag(message, "flags.pf2e.context.target.uuid"),
    getMessageFlag(message, "flags.pf2e.target.actor.uuid"),
    getMessageFlag(message, "flags.pf2e.target.actor"),
    getMessageFlag(message, "flags.pf2e.target.token.uuid"),
    getMessageFlag(message, "flags.pf2e.origin.target.actor.uuid"),
    getMessageFlag(message, "flags.pf2e.origin.target.actor"),
    getMessageFlag(message, "flags.pf2e.origin.target.token.uuid")
  ].filter(Boolean);

  const discoveredCandidates = extractUuidCandidates(targetData);
  const candidateUuids = Array.from(new Set([...explicitCandidates, ...discoveredCandidates]));

  for (const uuid of candidateUuids) {
    const document = resolveActorFromUuid(uuid);
    const actor = document?.actor ?? document;
    if (actor?.system) return actor;
  }

  return null;
}

function resolveTargetActorByName(message) {
  const targetName = getTargetName(message);
  if (!targetName || targetName === localize("PF2E_NARRATIVE_FORGE.Chat.UnknownTarget")) return null;

  const activeTokens = canvas?.tokens?.placeables ?? [];
  const token = activeTokens.find((candidate) => candidate?.name === targetName || candidate?.actor?.name === targetName);
  if (token?.actor) return token.actor;

  const actor = game.actors?.find?.((candidate) => candidate.name === targetName);
  return actor ?? null;
}

function resolveTargetActorFromCurrentUserTargets() {
  const targets = Array.from(game.user?.targets ?? []);
  if (targets.length !== 1) return null;
  return targets[0]?.actor ?? null;
}

function resolveTargetActor(message) {
  return resolveTargetActorFromFlags(message) ?? resolveTargetActorByName(message) ?? resolveTargetActorFromCurrentUserTargets();
}

function detectTargetCategory(traits) {
  const traitSet = new Set((traits ?? []).map(normalizeTrait));
  for (const [category, categoryTraits] of Object.entries(TARGET_CATEGORY_TRAITS)) {
    if (categoryTraits.some((trait) => traitSet.has(trait))) return category;
  }
  return "unknown";
}

function collectTargetDiagnostics(message) {
  const actor = resolveTargetActor(message);
  const traits = getTraitArrayFromActor(actor);
  const category = detectTargetCategory(traits);

  return {
    name: getTargetName(message),
    actorName: actor?.name ?? null,
    actorType: actor?.type ?? null,
    actorUuid: actor?.uuid ?? null,
    traits,
    category,
    source: actor ? "resolved-actor-or-current-target" : "unresolved"
  };
}

function getLocalizedTargetCategory(category) {
  const key = `PF2E_NARRATIVE_FORGE.TargetCategories.${category}`;
  const localized = localize(key);
  return localized === key ? category : localized;
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
    targetDiagnostics: collectTargetDiagnostics(message),
    diagnostics: {
      speaker: message.speaker,
      pf2e: getPf2eContextDiagnostics(message),
      rolls: getRollDiagnostics(message)
    }
  };

  if (isDebugEnabled()) {
    console.groupCollapsed(`${MODULE_ID} | Damage message data v${MODULE_VERSION}`);
    console.log("Extracted", data);
    console.log("PF2e diagnostics", data.diagnostics.pf2e);
    console.log("Target diagnostics", data.targetDiagnostics);
    console.log("Roll diagnostics", data.diagnostics.rolls);
    console.log("ChatMessage", message);
    console.groupEnd();
  }

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
  const style = getNarrationStyle();
  const damageType = choosePrimaryDamageType(data);
  const targetCategory = data.targetDiagnostics?.category ?? "unknown";
  const combinationKey = `${damageType}-${targetCategory}`;
  const combinationNarrationKey = chooseRandom(COMBINATION_NARRATIONS[combinationKey]);

  const narrationKey = combinationNarrationKey ?? chooseRandom(DAMAGE_NARRATIONS[damageType] ?? DAMAGE_NARRATIONS.fallback);
  const targetKey = combinationNarrationKey ? null : targetCategory !== "unknown" ? chooseRandom(TARGET_NARRATIONS[targetCategory]) : null;
  const criticalKey = data.outcome === "critical" ? chooseRandom(CRITICAL_NARRATIONS) : null;
  const epicKey = style === "epic" ? chooseRandom([
    "PF2E_NARRATIVE_FORGE.Narration.Epic.1",
    "PF2E_NARRATIVE_FORGE.Narration.Epic.2",
    "PF2E_NARRATIVE_FORGE.Narration.Epic.3"
  ]) : null;

  const sentences = [];
  sentences.push(narrationKey ? localize(narrationKey) : localize("PF2E_NARRATIVE_FORGE.Narration.Damage.fallback.1"));

  if (style !== "short") {
    if (targetKey) sentences.push(localize(targetKey));
    if (criticalKey) sentences.push(localize(criticalKey));
  } else if (criticalKey) {
    sentences.push(localize(criticalKey));
  }

  if (epicKey) sentences.push(localize(epicKey));

  debugLog("Narration choice", {
    style,
    damageType,
    targetCategory,
    combinationKey,
    usedCombination: Boolean(combinationNarrationKey),
    narrationKey,
    targetKey,
    criticalKey,
    epicKey
  });

  return sentences.filter(Boolean).join(" ");
}

function shouldAutoNarrate(message) {
  if (!isEnabled()) return false;
  const autoMode = getAutoMode();
  if (autoMode === "manual") return false;
  if (!isPf2eDamageMessage(message, null)) return false;

  const data = collectNarrationData(message);
  if (autoMode === "critical") return data.outcome === "critical";
  if (autoMode === "all") return true;
  return false;
}

function getNarrationOutputMode() {
  return game.settings.get(MODULE_ID, "outputMode") ?? "public";
}

function getGmUserIds() {
  return game.users
    .filter((user) => user.isGM)
    .map((user) => user.id);
}

async function createNarrationMessage(message, content) {
  const outputMode = getNarrationOutputMode();
  const messageData = {
    speaker: ChatMessage.getSpeaker({ actor: message.actor }),
    content
  };

  if (outputMode === "gmWhisper" || outputMode === "gmBlind") {
    messageData.whisper = getGmUserIds();
  }

  if (outputMode === "gmBlind") {
    messageData.blind = true;
  }

  return ChatMessage.create(messageData);
}

async function createNarration(message) {
  const data = collectNarrationData(message);
  const text = createNarrativeText(data);

  await createNarrationMessage(
    message,
    `<div class="pf2e-narrative-forge-card"><strong>${escapeHtml(localize("PF2E_NARRATIVE_FORGE.Chat.Title"))}</strong><p>${escapeHtml(text)}</p></div>`
  );
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

  game.settings.register(MODULE_ID, "autoMode", {
    name: localize("PF2E_NARRATIVE_FORGE.Settings.AutoMode.Name"),
    hint: localize("PF2E_NARRATIVE_FORGE.Settings.AutoMode.Hint"),
    scope: "world",
    config: true,
    type: String,
    default: "manual",
    choices: {
      manual: localize("PF2E_NARRATIVE_FORGE.Settings.AutoMode.Choices.manual"),
      critical: localize("PF2E_NARRATIVE_FORGE.Settings.AutoMode.Choices.critical"),
      all: localize("PF2E_NARRATIVE_FORGE.Settings.AutoMode.Choices.all")
    }
  });

  game.settings.register(MODULE_ID, "narrationStyle", {
    name: localize("PF2E_NARRATIVE_FORGE.Settings.NarrationStyle.Name"),
    hint: localize("PF2E_NARRATIVE_FORGE.Settings.NarrationStyle.Hint"),
    scope: "world",
    config: true,
    type: String,
    default: "normal",
    choices: {
      short: localize("PF2E_NARRATIVE_FORGE.Settings.NarrationStyle.Choices.short"),
      normal: localize("PF2E_NARRATIVE_FORGE.Settings.NarrationStyle.Choices.normal"),
      epic: localize("PF2E_NARRATIVE_FORGE.Settings.NarrationStyle.Choices.epic")
    }
  });

  game.settings.register(MODULE_ID, "debug", {
    name: localize("PF2E_NARRATIVE_FORGE.Settings.Debug.Name"),
    hint: localize("PF2E_NARRATIVE_FORGE.Settings.Debug.Hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_ID, "outputMode", {
    name: localize("PF2E_NARRATIVE_FORGE.Settings.OutputMode.Name"),
    hint: localize("PF2E_NARRATIVE_FORGE.Settings.OutputMode.Hint"),
    scope: "world",
    config: true,
    type: String,
    default: "public",
    choices: {
      public: localize("PF2E_NARRATIVE_FORGE.Settings.OutputMode.Choices.public"),
      gmWhisper: localize("PF2E_NARRATIVE_FORGE.Settings.OutputMode.Choices.gmWhisper"),
      gmBlind: localize("PF2E_NARRATIVE_FORGE.Settings.OutputMode.Choices.gmBlind")
    }
  });
});

Hooks.on("renderChatMessageHTML", (message, html) => {
  injectNarrationButton(message, html);
});

Hooks.on("renderChatMessage", (message, html) => {
  injectNarrationButton(message, html);
});

Hooks.on("createChatMessage", async (message) => {
  try {
    if (shouldAutoNarrate(message)) await createNarration(message);
  } catch (error) {
    console.error(`${MODULE_ID} | Automatic narration failed.`, error);
  }
});

Hooks.once("ready", () => {
  if (!isEnabled()) {
    console.log(`${MODULE_ID} | Module is disabled via settings.`);
    return;
  }

  console.log(`${MODULE_ID} | Ready.`);
});
