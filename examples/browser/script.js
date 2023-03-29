import { credentials } from "../credentials.js";
import { CharactrAPISDK } from "../../dist/sdk.esm.js";

const ttsLoading = document.querySelector("#ttsLoading");
const ttsVoiceIdInput = document.querySelector("#ttsVoiceId");
const textInput = document.querySelector("#text");
const ttsAudioEl = document.querySelector("#ttsAudio");

const vcLoading = document.querySelector("#vcLoading");
const vcVoiceIdInput = document.querySelector("#vcVoiceId");
const vcInputAudio = document.querySelector("#vcInputAudio");
const vcAudioEl = document.querySelector("#vcAudio");

let sdk;
let ttsVoices;
let vcVoices;

try {
  sdk = new CharactrAPISDK(credentials);
  await sdk.init();

  ttsVoices = await sdk.tts.getVoices();
  ttsVoiceIdInput.value = ttsVoices[0].id;

  vcVoices = await sdk.vc.getVoices();
  vcVoiceIdInput.value = vcVoices[0].id;
} catch (e) {
  alert(e);
}

document
  .querySelector("#convertTTSButton")
  .addEventListener("click", async () => {
    try {
      ttsLoading.style.visibility = "visible";
      const result = await sdk.tts.convert(
        Number(ttsVoiceIdInput.value),
        textInput.value
      );

      ttsAudioEl.src = URL.createObjectURL(result.audio);
    } catch (e) {
      alert(e);
    } finally {
      ttsLoading.style.visibility = "hidden";
    }
  });

document
  .querySelector("#convertVCButton")
  .addEventListener("click", async () => {
    try {
      vcLoading.style.visibility = "visible";
      const result = await sdk.vc.convert(
        Number(vcVoiceIdInput.value),
        vcInputAudio.files[0]
      );

      vcAudioEl.src = URL.createObjectURL(result.audio);
    } catch (e) {
      alert(e);
    } finally {
      vcLoading.style.visibility = "hidden";
    }
  });
