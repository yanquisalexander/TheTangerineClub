import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import db from "@astrojs/db";
import auth from "auth-astro";

import webVitals from "@astrojs/web-vitals";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), preact({
    compat: true
  }), db(), auth({
    configFile: './auth.config.mjs'
  }), webVitals()],
  output: "server",
  adapter: vercel(),
  devToolbar: {
    enabled: false
  },
  site: "https://www.thetangerineclub.net/",
  experimental: {
    serverIslands: true
  }
});