/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-color": "#081b29",
        "main-color": "#00abf0",
        "color-text": "#333",
        "second-text-color": "#555",
        "white-color": "#fff",
      },
    },
  },
  plugins: [],
};
