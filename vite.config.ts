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
      '@src': path.resolve(__dirname, './src'),
      '@electron': path.resolve(__dirname, './electron'),
    },
  },
  server: {
    port: 9009,
  },
});
