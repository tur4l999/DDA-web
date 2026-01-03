/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Soft, calming palette
        gray: {
          50: '#F9FAFB',  // Soft background
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563', // Soft text
          700: '#374151',
          800: '#1F2937', // Main text
          900: '#111827', // Headings
        },
        primary: {
          // Brand Green (#009846) and Forest Green (#226F37)
          50: '#E6F6EC',
          100: '#CBEBD6',
          200: '#94D6AD',
          300: '#5EC185',
          400: '#28AC5C',
          500: '#009846', // Brand Green
          600: '#00893F',
          700: '#007A38',
          800: '#226F37', // Darker shade from logo
          900: '#1B592C',
        },
        accent: {
          red: '#E31E24',   // Brand Red
          yellow: '#FECC00', // Brand Yellow
        }
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.05)',
        'card': '0 2px 10px rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.02)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}
// Brand colors updated
