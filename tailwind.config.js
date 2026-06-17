const { nextui } = require("@nextui-org/react"); // <-- Cần có dòng này ở đầu file

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}" // <-- Quét class NextUI
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()], // <--- 💥 THIẾU CÁI NÀY LÀ FORM BỊ VUÔNG VÀ XẤU. BẮT BUỘC PHẢI CÓ!
};