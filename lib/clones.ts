import { Credentials } from "./sdk";
import { SDKOptions } from "./options";
import { Voice } from "./types";
import { getHeaders, parseAPIError } from "./utils";
import { getValidVoiceIdOrThrow } from "./validators";

export class VCC {
  constructor(private config: Credentials, private options: SDKOptions) {}

  async getClonedVoices(): Promise<Voice[]> {
    const response = await fetch(
      `${this.options.charactrAPIUrl}/v1/cloned-voices?limit=500`,
      {
        method: "GET",
        headers: getHeaders(this.config),
      }
    );

    if (!response.ok) {
      throw await parseAPIError(response);
    }

    return response.json().then((res) => {
      return res.items;
    });
  }

  async createClonedVoice(name: string, inputAudio: Blob): Promise<Voice> {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("audio", inputAudio);

    const headers = getHeaders(this.config);
    // Content-Type must be undefined for fetch to automatically append a correct multipart/form-data type with boundary
    delete headers["Content-Type"];

    const response = await fetch(
      `${this.options.charactrAPIUrl}/v1/cloned-voices`,
      {
        method: "POST",
        headers,
        body: formData,
      }
    );

    if (!response.ok) {
      throw await parseAPIError(response);
    }

    return response.json();
  }

  async updateClonedVoice(voice: number | Voice, name: string): Promise<Voice> {
    const headers = getHeaders(this.config);
    const voiceId = getValidVoiceIdOrThrow(voice);

    const response = await fetch(
      `${this.options.charactrAPIUrl}/v1/cloned-voices/${voiceId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          name,
        }),
      }
    );

    if (!response.ok) {
      throw await parseAPIError(response);
    }

    return response.json();
  }

  async deleteClonedVoice(voice: number | Voice) {
    const headers = getHeaders(this.config);
    const voiceId = getValidVoiceIdOrThrow(voice);

    const response = await fetch(
      `${this.options.charactrAPIUrl}/v1/cloned-voices/${voiceId}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!response.ok) {
      throw await parseAPIError(response);
    }
  }
}
