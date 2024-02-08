import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import vue from "@astrojs/vue";



// https://astro.build/config
export default defineConfig({
  renderers: ['@astrojs/renderer-react'],
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react(), vue()]
});