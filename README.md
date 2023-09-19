# charactr-api-sdk-ts

JavaScript/TypeScript SDK to interact with the charactr API.

## Terminology
**VC** - *Voice conversion* - converting one voice from audio input to another voice.

**TTS** - *Text to speech* - converting text to voice audio.

## Requirements

#### Node.js
```
>= v18.0.0
```

## Features

- making TTS requests
- making VC requests
- getting lists of available voices

## Installation
```bash
$ yarn add @charactr/api-sdk
```

## Usage

For the detailed SDK usage, please refer to the [SDK reference](https://docs.api.gemelo.ai/reference/typescript-javascript) or the `./examples` directory.

## Security of using the SDK in browser
The ClientKey and ApiKey required to authenticate the SDK are meant to be private.

Packaging them with the frontend application effectively leaks them publicly and allows anyone to use your Charactr Account directly.

We strongly advise to proxy those requests via your own backend or use the browser SDK only for internal usage.

## How to run examples

### Node.JS

1. Clone & install SDK locally
```bash
$ git clone https://github.com/charactr-platform/charactr-api-sdk-ts
$ yarn install
$ yarn build
$ npm install -g ts-node
```

2. Open `./examples/credentials.ts` and paste your **ClientKey** and **APIKey** inside.

#### Use TTS
```bash
$ ts-node ./examples/nodejs/tts.ts
```

#### Use TTS simplex streaming
```bash
$ ts-node ./examples/nodejs/tts_stream_simplex.ts
```

#### Use TTS duplex streaming
```bash
$ ts-node ./examples/nodejs/tts_stream_duplex.ts
```

#### Use VC
```bash
$ ts-node ./examples/nodejs/vc.ts
```

#### Run ttfb / latency test
```bash
$ ts-node ./examples/nodejs/latency.ts
```

Example output:
```
$ ts-node ./examples/nodejs/latency.ts
Running latency test. Today is Mon, 18 Sep 2023 11:53:29 GMT
serverLatency is 273 ms
voice "20" latency test: ttfb: 635 (server ttfb: 362) | total: 1560
voice "40" latency test: ttfb: 359 (server ttfb: 86) | total: 1281
voice "151" latency test: ttfb: 486 (server ttfb: 213) | total: 1395
voice "222" latency test: ttfb: 881 (server ttfb: 608) | total: 1992
```

### Browser

Navigate go `./examples/browser/` and open `index.html` example in your browser of choice. Provided sample uses ESModules.
