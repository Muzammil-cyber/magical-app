/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "synthwave",
      {
        mytheme: {
          primary: "#111827",
          secondary: "#ffffff",
          accent: "#f3f4f6",
          neutral: "#111827",
          "base-100": "#ffffff",
          info: "#78716c",
          success: "#00ff00",
          warning: "#fef08a",
          error: "#f87171",
        },
      },
    ],
  },
};
