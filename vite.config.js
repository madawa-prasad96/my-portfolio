import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      '2585d0ca38ba.ngrok-free.app', // your ngrok host
    ],
  },
  base: '/my-portfolio/'
})
