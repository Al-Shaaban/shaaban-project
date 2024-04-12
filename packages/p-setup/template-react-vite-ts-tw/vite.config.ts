import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { fileURLToPath } from "node:url"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: '@styles',
        replacement: fileURLToPath(new URL('./src/lib/styles', import.meta.url))
      }
    ]
  }
})
 