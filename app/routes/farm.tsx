import type { V2_MetaFunction } from "@remix-run/node";
import { Container, Grid } from "@mantine/core";
import FarmCard from "../components/FarmCard/FarmCard";
import type { Farm } from "~/types/Farm";

export const meta: V2_MetaFunction = () => [{ title: "Farms" }];

export default function FarmRoute() {
  const farms: Farm[] = [
    {
      image:
        "https://www.foodbusinessnews.net/ext/resources/2022/01/25/Plenty_Lead.png?height=667&t=1643128323&width=1080",
      id: 1,
      location: "Location 1",
      slots: 50,
      averageAPY: 5,
      pricePerSlot: 100,
    },
    {
      image:
        "https://www.foodbusinessnews.net/ext/resources/2022/01/25/Plenty_Lead.png?height=667&t=1643128323&width=1080",
      id: 2,
      location: "Location 2",
      slots: 100,
      averageAPY: 7,
      pricePerSlot: 80,
    },
    {
      image:
        "https://www.foodbusinessnews.net/ext/resources/2022/01/25/Plenty_Lead.png?height=667&t=1643128323&width=1080",
      id: 3,
      location: "Location 3",
      slots: 100,
      averageAPY: 7,
      pricePerSlot: 80,
    },
    {
      image:
        "https://www.foodbusinessnews.net/ext/resources/2022/01/25/Plenty_Lead.png?height=667&t=1643128323&width=1080",
      id: 4,
      location: "Location 4",
      slots: 100,
      averageAPY: 7,
      pricePerSlot: 80,
    },
  ];

  return (
    <Container size="lg" my="md">
      <Grid gutter={20}>
        {farms.map((farm: Farm) => (
          <Grid.Col xs={6} sm={4} md={3} key={farm.id}>
            <FarmCard farm={farm} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
