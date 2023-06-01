import { Container, Grid } from "@mantine/core";
import InvestmentCard from "~/components/InvestmentCard/InvestmentCard";
import type { Investment } from "~/types/Investment";

const investments: Investment[] = [
  {
    id: 1,
    farmName: "Farm 1",
    dateInvested: "2022-01-01",
    investedAmount: 1000,
    yieldEarned: 70,
    totalAPY: 7,
    slots: 50,
    status: "Active",
  },
  {
    id: 2,
    farmName: "Farm 2",
    dateInvested: "2022-01-15",
    investedAmount: 500,
    yieldEarned: 35,
    totalAPY: 7,
    slots: 50,
    status: "Active",
  },
  {
    id: 3,
    farmName: "Farm 3",
    dateInvested: "2022-02-01",
    investedAmount: 2000,
    yieldEarned: 140,
    totalAPY: 7,
    slots: 50,
    status: "Active",
  },
  {
    id: 4,
    farmName: "Farm 4",
    dateInvested: "2022-02-15",
    investedAmount: 1000,
    yieldEarned: 70,
    totalAPY: 7,
    slots: 50,
    status: "Active",
  },
];

export default function Investments() {
  return (
    <Container size="lg" my="md">
      <Grid gutter={20}>
        {investments.map((investment) => (
          <Grid.Col xs={6} sm={4} key={investment.id}>
            <InvestmentCard investment={investment} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
