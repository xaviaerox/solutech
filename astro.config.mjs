import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://solutech.shop',
  integrations: [tailwind()],
});
