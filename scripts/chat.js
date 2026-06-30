import { MODULE_ID } from "./constants.js";
import { getSetting } from "./settings.js";
import { isDamageMessage, resolveNarrationData } from "./resolver.js";
import { generateNarration } from "./generator.js";
import { sendNarration } from "./output.js";

export function registerChatHooks() {
  Hooks.on("renderChatMessageHTML", (message, html) => onRenderChatMessage(message, html));
}

async function onRenderChatMessage(message, html) {
  if (!getSetting("enabled")) return;
  if (!isDamageMessage(message, html)) {
    debug("Ignored non-damage message", { messageId: message.id });
    return;
  }

  const data = resolveNarrationData(message);
  debug("Damage message data", {
    messageId: message.id,
    damageType: data.damageType,
    creatureType: data.creatureType,
    targetTraits: data.targetTraits,
    critical: data.critical,
    instances: data.damageInstances
  });

  const automationMode = getSetting("automationMode") ?? "button";

  if (automationMode === "all" || (automationMode === "critical" && data.critical)) {
    await sendNarration(generateNarration(data));
    return;
  }

  injectButton(message, html);
}

function injectButton(message, html) {
  const element = html?.[0] ?? html;
  if (!element?.querySelector) return;
  if (element.querySelector(".pf2e-narrative-forge-button")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("pf2e-narrative-forge-button");
  button.innerHTML = `⚔ ${game.i18n.localize("PF2E_NARRATIVE_FORGE.Chat.describe")}`;
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const data = resolveNarrationData(message);
    await sendNarration(generateNarration(data));
  });

  const footer = element.querySelector(".message-content") ?? element;
  footer.append(button);
}

function debug(label, payload) {
  if (!getSetting("debug")) return;
  console.log(`${MODULE_ID} | ${label}`, payload);
}
