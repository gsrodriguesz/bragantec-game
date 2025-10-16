import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      'mongodb',
      'crypto',
      'fs',
      'path',
      'os',
      'util'
    ] // Excluir todas as dependências Node.js
  },
  build: {
    rollupOptions: {
      external: [
        'mongodb',
        'crypto',
        'fs',
        'path',
        'os',
        'util'
      ] // Não incluir módulos Node.js no bundle
    }
  },
  define: {
    global: 'globalThis',
  },
  server: {
    fs: {
      allow: ['..'],
      ignore: ['**/api/**'] // Ignorar pasta API completamente
    }
  },
  resolve: {
    alias: {
      // Evitar que o Vite tente resolver módulos Node.js
      crypto: false,
      fs: false,
      path: false,
      os: false,
      util: false
    }
  }
})
