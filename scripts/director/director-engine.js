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
  console.groupCollapsed(`${MODULE_ID} | Director Engine | START`);
  console.log("[00] Incoming context", context);

  try {
    const enabled = getSetting("directorEnabled");
    const outputMode = getSetting("directorOutputMode") ?? "gmBlind";
    const frequency = getSetting("directorFrequency") ?? "normal";
    const threshold = FREQUENCY_THRESHOLDS[frequency] ?? 50;
    const roll = Math.floor(Math.random() * 100) + 1;
    const passed = roll <= threshold;

    console.log("[01] Settings", {
      directorEnabled: enabled,
      directorOutputMode: outputMode,
      directorFrequency: frequency
    });

    if (!enabled) {
      console.warn("EXIT: Disabled");
      return;
    }

    console.log("[02] Frequency Check", {
      frequency,
      threshold,
      roll,
      passed
    });

    if (!passed) {
      console.warn("EXIT: Frequency");
      return;
    }

    const creatureType = context?.creatureType ?? "humanoid";
    const libraryId = `director:${creatureType}`;
    const library = DIRECTOR_NOTES?.[creatureType] ?? DIRECTOR_NOTES?.humanoid;

    console.log("[03] Context Summary", {
      creatureType,
      damageType: context?.damageType,
      critical: context?.critical,
      damage: context?.damage,
      targetTraits: context?.targetTraits
    });

    console.log("[04] Library", {
      requestedLibrary: libraryId,
      usingFallback: !DIRECTOR_NOTES?.[creatureType],
      entries: Array.isArray(library) ? library.length : null,
      entryIds: Array.isArray(library) ? library.map((entry) => entry.id ?? entry.key ?? entry) : []
    });

    if (!Array.isArray(library) || library.length === 0) {
      console.warn("EXIT: No Library");
      return;
    }

    console.log("[05] Calling pickNarration()");
    const note = pickNarration(
      library,
      context,
      libraryId
    );

    console.log("[05] Selected Note", note);

    if (!note) {
      console.warn("EXIT: No Note");
      return;
    }

    console.log("[06] Rendering Director Note...");
    let content;
    try {
      content = renderDirectorNote({
        note,
        context,
        frequency,
        outputMode
      });
    } catch (error) {
      console.error("EXIT: Renderer", error);
      return;
    }

    console.log("[06] Rendered HTML", {
      length: content?.length ?? 0,
      preview: String(content ?? "").slice(0, 500)
    });

    console.log("[07] Creating ChatMessage...", {
      outputMode
    });

    try {
      const message = await sendDirectorNote(content, outputMode);
      console.log("[07] ChatMessage created", message);
      console.log("EXIT: Success");
    } catch (error) {
      console.error("EXIT: ChatMessage", error);
    }
  } catch (error) {
    console.error("EXIT: Unexpected Error", error);
  } finally {
    console.groupEnd();
  }
}
