import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/hooks': '/src/hooks',
      '@/layouts': '/src/layouts',
      '@/pages': '/src/pages',
      '@/services': '/src/services',
      '@/stores': '/src/stores',
      '@/utils': '/src/utils'
    }
  }
})
