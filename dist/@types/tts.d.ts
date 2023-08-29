import { Credentials } from "./sdk";
import { SDKOptions } from "./options";
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
export interface TTSStreamSimplexCallbacks {
    onData?: (data: ArrayBuffer) => void;
}
export interface TTSStreamingOptions {
    format?: string;
    sampleRate?: number;
    save?: boolean;
    voiceType?: string;
}
export declare class TTS {
    private credentials;
    private options;
    constructor(credentials: Credentials, options: SDKOptions);
    getVoices(): Promise<Voice[]>;
    convert(voice: number | Voice, text: string): Promise<AudioResponse>;
    convertStreamDuplex(voice: number | Voice, cb?: TTSStreamDuplexCallbacks, options?: TTSStreamingOptions): Promise<TTSStreamDuplex>;
    convertStreamSimplex(voice: number | Voice, text: string, cb?: TTSStreamSimplexCallbacks, options?: TTSStreamingOptions): Promise<void>;
    private getTTSStreamingQueryParams;
}
