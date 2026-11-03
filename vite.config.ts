import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-mode-html',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html
            .replace(
              /<link rel="stylesheet" crossorigin href="\.\/assets\/index\.css(\?[^"]*)?">/g,
              ''
            )
            .replace(
              /<script type="module" crossorigin src="\.\/assets\/index\.js(\?[^"]*)?"><\/script>/g,
              '<script type="module" src="/src/main.tsx"></script>'
            )
        },
      },
    },
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
