var e={792:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});var o=null;"undefined"!=typeof WebSocket?o=WebSocket:"undefined"!=typeof MozWebSocket?o=MozWebSocket:void 0!==r.g?o=r.g.WebSocket||r.g.MozWebSocket:"undefined"!=typeof window?o=window.WebSocket||window.MozWebSocket:"undefined"!=typeof self&&(o=self.WebSocket||self.MozWebSocket);const n=o},735:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0,t.config={charactrAPIUrl:"http://localhost:8015",charactrAPIUrlWs:"ws://localhost:8015"},Object.freeze(t.config)},974:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TTS=void 0;const n=r(735),i=r(618),a=r(117),c=o(r(792));var s;!function(e){e.AuthApiKey="authApiKey",e.Convert="convert",e.Close="close"}(s||(s={})),t.TTS=class{config;constructor(e){this.config=e}async getVoices(){const e=await fetch(`${n.config.charactrAPIUrl}/v1/tts/voices`,{method:"GET",headers:(0,i.getHeaders)(this.config)});if(!e.ok)throw await(0,i.parseAPIError)(e);return e.json()}async convert(e,t){(0,a.validateTTSTextOrThrow)(t);const r=(0,a.getValidVoiceIdOrThrow)(e),o=await fetch(`${n.config.charactrAPIUrl}/v1/tts/convert`,{method:"POST",headers:(0,i.getHeaders)(this.config),body:JSON.stringify({voiceId:r,text:t})});if(!o.ok)throw await(0,i.parseAPIError)(o);const c=o.headers.get("Content-Type");return{audio:new Blob([await o.arrayBuffer()],{type:c}),durationMs:Number(o.headers.get("Audio-Duration-Ms")),sizeBytes:Number(o.headers.get("Audio-Size-Bytes")),type:c}}async convertStreamDuplex(e,t){return new Promise(((r,o)=>{const i=(0,a.getValidVoiceIdOrThrow)(e),d=new c.default(`${n.config.charactrAPIUrlWs}/v1/tts/stream/duplex/ws?voiceId=${i}`);let u=new Date,f=!1;function l(){if(d.readyState!==c.default.OPEN)throw new Error("[CharactrSDK] WebSocket connection is not open!");if(f)throw new Error("[CharactrSDK] WebSocket connection is already closed!")}function h(e){l(),d.send(JSON.stringify({type:s.Convert,text:e})),u=new Date}function y(){return(new Date).getTime()-u.getTime()<5e3}async function g(){return new Promise((e=>{y()||e();const t=()=>{setTimeout((()=>{y()?t():e()}),500)};t()}))}function w(){f||(f=!0,d.close(1e3))}function p(){f||(l(),f=!0,d.send(JSON.stringify({type:s.Close})))}d.onopen=()=>{d.send(JSON.stringify({type:s.AuthApiKey,clientKey:this.config.ClientKey,apiKey:this.config.APIKey})),r({convert:h,terminate:w,close:p,wait:g})},d.onclose=e=>{"function"==typeof t.onClose&&t.onClose(e),o(new Error(e.reason))},d.onmessage=e=>{"function"==typeof t.onData&&t.onData(e.data),u=new Date}}))}async convertStreamSimplex(e,t,r){return new Promise(((o,i)=>{const d=(0,a.getValidVoiceIdOrThrow)(e),u=new c.default(`${n.config.charactrAPIUrlWs}/v1/tts/stream/simplex/ws?voiceId=${d}`);u.onopen=()=>{u.send(JSON.stringify({type:s.AuthApiKey,clientKey:this.config.ClientKey,apiKey:this.config.APIKey})),u.send(JSON.stringify({type:s.Convert,text:t}))},u.onclose=e=>{1e3===e.code?o():i(new Error(`Error [${e.code}]: ${e.reason||"unknown reason"}`))},u.onmessage=e=>{"function"==typeof r.onData&&r.onData(e.data)}}))}}},618:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.parseAPIError=t.getHeaders=void 0,t.getHeaders=function(e){return{"Content-Type":"application/json","X-Client-Key":e.ClientKey,"X-Api-Key":e.APIKey}},t.parseAPIError=async function(e){try{const t=await e.json();return new Error(`${t?.text} (${t?.code}): ${t?.message}`)}catch(t){return new Error(`${e.status}: ${e.statusText}`)}}},117:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validateTTSTextOrThrow=t.getValidVoiceIdOrThrow=void 0,t.getValidVoiceIdOrThrow=function(e){if(Number.isInteger(e)&&Number(e)>0)return Number(e);if(Number.isInteger(e.id))return e.id;throw new TypeError("Invalid 'voice' argument: must be either a valid integer or a Voice object.")},t.validateTTSTextOrThrow=function(e){if("string"!=typeof e)throw new TypeError("Invalid 'text' argument: must be a string.");if(e.length<1)throw new TypeError("Invalid 'text' argument: must be at least 1 character long.")}},526:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.VC=void 0;const o=r(735),n=r(618),i=r(117);t.VC=class{config;constructor(e){this.config=e}async getVoices(){const e=await fetch(`${o.config.charactrAPIUrl}/v1/vc/voices`,{method:"GET",headers:(0,n.getHeaders)(this.config)});if(!e.ok)throw await(0,n.parseAPIError)(e);return e.json()}async convert(e,t){const r=(0,i.getValidVoiceIdOrThrow)(e),a=new FormData;a.append("file",t);const c=(0,n.getHeaders)(this.config);delete c["Content-Type"];const s=await fetch(`${o.config.charactrAPIUrl}/v1/vc/convert?voiceId=${r}`,{method:"POST",headers:c,body:a});if(!s.ok)throw await(0,n.parseAPIError)(s);const d=s.headers.get("Content-Type");return{audio:new Blob([await s.arrayBuffer()],{type:d}),durationMs:Number(s.headers.get("Audio-Duration-Ms")),sizeBytes:Number(s.headers.get("Audio-Size-Bytes")),type:d}}}}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,r),i.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{var e=o;Object.defineProperty(e,"X",{value:!0}),e.p=void 0;const t=r(974),n=r(526),i=r(735),a=r(618);e.p=class{config;initialized=!1;tts;vc;constructor(e){return this.config=e,new Proxy(this,{get:function(e,t){const r=Reflect.get(e,t);if(!r&&!["init","initialized","checkAuth"].includes(String(t)))throw new Error("CharactrAPI is not initialized. Call the init() function first.");return r}})}async init(){await this.checkAuth(),this.tts=new t.TTS(this.config),this.vc=new n.VC(this.config),this.initialized=!0}async checkAuth(){const e=await fetch(`${i.config.charactrAPIUrl}/v1/auth/check`,{method:"POST",headers:(0,a.getHeaders)(this.config)});if(!e.ok){if(401===e.status)throw new Error("Could not authenticate in the API. Make sure you have provided correct credentials.");throw await(0,a.parseAPIError)(e)}}}})();var n=o.p,i=o.X;export{n as CharactrAPISDK,i as __esModule};