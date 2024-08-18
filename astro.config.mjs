import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
//import auth from "auth-astro";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(),
    //auth()
  , sitemap(), preact({
    compat: true
  }), db()],
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