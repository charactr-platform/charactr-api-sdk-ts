import { Credentials } from "./sdk";
export declare function getHeaders(credentials: Credentials): {
    "User-Agent": string;
    "Content-Type": string;
    "X-Client-Key": string;
    "X-Api-Key": string;
};
export declare function parseAPIError(response: Response): Promise<Error>;
