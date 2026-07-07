import { MODULE_ID } from "./constants.js";

export function registerSettings() {
  game.settings.register(MODULE_ID, "enabled", {
    name: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.enabled.name"),
    hint: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.enabled.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, "automationMode", {
    name: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.automationMode.name"),
    hint: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.automationMode.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "button",
    choices: {
      button: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.automationMode.choices.button"),
      critical: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.automationMode.choices.critical"),
      all: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.automationMode.choices.all")
    }
  });

  game.settings.register(MODULE_ID, "style", {
    name: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.style.name"),
    hint: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.style.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "normal",
    choices: {
      short: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.style.choices.short"),
      normal: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.style.choices.normal"),
      epic: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.style.choices.epic")
    }
  });

  game.settings.register(MODULE_ID, "outputMode", {
    name: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.outputMode.name"),
    hint: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.outputMode.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "public",
    choices: {
      public: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.outputMode.choices.public"),
      gmWhisper: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.outputMode.choices.gmWhisper"),
      gmBlind: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.outputMode.choices.gmBlind")
    }
  });

  game.settings.register(MODULE_ID, "debug", {
    name: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.debug.name"),
    hint: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.debug.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_ID, "variationHistoryLength", {
    name: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.variationHistoryLength.name"),
    hint: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.variationHistoryLength.hint"),
    scope: "world",
    config: false,
    type: Number,
    default: 5
  });

  game.settings.register(MODULE_ID, "directorEnabled", {
    name: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorEnabled.name"),
    hint: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorEnabled.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_ID, "directorOutputMode", {
    name: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorOutputMode.name"),
    hint: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorOutputMode.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "gmBlind",
    choices: {
      gmBlind: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorOutputMode.choices.gmBlind"),
      gmWhisper: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorOutputMode.choices.gmWhisper"),
      public: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorOutputMode.choices.public")
    }
  });

  game.settings.register(MODULE_ID, "directorFrequency", {
    name: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorFrequency.name"),
    hint: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorFrequency.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "normal",
    choices: {
      rare: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorFrequency.choices.rare"),
      normal: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorFrequency.choices.normal"),
      frequent: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorFrequency.choices.frequent"),
      always: game.i18n.localize("PF2E_NARRATIVE_FORGE.Settings.directorFrequency.choices.always")
    }
  });
}

export function getSetting(key) {
  return game.settings.get(MODULE_ID, key);
}
