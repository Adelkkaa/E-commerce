/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
    },

    extend: {
      boxShadow: {
        custom: "0px 4px 4px 0px rgba(0, 0, 0, 0.13)", // Преобразованная версия вашего стиля
      },
      screens: {
        mb: "360px",
        ml: "460px",
        md: "768px",
        tb: "980px",
        lg: "1024px",
        dk: "1300px",
        xl: "1500px",
      },
      fontSize: {
        h1: [
          "40px",
          {
            fontWeight: "700",
          },
        ],
        h2: ["40px"],
        h3: [
          "16px",
          {
            fontWeight: "700",
          },
        ],
        titleXS: [
          "14px",
          {
            fontWeight: "700",
          },
        ],

        titleS: [
          "16px",
          {
            fontWeight: "700",
          },
        ],
        titleL: [
          "40px",
          {
            fontWeight: "700",
          },
        ],
        textXXS: [
          "10px",
          {
            fontWeight: 400,
          },
        ],
        textXS: [
          "12px",
          {
            fontWeight: 400,
          },
        ],
        textS: [
          "14px",
          {
            fontWeight: 400,
          },
        ],
        textM: [
          "20px",
          {
            fontWeight: 400,
            lineHeight: "25px",
          },
        ],
        textL: [
          "20px",
          {
            fontWeight: 700,
            lineHeight: "25px",
          },
        ],
        textXl: [
          "30px",
          {
            fontWeight: "600",
          },
        ],
        textXXl: [
          "30px",
          {
            fontWeight: "700",
          },
        ],
        textAlertTitle: [
          "200px",
          {
            fontWeight: "900",
            lineHeight: "200px",
          },
        ],
        buttonM: [
          "16px",
          {
            fontWeight: "700",
          },
        ],
        modalTitle: [
          "40px",
          {
            fontWeight: "700",
          },
        ],
        modalDesc: [
          "16px",
          {
            fontWeight: "400",
          },
        ],
        tableText: [
          "20px",
          {
            fontWeight: "600",
          },
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        main: "#BE232B",
        blueCustom: "#3A71C3",
        grayCustom: "#A4B1BB",
        whiteCustom: "#F8F8F8",
        blackCustom: "#000000",
        whiteBg: "#EFEFEF",
        yellowCustom: "#CDCB10",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          margin: "0 auto",
          transition: "all 0.2s ease-out",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          "@screen mb": {
            maxWidth: "100%",
          },
          "@screen dk": {
            maxWidth: "100%",
          },
          "@screen xl": {
            maxWidth: "1510px",
            padding: "0px 10px",
          },
        },
        ".subContainer": {
          margin: "0 auto",
          "@screen mb": {
            maxWidth: "100%",
            padding: "0px 10px",
          },
          "@screen xl": {
            maxWidth: "1510px",
            padding: "0px 10px",
          },
        },
        ".fullWidth": {
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          "@screen mb": {
            minWidth: "100%",
          },
          "@screen xl": {
            width: "calc(100vw - 16px)",
          },
        },
        ".padding": {
          "@screen mb": {
            padding: "0px 10px",
          },
        },
        ".fillBlue svg": {
          fill: "#3A71C3",
          path: {
            stroke: "#3A71C3",
          },
        },
        ".strokeBlue svg": {
          path: {
            stroke: "#3A71C3",
          },
        },
        ".fillMain svg": {
          fill: "#BE232B",
          path: {
            stroke: "#BE232B",
          },
        },
        ".strokeMain svg": {
          path: {
            stroke: "#BE232B",
          },
        },
        ".boxShadow": {
          boxShadow: "0px 4px 4px 0px #0000001A",
        },
      });
    },
  ],
};
