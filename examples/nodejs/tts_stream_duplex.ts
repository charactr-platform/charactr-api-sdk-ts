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
  const stream = await sdk.tts.convertStreamDuplex(voices[0], {
    onData: (data) => {
      fileStream.write(data);
    },
    onClose: (event) => {
      fileStream.end();
      if (event.code === 1000) {
        console.log(
          "result_tts_stream_duplex.wav has been saved successfully."
        );
      } else {
        console.error(`error [${event.code}]: ${event.reason}`);
        console.log(
          "result_tts_stream_duplex.wav has been saved but it can be corrupted or incomplete."
        );
      }
    },
  });
  stream.convert("Hello world from the charactr TTS Streaming.");
  stream.close();
}

nodeTTSStreamExample();
