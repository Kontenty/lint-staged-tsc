import fs from "fs";
import path from "path";

const tsConfigPath = path.join(process.cwd(), "tsconfig.json");

const fileTypeCheck = (stagedFiles: string[]) => {
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, "utf8"));

  console.log({ stagedFiles, tsConfig });
};

export default fileTypeCheck;
