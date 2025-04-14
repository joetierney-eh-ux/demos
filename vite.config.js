import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: "/demos/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        '404': resolve(__dirname, 'index.html')
      },
    },
  },
  optimizeDeps: {
    include: ['react-datepicker'],
  },
})
