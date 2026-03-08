const { heroui } = require("@heroui/theme"); // or const heroui = require("@heroui/theme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: "var(--color-mint-50)",
          100: "var(--color-mint-100)",
          200: "var(--color-mint-200)",
          300: "var(--color-mint-300)",
          400: "var(--color-mint-400)",
          500: "var(--color-mint-500)",
          600: "var(--color-mint-600)",
          700: "var(--color-mint-700)",
          800: "var(--color-mint-800)",
          900: "var(--color-mint-900)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  safelist: [
    "bg-mycolor-50",
    "bg-mycolor-100",
    "bg-mycolor-200",
    "bg-mycolor-300",
    "bg-mycolor-400",
    "bg-mycolor-500",
    "bg-mycolor-600",
    "bg-mycolor-700",
    "bg-mycolor-800",
    "bg-mycolor-900",
    "text-mycolor-50",
    "text-mycolor-100",
    "text-mycolor-200",
    "text-mycolor-300",
    "text-mycolor-400",
    "text-mycolor-500",
    "text-mycolor-600",
    "text-mycolor-700",
    "text-mycolor-800",
    "text-mycolor-900",
  ],
  darkMode: "class",
  plugins: [heroui()],
};
