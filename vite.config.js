import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    allowedHosts: ['http://192.168.29.145:5000'],
    proxy: {
      '/c2c_app': 'http://192.168.29.145:5000',
      '/profile': 'http://192.168.29.145:5000',
      '/doctors': 'http://192.168.29.145:5000',
      '/upload': 'http://192.168.29.145:5000',
      '/user': 'http://192.168.29.145:5000'
    }
  }
})
