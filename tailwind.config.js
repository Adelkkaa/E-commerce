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
      padding: "2rem",

      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      screens: {
        mb: "360px",
        ml: "460px",
        md: "768px",
        tb: "980px",
        lg: "1024px",
        dk: "1300px",
        xl: "1680px",
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

        titleS: [
          "16px",
          {
            fontWeight: "700",
          },
        ],
        textS: [
          "12px",
          {
            fontWeight: 400,
          },
        ],
        textM: ["1.4rem"],
        textL: ["1.6rem"],
        textXl: [
          "2rem",
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
        blueCustom: "#3A71C3",
        grayCustom: "#A4B1BB",
        whiteCustom: "#F8F8F8",
        blackCustom: "#000000",
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
    function ({ addComponents, addUtilities }) {
      addComponents({
        ".container": {
          margin: "0 auto",
          transition: "all 0.2s ease-out",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          padding: "0px",
          "@screen mb": {
            maxWidth: "100%",
          },
          "@screen dk": {
            maxWidth: "1500px",
          },
          "@screen xl": {
            maxWidth: "1500px",
          },
        },
        ".subContainer": {
          margin: "0 auto",
          "@screen mb": {
            maxWidth: "100%",
          },
          "@screen dk": {
            maxWidth: "1500px",
          },
          "@screen xl": {
            maxWidth: "1500px",
          },
        },
        ".fullWidth": {
          width: "100vw",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
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
      });
    },
  ],
};
