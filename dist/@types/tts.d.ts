import { Config } from "./sdk";
import { AudioResponse, Voice } from "./types";
export interface TTSStreamDuplex {
    convert: (text: string) => void;
    setVoice: (voice: number | Voice) => void;
    close: () => void;
}
export interface TTSStreamDuplexCallbacks {
    onData: (data: ArrayBuffer) => void;
}
export declare class TTS {
    private config;
    constructor(config: Config);
    getVoices(): Promise<Voice[]>;
    convert(voice: number | Voice, text: string): Promise<AudioResponse>;
    convertStreamDuplex(voiceId: number, cb: TTSStreamDuplexCallbacks): Promise<TTSStreamDuplex>;
}
