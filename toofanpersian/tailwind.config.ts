import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 رنگ اصلی برند
        brand: {
          50: "#FFF6EC",
          100: "#FFEAD3",
          200: "#FFD3A6",
          300: "#FFB769",
          400: "#FF9A33",
          500: "#FF7C03",
          600: "#E56A00",
          700: "#BF5800",
          800: "#994700",
          900: "#7D3A00",
        },
        // 💙 سرمه‌ای برند
        navy: {
          50: "#EEF0FF",
          100: "#DEE1FF",
          200: "#B9BFFF",
          300: "#949DFF",
          400: "#6E79F2",
          500: "#4A52D8",
          600: "#2E36B8",
          700: "#14028E",
          800: "#0F0270",
          900: "#0A014D",
          950: "#060130",
        },
        // 🌅 رنگ کرم (جدید — برای پس‌زمینه editorial)
        cream: "#FAF6EF",
        // رنگ‌های معنایی
        ink: "#101433",
        muted: "#5B6178",
        surface: "#F6F7FC",
        line: "#E6E8F0",
        "sky-tint": "#EAF1FF",
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(20, 2, 142, 0.08)",
        search: "0 24px 70px rgba(6, 1, 48, 0.25)",
        chip: "0 2px 10px rgba(20, 2, 142, 0.06)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;