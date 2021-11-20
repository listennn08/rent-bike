import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: ['src/**/*.{html,tsx}'],
  },
  theme: {
    extend: {
      width: {
        'card-1/3': 'calc(33.333333% - 1rem)',
      },
      minHeight: {
        main: 'calc(100vh - 72px)'
      },
      height: {
        main: 'calc(100vh - 72px)'
      },
      colors: {
        primary: {
          DEFAULT: '#FED801'
        },
        secondary: {
          DEFAULT: '#7A7A7A'
        }
      }
    }
  }
})