import { Config } from "./sdk";
import { config } from "./config";
import { AudioResponse, Voice } from "./types";
import { getHeaders, parseAPIError } from "./utils";
import { getValidVoiceIdOrThrow } from "./validators";
import * as fetch from "node-fetch";

export class VC {
  constructor(private config: Config) {}

  async getVoices(): Promise<Voice[]> {
    const response = await fetch(`${config.charactrAPIUrl}/v1/vc/voices`, {
      method: "GET",
      headers: getHeaders(this.config),
    });

    if (!response.ok) {
      throw await parseAPIError(response);
    }

    return response.json();
  }

  async convert(
    voice: number | Voice,
    inputAudio: Blob
  ): Promise<AudioResponse> {
    const voiceId = getValidVoiceIdOrThrow(voice);

    const formData = new FormData();
    formData.append("file", inputAudio);

    const headers = getHeaders(this.config);
    // Content-Type must be undefined for fetch to automatically append a correct multipart/form-data type with boundary
    delete headers["Content-Type"];

    const response = await fetch(
      `${config.charactrAPIUrl}/v1/vc/convert?voiceId=${voiceId}`,
      {
        method: "POST",
        headers,
        body: formData,
      }
    );

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
