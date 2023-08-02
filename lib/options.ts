export type SDKOptions = {
  charactrAPIUrl: string;
  charactrAPIUrlWs: string;
};

export const defaultOptions: SDKOptions = {
  charactrAPIUrl: "https://api.gemelo.ai",
  charactrAPIUrlWs: "wss://api.gemelo.ai",
};
