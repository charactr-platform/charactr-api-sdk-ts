import { Config } from "./sdk";
import { AudioResponse, Voice } from "./types";
export declare class TTS {
    private config;
    constructor(config: Config);
    getVoices(): Promise<Voice[]>;
    convert(voice: number | Voice, text: string): Promise<AudioResponse>;
}
