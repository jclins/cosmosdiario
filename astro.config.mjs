import { defineConfig } from 'astro/config';
import image from '@astrojs/image';

export default defineConfig({
  integrations: [image()],
  output: 'static',
  site: 'https://celestiallogocraft.com'
});