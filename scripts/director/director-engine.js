import { MODULE_ID } from "../constants.js";
import { getSetting } from "../settings.js";
import { pickNarration } from "../selector.js";
import { DIRECTOR_NOTES } from "../content/director/index.js";
import { renderDirectorNote } from "./director-renderer.js";
import { sendDirectorNote } from "./director-output.js";

const FREQUENCY_THRESHOLDS = {
  rare: 25,
  normal: 50,
  frequent: 75,
  always: 100
};

export async function maybeCreateDirectorNote(context) {
  if (!getSetting("directorEnabled")) {
    debugDirector("Skipped", { reason: "disabled" });
    return;
  }

  const frequency = getSetting("directorFrequency") ?? "normal";
  const threshold = FREQUENCY_THRESHOLDS[frequency] ?? 50;
  const roll = Math.floor(Math.random() * 100) + 1;

  if (roll > threshold) {
    debugDirector("Skipped", {
      reason: "frequency",
      frequency,
      threshold,
      roll
    });
    return;
  }

  const creatureType = context.creatureType ?? "humanoid";
  const library = DIRECTOR_NOTES[creatureType] ?? DIRECTOR_NOTES.humanoid;

  const note = pickNarration(
    library,
    context,
    `director:${creatureType}`
  );

  if (!note) {
    debugDirector("Skipped", {
      reason: "no-note",
      creatureType
    });
    return;
  }

  const outputMode = getSetting("directorOutputMode") ?? "gmBlind";
  const content = renderDirectorNote({
    note,
    context,
    frequency,
    outputMode
  });

  debugDirector("Generated", {
    creatureType,
    frequency,
    threshold,
    roll,
    outputMode,
    selected: {
      id: note.id,
      key: note.key,
      text: note.text
    }
  });

  await sendDirectorNote(content, outputMode);
}

function debugDirector(label, payload) {
  if (!getSetting("debug")) return;
  console.groupCollapsed(`${MODULE_ID} | Director | ${label}`);
  console.log(payload);
  console.groupEnd();
}
