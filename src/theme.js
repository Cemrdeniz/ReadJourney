import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          100: { value: '#f9f9f9' },
          200: { value: '#686868' },
          250: { value: '#e3e3e34d' },
          300: { value: '#262626' },
          350: { value: '#1f1f1f' },
          400: { value: '#141414' },
          500: { value: '#4f92f7' },
          600: { value: '#30b94d' },
          700: { value: '#e90516' }
        }
      },
      fonts: {
        body: { value: 'Gilroy-Medium, sans-serif' },
        heading: { value: 'Gilroy-Medium, sans-serif' }
      }
    },
    semanticTokens: {
      colors: {
        brand: {
          accent: { value: '{colors.brand.100}' },
          muted: { value: '{colors.brand.200}' },
          bgFilter: { value: '{colors.brand.250}' },
          bgInput: { value: '{colors.brand.300}' },
          bgSecondary: { value: '{colors.brand.350}' },
          bgPrimary: { value: '{colors.brand.400}' },
          activeNavLink: { value: '{colors.brand.500}' },
          success: { value: '{colors.brand.600}' },
          error: { value: '{colors.brand.700}' }
        }
      }
    },
    breakpoints: {
      tablet: '768px',
      desktop: '1280px',
      wide: '1536px'
    }
  },
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      color: 'brand.accent',
      backgroundColor: 'brand.bgPrimary'
    }
  }
})

export const system = createSystem(defaultConfig, customConfig)
