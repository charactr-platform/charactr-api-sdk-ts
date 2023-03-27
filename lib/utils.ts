import { Config } from "./sdk";

export function getHeaders(config: Config) {
  return {
    "Content-Type": "application/json",
    "X-Client-Key": config.ClientKey,
    "X-Api-Key": config.APIKey,
  };
}

export async function parseAPIError(response: Response) {
  try {
    const json = await response.json();
    return new Error(`${json?.text} (${json?.code}): ${json?.message}`);
  } catch (e) {
    return new Error(`${response.status}: ${response.statusText}`);
  }
}
