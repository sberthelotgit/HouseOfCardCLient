import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Set 'host' to true or '0.0.0.0' to listen on all addresses, including LAN
    host: true,
    // You can also specify a port if needed, default is 5173
    port: 5173,
  },
})
