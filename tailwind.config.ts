import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       backgroundImage: {
       
        loginbg: "url('/create-profile/src/assets/loginbg.png')",
      },
    },
  },
  plugins: [],
};
export default config;
