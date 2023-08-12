import { ESBuildMinifyPlugin } from "esbuild-loader";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import { Configuration, DefinePlugin } from "webpack";

import { WebpackArgv } from "glorzo-player/player-base/webpack";
import { WebpackConfigParams } from "./WebpackConfigParams";

export const webpackPreloadConfig =
  (params: WebpackConfigParams) =>
  (_: unknown, argv: WebpackArgv): Configuration => {
    const isDev = argv.mode === "development";

    return {
      context: params.preloadContext,
      entry: params.preloadEntrypoint,
      target: "electron-preload",
      devtool: isDev ? "eval-cheap-module-source-map" : params.prodSourceMap,

      output: {
        publicPath: "",
        filename: "preload.js",
        path: path.join(params.outputPath, "main"),
      },

      module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                // https://github.com/TypeStrong/ts-loader#onlycompilebundledfiles
                // avoid looking at files which are not part of the bundle
                onlyCompileBundledFiles: true,
                projectReferences: true,
              },
            },
          },
        ],
      },

      optimization: {
        removeAvailableModules: true,
        minimizer: [
          new ESBuildMinifyPlugin({
            target: "es2022",
            minify: true,
          }),
        ],
      },

      plugins: [
        new DefinePlugin({
          GLORZO_PRODUCT_NAME: JSON.stringify(params.packageJson.productName),
          GLORZO_PRODUCT_VERSION: JSON.stringify(params.packageJson.version),
          GLORZO_PRODUCT_HOMEPAGE: JSON.stringify(params.packageJson.homepage),
        }),
        new ForkTsCheckerWebpackPlugin(),
      ],

      resolve: {
        extensions: [".js", ".ts", ".tsx", ".json"],
      },
    };
  };
