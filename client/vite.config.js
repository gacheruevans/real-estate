import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
      alias: {
        src: "/src",
      },
    },
  optimizeDeps: {
      force: true,
      esbuildOptions: {
          loader: {
              '.js': 'jsx'
          },
      },
  },
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
})
