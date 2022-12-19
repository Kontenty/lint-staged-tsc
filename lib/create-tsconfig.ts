import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import type { CompilerOptions } from "typescript";
import { parseTsConfig, TsConfig } from "./parse-tsconfig";

type WithCompilerOptions = TsConfig & { compilerOptions: CompilerOptions };

const typesRegex = /^(\w+\.d\.ts)|(.*types.*)$/;
const tsConfigPath = path.join(process.cwd(), "tsconfig.json");

export const getRootTsConfig = (configPath: string): WithCompilerOptions => {
  const tsConfigData = fs.readFileSync(configPath);
  const tsConfig = parseTsConfig(tsConfigData);
  if (!tsConfig.compilerOptions && tsConfig.extends) {
    const dir = path.parse(configPath).dir;
    return getRootTsConfig(path.resolve(dir, tsConfig.extends));
  }
  return { ...tsConfig, compilerOptions: { ...tsConfig.compilerOptions } };
};

export const createTsConfig = (stagedFiles: string[]) => {
  try {
    const tsConfig = getRootTsConfig(tsConfigPath);
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
