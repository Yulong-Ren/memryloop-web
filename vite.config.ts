import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sitemapPlugin } from './seo/vite-plugin-sitemap';

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  root: resolve(__dirname),
  css: {
    postcss: resolve(__dirname, 'postcss.config.js'),
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
