import { Container, Grid, Text, Button, Stack } from "@mantine/core";
import { createStyles } from "@mantine/styles";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";

import Header from "~/components/Header/Header";
import InvestmentTable from "~/components/InvestmentTable/InvestmentTable";
import { getInvestments } from "~/models/investment.server";

export const meta: V2_MetaFunction = () => [{ title: "Investments" }];

export const loader = async ({ request }: LoaderArgs) => {
  const investments = await getInvestments();
  return json({ investments });
};

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20vh",
  },
}));

const Placeholder = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <Stack className={classes.container}>
      <Text mb="md" size="lg">
        No investments yet.
      </Text>
      <Button
        variant="filled"
        color="primary"
        onClick={() => navigate("/farms")}
      >
        Invest now
      </Button>
    </Stack>
  );
};

export default function Investments() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <Container size="lg" my="md">
        <Grid gutter={20}>
          {data.investments.length === 0 ? (
            <Placeholder />
          ) : (
            <InvestmentTable data={data.investments} />
            // data.investments.map((investment) => {
            //   const parsedInvestment = {
            //     ...investment,
            //     dateInvested: parseISO(investment.dateInvested), // Need to parse Date as it has been serialized to string
            //   };
            //   return (
            //     <Grid.Col xs={6} sm={4} key={parsedInvestment.id}>
            //       <InvestmentCard investment={parsedInvestment} />
            //     </Grid.Col>
            //   );
            // })
          )}
        </Grid>
      </Container>
    </>
  );
}
