import { MODULE_ID, MODULE_VERSION } from "./constants.js";
import { registerSettings, getSetting } from "./settings.js";
import { registerChatHooks } from "./chat.js";

Hooks.once("init", () => {
  console.log(`${MODULE_ID} | Initializing v${MODULE_VERSION}`);
  registerSettings();
  registerChatHooks();
});

Hooks.once("ready", () => {
  if (!getSetting("enabled")) return;
  console.log(`${MODULE_ID} | Ready.`);
});
