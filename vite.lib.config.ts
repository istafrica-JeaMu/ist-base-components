import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue({
    script: {
      defineModel: true
    }
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ISTBaseComponents',
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'js'}`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'primevue', 'primeicons'],
      output: {
        globals: {
          vue: 'Vue',
          primevue: 'PrimeVue',
          primeicons: 'PrimeIcons'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}) 