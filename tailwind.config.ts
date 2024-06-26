import type { Config } from 'tailwindcss';

export default {
  content: [
    './styles/globals.css',
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './services/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {
    fontFamily: {
      'atyp-display': ['var(--font-atyp-display)'],
      'atyp-text': ['var(--font-atyp-text)'],
      'monument-extended': ['var(--font-monument-extended)'],
    },
    screens: {
      container: '1441px', // beyond the container's max width
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      animation: {
        push: 'push 0.3s linear 1',
      },
      blur: {
        xs: '2px',
      },
      borderWidth: {
        3: '3px',
        6: '6px',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        disabled: 'var(--disabled)',
        text: {
          DEFAULT: 'var(--text)',
          gradient: 'var(--text-gradient)',
          caption: 'var(--text-caption)',
        },
        primary: {
          DEFAULT: 'var(--primary-DEFAULT)',
        },
        gray: {
          lightest: 'var(--gray-lightest)',
          lighter: 'var(--gray-lighter)',
          light: 'var(--gray-light)',
          DEFAULT: 'var(--gray-DEFAULT)',
          dark: 'var(--gray-dark)',
        },
      },
      height: {
        120: '30rem', // for larger images
      },
      keyframes: {
        push: {
          '50%': { transform: 'scale(0.8)' },
        },
      },
      outline: {
        primary: '2px dotted var(--primary-DEFAULT)',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
      backgroundColor: ['selection'],
      blur: ['hover'],
      borderWidth: ['first'],
      borderRadius: ['last'],
      display: ['group-hover', 'hover'],
      filter: ['hover'],
      transitionDuration: ['group-hover'],
    },
  },

  /* eslint-disable-next-line global-require */
  plugins: [require('tailwindcss-selection-variant')],
} satisfies Config;
