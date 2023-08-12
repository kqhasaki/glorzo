import path from "path";

import { WebpackConfigParams } from "./src/WebpackConfigParams";
import { webpackDevServerConfig } from "./src/webpackDevServerConfig";
import { webpackMainConfig } from "./src/webpackMainConfig";
import { webpackPreloadConfig } from "./src/webpackPreloadConfig";
import { webpackRendererConfig } from "./src/webpackRendererConfig";

import packageJson from "./package.json";

const params: WebpackConfigParams = {
  packageJson,
  outputPath: path.resolve(__dirname, ".webpack"),
  prodSourceMap: "source-map",
  rendererContext: path.resolve(__dirname, "src/renderer"),
  rendererEntrypoint: "./index.tsx",
  mainContext: path.resolve(__dirname, "src/main"),
  mainEntrypoint: "./index.ts",
  preloadContext: path.resolve(__dirname, "src/preload"),
  preloadEntrypoint: "./index.ts",
};

export default [
  webpackDevServerConfig(params),
  webpackMainConfig(params),
  webpackPreloadConfig(params),
  webpackRendererConfig(params),
];
