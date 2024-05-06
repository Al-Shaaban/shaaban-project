import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: '~pages',
        replacement: fileURLToPath(new URL('./src/pages', import.meta.url))
      },
      {
        find: '~api',
        replacement: fileURLToPath(new URL('./src/api', import.meta.url))
      },
      {
        find: '~styles',
        replacement: fileURLToPath(new URL('./src/lib/styles', import.meta.url))
      },
      {
        find: '~ui',
        replacement: fileURLToPath(new URL('./src/lib/ui', import.meta.url))
      },
      {
        find: '~hooks',
        replacement: fileURLToPath(new URL('./src/lib/hooks', import.meta.url))
      },
      {
        find: '~utils',
        replacement: fileURLToPath(new URL('./src/lib/utils', import.meta.url))
      },
      {
        find: '~icons',
        replacement: fileURLToPath(new URL('./src/lib/icons', import.meta.url))
      },
      {
        find: '~types',
        replacement: fileURLToPath(new URL('./src/lib/types', import.meta.url))
      },
      {
        find: '~constants',
        replacement: fileURLToPath(new URL('./src/lib/constants', import.meta.url))
      },
      {
        find: '~contexts',
        replacement: fileURLToPath(new URL('./src/lib/contexts', import.meta.url))
      },
      {
        find: '~components',
        replacement: fileURLToPath(new URL('./src/lib/components', import.meta.url))
      },
      {
        find: '~guards',
        replacement: fileURLToPath(new URL('./src/lib/guards', import.meta.url))
      },
      {
        find: '~layouts',
        replacement: fileURLToPath(new URL('./src/lib/layouts', import.meta.url))
      }
    ]
  }
})
