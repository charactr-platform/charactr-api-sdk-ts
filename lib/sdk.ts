import { TTS } from "./tts";
import { VC } from "./vc";
import { config } from "./config";
import { getHeaders, parseAPIError } from "./utils";

export type Config = {
  ClientKey: string;
  APIKey: string;
};

export class CharactrAPISDK {
  initialized = false;
  tts!: TTS;
  vc!: VC;

  constructor(private config: Config) {
    /*
     * This proxy intercepts class' property access to detect whether the SDK was correctly initialized.
     */
    return new Proxy(this, {
      get: function (target, prop) {
        const allowedPropsBeforeInitialization = [
          "init",
          "initialized",
          "checkAuth",
        ];
        const propValue = Reflect.get(target, prop);

        if (
          !propValue &&
          !allowedPropsBeforeInitialization.includes(String(prop))
        ) {
          throw new Error(
            "CharactrAPI is not initialized. Call the init() function first."
          );
        }

        return propValue;
      },
    });
  }

  async init(): Promise<void> {
    await this.checkAuth();

    this.tts = new TTS(this.config);
    this.vc = new VC(this.config);
    this.initialized = true;
  }

  async checkAuth(): Promise<void> {
    const response = await fetch(`${config.charactrAPIUrl}/v1/auth/check`, {
      method: "POST",
      headers: getHeaders(this.config),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Could not authenticate in the API. Make sure you have provided correct credentials."
        );
      }
      throw await parseAPIError(response);
    }
  }
}
