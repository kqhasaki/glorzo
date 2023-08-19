import { ESBuildMinifyPlugin } from "esbuild-loader";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshTypescript from "react-refresh-typescript";
import path from "path";
import webpack, { Configuration } from "webpack";

type Options = {
  // During hot reloading and development it is useful to comment out code while iterating.
  // We ignore errors from unused locals to avoid having to also comment
  // those out while iterating.
  allowUnusedVariables?: boolean;
  /** Specify the app version. */
  version: string;
  /** Specify the path to the tsconfig.json file for ForkTsCheckerWebpackPlugin. If unset, the plugin defaults to finding the config file in the webpack `context` directory. */
  tsconfigPath?: string;
};

export type WebpackArgv = {
  mode?: string;
  env?: {
    WEBPACK_SERVE?: boolean;
    WEBPACK_BUNDLE?: boolean;
    WEBPACK_BUILD?: boolean;
  };
  host?: string;
};

// Create a partial webpack configuration required to build app using webpack.
// Returns a webpack configuration containing resolve, module, plugins, and node fields.
export function makeConfig(
  argv: WebpackArgv,
  options: Options
): Pick<Configuration, "resolve" | "module" | "optimization" | "plugins" | "node" | "externals"> {
  const isDev = argv.mode === "development";
  const isServe = argv.env?.WEBPACK_SERVE ?? false;

  const { allowUnusedVariables = isDev && isServe, version, tsconfigPath } = options;

  return {
    // Workaround for https://github.com/aadsm/jsmediatags/issues/116
    externals: {
      "react-native-fs": "reactNativeFs",
    },
    resolve: {
      extensions: [".js", ".ts", ".jsx", ".tsx"],
      alias: {
        "@glorzo-player": path.resolve(__dirname, "src"),
      },
      fallback: {
        path: require.resolve("path-browserify"),
        stream: require.resolve("readable-stream"),
        zlib: require.resolve("browserify-zlib"),
        crypto: require.resolve("crypto-browserify"),

        // TypeScript tries to use this when running in node
        perf_hooks: false,
        // Yarn patches these imports into TypeScript for PnP support
        // https://github.com/microsoft/TypeScript/pull/35206
        // https://github.com/yarnpkg/berry/pull/2889#issuecomment-849905154
        module: false,

        // These are optional for react-mosaic-component
        "@blueprintjs/core": false,
        "@blueprintjs/icons": false,
        domain: false,

        // don't inject these things into our web build
        fs: false,
        pnpapi: false,

        // punycode is a dependency for some older webpack v4 browser libs
        // It adds unecessary bloat to the build so we make sure it isn't included
        punycode: false,

        // Workaround for https://github.com/react-dnd/react-dnd/issues/3423
        "react/jsx-runtime": "react/jsx-runtime.js",
        "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          resourceQuery: { not: [/raw/] },
          use: [
            {
              loader: "ts-loader", // foxglove-depcheck-used: ts-loader
              options: {
                transpileOnly: true,
                // https://github.com/TypeStrong/ts-loader#onlycompilebundledfiles
                // avoid looking at files which are not part of the bundle
                onlyCompileBundledFiles: true,
                projectReferences: true,
                // Note: configFile should not be overridden, it needs to differ between web,
                // desktop, etc. so that files specific to each build (not just shared files) are
                // also type-checked. The default behavior is to find it from the webpack `context`
                // directory.
                compilerOptions: {
                  sourceMap: true,
                  jsx: isDev ? "react-jsxdev" : "react-jsx",
                },
                getCustomTransformers: () => ({
                  before: [
                    // only include refresh plugin when using webpack server
                    isServe && ReactRefreshTypescript(),
                  ].filter(Boolean),
                }),
              },
            },
          ],
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
      new webpack.ProvidePlugin({
        // since we avoid "import React from 'react'" we shim here when used globally
        React: "react",
        // the buffer module exposes the Buffer class as a property
        Buffer: ["buffer", "Buffer"],
      }),
      new webpack.DefinePlugin({
        // Should match webpack-defines.d.ts
        ReactNull: null, // eslint-disable-line no-restricted-syntax
        GLORZO_PLAYER_VERSION: JSON.stringify(version),
      }),
      // https://webpack.js.org/plugins/ignore-plugin/#example-of-ignoring-moment-locales
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.[\\/]locale$/,
        contextRegExp: /moment$/,
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: tsconfigPath,
          configOverwrite: {
            compilerOptions: {
              noUnusedLocals: !allowUnusedVariables,
              noUnusedParameters: !allowUnusedVariables,
              jsx: isDev ? "react-jsxdev" : "react-jsx",
            },
          },
        },
      }),
    ],
    node: {
      __dirname: true,
      __filename: true,
    },
  };
}
