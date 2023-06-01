import type { V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import { theme, mantineThemeOverride } from "~/theme";
import { ThemeProvider } from "@emotion/react";

export const meta: V2_MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Raiz Investments",
    viewport: "width=device-width,initial-scale=1",
  },
];

createEmotionCache({ key: "mantine" });

export default function App() {
  return (
    <MantineProvider
      theme={mantineThemeOverride}
      withGlobalStyles
      withNormalizeCSS
    >
      <ThemeProvider theme={theme}>
        <html lang="en">
          <head>
            {/* Prevents FOUC */}
            <StylesPlaceholder />
            <Meta />
            <Links />
          </head>
          <body>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      </ThemeProvider>
    </MantineProvider>
  );
}
