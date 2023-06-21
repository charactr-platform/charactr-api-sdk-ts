import { TTS } from "./tts";
import { VC } from "./vc";
import { SDKOptions } from "./options";
export type Credentials = {
    ClientKey: string;
    APIKey: string;
};
export { SDKOptions } from "./options";
export declare class CharactrAPISDK {
    private credentials;
    private options;
    initialized: boolean;
    tts: TTS;
    vc: VC;
    constructor(credentials: Credentials, options?: SDKOptions);
    init(): Promise<void>;
    checkAuth(): Promise<void>;
}
