import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  createStyles,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import type { Farm } from "~/types/Farm";
import { QuantityInput } from "./QuantityInput";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface FarmCardProps {
  farm: Farm;
}

const FarmCard = ({ farm }: FarmCardProps) => {
  const { image, id, location, slots, averageAPY, pricePerSlot } = farm;
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const [investSlots, setInvestSlots] = useState(1);

  const handleInvest = () => {
    navigate(`/invest/${location}/${investSlots}`);
  };

  const features = [
    { emoji: "📍", label: location },
    { emoji: "🌱", label: `Slots: ${slots}` },
    { emoji: "💰", label: `Price per slot: $${pricePerSlot}` },
    { emoji: "📈", label: `Average APY: ${averageAPY}%` },
  ].map((badge) => (
    <Badge
      color={theme.colorScheme === "dark" ? "dark" : "gray"}
      key={badge.label}
      leftSection={badge.emoji}
    >
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={location} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {location}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Farm details
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <div style={{ flex: 1 }}>
          <QuantityInput
            min={1}
            max={slots}
            value={investSlots}
            onChange={setInvestSlots}
          />
        </div>
        <Button
          radius="sm"
          style={{ flex: 1 }}
          onClick={handleInvest}
          variant="light"
        >
          Invest & Grow
        </Button>
      </Group>
    </Card>
  );
};

export default FarmCard;
