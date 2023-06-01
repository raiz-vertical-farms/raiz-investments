import React from "react";
import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  Button,
  rem,
} from "@mantine/core";
import type { Investment } from "~/types/Investment";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface InvestmentCardProps {
  investment: Investment;
}

export default function InvestmentCard({ investment }: InvestmentCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src={`https://picsum.photos/seed/${investment.id}/200`}
          alt={investment.farmName}
          height={100}
        />
      </Card.Section>

      <Group position="apart" my="md">
        <Text fz="sm" fw={700} className={classes.title}>
          {investment.farmName}
        </Text>
        <Button variant="outline" color="primary">
          Unstake
        </Button>
      </Group>
      <Group>
        <Text mt="xs" c="dimmed" fz="xs">
          Status: <b>{investment.status}</b>
        </Text>
        <Text mt="xs" c="dimmed" fz="xs">
          Slots: <b>{investment.slots}</b>
        </Text>
        <Text mt="xs" c="dimmed" fz="xs">
          Invested on <b>{investment.dateInvested}</b>
        </Text>
      </Group>

      <Card.Section className={classes.footer} mt="sm">
        <Group mr="xs" spacing={0}>
          <Text size="xs" color="dimmed">
            Slots
          </Text>
          <Text weight={500} size="sm">
            {investment.slots}
          </Text>
        </Group>
        <Group mr="xs" spacing={0}>
          <Text size="xs" color="dimmed">
            Invested Amount
          </Text>
          <Text weight={500} size="sm">
            ${investment.investedAmount}
          </Text>
        </Group>
        <Group mr="xs" spacing={0}>
          <Text size="xs" color="dimmed">
            Yield Earned
          </Text>
          <Text weight={500} size="sm">
            ${investment.yieldEarned}
          </Text>
        </Group>
        <Group mr="xs" spacing={0}>
          <Text size="xs" color="dimmed">
            Total APY
          </Text>
          <Text weight={500} size="sm">
            {investment.totalAPY}%
          </Text>
        </Group>
      </Card.Section>
    </Card>
  );
}
