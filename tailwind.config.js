/** @type {import('tailwindcss').Config} */

// import prelinePlugin from "preline/plugin";
import tailwindForms from "@tailwindcss/forms";

export default {
  content: [
    "./views/**/*.ejs",
    "./views/*.ejs",
    "./public/*.{html,js}",
    "./public/**/*.js",
    // "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // prelinePlugin,
    tailwindForms,
  ],
};
