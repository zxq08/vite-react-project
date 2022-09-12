import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import viteImagemin from 'vite-plugin-imagemin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

const variablePath = normalizePath(path.resolve('./src/variable.scss'))

const isProduction = process.env.NODE_ENV === "production"
const productionCDN = '/'
const developmentCDN = '/'

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? productionCDN : developmentCDN,
  root: path.join(__dirname, ''),
  resolve: {
    alias: {
      '@assets': path.join(__dirname, 'src/assets'),
      '~': 'node_modules' //path.join(__dirname, 'node_modules')
    }
  },
  plugins: [
    react(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')]
    })
  ],
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  }
})
