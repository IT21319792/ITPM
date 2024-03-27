/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightWhite: "#F2F4F8",
        tableRowHoveryellow : "rgba(224, 241, 30, 0.5)"
      },
    },
  },
  plugins: [],
}