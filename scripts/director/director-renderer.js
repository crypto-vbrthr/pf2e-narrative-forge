export function renderDirectorNote({ note, context, frequency, outputMode }) {
  const title = game.i18n.localize("PF2E_NARRATIVE_FORGE.Director.Chat.title");
  const placeholder = game.i18n.localize("PF2E_NARRATIVE_FORGE.Director.Chat.frameworkTest");

  return `
    <div class="pf2e-narrative-forge-chat-card pf2e-narrative-forge-director-card">
      <strong>🎬 ${title}</strong>
      <p>${placeholder}</p>
      <hr>
      <p><strong>${game.i18n.localize("PF2E_NARRATIVE_FORGE.Director.Chat.library")}:</strong> director:${context.creatureType ?? "unknown"}</p>
      <p><strong>${game.i18n.localize("PF2E_NARRATIVE_FORGE.Director.Chat.selected")}:</strong> ${note?.id ?? "none"}</p>
      <p><strong>${game.i18n.localize("PF2E_NARRATIVE_FORGE.Director.Chat.visibility")}:</strong> ${outputMode}</p>
      <p><strong>${game.i18n.localize("PF2E_NARRATIVE_FORGE.Director.Chat.frequency")}:</strong> ${frequency}</p>
    </div>
  `;
}
