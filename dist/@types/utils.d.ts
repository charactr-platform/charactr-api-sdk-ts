import { Config } from "./sdk";
export declare function getHeaders(config: Config): {
    "Content-Type": string;
    "X-Client-Key": string;
    "X-Api-Key": string;
};
export declare function parseAPIError(response: Response): Promise<Error>;
