import { Container, Grid } from "@mantine/core";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { parseISO } from "date-fns";
import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";

import InvestmentCard from "~/components/InvestmentCard/InvestmentCard";
import { getInvestments } from "~/models/investment.server";
import type { Investment } from "~/types/Investment";

export const meta: V2_MetaFunction = () => [{ title: "Investments" }];

export const loader = async ({ request }: LoaderArgs) => {
  const investments = await getInvestments();
  return json({ investments });
};

export default function Investments() {
  const data = useLoaderData<typeof loader>();

  return (
    <Container size="lg" my="md">
      <Grid gutter={20}>
        {data.investments.map((investment) => {
          const parsedInvestment = {
            ...investment,
            dateInvested: parseISO(investment.dateInvested), // Need to parse Date as it has been serialized to string
          };
          return (
            <Grid.Col xs={6} sm={4} key={parsedInvestment.id}>
              <InvestmentCard investment={parsedInvestment} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
}
