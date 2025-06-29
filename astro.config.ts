import { defineConfig, envField } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  adapter: cloudflare(),
  output: process.env.PREVIEW === "true" ? "server" : "static",
});
