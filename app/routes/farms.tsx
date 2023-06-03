import { Container, Grid } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { Farm } from "~/types/Farm";
import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { useCelo } from "@celo/react-celo";

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
  let { address } = useCelo();

  return (
    <>
      <Header />
      <Container size="lg" my="md">
        <Grid gutter={20}>
          {data.farms.map((farm: Farm) => (
            <Grid.Col xs={6} sm={4} key={farm.id}>
              <FarmCard farm={farm} walletId={address} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
