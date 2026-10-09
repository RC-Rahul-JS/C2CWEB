import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_API_URL || 'http://192.168.29.39:5001'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      allowedHosts: true, // Allow all hosts (solves ngrok blocked request)
      proxy: {
        '/c2c_app': { target: apiUrl, changeOrigin: true },
        '/profile': { target: apiUrl, changeOrigin: true },
        '/doctors': { target: apiUrl, changeOrigin: true },
        '/upload': { target: apiUrl, changeOrigin: true },
        '/user': { target: apiUrl, changeOrigin: true },
        '/doctor_list': { target: apiUrl, changeOrigin: true }
      }
    }
  }
})
