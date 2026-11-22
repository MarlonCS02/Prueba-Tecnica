/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/ui-lib/src/**/*.{html,ts}",
    "./projects/demo-app/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        portal: { green: "#97ce4c", dark: "#1a1a2e", purple: "#4a3f8f" },
        rick: { blue: "#00b0c8", yellow: "#f0e14a" },
      },
      fontFamily: {
        rick: ['"Bangers"', "cursive"],
        body: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};