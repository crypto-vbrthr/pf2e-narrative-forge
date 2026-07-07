import { MODULE_ID } from "./constants.js";
import { getSetting } from "./settings.js";
import { DAMAGE } from "./content/damage.js";
import { CREATURES } from "./content/creatures.js";
import { COMBINATIONS } from "./content/combinations.js";
import { CRITICAL, FLOURISH } from "./content/critical.js";
import { DIRECTOR_NOTES } from "./content/director/index.js";

export function validateContentLibraries() {
  if (!getSetting("debug")) return;

  const libraries = {
    ...prefixLibraries("damage", DAMAGE),
    ...prefixLibraries("creature", CREATURES),
    ...prefixLibraries("combination", COMBINATIONS),
    ...prefixLibraries("director", DIRECTOR_NOTES),
    critical: CRITICAL,
    flourish: FLOURISH
  };

  console.groupCollapsed(`${MODULE_ID} | Content Validator`);

  for (const [libraryId, library] of Object.entries(libraries)) {
    validateLibrary(libraryId, library);
  }

  console.groupEnd();
}

function prefixLibraries(prefix, object) {
  return Object.fromEntries(
    Object.entries(object ?? {}).map(([key, value]) => [`${prefix}:${key}`, value])
  );
}

function validateLibrary(libraryId, library) {
  if (!Array.isArray(library)) {
    console.warn(`${libraryId}: not an array`, library);
    return;
  }

  const normalized = library.map((entry, index) => normalizeEntry(entry, index));
  const localized = normalized.map((entry) => ({
    ...entry,
    text: localize(entry.key)
  }));

  const ids = localized.map((entry) => entry.id);
  const keys = localized.map((entry) => entry.key);
  const texts = localized.map((entry) => entry.text).filter(Boolean);
  const duplicateIds = duplicates(ids);
  const duplicateKeys = duplicates(keys);
  const duplicateTexts = duplicates(texts);
  const missingLocalization = localized
    .filter((entry) => !entry.text)
    .map((entry) => ({ id: entry.id, key: entry.key }));

  const payload = {
    libraryId,
    entries: library.length,
    uniqueIds: new Set(ids).size,
    uniqueKeys: new Set(keys).size,
    uniqueTexts: new Set(texts).size,
    duplicateIds,
    duplicateKeys,
    duplicateTexts,
    missingLocalization,
    entriesDetail: localized.map((entry) => ({
      id: entry.id,
      key: entry.key,
      text: entry.text,
      tags: entry.tags ?? [],
      conditions: entry.conditions ?? {}
    }))
  };

  const hasIssue = duplicateIds.length || duplicateKeys.length || duplicateTexts.length || missingLocalization.length;

  if (hasIssue) {
    console.warn(`${libraryId} | issues detected`, payload);
  } else {
    console.log(`${libraryId} | ok`, payload);
  }
}

function normalizeEntry(entry, index) {
  if (typeof entry === "string") {
    return {
      id: entry,
      key: entry,
      tags: [],
      conditions: {}
    };
  }

  return {
    id: entry?.id ?? `entry_${index}`,
    key: entry?.key ?? entry?.id ?? `entry_${index}`,
    tags: entry?.tags ?? [],
    conditions: entry?.conditions ?? {}
  };
}

function localize(key) {
  const value = game.i18n.localize(key);
  return value === key ? null : value;
}

function duplicates(values) {
  const seen = new Set();
  const repeated = new Set();

  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }

  return [...repeated];
}
