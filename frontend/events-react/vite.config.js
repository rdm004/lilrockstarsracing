import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../public/events',
    emptyOutDir: true,
  },
  base: '/events/',
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
});