import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/store/',      // ← crucial for GitHub Pages
  build: {
    outDir: 'build',    // match your gh-pages deploy folder
  },
})