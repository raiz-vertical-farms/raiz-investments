import { Container, Grid } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { Farm } from "~/types/Farm";
import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";

import FarmCard from "~/components/FarmCard/FarmCard";
import Header from "~/components/Header/Header";
import { getFarms } from "~/models/farm.server";

export const meta: V2_MetaFunction = () => [{ title: "Farms" }];

export const loader = async ({ request }: LoaderArgs) => {
  const farms = await getFarms();
  return json({ farms });
};

export default function FarmRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <Container size="lg" my="md">
        <Grid gutter={20}>
          {data.farms.map((farm: Farm) => (
            <Grid.Col xs={6} sm={4} md={3} key={farm.id}>
              <FarmCard farm={farm} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
