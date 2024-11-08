import { defineConfig ,envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";



// https://astro.build/config
export default defineConfig({
    build: {
        inlineStylesheets: 'never'
      },
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      theme: 'synthwave-84',
      defaultColor: false,
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true
    }
  },
  renderers: ['@astrojs/renderer-react'],
  site: 'https://itssofi.dev/',
  integrations: [mdx(), sitemap(), react(),],
  experimental: {
    env: {
      schema: {
        YT_API_KEY: envField.string({
          context: "client",
          access: "public",
          optional: false,
        }),
      },
    },
  },
});