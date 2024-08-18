import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.json', '.vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制样式文件进行覆盖
        additionalData: `
          @use "@/styles/variable.scss" as *;
        `
      }
    },
    postcss: {
      plugins: [autoprefixer({ cascade: false }), cssnano({
        preset: [
          'default',
          {
            colormin: false,
            minifyFontValues: false,
          },
        ],
      })]
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('png')) {
            return 'icons/[name]-[hash].[ext]'
          }
          else {
            return '[ext]/[name]-[hash].[ext]'
          }
        }
      }
    }
  }
})
