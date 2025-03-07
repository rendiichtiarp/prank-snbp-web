/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme :{
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'from-90-to-blue-green': 'linear-gradient(90deg, #083661, #006cbf)',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: "#0e0e0e",
        primary: "#7878784D",
        accepted:"#008acf",
        rejected : "#D93847",
        font : "#999",
        label : "#88ccf0",
        input : "#FAFAFA33",
        blackFont : "#2d2d2d"
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      },
    },
  },
  plugins: [],
};
