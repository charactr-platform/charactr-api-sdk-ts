import { CharactrAPISDK } from "../../lib/sdk";
import * as fs from "fs";
import { credentials } from "../credentials.js";

async function nodeVCExample() {
  const sdk = new CharactrAPISDK(credentials);

  await sdk.init();

  const voices = await sdk.vc.getVoices();

  const inputAudio = fs.readFileSync(__dirname + "/input.wav");
  const inputAudioBlob = new Blob([inputAudio]);

  const result = await sdk.vc.convert(voices[0].id, inputAudioBlob);

  console.log(result);

  fs.writeFileSync(
    "./result_vc.wav",
    Buffer.from(await result.audio.arrayBuffer())
  );
}

nodeVCExample();
