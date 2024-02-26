module.exports = {
  content: ["./client/**/*.{ts,tsx}"],
  mode: "jit",
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
        "3xl": 28,
        "4xl": 32,
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
};

function withAlphaChannel(color) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${color}))`;
    }
    return `rgb(var(${color}) / ${opacityValue})`;
  };
}
