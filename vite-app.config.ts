import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/explore-tables/',
  plugins: [react(), dts({ include: ['src', 'lib'] })],
  publicDir: "public-app",
  build: {
    outDir: 'dist-app',
  }
})
