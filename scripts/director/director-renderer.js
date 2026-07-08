export function renderDirectorNote({ note }) {
  const title = game.i18n.localize("PF2E_NARRATIVE_FORGE.Director.Chat.title");
  const text = note?.text ?? game.i18n.localize("PF2E_NARRATIVE_FORGE.Director.Placeholder.1");

  return `
    <div class="pf2e-narrative-forge-chat-card pf2e-narrative-forge-director-card">
      <strong>🎬 ${title}</strong>
      <p><em>${text}</em></p>
    </div>
  `;
}
