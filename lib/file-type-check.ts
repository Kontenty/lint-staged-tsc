#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parseTsConfig } from "./parse-tsconfig";

import { runTypescript } from "./run-typescript";
import { ErrorExec } from "./errors";

const tsConfigPath = path.join(process.cwd(), "tsconfig.json");
const randomString = () => Math.random().toString(36).slice(2, 11);

const fileTypeCheck = async (stagedFiles: string[]) => {
  try {
    const data = fs.readFileSync(tsConfigPath);

    const tsConfig = parseTsConfig(data);
    tsConfig.include = [...stagedFiles];
    tsConfig.compilerOptions.noEmit = true;
    delete tsConfig.compilerOptions.emitDeclarationOnly;
    const radomizedFileName = `tsconfig.${randomString()}.json`;
    fs.writeFileSync(radomizedFileName, JSON.stringify(tsConfig));
    try {
      await runTypescript(radomizedFileName);
      fs.unlinkSync(radomizedFileName);
      process.exitCode = 0;
    } catch (error) {
      fs.unlinkSync(radomizedFileName);
      if (error instanceof ErrorExec) {
        console.log(error.stdout);
        process.exitCode = error.error?.code || 1;
      } else {
        console.log(error);
        process.exitCode = 1;
      }
    }
  } catch (error) {
    console.log("Error: cannot read tsConfig file");
    process.exit(1);
  }
};

export default fileTypeCheck;
