import { CharactrAPISDK } from "../../lib/sdk";
import { credentials } from "../credentials.js";

async function nodeLatencyExample() {
  const sdk = new CharactrAPISDK(credentials);

  await sdk.init();

  console.log(`Running latency test. Today is ${new Date().toUTCString()}`);

  // get server latency
  const serverStart = Date.now();
  await fetch("https://api.gemelo.ai/", { method: "HEAD" });
  const serverLatency = Date.now() - serverStart;
  console.log(`serverLatency is ${serverLatency} ms`);

  // get voice latencies
  const voices = [20, 40, 151, 222];
  for (const v of voices) {
    let startTime = 0;
    let timeToFirstByte = 0;
    const stream = await sdk.tts.convertStreamDuplex(v, {
      onData: (data) => {
        if (!timeToFirstByte) {
          timeToFirstByte = Date.now();
        }
      },
      onClose: (event) => {
        if (event.code === 1000) {
          const endTime = Date.now();
          const timeToFirstByteMs = timeToFirstByte - startTime;
          const totalTimeMs = endTime - startTime;
          const ttfbNoLatency = timeToFirstByteMs - serverLatency;
          console.log(
            `voice "${v}" latency test: ttfb: ${timeToFirstByteMs} (server ttfb: ${ttfbNoLatency}) | total: ${totalTimeMs}`
          );
        } else {
          console.error(
            `voice "${v}" latency test failed: error code [${event.code}], msg: ${event.reason}`
          );
        }
      },
    });

    startTime = Date.now();
    stream.convert("Hello world from the charactr TTS Duplex Streaming.");
    stream.close();
    await sleep(2000);
  }
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

nodeLatencyExample();
