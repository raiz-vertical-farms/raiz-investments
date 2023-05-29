import tinycolor from "tinycolor2";
import { ColorScheme } from "@mantine/core";

type _10Shades = [
  (string | undefined)?,
  (string | undefined)?,
  (string | undefined)?,
  (string | undefined)?,
  (string | undefined)?,
  (string | undefined)?,
  (string | undefined)?,
  (string | undefined)?,
  (string | undefined)?,
  (string | undefined)?
];

function generateShades(hexColor: string): _10Shades {
  const color = tinycolor(hexColor);
  const shades: (string | undefined)[] = [];

  for (let i = 0; i < 10; i++) {
    const shade = color.darken(i * 5).toString();
    shades.push(shade);
  }

  return shades as _10Shades;
}

export const theme = {
  colors: {
    primary: "#556B2F",
    secondary: "#8B4513",
    tertiary: "#4682B4",
    light: "#F4A460",
    dark: "#708090",
    white: "#FFFFFF",
    black: "#000000",
  },
  fontFamily: '"Roboto", sans-serif',
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  radius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },
  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.1)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 2px 4px rgba(0, 0, 0, 0.1)",
    lg: "0 4px 8px rgba(0, 0, 0, 0.1)",
    xl: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
  breakpoints: {
    xs: "480px",
    sm: "768px",
    md: "1024px",
    lg: "1440px",
    xl: "1920px",
  },
  transitions: {
    button: "color 0.3s ease, background-color 0.3s ease",
    link: "color 0.3s ease",
  },
  card: {
    padding: "1rem",
    hover: {
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    },
  },
};

export const mantineThemeOverride = {
  colorScheme: "light" as ColorScheme,
  focusRingStyles: {
    styles: (theme) => ({
      boxShadow: `0 0 0 2px ${theme.colors.primary}`,
    }),
    resetStyles: (theme) => ({
      boxShadow: "none",
    }),
    inputStyles: (theme) => ({
      boxShadow: `0 0 0 2px ${theme.colors.secondary}`,
    }),
  },
  white: theme.colors.white,
  black: theme.colors.black,
  colors: {
    primary: generateShades(theme.colors.primary),
    secondary: generateShades(theme.colors.secondary),
    tertiary: generateShades(theme.colors.tertiary),
    light: generateShades(theme.colors.light),
    dark: generateShades(theme.colors.dark),
  },
  primaryColor: "primary",
  defaultGradient: {
    deg: 45,
    from: theme.colors.primary,
    to: theme.colors.secondary,
  },
  fontFamily: theme.fontFamily,
  fontSizes: theme.fontSizes,
  radius: theme.radius,
  spacing: theme.spacing,
  shadows: theme.shadows,
  breakpoints: theme.breakpoints,
};
