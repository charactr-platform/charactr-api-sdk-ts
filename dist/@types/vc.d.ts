import { Credentials } from "./sdk";
import { SDKOptions } from "./options";
import { AudioResponse, Voice } from "./types";
export declare class VC {
    private config;
    private options;
    constructor(config: Credentials, options: SDKOptions);
    getVoices(): Promise<Voice[]>;
    convert(voice: number | Voice, inputAudio: Blob): Promise<AudioResponse>;
}
