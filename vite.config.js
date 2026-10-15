import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      // trader-event.html is a lightweight standalone entry for /trader/event
      // (see vercel.json) so crawlers get its own meta tags and the page skips
      // the main app's scripts.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        traderEvent: resolve(import.meta.dirname, 'trader-event.html'),
      },
    },
  },
})
