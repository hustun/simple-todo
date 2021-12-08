module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

    options: {
      safelist: ['bg-green-200', 'bg-pink-200', 'bg-purple-200', 'bg-blue-200', 'bg-yellow-200', 'bg-red-200', 'bg-indigo-200']
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
