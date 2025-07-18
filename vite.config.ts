import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['vietqr'] // Loại trừ vietqr khỏi quá trình pre-bundle
  },
  build: {
    commonjsOptions: {
      include: [/vietqr/, /node_modules/]
    }
  }
})
