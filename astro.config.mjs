import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import auth from "auth-astro";


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()
    //auth()
  ],
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