/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "#f8fafc",
          foreground: "#1f2937",
          primary: "#3b82f6",
          "primary-foreground": "#ffffff",
          secondary: "#facc15",
          "secondary-foreground": "#000000",
          "muted-foreground": "#6b7280",
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        
      },
    },
    plugins: [],
  }
  