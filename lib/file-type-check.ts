#!/usr/bin/env node
import fs from "node:fs";
import process from "node:process";
import { createTsConfig } from "./create-tsconfig";

import { runTypescript } from "./run-typescript";
import { ErrorExec } from "./errors";

const randomString = () => Math.random().toString(36).slice(2, 11);

const fileTypeCheck = async (stagedFiles: string[]) => {
  const tsConfig = createTsConfig(stagedFiles);
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
  } finally {
    return process.exitCode;
  }
};

export default fileTypeCheck;
