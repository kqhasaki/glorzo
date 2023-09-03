import path from "path";
import { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config: Configuration = {
  target: "node",
  context: path.resolve(__dirname, "."),
  entry: "./src/app.ts",
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
  plugins: [new CleanWebpackPlugin(), new ForkTsCheckerWebpackPlugin()],
};

export default config;
