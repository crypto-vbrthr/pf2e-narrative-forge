import { CREATURE_PRIORITY } from "./content/creatures.js";

export function isDamageMessage(message, html) {
  const contextType = message.flags?.pf2e?.context?.type;
  if (contextType === "damage-roll" || contextType === "spell-damage-roll") return true;
  if (message.rolls?.some((roll) => roll?.options?.damage || roll?.options?.type === "damage-roll")) return true;
  const element = html?.[0] ?? html;
  return Boolean(element?.querySelector?.(".damage-roll, [data-action='applyDamage'], .damage-taken"));
}

export function resolveNarrationData(message) {
  const context = message.flags?.pf2e?.context ?? {};
  const roll = message.rolls?.[0];
  const damageInstances = collectDamageInstances(message, roll);
  const damageType = dominantDamageType(damageInstances) ?? context.damageType ?? "fallback";
  const target = resolveTarget(message, context);
  const targetActor = target?.actor ?? null;
  const targetTraits = getActorTraits(targetActor);
  const creatureType = resolveCreatureType(targetTraits);

  return {
    messageId: message.id,
    speaker: message.speaker,
    attacker: resolveAttacker(message),
    target,
    targetActor,
    targetTraits,
    creatureType,
    item: resolveItemName(message),
    damage: roll?.total ?? null,
    damageInstances,
    damageType,
    critical: resolveCritical(context)
  };
}

function resolveAttacker(message) {
  const actor = game.actors?.get(message.speaker?.actor);
  return actor?.name ?? message.speaker?.alias ?? game.i18n.localize("PF2E_NARRATIVE_FORGE.Narration.UnknownActor");
}

function resolveItemName(message) {
  return message.flags?.pf2e?.origin?.name
    ?? message.flags?.pf2e?.context?.item?.name
    ?? message.flags?.pf2e?.context?.origin?.name
    ?? null;
}

function resolveCritical(context) {
  const outcome = context.outcome ?? context.degreeOfSuccess;
  return outcome === "criticalSuccess" || outcome === "critical-success" || outcome === 3 || outcome === "critical";
}

function collectDamageInstances(message, roll) {
  const instances = [];
  const pf2eInstances = message.flags?.pf2e?.context?.damage?.instances
    ?? message.flags?.pf2e?.damage?.instances
    ?? [];

  for (const instance of pf2eInstances) {
    const type = instance.type ?? instance.damageType ?? instance.category;
    const value = Number(instance.total ?? instance.value ?? 0);
    if (type) instances.push({ type, value });
  }

  if (instances.length === 0 && roll?.terms) {
    for (const term of roll.terms) {
      const type = term.options?.damageType ?? term.options?.type ?? term.flavor;
      const value = Number(term.total ?? 0);
      if (type) instances.push({ type, value });
    }
  }

  if (instances.length === 0) {
    const damageType = message.flags?.pf2e?.context?.damageType;
    if (damageType) instances.push({ type: damageType, value: Number(roll?.total ?? 0) });
  }

  return instances;
}

function dominantDamageType(instances) {
  if (!Array.isArray(instances) || instances.length === 0) return null;
  const cleaned = instances.filter((instance) => instance?.type);
  if (cleaned.length === 0) return null;
  cleaned.sort((a, b) => Number(b.value ?? 0) - Number(a.value ?? 0));
  return cleaned[0].type;
}

function resolveTarget(message, context) {
  const candidates = [];

  const addToken = (sceneId, tokenId) => {
    if (!tokenId) return;
    const scene = game.scenes?.get(sceneId) ?? canvas?.scene;
    const token = scene?.tokens?.get(tokenId) ?? canvas?.tokens?.get(tokenId)?.document;
    if (token) candidates.push(token);
  };

  const targetData = context.target ?? context.targets?.[0] ?? message.flags?.pf2e?.target;
  if (targetData) {
    addToken(targetData.scene ?? targetData.sceneId ?? canvas?.scene?.id, targetData.token ?? targetData.tokenId ?? targetData.id);
    if (targetData.actor) {
      const actor = game.actors?.get(targetData.actor);
      if (actor) candidates.push({ actor, name: actor.name });
    }
  }

  addToken(context.scene ?? context.sceneId ?? canvas?.scene?.id, context.targetToken ?? context.targetTokenId ?? context.tokenId);

  if (candidates.length === 0 && game.user?.targets?.size === 1) {
    const token = [...game.user.targets][0];
    if (token?.document) candidates.push(token.document);
  }

  const token = candidates[0] ?? null;
  if (!token) return null;

  return { token, actor: token.actor ?? null, name: token.name ?? token.actor?.name ?? null };
}

function getActorTraits(actor) {
  const raw = actor?.system?.traits?.value ?? actor?.system?.traits ?? actor?.traits ?? [];
  if (Array.isArray(raw)) return raw.map(String);
  if (raw instanceof Set) return [...raw].map(String);
  if (typeof raw === "object" && raw !== null && Array.isArray(raw.value)) return raw.value.map(String);
  return [];
}

function resolveCreatureType(traits) {
  const traitSet = new Set((traits ?? []).map((trait) => String(trait).toLowerCase()));
  for (const type of CREATURE_PRIORITY) {
    if (traitSet.has(type)) return type;
  }
  return "humanoid";
}
