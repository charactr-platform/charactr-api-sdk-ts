import { Config } from "./sdk";
import { config } from "./config";
import { AudioResponse, Voice } from "./types";
import { getHeaders, parseAPIError } from "./utils";
import { getValidVoiceIdOrThrow, validateTTSTextOrThrow } from "./validators";

export class TTS {
  constructor(private config: Config) {}

  async getVoices(): Promise<Voice[]> {
    const response = await fetch(`${config.charactrAPIUrl}/v1/tts/voices`, {
      method: "GET",
      headers: getHeaders(this.config),
    });

    if (!response.ok) {
      throw await parseAPIError(response);
    }

    return response.json();
  }

  async convert(voice: number | Voice, text: string): Promise<AudioResponse> {
    validateTTSTextOrThrow(text);
    const voiceId = getValidVoiceIdOrThrow(voice);

    const response = await fetch(`${config.charactrAPIUrl}/v1/tts/convert`, {
      method: "POST",
      headers: getHeaders(this.config),
      body: JSON.stringify({
        voiceId,
        text,
      }),
    });

    if (!response.ok) {
      throw await parseAPIError(response);
    }

    const contentType = response.headers.get("Content-Type");

    return {
      audio: new Blob([await response.arrayBuffer()], { type: contentType }),
      durationMs: Number(response.headers.get("Audio-Duration-Ms")),
      sizeBytes: Number(response.headers.get("Audio-Size-Bytes")),
      type: contentType,
    };
  }
}
