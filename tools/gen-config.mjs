import { out } from "./lib.mjs";

out("astro.config.mjs", `import { defineConfig } from "astro/config";\n\nexport default defineConfig({\n  site: process.env.SITE_URL || "https://realife-bpo-preview.realife-hd.workers.dev",\n  output: "static",\n});\n`);
out("package.json", JSON.stringify({
  name: "realife-bpo", type: "module", version: "0.1.0", private: true,
  scripts: { dev: "astro dev", build: "astro build", preview: "astro preview", generate: "node tools/gen-data.mjs && node tools/gen-components.mjs && node tools/gen-pages.mjs && node tools/gen-top-blog.mjs && node tools/gen-config.mjs" },
  dependencies: { astro: "^7.4.0" },
}, null, 2) + "\n");
out("tsconfig.json", JSON.stringify({ extends: "astro/tsconfigs/strict", compilerOptions: { strictNullChecks: true } }, null, 2) + "\n");
out(".gitignore", "node_modules/\ndist/\n.astro/\n");
