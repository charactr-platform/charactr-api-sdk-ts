import { CharactrAPISDK } from "../../lib/sdk";
import * as fs from "fs";
import { credentials } from "../credentials.js";

async function nodeTTSStreamSimplexExample() {
  const sdk = new CharactrAPISDK(credentials);

  await sdk.init();

  const fileStream = fs.createWriteStream("./result_tts_stream_simplex.wav");

  fileStream.on("error", (error) => {
    console.error(
      `An error occurred while writing to the file. Error: ${error.message}`
    );
  });

  const voices = await sdk.tts.getVoices();
  const text = "Hello world from the charactr TTS Simplex Streaming.";

  try {
    await sdk.tts.convertStreamSimplex(voices[0], text, {
      onData: (data) => {
        fileStream.write(data);
      },
    });
    console.log("result_tts_stream_simplex.wav has been saved successfully.");
  } catch (error) {
    console.error(error);
    console.log(
      "result_tts_stream_simplex.wav has been saved but it can be corrupted or incomplete."
    );
  } finally {
    fileStream.end();
  }
}
nodeTTSStreamSimplexExample();
