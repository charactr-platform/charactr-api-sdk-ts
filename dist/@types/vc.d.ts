import { Config } from "./sdk";
import { AudioResponse, Voice } from "./types";
export declare class VC {
    private config;
    constructor(config: Config);
    getVoices(): Promise<Voice[]>;
    convert(voice: number | Voice, inputAudio: Blob): Promise<AudioResponse>;
}
