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

For the detailed SDK usage, please refer to the [SDK reference](https://docs.api.charactr.com/reference/typescript-javascript) or the `./examples` directory.

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

### Browser

Navigate go `./examples/browser/` and open `index.html` example in your browser of choice. Provided sample uses ESModules.
