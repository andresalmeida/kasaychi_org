import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kasaychi.org',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-EC',
        },
      },
    }),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
  image: {
    domains: ['kasaychi.org'],
    remotePatterns: [{ protocol: 'https' }],
  },
});
