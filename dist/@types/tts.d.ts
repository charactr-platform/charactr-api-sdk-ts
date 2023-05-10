import { Config } from "./sdk";
import { AudioResponse, Voice } from "./types";
export interface TTSStreamDuplex {
    convert: (text: string) => void;
    wait: () => Promise<void>;
    terminate: () => void;
    close: () => void;
}
export interface TTSStreamDuplexCallbacks {
    onData?: (data: ArrayBuffer) => void;
    onClose?: (event: CloseEvent) => void;
}
export declare class TTS {
    private config;
    constructor(config: Config);
    getVoices(): Promise<Voice[]>;
    convert(voice: number | Voice, text: string): Promise<AudioResponse>;
    convertStreamDuplex(voice: number | Voice, cb: TTSStreamDuplexCallbacks): Promise<TTSStreamDuplex>;
}
