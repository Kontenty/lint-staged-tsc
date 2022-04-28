import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');

type StringObject = Record<string, string>;
type TsConfig = {
  compilerOptions: StringObject;
  include: string[];
};

const fileTypeCheck = (stagedFiles: string[]) => {
  fs.readFile(tsConfigPath, (error, data) => {
    if (error) {
      throw error;
    }

    const tsConfig: TsConfig = JSON.parse(data.toString());
    console.log({stagedFiles, tsConfig});
  });
};

export default fileTypeCheck;
