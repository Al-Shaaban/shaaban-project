import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: '@styles',
        replacement: fileURLToPath(new URL('./src/lib/styles', import.meta.url))
      },
      {
        find: '@hooks',
        replacement: fileURLToPath(new URL('./src/lib/hooks', import.meta.url))
      },
      {
        find: '@utils',
        replacement: fileURLToPath(new URL('./src/lib/utils', import.meta.url))
      },
      {
        find: '@type',
        replacement: fileURLToPath(new URL('./src/lib/types', import.meta.url))
      },
      {
        find: '@constants',
        replacement: fileURLToPath(new URL('./src/lib/constants', import.meta.url))
      },
      {
        find: '@contexts',
        replacement: fileURLToPath(new URL('./src/lib/contexts', import.meta.url))
      }
    ]
  }
})
