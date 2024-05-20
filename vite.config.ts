import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({
    include: '**/*.svg', // Это обрабатывает все SVG файлы как React компоненты
  }),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
