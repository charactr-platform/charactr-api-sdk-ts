import { CharactrAPISDK } from "../../lib/sdk";
import * as fs from "fs";
import { credentials } from "../credentials.js";

async function nodeTTSExample() {
  const sdk = new CharactrAPISDK(credentials);

  await sdk.init();

  const voices = await sdk.tts.getVoices();

  const result = await sdk.tts.convert(voices[2].id, "Hello world");

  console.log(result);

  fs.writeFileSync(
    "./result_tts.wav",
    Buffer.from(await result.audio.arrayBuffer())
  );
}

nodeTTSExample();
