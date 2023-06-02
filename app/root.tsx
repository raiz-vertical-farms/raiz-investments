import type {
  V2_MetaFunction,
  LoaderArgs,
  LinksFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import { ThemeProvider } from "@emotion/react";
import { theme, mantineThemeOverride } from "~/theme";
import { getUser } from "~/session.server";
import { CeloProvider, Alfajores } from "@celo/react-celo";
import celoStyles from "@celo/react-celo/lib/styles.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: celoStyles }];
};

export const meta: V2_MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Raiz Investments",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

createEmotionCache({ key: "mantine" });

export default function App() {
  return (
    <CeloProvider
      dapp={{
        name: "Raiz investments dApp",
        description: "ReFi dApp to invest in farms",
        url: "https://example.com", // Todo: set url
        icon: "https://example.com/favicon.ico", // Todo: set icon
      }}
      defaultNetwork={Alfajores.name}
      connectModal={{
        providersOptions: { searchable: true },
      }}
    >
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
            <body style={{ minWidth: "320px" }}>
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </body>
          </html>
        </ThemeProvider>
      </MantineProvider>
    </CeloProvider>
  );
}
