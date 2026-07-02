import { MODULE_ID } from "./constants.js";
import { getSetting } from "./settings.js";

const selectionHistory = new Map();

export function localizeEntry(entry) {
  if (!entry?.key) return null;
  const text = game.i18n.localize(entry.key);
  if (text === entry.key) return null;
  return { ...entry, text };
}

export function pickNarration(library, libraryId = "default") {
  if (!Array.isArray(library) || library.length === 0) return null;

  const available = library
    .map((entry) => typeof entry === "string" ? { id: entry, key: entry, weight: 1 } : entry)
    .map(localizeEntry)
    .filter(Boolean);

  if (available.length === 0) return null;

  const historyLength = Math.max(0, Number(getSetting("variationHistoryLength") ?? 5));
  const recent = selectionHistory.get(libraryId) ?? [];
  let candidates = available.filter((entry) => !recent.includes(entry.id));

  if (candidates.length === 0) {
    candidates = available;
  }

  const selected = candidates[Math.floor(Math.random() * candidates.length)];
  remember(libraryId, selected.id, historyLength);

  debugSelection({
    libraryId,
    available: available.length,
    recent,
    candidates: candidates.length,
    selected: selected.id
  });

  return selected;
}

export function pickLocalized(library, libraryId = "default") {
  return pickNarration(library, libraryId)?.text ?? null;
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
  console.log(`${MODULE_ID} | Variation selector`, payload);
}
