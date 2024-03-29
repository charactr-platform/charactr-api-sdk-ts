import { Credentials } from "./sdk";
import { SDKOptions } from "./options";
import { AudioResponse, Voice } from "./types";
import { getHeaders, parseAPIError } from "./utils";
import { getValidVoiceIdOrThrow } from "./validators";

export interface VCOptions {
  voiceType?: string;
}

export class VC {
  constructor(private config: Credentials, private options: SDKOptions) {}

  async getVoices(): Promise<Voice[]> {
    const response = await fetch(
      `${this.options.charactrAPIUrl}/v1/vc/voices`,
      {
        method: "GET",
        headers: getHeaders(this.config),
      }
    );

    if (!response.ok) {
      throw await parseAPIError(response);
    }

    return response.json();
  }

  async convert(
    voice: number | Voice,
    inputAudio: Blob,
    options: VCOptions = {}
  ): Promise<AudioResponse> {
    const voiceId = getValidVoiceIdOrThrow(voice);

    const formData = new FormData();
    formData.append("file", inputAudio);

    const headers = getHeaders(this.config);
    // Content-Type must be undefined for fetch to automatically append a correct multipart/form-data type with boundary
    delete headers["Content-Type"];

    const voiceType = options.voiceType || "system";
    const response = await fetch(
      `${this.options.charactrAPIUrl}/v1/vc/convert?voiceId=${voiceId}&voiceType=${voiceType}`,
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
