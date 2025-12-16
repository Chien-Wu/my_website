/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#000000",
          text: "#33ff33",
          dim: "#22aa22",
          blue: "#00d4ff",
          border: "#33ff33",
        },
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
        terminal: ["VT323", "monospace"],
      },
    },
  },
  plugins: [],
};
