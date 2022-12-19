import path from "node:path";
import { expect } from "chai";
import { getRootTsConfig } from "../lib/create-tsconfig";

const pathToExtendedConfig = path.join(
  __dirname,
  "assets",
  "tsconfigs",
  "happy-path",
  "tsconfig.1.json"
);
const pathToEmptyCompilerOptions = path.join(
  __dirname,
  "assets",
  "tsconfigs",
  "empty",
  "tsconfig.empty.json"
);

const pathToEarlyAbort = path.join(
  __dirname,
  "assets",
  "tsconfigs",
  "find-first",
  "tsconfig.1.json"
);

describe("Dig for root ts config file", () => {
  it("Should correctly locate first tsconfig with compilerOptions", () => {
    const tsConfig = getRootTsConfig(pathToExtendedConfig);
    expect("compilerOptions" in tsConfig).to.be.true;
    expect(tsConfig.compilerOptions.target).to.equal("ESNext");
  });
  it("Should correctly set compilerOptions to an empty object if none are found", () => {
    const tsConfig = getRootTsConfig(pathToEmptyCompilerOptions);
    expect("compilerOptions" in tsConfig).to.be.true;
    expect(tsConfig.compilerOptions).to.be.empty;
  });
  it("Should correctly return the first tsconfig where compilerOptions are found", () => {
    const tsConfig = getRootTsConfig(pathToEarlyAbort);
    expect("compilerOptions" in tsConfig).to.be.true;
    expect(tsConfig.compilerOptions.target).to.equal("ES2015");
  });
});
