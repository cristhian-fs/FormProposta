/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
module.exports = {
  content: ["./**/*.{html,js}", "node_modules/preline/dist/*.js"],
=======
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
>>>>>>> vite-config
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          25: "#FCFAFF",
          50: "#F9F5FF",
          100: "#F4EBFF",
          200: "#E9D7FE",
          300: "#D6BBFB",
          400: "#B692F6",
          500: "#9E77ED",
          600: "#7F56D9",
          700: "#6941C6",
          800: "#53389E",
          900: "#42307D",
        },
        gray: {
<<<<<<< HEAD
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
=======
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
          950: "var(--gray-950)",
>>>>>>> vite-config
        },
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
