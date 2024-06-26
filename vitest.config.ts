import path from 'path'
import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './config/tests/setup.ts'
  },
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src/'),
      '@/atoms': path.resolve(__dirname, './src/components/atoms'),
      '@/molecules': path.resolve(__dirname, './src/components/molecules'),
      '@/organisms': path.resolve(__dirname, './src/components/organisms'),
      '@/lib': path.resolve(__dirname, './src/lib')
    }
  }
})
