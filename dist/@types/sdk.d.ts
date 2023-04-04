import { TTS } from "./tts";
import { VC } from "./vc";
export type Config = {
    ClientKey: string;
    APIKey: string;
};
export declare class CharactrAPISDK {
    private config;
    initialized: boolean;
    tts: TTS;
    vc: VC;
    constructor(config: Config);
    init(): Promise<void>;
    checkAuth(): Promise<void>;
}
