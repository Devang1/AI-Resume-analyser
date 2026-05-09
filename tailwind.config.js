/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        primary: "#6366F1",
        accent: "#8B5CF6"
      }
    }
  },
  plugins: []
};
