# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.0.1] - 2023-08-29

- Exposed save and voiceType settings for TTS Streaming

## [2.0.0] - 2023-08-02

- Changed API URL to [gemelo.ai](https://gemelo.ai)

## [1.4.0] - 2023-07-26

- Changed User-Agent header to custom value to differentiate SDKs in the backend
- Exposed custom audio format and sample rate settings for TTS Streaming

## [1.3.0] - 2023-06-28

- Added new `previewUrls` field to the `Voice` type

## [1.2.1] - 2023-06-21

- Refactored & fixed custom API URLs when SDK is initialized multiple times with different configurations

## [1.2.0] - 2023-05-26

- Allow to override API Urls in SDK initialization (we use this feature internally)

## [1.1.0] - 2023-05-10

- Added TTS Simplex Streaming feature
- Added TTS Duplex Streaming feature
- Updated the README.md

## [1.0.1] - 2023-04-04

We added link to the SDK reference in the README.

## [1.0.0] - 2023-04-04

We are officially releasing the SDK along with few README/package configuration/compatibility fixes.

## [0.0.1] - 2023-03-27

We implemented basic SDK features.

### Added

- TTS module
  - making TTS requests
  - fetching TTS voices
- VC module
  - making VC requests
  - fetching VC voices
