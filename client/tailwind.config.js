/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#302128",
        secondary: "#FEC000",
        third: "#5A2F27",
      },
      animation: {
        borderColorAnim: "borderColorAnim 5s infinite",
        textColorAnim: "textColorAnim 5s infinite",
      },
      keyframes:{
        borderColorAnim: {
          "0%": { borderColor: "#302128" },
          "25%": { borderColor: "#FEC000" },
          "50%": { borderColor: "#5A2F27" },
          "75%": { borderColor: "#FEC000" },
          "100%": { borderColor: "#302128" },
        },
        textColorAnim: {
          "0%": { color: "#302128" },
          "25%": { color: "#F17070" },
          "50%": { color: "#F30E0E" },
          "75%": { color: "#FEC000" },
          "100%": { color: "#F30E0E" },
        },
      }
    },

  },
  plugins: [],
}

