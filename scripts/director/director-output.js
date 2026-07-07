function gmIds() {
  return game.users.filter((user) => user.isGM).map((user) => user.id);
}

export async function sendDirectorNote(content, outputMode) {
  const messageData = { content };

  if (outputMode === "gmWhisper" || outputMode === "gmBlind") {
    messageData.whisper = gmIds();
  }

  if (outputMode === "gmBlind") {
    messageData.blind = true;
  }

  console.groupCollapsed("pf2e-narrative-forge | Director Output | ChatMessage.create");
  console.log("Output mode", outputMode);
  console.log("Message data", {
    blind: messageData.blind ?? false,
    whisper: messageData.whisper ?? [],
    contentLength: String(content ?? "").length,
    contentPreview: String(content ?? "").slice(0, 500)
  });

  try {
    const message = await ChatMessage.create(messageData);
    console.log("SUCCESS", message);
    return message;
  } catch (error) {
    console.error("FAILED", error);
    throw error;
  } finally {
    console.groupEnd();
  }
}
