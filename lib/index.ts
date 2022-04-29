#!/usr/bin/env node
import process from "node:process";
import fileTypeCheck from "./file-type-check";

(() => {
  const args = process.argv.slice(2);

  const files = args.filter((file) => /\.(ts|tsx)$/.test(file));
  if (files.length === 0) {
    process.exitCode = 0;
  }

  fileTypeCheck(files);
})();
