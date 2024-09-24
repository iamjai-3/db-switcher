import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/index.ts"],
  dts: true,
  //   shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  external: ["./node_modules/tsup/assets/esm_shims.js"],
});
