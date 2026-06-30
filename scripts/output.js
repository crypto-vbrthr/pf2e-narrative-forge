import { getSetting } from "./settings.js";

function gmIds() {
  return game.users.filter((user) => user.isGM).map((user) => user.id);
}

export async function sendNarration(content) {
  const outputMode = getSetting("outputMode") ?? "public";
  const messageData = { content };

  if (outputMode === "gmWhisper" || outputMode === "gmBlind") {
    messageData.whisper = gmIds();
  }

  if (outputMode === "gmBlind") {
    messageData.blind = true;
  }

  return ChatMessage.create(messageData);
}
