export function localizeKey(key) {
  const value = game.i18n.localize(key);
  return value === key ? null : value;
}

export function pickKey(keys) {
  if (!Array.isArray(keys) || keys.length === 0) return null;
  const available = keys.filter((key) => localizeKey(key));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

export function pickLocalized(keys) {
  const key = pickKey(keys);
  return key ? localizeKey(key) : null;
}
