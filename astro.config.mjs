import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
//import auth from "auth-astro";
import sitemap from "@astrojs/sitemap";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(),
    //auth()
    , sitemap(), preact({ compat: true })],
  output: "server",
  adapter: vercel(),
  devToolbar: {
    enabled: false
  },
  site: "https://the-tangerine-club.vercel.app/",
  experimental: {
    serverIslands: true
  }
});