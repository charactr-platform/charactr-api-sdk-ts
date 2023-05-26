import { Credentials } from "./sdk";

export function getHeaders(credentials: Credentials) {
  return {
    "Content-Type": "application/json",
    "X-Client-Key": credentials.ClientKey,
    "X-Api-Key": credentials.APIKey,
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
