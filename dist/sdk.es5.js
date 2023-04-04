!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}("undefined"!=typeof self?self:this,(()=>(()=>{"use strict";var e={300:(e,t,r)=>{var n=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r.g)return r.g;throw new Error("unable to locate global object")}();e.exports=t=n.fetch,n.fetch&&(t.default=n.fetch.bind(n)),t.Headers=n.Headers,t.Request=n.Request,t.Response=n.Response},735:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0,t.config={charactrAPIUrl:"http://localhost:8015"},Object.freeze(t.config)},205:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function c(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,c)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(u){return function(c){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(r=1,n&&(o=2&c[0]?n.return:c[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,c[1])).done)return o;switch(n=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,n=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],n=0}finally{r=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.CharactrAPISDK=void 0;var i=r(974),a=r(526),c=r(735),u=r(618),s=r(300),l=function(){function e(e){return this.config=e,this.initialized=!1,new Proxy(this,{get:function(e,t){var r=Reflect.get(e,t);if(!r&&!["init","initialized","checkAuth"].includes(String(t)))throw new Error("CharactrAPI is not initialized. Call the init() function first.");return r}})}return e.prototype.init=function(){return n(this,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return[4,this.checkAuth()];case 1:return e.sent(),this.tts=new i.TTS(this.config),this.vc=new a.VC(this.config),this.initialized=!0,[2]}}))}))},e.prototype.checkAuth=function(){return n(this,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return[4,s("".concat(c.config.charactrAPIUrl,"/v1/auth/check"),{method:"POST",headers:(0,u.getHeaders)(this.config)})];case 1:if((e=t.sent()).ok)return[3,3];if(401===e.status)throw new Error("Could not authenticate in the API. Make sure you have provided correct credentials.");return[4,(0,u.parseAPIError)(e)];case 2:throw t.sent();case 3:return[2]}}))}))},e}();t.CharactrAPISDK=l},974:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function c(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,c)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(u){return function(c){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(r=1,n&&(o=2&c[0]?n.return:c[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,c[1])).done)return o;switch(n=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,n=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],n=0}finally{r=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.TTS=void 0;var i=r(735),a=r(618),c=r(117),u=r(300),s=function(){function e(e){this.config=e}return e.prototype.getVoices=function(){return n(this,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return[4,u("".concat(i.config.charactrAPIUrl,"/v1/tts/voices"),{method:"GET",headers:(0,a.getHeaders)(this.config)})];case 1:return(e=t.sent()).ok?[3,3]:[4,(0,a.parseAPIError)(e)];case 2:throw t.sent();case 3:return[2,e.json()]}}))}))},e.prototype.convert=function(e,t){return n(this,void 0,void 0,(function(){var r,n,s,l,f;return o(this,(function(o){switch(o.label){case 0:return(0,c.validateTTSTextOrThrow)(t),r=(0,c.getValidVoiceIdOrThrow)(e),[4,u("".concat(i.config.charactrAPIUrl,"/v1/tts/convert"),{method:"POST",headers:(0,a.getHeaders)(this.config),body:JSON.stringify({voiceId:r,text:t})})];case 1:return(n=o.sent()).ok?[3,3]:[4,(0,a.parseAPIError)(n)];case 2:throw o.sent();case 3:return s=n.headers.get("Content-Type"),f={},l=Blob.bind,[4,n.arrayBuffer()];case 4:return[2,(f.audio=new(l.apply(Blob,[void 0,[o.sent()],{type:s}])),f.durationMs=Number(n.headers.get("Audio-Duration-Ms")),f.sizeBytes=Number(n.headers.get("Audio-Size-Bytes")),f.type=s,f)]}}))}))},e}();t.TTS=s},618:function(e,t){var r=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function c(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,c)}u((n=n.apply(e,t||[])).next())}))},n=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(u){return function(c){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(r=1,n&&(o=2&c[0]?n.return:c[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,c[1])).done)return o;switch(n=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,n=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],n=0}finally{r=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.parseAPIError=t.getHeaders=void 0,t.getHeaders=function(e){return{"Content-Type":"application/json","X-Client-Key":e.ClientKey,"X-Api-Key":e.APIKey}},t.parseAPIError=function(e){return r(this,void 0,void 0,(function(){var t;return n(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,e.json()];case 1:return t=r.sent(),[2,new Error("".concat(null==t?void 0:t.text," (").concat(null==t?void 0:t.code,"): ").concat(null==t?void 0:t.message))];case 2:return r.sent(),[2,new Error("".concat(e.status,": ").concat(e.statusText))];case 3:return[2]}}))}))}},117:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validateTTSTextOrThrow=t.getValidVoiceIdOrThrow=void 0,t.getValidVoiceIdOrThrow=function(e){if(Number.isInteger(e)&&Number(e)>0)return Number(e);if(Number.isInteger(e.id))return e.id;throw new TypeError("Invalid 'voice' argument: must be either a valid integer or a Voice object.")},t.validateTTSTextOrThrow=function(e){if("string"!=typeof e)throw new TypeError("Invalid 'text' argument: must be a string.");if(e.length<1)throw new TypeError("Invalid 'text' argument: must be at least 1 character long.")}},526:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function c(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,c)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(u){return function(c){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(r=1,n&&(o=2&c[0]?n.return:c[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,c[1])).done)return o;switch(n=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,n=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],n=0}finally{r=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.VC=void 0;var i=r(735),a=r(618),c=r(117),u=r(300),s=function(){function e(e){this.config=e}return e.prototype.getVoices=function(){return n(this,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return[4,u("".concat(i.config.charactrAPIUrl,"/v1/vc/voices"),{method:"GET",headers:(0,a.getHeaders)(this.config)})];case 1:return(e=t.sent()).ok?[3,3]:[4,(0,a.parseAPIError)(e)];case 2:throw t.sent();case 3:return[2,e.json()]}}))}))},e.prototype.convert=function(e,t){return n(this,void 0,void 0,(function(){var r,n,s,l,f,h,d;return o(this,(function(o){switch(o.label){case 0:return r=(0,c.getValidVoiceIdOrThrow)(e),(n=new FormData).append("file",t),delete(s=(0,a.getHeaders)(this.config))["Content-Type"],[4,u("".concat(i.config.charactrAPIUrl,"/v1/vc/convert?voiceId=").concat(r),{method:"POST",headers:s,body:n})];case 1:return(l=o.sent()).ok?[3,3]:[4,(0,a.parseAPIError)(l)];case 2:throw o.sent();case 3:return f=l.headers.get("Content-Type"),d={},h=Blob.bind,[4,l.arrayBuffer()];case 4:return[2,(d.audio=new(h.apply(Blob,[void 0,[o.sent()],{type:f}])),d.durationMs=Number(l.headers.get("Audio-Duration-Ms")),d.sizeBytes=Number(l.headers.get("Audio-Size-Bytes")),d.type=f,d)]}}))}))},e}();t.VC=s}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}return r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r(205)})()));