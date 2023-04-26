import { Config } from "./sdk";
import { config } from "./config";
import { AudioResponse, Voice } from "./types";
import { getHeaders, parseAPIError } from "./utils";
import { getValidVoiceIdOrThrow, validateTTSTextOrThrow } from "./validators";
import WebSocket from "isomorphic-ws";

enum WsMsgType {
  AuthApiKey = "authApiKey",
  Convert = "convert",
  SetVoice = "setVoice",
}

export interface TTSStreamDuplex {
  convert: (text: string) => void;
  setVoice: (voice: number | Voice) => void;
  close: () => void;
}

export interface TTSStreamDuplexCallbacks {
  onData: (data: ArrayBuffer) => void;
}

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

  async convertStreamDuplex(
    voiceId: number,
    cb: TTSStreamDuplexCallbacks
  ): Promise<TTSStreamDuplex> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(
        `${config.charactrAPIUrlWs}/v1/tts/stream/ws?voiceId=${voiceId}`
      );

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: WsMsgType.AuthApiKey,
            clientKey: this.config.ClientKey,
            apiKey: this.config.APIKey,
          })
        );
        resolve({
          convert,
          setVoice,
          close,
        });
      };

      ws.onclose = (event: CloseEvent) => {
        reject(new Error(event.reason)); // @TODO
      };

      ws.onerror = (event: ErrorEvent) => {
        console.error(event);
      };

      ws.onmessage = (message: MessageEvent) => {
        if (typeof cb.onData === "function") {
          cb.onData(message.data);
        }
      };

      function validConnectionOrThrow() {
        if (ws.readyState !== WebSocket.OPEN) {
          throw new Error("[CharactrSDK] WebSocket connection is not open!");
        }
      }

      function setVoice(voice: number | Voice) {
        validConnectionOrThrow();
        ws.send(
          JSON.stringify({
            type: WsMsgType.SetVoice,
            voiceId: getValidVoiceIdOrThrow(voice),
          })
        );
      }

      function convert(text: string) {
        validConnectionOrThrow();
        ws.send(
          JSON.stringify({
            type: WsMsgType.Convert,
            text,
          })
        );
      }

      function close() {
        ws.close();
      }
    });
  }
}
