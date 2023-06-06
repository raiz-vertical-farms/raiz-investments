import { Container, Grid } from "@mantine/core";
import type { V2_MetaFunction } from "@remix-run/node";

import Header from "~/components/Header/Header";

export const meta: V2_MetaFunction = () => [{ title: "Home" }];

export default function Home() {

  return (
    <>
      <Header />
      <Container size="lg" my="md">
        <Grid gutter={20}>
          HII :) i'm back Home
        </Grid>
      </Container>
    </>
  );
}
