import { defineConfig } from 'vite'
import { promises as fs, readdirSync } from 'fs'
import path from 'path'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/

const customCollections = {
  custom: [...readdirSync('./src/icons')].reduce((acc, file) => {
    if (path.extname(file) !== '.svg') return acc
    const [name] = file.split('.')
    return {
      ...acc,
      [name]: () => fs.readFile(path.resolve('./src/icons', file), 'utf-8')
    }
  },{})
}

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, '/src')}/`,
    },
  },
  plugins: [
    react(),
    AutoImport({
      include: [/\.[tj]sx?$/],
      imports: [
        'react',
        {
          'react-router-dom': [
            'useHistory',
            'useRouteMatch',
            'useLocation',
          ],
          'react-leaflet': [
            'useMap'
          ],
          'react-redux': [
            'useSelector',
            'useDispatch',
          ],
        },
      ]
    }),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      autoInstall: true,
      customCollections,
    }),
    WindiCSS(),
  ],
  server: {
    proxy: {
      '/v2/Bike': {
        target: 'https://ptx.transportdata.tw/MOTC/',
        secure: false,
        ws: true,
        changeOrigin: true,
      },
      '/v2/Cycling': {
        target: 'https://ptx.transportdata.tw/MOTC/',
        secure: false,
        ws: true,
        changeOrigin: true,
      },
      '/v2/Tourism': {
        target: 'https://ptx.transportdata.tw/MOTC/',
        secure: false,
        ws: true,
        changeOrigin: true,
      }
    }
  }
})
