import { build } from "esbuild";

build({
  entryPoints: ["lib/index.ts"],
  outdir: "dist",
  bundle: true,
  platform: "node",
  external: ["node:*"],
});
