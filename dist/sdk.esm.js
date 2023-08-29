var e={792:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});var o=null;"undefined"!=typeof WebSocket?o=WebSocket:"undefined"!=typeof MozWebSocket?o=MozWebSocket:void 0!==r.g?o=r.g.WebSocket||r.g.MozWebSocket:"undefined"!=typeof window?o=window.WebSocket||window.MozWebSocket:"undefined"!=typeof self&&(o=self.WebSocket||self.MozWebSocket);const n=o},438:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultOptions=void 0,t.defaultOptions={charactrAPIUrl:"https://api.gemelo.ai",charactrAPIUrlWs:"wss://api.gemelo.ai"}},974:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TTS=void 0;const n=r(618),i=r(117),a=o(r(792));var s;!function(e){e.AuthApiKey="authApiKey",e.Convert="convert",e.Close="close"}(s||(s={})),t.TTS=class{credentials;options;constructor(e,t){this.credentials=e,this.options=t}async getVoices(){const e=await fetch(`${this.options.charactrAPIUrl}/v1/tts/voices`,{method:"GET",headers:(0,n.getHeaders)(this.credentials)});if(!e.ok)throw await(0,n.parseAPIError)(e);return e.json()}async convert(e,t){(0,i.validateTTSTextOrThrow)(t);const r=(0,i.getValidVoiceIdOrThrow)(e),o=await fetch(`${this.options.charactrAPIUrl}/v1/tts/convert`,{method:"POST",headers:(0,n.getHeaders)(this.credentials),body:JSON.stringify({voiceId:r,text:t})});if(!o.ok)throw await(0,n.parseAPIError)(o);const a=o.headers.get("Content-Type");return{audio:new Blob([await o.arrayBuffer()],{type:a}),durationMs:Number(o.headers.get("Audio-Duration-Ms")),sizeBytes:Number(o.headers.get("Audio-Size-Bytes")),type:a}}async convertStreamDuplex(e,t={},r={}){return new Promise(((o,n)=>{const i=this.getTTSStreamingQueryParams(e,r),c=new a.default(`${this.options.charactrAPIUrlWs}/v1/tts/stream/duplex/ws?${i.toString()}`);let d=new Date,u=!1,l=!1;function h(){if(c.readyState!==a.default.OPEN)throw new Error("[CharactrSDK] WebSocket connection is not open!");if(u||l)throw new Error("[CharactrSDK] WebSocket connection is already closed!")}function p(e){h(),c.send(JSON.stringify({type:s.Convert,text:e})),d=new Date}function f(){return(new Date).getTime()-d.getTime()<5e3}async function y(){return new Promise((e=>{f()||e();const t=()=>{setTimeout((()=>{f()?t():e()}),500)};t()}))}function w(){u||(u=!0,c.close(1e3))}function g(){h(),l=!0,c.send(JSON.stringify({type:s.Close}))}c.onopen=()=>{c.send(JSON.stringify({type:s.AuthApiKey,clientKey:this.credentials.ClientKey,apiKey:this.credentials.APIKey})),o({convert:p,terminate:w,close:g,wait:y})},c.onclose=e=>{"function"==typeof t.onClose&&t.onClose(e),n(new Error(e.reason))},c.onmessage=e=>{"function"==typeof t.onData&&t.onData(e.data),d=new Date}}))}async convertStreamSimplex(e,t,r={},o={}){return new Promise(((n,i)=>{const c=this.getTTSStreamingQueryParams(e,o),d=new a.default(`${this.options.charactrAPIUrlWs}/v1/tts/stream/simplex/ws?${c.toString()}`);d.onopen=()=>{d.send(JSON.stringify({type:s.AuthApiKey,clientKey:this.credentials.ClientKey,apiKey:this.credentials.APIKey})),d.send(JSON.stringify({type:s.Convert,text:t}))},d.onclose=e=>{1e3===e.code?n():i(new Error(`Error [${e.code}]: ${e.reason||"unknown reason"}`))},d.onmessage=e=>{"function"==typeof r.onData&&r.onData(e.data)}}))}getTTSStreamingQueryParams(e,t){const r=new URLSearchParams({ua:"sdk-ts",voiceId:String((0,i.getValidVoiceIdOrThrow)(e))});return t.sampleRate&&!t.format&&(t.format="wav"),t.format&&r.set("format",t.format),t.sampleRate&&r.set("sr",String(t.sampleRate)),t.save&&r.set("save","true"),t.voiceType&&r.set("voiceType",t.voiceType),r}}},618:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.parseAPIError=t.getHeaders=void 0,t.getHeaders=function(e){return{"User-Agent":"sdk-ts","Content-Type":"application/json","X-Client-Key":e.ClientKey,"X-Api-Key":e.APIKey}},t.parseAPIError=async function(e){try{const t=await e.json();return new Error(`${t?.text} (${t?.code}): ${t?.message}`)}catch(t){return new Error(`${e.status}: ${e.statusText}`)}}},117:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validateTTSTextOrThrow=t.getValidVoiceIdOrThrow=void 0,t.getValidVoiceIdOrThrow=function(e){if(Number.isInteger(e)&&Number(e)>0)return Number(e);if(Number.isInteger(e.id))return e.id;throw new TypeError("Invalid 'voice' argument: must be either a valid integer or a Voice object.")},t.validateTTSTextOrThrow=function(e){if("string"!=typeof e)throw new TypeError("Invalid 'text' argument: must be a string.");if(e.length<1)throw new TypeError("Invalid 'text' argument: must be at least 1 character long.")}},526:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.VC=void 0;const o=r(618),n=r(117);t.VC=class{config;options;constructor(e,t){this.config=e,this.options=t}async getVoices(){const e=await fetch(`${this.options.charactrAPIUrl}/v1/vc/voices`,{method:"GET",headers:(0,o.getHeaders)(this.config)});if(!e.ok)throw await(0,o.parseAPIError)(e);return e.json()}async convert(e,t){const r=(0,n.getValidVoiceIdOrThrow)(e),i=new FormData;i.append("file",t);const a=(0,o.getHeaders)(this.config);delete a["Content-Type"];const s=await fetch(`${this.options.charactrAPIUrl}/v1/vc/convert?voiceId=${r}`,{method:"POST",headers:a,body:i});if(!s.ok)throw await(0,o.parseAPIError)(s);const c=s.headers.get("Content-Type");return{audio:new Blob([await s.arrayBuffer()],{type:c}),durationMs:Number(s.headers.get("Audio-Duration-Ms")),sizeBytes:Number(s.headers.get("Audio-Size-Bytes")),type:c}}}}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,r),i.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{var e=o;Object.defineProperty(e,"X",{value:!0}),e.p=void 0;const t=r(974),n=r(526),i=r(438),a=r(618);e.p=class{credentials;options;initialized=!1;tts;vc;constructor(e,t=i.defaultOptions){return this.credentials=e,this.options=t,new Proxy(this,{get:function(e,t){const r=Reflect.get(e,t);if(!r&&!["init","initialized","checkAuth"].includes(String(t)))throw new Error("CharactrAPI is not initialized. Call the init() function first.");return r}})}async init(){await this.checkAuth(),this.tts=new t.TTS(this.credentials,this.options),this.vc=new n.VC(this.credentials,this.options),this.initialized=!0}async checkAuth(){const e=await fetch(`${this.options.charactrAPIUrl}/v1/auth/check`,{method:"POST",headers:(0,a.getHeaders)(this.credentials)});if(!e.ok){if(401===e.status)throw new Error("Could not authenticate in the API. Make sure you have provided correct credentials.");throw await(0,a.parseAPIError)(e)}}}})();var n=o.p,i=o.X;export{n as CharactrAPISDK,i as __esModule};