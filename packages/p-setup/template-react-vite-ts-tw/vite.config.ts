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
        replacement: fileURLToPath(new URL('./src'))
      },
      {
        find: '@styles',
        replacement: fileURLToPath(new URL('./src/lib/styles'))
      },
      {
        find: '@hooks',
        replacement: fileURLToPath(new URL('./src/lib/hooks'))
      },
      {
        find: '@utils',
        replacement: fileURLToPath(new URL('./src/lib/utils'))
      },
      {
        find: '@type',
        replacement: fileURLToPath(new URL('./src/lib/types'))
      },
      {
        find: '@constants',
        replacement: fileURLToPath(new URL('./src/lib/constants'))
      },
      {
        find: '@contexts',
        replacement: fileURLToPath(new URL('./src/lib/contexts'))
      }
    ]
  }
})
