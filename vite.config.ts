import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { playwrightPdf } from './vite-plugins/playwright-pdf.js'

// https://vite.dev/config/
export default defineConfig({
  base:"/newsletter",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    playwrightPdf(),
  ],
  server: {
    host: '127.0.0.1',
  },
})
