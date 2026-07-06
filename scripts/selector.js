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
  if (!Array.isArray(library) || library.length === 0) {
    debugSelection({
      libraryId,
      reason: "empty-library",
      rawEntries: Array.isArray(library) ? library.length : null
    });
    return null;
  }

  const rawEntries = library.map((entry, index) => normalizeEntry(entry, index));
  const localized = rawEntries.map(localizeEntry).filter(Boolean);
  const missingLocalization = rawEntries
    .filter((entry) => !localizeEntry(entry))
    .map((entry) => ({ id: entry.id, key: entry.key }));

  if (localized.length === 0) {
    debugSelection({
      libraryId,
      reason: "no-localized-entries",
      rawEntries: rawEntries.length,
      missingLocalization
    });
    return null;
  }

  const conditionMatches = localized.filter((entry) => matchesConditions(entry.conditions, context));
  const conditionPool = conditionMatches.length > 0 ? conditionMatches : localized;

  const historyLength = Math.max(0, Number(getSetting("variationHistoryLength") ?? 5));
  const historyBefore = [...(selectionHistory.get(libraryId) ?? [])];

  let afterHistory = conditionPool.filter((entry) => !historyBefore.includes(entry.id));
  const historyFilteredIds = conditionPool
    .filter((entry) => historyBefore.includes(entry.id))
    .map((entry) => entry.id);

  let historyFallbackUsed = false;
  if (afterHistory.length === 0) {
    afterHistory = conditionPool;
    historyFallbackUsed = true;
  }

  const selected = pickWeighted(afterHistory);
  if (!selected) {
    debugSelection({
      libraryId,
      reason: "no-selected-entry",
      rawEntries: rawEntries.length,
      localized: localized.length,
      conditionPool: conditionPool.length,
      afterHistory: afterHistory.length
    });
    return null;
  }

  remember(libraryId, selected.id, historyLength);
  const historyAfter = [...(selectionHistory.get(libraryId) ?? [])];

  debugSelection({
    libraryId,
    rawEntries: rawEntries.length,
    localized: localized.length,
    missingLocalization,
    contextSnapshot: {
      damageType: context.damageType,
      creatureType: context.creatureType,
      critical: context.critical,
      style: context.style
    },
    conditionMatches: conditionMatches.length,
    conditionFallbackUsed: conditionMatches.length === 0,
    historyLength,
    historyBefore,
    historyFilteredIds,
    afterHistory: afterHistory.length,
    historyFallbackUsed,
    candidateIds: afterHistory.map((entry) => entry.id),
    weightedPool: afterHistory.reduce((sum, entry) => sum + Math.max(1, Number(entry.weight ?? 1)), 0),
    selected: {
      id: selected.id,
      key: selected.key,
      weight: selected.weight ?? 1,
      tags: selected.tags ?? [],
      conditions: selected.conditions ?? {},
      text: selected.text
    },
    historyAfter,
    historyMap: dumpHistory()
  });

  return selected;
}

export function pickLocalized(library, context = {}, libraryId = "default") {
  return pickNarration(library, context, libraryId)?.text ?? null;
}

function normalizeEntry(entry, index) {
  if (typeof entry === "string") {
    return {
      id: entry,
      key: entry,
      weight: 1,
      tags: [],
      conditions: {}
    };
  }

  return {
    id: entry?.id ?? `entry_${index}`,
    key: entry?.key ?? entry?.id ?? `entry_${index}`,
    weight: entry?.weight ?? 1,
    tags: entry?.tags ?? [],
    conditions: entry?.conditions ?? {}
  };
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

  const recent = [...(selectionHistory.get(libraryId) ?? [])];
  recent.push(id);

  while (recent.length > maxLength) {
    recent.shift();
  }

  selectionHistory.set(libraryId, recent);
}

function dumpHistory() {
  return Object.fromEntries(
    [...selectionHistory.entries()].map(([key, value]) => [key, [...value]])
  );
}

function debugSelection(payload) {
  if (!getSetting("debug")) return;
  console.groupCollapsed(`${MODULE_ID} | Selector | ${payload.libraryId ?? "unknown"}`);
  console.log(payload);
  console.groupEnd();
}
