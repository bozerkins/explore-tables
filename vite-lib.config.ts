import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  publicDir: "public",
  plugins: [
    react(),
    dts({
      include: ['lib'],
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json'
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
      },
    },
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    }
  }
})
