import type { Config } from "tailwindcss";
import { withUt } from 'uploadthing/tw'

// for css animation plugin docs
// https://github.com/jamiebuilds/tailwindcss-animate?tab=readme-ov-file

const config: Config = withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts, tsx, mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "clear-background" : "#ececec",
        "input-border" : "#bbb"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
});
export default config;
