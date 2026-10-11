import { defineConfig } from 'vite'

export default defineConfig({
  base: '/solidity-interactive-lab/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
