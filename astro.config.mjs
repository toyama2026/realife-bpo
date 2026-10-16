import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://realife-bpo-preview.realife-hd.workers.dev",
  output: "static",
});
