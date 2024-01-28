import {resolve} from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        babylon: resolve(__dirname, "src/babylon.html"),
      },
    },
    outDir: "../dist",
  },
  
})