import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://leaf-digital-gallery.vercel.app',
  vite: {
    define: {
      'process.env': {}
    }
  }
});
