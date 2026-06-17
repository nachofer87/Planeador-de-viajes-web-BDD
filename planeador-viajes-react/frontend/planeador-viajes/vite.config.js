import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: {
      // Reenvía a XAMPP cualquier llamada a la API
      '/api': {
        target: 'http://localhost/PLANEADOR-VIAJES-REACT/backend',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});