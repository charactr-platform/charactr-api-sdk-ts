export type VoiceLabel = {
  category: string;
  label: string;
};

export type Voice = {
  id: number;
  name: string;
  description: string;
  previewUrl: string; // @deprecated
  previewUrls: string[];
  labels: VoiceLabel[];
};

export type AudioResponse = {
  durationMs: number;
  sizeBytes: number;
  type: string;
  audio: Blob;
};
