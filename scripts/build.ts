import { build } from "esbuild";

build({
  entryPoints: ["lib/index.ts"],
  outdir: "dist",
  bundle: true,
  platform: "node",
  target: "node12.2",
  external: ["node:*"],
});
