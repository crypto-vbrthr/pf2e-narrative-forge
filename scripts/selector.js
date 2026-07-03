import { MODULE_ID } from "./constants.js";
import { getSetting } from "./settings.js";

const selectionHistory = new Map();

export function localizeEntry(entry) {
  if (!entry?.key) return null;
  const text = game.i18n.localize(entry.key);
  if (text === entry.key) return null;
  return { weight: 1, tags: [], conditions: {}, ...entry, text };
}

export function pickNarration(library, context = {}, libraryId = "default") {
  if (!Array.isArray(library) || library.length === 0) return null;

  const normalized = library
    .map((entry) => typeof entry === "string"
      ? { id: entry, key: entry, weight: 1, tags: [], conditions: {} }
      : { weight: 1, tags: [], conditions: {}, ...entry }
    )
    .map(localizeEntry)
    .filter(Boolean);

  if (normalized.length === 0) return null;

  const afterConditions = normalized.filter((entry) => matchesConditions(entry.conditions, context));
  const conditionPool = afterConditions.length > 0 ? afterConditions : normalized;

  const historyLength = Math.max(0, Number(getSetting("variationHistoryLength") ?? 5));
  const recent = selectionHistory.get(libraryId) ?? [];
  let afterHistory = conditionPool.filter((entry) => !recent.includes(entry.id));

  if (afterHistory.length === 0) {
    afterHistory = conditionPool;
  }

  const selected = pickWeighted(afterHistory);
  if (!selected) return null;

  remember(libraryId, selected.id, historyLength);

  debugSelection({
    libraryId,
    entries: normalized.length,
    afterConditions: conditionPool.length,
    recent,
    afterHistory: afterHistory.length,
    weightedPool: afterHistory.reduce((sum, entry) => sum + Math.max(1, Number(entry.weight ?? 1)), 0),
    selected: selected.id,
    weight: selected.weight ?? 1,
    tags: selected.tags ?? [],
    conditions: selected.conditions ?? {}
  });

  return selected;
}

export function pickLocalized(library, context = {}, libraryId = "default") {
  return pickNarration(library, context, libraryId)?.text ?? null;
}

function matchesConditions(conditions = {}, context = {}) {
  for (const [key, expected] of Object.entries(conditions)) {
    const actual = context[key];

    if (Array.isArray(expected)) {
      if (!expected.includes(actual)) return false;
      continue;
    }

    if (typeof expected === "boolean") {
      if (Boolean(actual) !== expected) return false;
      continue;
    }

    if (expected !== actual) return false;
  }

  return true;
}

function pickWeighted(entries) {
  const pool = [];

  for (const entry of entries) {
    const weight = Math.max(1, Number(entry.weight ?? 1));
    for (let i = 0; i < weight; i++) {
      pool.push(entry);
    }
  }

  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function remember(libraryId, id, maxLength) {
  if (maxLength <= 0) return;
  const recent = selectionHistory.get(libraryId) ?? [];
  recent.push(id);

  while (recent.length > maxLength) {
    recent.shift();
  }

  selectionHistory.set(libraryId, recent);
}

function debugSelection(payload) {
  if (!getSetting("debug")) return;
  console.log(`${MODULE_ID} | Selector`, payload);
}
