import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // `host: true` fa ascoltare Vite anche sull'IP di rete, non solo su
  // localhost: è quello che stampa la riga "Network" e permette di aprire il
  // sito dal telefono. Vale sia in sviluppo sia in anteprima, così non serve
  // ricordarsi un comando diverso.
  server: { host: true },
  preview: { host: true },
})
