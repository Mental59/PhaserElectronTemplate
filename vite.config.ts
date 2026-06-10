import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        app1: path.resolve(__dirname, 'index1.html'),
        app2: path.resolve(__dirname, 'index2.html'),
      },
      output: {
        codeSplitting: {
          groups: [{ name: 'phaser', test: /node_modules[\\/]+phaser/ }],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@scenes': path.resolve(__dirname, './src/scenes'),
      '@managers': path.resolve(__dirname, './src/managers'),
    },
  },
  server: {
    port: 9009,
  },
});
