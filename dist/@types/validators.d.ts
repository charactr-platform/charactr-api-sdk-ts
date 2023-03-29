import { Voice } from "./types";
export declare function getValidVoiceIdOrThrow(voice: number | Voice): number;
export declare function validateTTSTextOrThrow(text: string): void;
export declare function validateAudioInputOrThrow(audio: Blob): void;
