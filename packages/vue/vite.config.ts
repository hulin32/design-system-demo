import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DsVue',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', '@ds/web-components'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});

