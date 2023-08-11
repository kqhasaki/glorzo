import path from "path";
import { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const config: Configuration = {
  target: "node",
  entry: "@glorzo-server/app/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, ".webpack"),
  },
  resolve: {
    alias: {
      "@glorzo-server": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};

export default config;
