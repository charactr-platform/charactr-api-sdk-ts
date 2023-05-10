import { Config } from "./sdk";
import { config } from "./config";
import { AudioResponse, Voice } from "./types";
import { getHeaders, parseAPIError } from "./utils";
import { getValidVoiceIdOrThrow, validateTTSTextOrThrow } from "./validators";
import WebSocket from "isomorphic-ws";

enum WsMsgType {
  AuthApiKey = "authApiKey",
  Convert = "convert",
  Close = "close",
}

export interface TTSStreamDuplex {
  convert: (text: string) => void;
  /**
   * resolves when there were 5 seconds of stream inactivity
   */
  wait: () => Promise<void>;
  /**
   * terminates the websocket connection immediately
   * in most use cases we advise to use the `close()` method instead
   */
  terminate: () => void;
  /**
   * requests the server to close the connection gracefully
   */
  close: () => void;
}

export interface TTSStreamDuplexCallbacks {
  onData?: (data: ArrayBuffer) => void;
  onClose?: (event: CloseEvent) => void;
}

export interface TTSStreamSimplexCallbacks {
  onData?: (data: ArrayBuffer) => void;
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
    voice: number | Voice,
    cb: TTSStreamDuplexCallbacks
  ): Promise<TTSStreamDuplex> {
    return new Promise((resolve, reject) => {
      const voiceId = getValidVoiceIdOrThrow(voice);

      const ws = new WebSocket(
        `${config.charactrAPIUrlWs}/v1/tts/stream/duplex/ws?voiceId=${voiceId}`
      );

      let streamLastActiveAt = new Date();
      let isClosed = false;

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
          terminate,
          close,
          wait,
        });
      };

      ws.onclose = (event: CloseEvent) => {
        if (typeof cb.onClose === "function") {
          cb.onClose(event);
        }
        reject(new Error(event.reason));
      };

      ws.onmessage = (message: MessageEvent) => {
        if (typeof cb.onData === "function") {
          cb.onData(message.data);
        }
        streamLastActiveAt = new Date();
      };

      function validConnectionOrThrow() {
        if (ws.readyState !== WebSocket.OPEN) {
          throw new Error("[CharactrSDK] WebSocket connection is not open!");
        }

        if (isClosed) {
          throw new Error(
            "[CharactrSDK] WebSocket connection is already closed!"
          );
        }
      }

      function convert(text: string) {
        validConnectionOrThrow();

        ws.send(
          JSON.stringify({
            type: WsMsgType.Convert,
            text,
          })
        );
        streamLastActiveAt = new Date();
      }

      function msSinceStreamLastActive(): number {
        const now = new Date();

        return now.getTime() - streamLastActiveAt.getTime();
      }

      function isStreamActive(): boolean {
        return msSinceStreamLastActive() < 5000;
      }

      async function wait(): Promise<void> {
        return new Promise((resolve) => {
          if (!isStreamActive()) {
            resolve();
          }

          const interval = () => {
            setTimeout(() => {
              if (!isStreamActive()) {
                resolve();
              } else {
                interval();
              }
            }, 500);
          };

          interval();
        });
      }

      function terminate() {
        if (isClosed) {
          return;
        }

        isClosed = true;
        ws.close(1000);
      }

      function close() {
        if (isClosed) {
          return;
        }

        validConnectionOrThrow();

        isClosed = true;
        ws.send(
          JSON.stringify({
            type: WsMsgType.Close,
          })
        );
      }
    });
  }

  async convertStreamSimplex(
    voice: number | Voice,
    text: string,
    cb: TTSStreamSimplexCallbacks
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const voiceId = getValidVoiceIdOrThrow(voice);

      const ws = new WebSocket(
        `${config.charactrAPIUrlWs}/v1/tts/stream/simplex/ws?voiceId=${voiceId}`
      );

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: WsMsgType.AuthApiKey,
            clientKey: this.config.ClientKey,
            apiKey: this.config.APIKey,
          })
        );
        ws.send(
          JSON.stringify({
            type: WsMsgType.Convert,
            text,
          })
        );
      };

      ws.onclose = (event: CloseEvent) => {
        if (event.code === 1000) {
          resolve();
        } else {
          reject(
            new Error(
              `Error [${event.code}]: ${event.reason || "unknown reason"}`
            )
          );
        }
      };

      ws.onmessage = (message: MessageEvent) => {
        if (typeof cb.onData === "function") {
          cb.onData(message.data);
        }
      };
    });
  }
}
