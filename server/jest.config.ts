import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@glorzo-server/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
