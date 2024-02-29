import plugin from "tailwindcss/plugin";

module.exports = {
  content: ["**/*.{ts,tsx}"],
  mode: "jit",
  darkMode: "media",
  theme: {
    extend: {
      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
        "3xl": 28,
        "4xl": 32,
        "5xl": 36,
        "6xl": 40,
        "7xl": 48,
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        base: {
          100: withAlphaChannel("--color-base-100"),
          200: withAlphaChannel("--color-base-200"),
          300: withAlphaChannel("--color-base-300"),
        },
        content: withAlphaChannel("--color-content"),

        primary: {
          DEFAULT: withAlphaChannel("--color-primary"),
        },
        secondary: {
          DEFAULT: withAlphaChannel("--color-secondary"),
        },

        gray: {
          100: "#4A5464",
          200: "#919AA9",
          300: "#B2BBCA",
          400: "#D7DBE1",
          500: "#DEE3EB",
          600: "#F2F4F7",
          700: "#FAFAFA",
        },
      },
      boxShadow: {
        DEFAULT: "0px 4px 25px rgba(0, 11, 28, 0.1)",
      },
    },
    screens: {
      sm: "700px",
      md: "1060px",
      lg: "1172px",
    },
  },
  plugins: [
    // reverse breakpoints. e.g. below-lg:* will apply styles to
    // screens _smaller_ than lg
    plugin(function ({ addVariant }) {
      addVariant(
        "below-lg",
        "@media screen and (max-width: calc(theme('screens.lg') - 1px))"
      );
      addVariant(
        "below-md",
        "@media screen and (max-width: calc(theme('screens.md') - 1px))"
      );
      addVariant(
        "below-sm",
        "@media screen and (max-width: calc(theme('screens.sm') - 1px))"
      );
    }),
  ],
};

function withAlphaChannel(color) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${color}))`;
    }
    return `rgb(var(${color}) / ${opacityValue})`;
  };
}
