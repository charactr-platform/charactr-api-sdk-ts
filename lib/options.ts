export type SDKOptions = {
  charactrAPIUrl: string;
  charactrAPIUrlWs: string;
};

export const defaultOptions: SDKOptions = {
  charactrAPIUrl: "https://api.charactr.com",
  charactrAPIUrlWs: "wss://api.charactr.com",
};
