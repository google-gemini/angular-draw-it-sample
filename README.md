# Angular Web Audio melodies sample

Developer sample written in Angular demonstrating Gemini multimodal (image and audio) input and understanding. The user enters a prompt and the app generates images via VertexAI’s image generation which the user can after that preview in a three-dimensional gallery. The user has an input where they can ask a question about the images. Using Web Audio’s Speech Synthesis API we read Gemini’s answer for the images.

<a href="https://idx.google.com/import?url=https://github.com/google-gemini/angular-draw-it-sample">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://cdn.idx.dev/btn/open_dark_32@2x.png">
  <source media="(prefers-color-scheme: light)" srcset="https://cdn.idx.dev/btn/open_light_32@2x.png">
  <img height="32" alt="Open in IDX" src="https://cdn.idx.dev/btn/open_purple_32@2x.png">
</picture>
</a>

## Pre-requisites

1. Node.js and npm
  * Download and install Go: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Gemini API key
  * Launch Google AI Studio: https://aistudio.google.com/
  * Click “Get API Key”

## Getting started

Compile and run the app:

```shell
npm i
npm start
```

In the text box with placeholder "API key" enter your Gemini API key. You can find instructions how to use the app under "Instructions" when you open the user interface.

## API key privacy

Calling the Google AI Gemini API directly from the app frontend is recommended for prototyping only. We strongly recommend that you only call the Google AI Gemini API server-side to keep your API key safe. You risk potentially exposing your API key to malicious actors if you embed the API key directly in your web, mobile, or desktop app or fetch it remotely at runtime.

Find an example how to do this in the following [Gemini tutorials](https://ai.google.dev/gemini-api/docs/get-started).
