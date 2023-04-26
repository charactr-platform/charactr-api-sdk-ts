import { CharactrAPISDK } from "../../lib/sdk";
import * as fs from "fs";
import { credentials } from "../credentials.js";

async function nodeTTSStreamExample() {
  const sdk = new CharactrAPISDK(credentials);

  await sdk.init();

  const fileStream = fs.createWriteStream("./result_tts_stream_duplex.wav");

  fileStream.on("error", (error) => {
    console.error(
      `An error occurred while writing to the file. Error: ${error.message}`
    );
  });

  const voices = await sdk.tts.getVoices();
  const stream = await sdk.tts.convertStreamDuplex(40, {
    onData: (data) => {
      fileStream.write(data);
    },
  });
  stream.convert("Hello world from the charactr TTS Streaming.");
  stream.setVoice(59);
  stream.convert("You can change the voice in the middle of conversion!");
  setTimeout(() => {
    stream.close();
    fileStream.end();
  }, 5000);
}

nodeTTSStreamExample();
