import { build } from "esbuild";
import fs from "node:fs";

(() => {
  fs.rmdirSync("./dist/", { recursive: true });

  build({
    entryPoints: ["lib/index.ts"],
    outdir: "dist",
    bundle: true,
    platform: "node",
    target: "node12.2",
    external: ["node:*"],
  });
})();
