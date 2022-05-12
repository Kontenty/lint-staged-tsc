import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parseTsConfig } from "./parse-tsconfig";

const typesRegex = /^(\w+\.d\.ts)|(.*types.*)$/;

const tsConfigPath = path.join(process.cwd(), "tsconfig.json");

export const createTsConfig = (stagedFiles: string[]) => {
  try {
    const tsConfigData = fs.readFileSync(tsConfigPath);
    const tsConfig = parseTsConfig(tsConfigData);
    if (Array.isArray(tsConfig?.include) && tsConfig.include.length > 0) {
      tsConfig.include = [
        ...tsConfig?.include?.filter((included) => typesRegex.test(included)),
      ];
    }
    tsConfig.include = [...stagedFiles];
    tsConfig.compilerOptions.noEmit = true;
    delete tsConfig.compilerOptions.emitDeclarationOnly;

    return tsConfig;
  } catch (error) {
    console.log("Error: cannot read tsConfig file");
    process.exit(1);
  }
};
