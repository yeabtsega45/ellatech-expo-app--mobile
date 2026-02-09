/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ellatech: {
          primary: '#00C0FF',
          primaryDark: '#0090CC',
          // dark hero background similar to website
          bgDark: '#020617',
          bgCard: '#020b1f',
        },
      },
    },
  },
  plugins: [],
}
