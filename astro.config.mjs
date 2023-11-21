import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
  renderers: [
    '@astrojs/renderer-react'
  ],
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react()]
});