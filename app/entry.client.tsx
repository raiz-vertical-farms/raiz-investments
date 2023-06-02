import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from 'react-dom/client';
import { ClientProvider } from "@mantine/remix";

const root = hydrateRoot(
  document,
  <ClientProvider>
    <RemixBrowser />
  </ClientProvider>
);
