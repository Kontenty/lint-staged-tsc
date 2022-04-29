import { exec } from "node:child_process";
import { ErrorExec } from "./errors";

export const runTypescript = async (tsConfigPath: string) =>
  new Promise((resolve, reject) => {
    exec(`npx tsc -p ${tsConfigPath}`, (error, stdout) => {
      if (error) {
        return reject(new ErrorExec(stdout, error));
      }

      return resolve(stdout);
    });
  });
