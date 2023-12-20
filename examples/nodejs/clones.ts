import { CharactrAPISDK } from "../../lib/sdk";
import * as fs from "fs";
import { credentials } from "../credentials.js";

async function nodeVoiceCloneExample() {
  const sdk = new CharactrAPISDK(credentials);

  await sdk.init();

  let voiceId = 0;
  {
    const inputAudio = fs.readFileSync(__dirname + "/inputclone.opus");
    const inputAudioBlob = new Blob([inputAudio]);

    let voice = await sdk.voiceClone.createClonedVoice(
      "test-voice-sdk",
      inputAudioBlob
    );
    voiceId = voice.id;
    console.log(`voice has been added: ${voice.id} ${voice.name}`);

    voice = await sdk.voiceClone.updateClonedVoice(
      voiceId,
      "test-voice-sdk-rename"
    );
    console.log(`voice has been updated: ${voice.id} ${voice.name}`);

    const voices = await sdk.voiceClone.getClonedVoices();
    console.log(`Number of cloned voices: ${voices.length}`);
  }

  // tts
  {
    const result = await sdk.tts.convert(voiceId, "Hello world", {
      voiceType: "cloned",
    });

    console.log(result);

    fs.writeFileSync(
      "./result_tts.wav",
      Buffer.from(await result.audio.arrayBuffer())
    );
    console.log("result_tts.wav has been saved.");
  }

  // tts streaming
  {
    const fileStream = fs.createWriteStream("./result_tts_stream_simplex.wav");

    fileStream.on("error", (error) => {
      console.error(
        `An error occurred while writing to the file. Error: ${error.message}`
      );
    });

    const text = "Hello world from the charactr TTS Simplex Streaming.";

    try {
      await sdk.tts.convertStreamSimplex(
        voiceId,
        text,
        {
          onData: (data) => {
            fileStream.write(data);
          },
        },
        {
          voiceType: "cloned",
        }
      );
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

  // vc
  {
    const inputAudio = fs.readFileSync(__dirname + "/input.wav");
    const inputAudioBlob = new Blob([inputAudio]);

    const result = await sdk.vc.convert(voiceId, inputAudioBlob, {
      voiceType: "cloned",
    });

    fs.writeFileSync(
      "./result_vc.wav",
      Buffer.from(await result.audio.arrayBuffer())
    );

    console.log("result_vc.wav has been saved.");
  }

  // delete voice
  await sdk.voiceClone.deleteClonedVoice(voiceId);
  console.log("voice has been deleted");
}

nodeVoiceCloneExample();
