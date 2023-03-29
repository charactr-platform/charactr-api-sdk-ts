# charactr-api-sdk-ts

JavaScript/TypeScript SDK to interact with the charactr API.

## Terminology
**VC** - *Voice conversion* - converting one voice from audio input to another voice.

**TTS** - *Text to speech* - converting text to voice audio.

## Features

- making TTS requests
- making VC requests
- getting lists of available voices

## Installation
```bash
$ yarn add charactr-api-sdk-ts

# Only for Node.JS < v17.x.x
$ yarn add node-fetch
```

## Usage

For the detailed SDK usage, please refer to the `./examples` directory.

## How to run examples

### Node.JS

1. Clone & install SDK locally
```bash
$ git clone https://github.com/charactr-api-sdk-ts
$ yarn install
$ npm install -g ts-node
```

2. Open `./examples/credentials.ts` and paste your **ClientKey** and **APIKey** inside.

#### Use TTS
```bash
$ ts-node ./examples/nodejs/tts.ts
```

#### Use VC
```bash
$ ts-node ./examples/nodejs/vc.ts
```

### Browser

Navigate go `./examples/browser/` and open `index.html` example in your browser of choice. Provided sample uses ESModules.
