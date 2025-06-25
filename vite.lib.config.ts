import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    dts({
      insertTypesEntry: true,
      exclude: ['src/main.ts', 'src/App.vue', 'src/views/**/*', 'examples/**/*']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ISTBaseComponents',
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'js'}`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'primevue', 'primeicons', '@primevue/themes'],
      output: {
        globals: {
          vue: 'Vue',
          primevue: 'PrimeVue',
          primeicons: 'PrimeIcons',
          '@primevue/themes': 'PrimeVueThemes'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name || 'asset'
        }
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}) 