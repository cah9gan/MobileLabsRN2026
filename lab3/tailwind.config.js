/** @type {import('tailwindcss').Config} */
module.exports = {
  // Укажите пути ко всем файлам, где используются классы Tailwind
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}