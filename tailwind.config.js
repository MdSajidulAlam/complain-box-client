/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  themes: [
    {
      lightTheme: {
        "primary": "#C20095",
        "secondary": "#323548",
        "accent": "#37CDBE",
        "neutral": "#3D4451",
        "base-100": "#FFFFFF",
        "info": "#3ABFF8",
        "success": "#36D399",
        "warning": "#FBBD23",
        "error": "#F87272",
      },
    },
    {
      darkTheme: {
        "primary": "#323548",
        "secondary": "#FFFFF",
        "accent": "#37CDBE",
        "neutral": "#3D4451",
        "base-100": "#FFFFFF",
        "info": "#3ABFF8",
        "success": "#36D399",
        "warning": "#FBBD23",
        "error": "#F87272",
      },
    },
  ],
  plugins: [require("daisyui")],
}