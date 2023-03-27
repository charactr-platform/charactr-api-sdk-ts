import { Voice } from "./types";

export function getValidVoiceIdOrThrow(voice: number | Voice): number {
  if (Number.isInteger(voice) && Number(voice) > 0) {
    return Number(voice);
  }

  if (Number.isInteger((voice as Voice).id)) {
    return (voice as Voice).id;
  }

  throw new TypeError(
    "Invalid 'voice' argument: must be either a valid integer or a Voice object."
  );
}

export function validateTTSTextOrThrow(text: string): void {
  if (typeof text !== "string") {
    throw new TypeError("Invalid 'text' argument: must be a string.");
  }

  if (text.length < 1) {
    throw new TypeError(
      "Invalid 'text' argument: must be at least 1 character long."
    );
  }
}

export function validateAudioInputOrThrow(audio: Blob): void {
  if (audio.type !== "audio/wav") {
    throw new Error("Invalid audio type. Expected wav");
  }
}
