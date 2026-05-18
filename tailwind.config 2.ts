import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],

  theme: {
    extend: {
      /* Oversize Design System palette */
      colors: {
        brand: {
          red:        '#B51F3A',
          'red-deep': '#8E1A2E',
          'red-bright':'#D42848',
          'red-tint': '#F5E3E7',
          graphite:   '#3C3C3C',
          'graphite-deep': '#222222',
          'graphite-soft': '#555555',
          ash:        '#D9D9D9',
          'ash-soft': '#ECECEC',
          'ash-deep': '#BFBFBF',
        },
        /* Gray scale from Keynote palette */
        neutral: {
          50:  '#F2F2F2',
          100: '#C8C8C8',
          150: '#E2E2E2',
          200: '#B4B4B4',
          250: '#CCCCCC',
          300: '#9A9A9A',
          400: '#999999',
          500: '#666666',
          600: '#555555',
          700: '#333333',
          800: '#222222',
          900: '#1A1A1A',
        },
        semantic: {
          success: '#00CC00',
          error: '#FF3333',
          warning: '#FFB800',
          info: '#0066FF',
        },
      },

      /* Typography - Inter base + custom scale */
      fontFamily: {
        sans: ['Sansa Pro', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sansa Pro', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // Typography scale from ui-plan.md
        xs: ['0.75rem', { lineHeight: '1.3', fontWeight: '500' }],      // 12px Caption
        sm: ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],     // 14px Body Small
        base: ['1rem', { lineHeight: '1.5', fontWeight: '400' }],       // 16px Body Regular
        lg: ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],     // 18px Body Large
        xl: ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],       // 24px H3
        '2xl': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],      // 32px H2
        '3xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],    // 40px H1
      },

      /* Spacing - 1.5rem base unit */
      spacing: {
        xs: '0.5rem',      // 8px
        sm: '1rem',        // 16px
        md: '1.5rem',      // 24px
        lg: '2rem',        // 32px
        xl: '2.5rem',      // 40px
        '2xl': '3rem',     // 48px
      },

      /* Breakpoints from ui-plan.md */
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      /* Animations */
      animation: {
        gradient: 'gradient 8s ease infinite',
        fadeIn: 'fadeIn 0.3s ease',
        spin: 'spin 0.8s linear infinite',
      },

      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },

      /* Transitions */
      transitionDuration: {
        DEFAULT: '300ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      /* Shadows */
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
        primary: '0 4px 12px rgba(0, 102, 255, 0.1)',
      },

      /* Border radius */
      borderRadius: {
        DEFAULT: '0.375rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        full: '9999px',
      },

      /* Max width for content */
      maxWidth: {
        prose: '65ch',
        content: '900px',
      },

      /* Z-index scale */
      zIndex: {
        hide: '-1',
        auto: 'auto',
        0: '0',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
        base: '100',
        overlay: '1000',
      },

      /* Opacity scale */
      opacity: {
        0: '0',
        5: '0.05',
        10: '0.1',
        20: '0.2',
        25: '0.25',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        75: '0.75',
        80: '0.8',
        90: '0.9',
        95: '0.95',
        100: '1',
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],

  corePlugins: {
    preflight: true,
  },
}

export default config
