import { defineConfig } from 'vite';
import path from 'path';

/**
 * Separate build config for the standalone Meta Pixel tracking module.
 * Outputs a single IIFE bundle to static/assets/js/tracking.js
 * so it can be loaded via <script> tag on any static HTML page.
 */
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/js/tracking/index.js'),
      name: 'AIMSTracking',
      formats: ['iife'],
      fileName: () => 'tracking.js',
    },
    outDir: 'static/assets/js',
    emptyOutDir: false,
    minify: true,
    sourcemap: false,
  },
});