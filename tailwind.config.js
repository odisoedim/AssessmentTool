const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      fontSize: {
        '1.5xl': ['1.375rem', '1.875rem'],
        '2.5xl': ['1.75rem', '2.125rem'],
        '4.5xl': '2.4375rem',
        '1.12xl': '1.125rem',
        // Resolve blank space of inline-block element.
        0: '0'
      },
      colors: {
        'kh-primary': {
          50: '#EEECFA',
          100: '#DED8F5',
          200: '#7A63D9',
          300: '#593CCF',
          400: '#3E2A91',
          DEFAULT: '#593CCF'
        },
        'kh-grey': {
          100: '#E9EBEB',
          200: '#7D8488',
          300: '#263238',
          400: '#1A1A1A',
          DEFAULT: '#263238'
        },
        'kh-yellow': {
          50: '#FDBD57',
          100: '#FFAF28',
          DEFAULT: '#FFAF28'
        },
        'kh-blue-grey': {
          100: '#F7FAFC',
          200: '#EDF2F7',
          300: '#E2E8F0',
          400: '#CBD5E0',
          500: '#BECAD7'
        },
        'kh-grey-transparent': {
          100: 'rgba(38, 50, 56, .25)'
        },
        'kh-red': {
          DEFAULT: '#950A3D'
        }
      },
      spacing: () => {
        const obj = {}
        ;[
          1.25, 2.25, 2.75, 3.5, 5.5, 6.5, 7.5, 9.5, 10.5, 10.75, 11.5, 12.5,
          13, 13.5, 14, 14.5, 15, 15.5, 16.5, 16.75, 17, 17.25, 17.5, 18, 22,
          25, 26, 28.5, 28.75, 29, 30, 33.25, 34, 38.5, 48.25, 51, 152.5
        ].forEach(key => {
          obj[key] = `${key / 4}rem`
          obj[`-${key}`] = `-${key / 4}rem`
        })
        return obj
      },
      lineHeight: {
        4.5: '1.125rem',
        5.25: '1.3125rem',
        6.5: '1.625rem',
        11: '2.875rem',
        12: '3rem',
        18: '1.125rem'
      },
      letterSpacing: {
        '01': '.01em',
        '02': '.02em',
        '03': '.03em',
        '04': '.04em',
        '06': '.06em',
        10: '.1em',
        '2px': '2px',
        16: '.16em',
        21: '.21em'
      },
      borderWidth: {
        3: '3px'
      },
      boxShadow: {
        header: '0px 6px 32px rgba(203, 213, 224, 0.3)',
        normal: '0px 4px 24px rgba(203, 213, 224, 0.6)',
        'normal-hover': '0px 4px 6px rgba(203, 213, 224, 0.6)',
        purple: '0px 4px 16px rgba(89, 60, 207, 0.3)',
        card: 'inset 0px 0px 8px rgba(203, 213, 224, 0.25)',
        modal: '0px 4px 24px -10px rgba(38, 50, 56, 0.2)',
        checked: 'inset 0px 0px 4px 1px rgba(38, 50, 56, 0.4)',
        'circle-out': '0 0 8px rgba(38, 50, 56, 0.3)',
        yellow: '0px 5px 20px -10px rgba(38, 50, 56, 0.2)',
        'yellow-hover': '0px 3px 5px -10px rgba(38, 50, 56, 0.2)',
        'landing-assessments': 'inset 0px 0px 8px rgba(203, 213, 224, 0.25)',
        'new-card': '0px 14px 64px -10px rgba(203, 213, 224, 0.8);',
        'new-card-hover': '0px 34px 64px -10px rgba(203, 213, 224, 0.8)',
        'new-card-pressed': '0px 8px 22px -5px rgba(203, 213, 224, 0.8)'
      },
      height: {
        4.5: '18px'
      },
      minHeight: {
        2.5: '2.5em'
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        half: '50%'
      },
      transitionTimingFunction: {
        ease: 'ease',
        'out-in': 'cubic-bezier(0.77, 0, 0.175, 1)'
      },
      transitionDuration: {
        80: '80ms'
      }
    },
    screens: {
      mobile: { max: '480px' },
      tablet: { min: '480px', max: '1024px' }
    },
    fontFamily: {
      NotoSans: ['NotoSans'],
      Rubik: ['Rubik']
    }
  },
  variants: {
    extend: {
      boxShadow: ['active', 'disabled'],
      ringColor: ['hover', 'active'],
      color: ['active'],
      flexDirection: ['even', 'odd'],
      position: ['first', 'last'],
      top: ['first', 'last'],
      height: ['first', 'last'],
      margin: ['first', 'last'],
      padding: ['first', 'last'],
      transitionProperty: ['width', 'left', 'background-color']
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const truncate = {
        overflow: 'hidden',
        display: '-webkit-box',
        'text-overflow': 'ellipsis',
        '-webkit-box-orient': 'vertical'
      }
      const newUtilities = {}
      ;[1, 2, 3, 4, 5].forEach(i => {
        newUtilities[`.truncate-${i}`] = {
          ...truncate,
          '-webkit-line-clamp': i + ''
        }
      })

      addUtilities(newUtilities)
    })
  ]
}
