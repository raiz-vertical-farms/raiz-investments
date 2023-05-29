import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import type { Farm } from "~/types/Farm";

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

  like: {
    color: theme.colors.red[6],
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
        <Button radius="md" style={{ flex: 1 }} onClick={handleInvest}>
          Invest
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon>
        <div style={{ flex: 1 }}>
          <Text align="right" fz="sm" mt="xs">
            Invest slots:
          </Text>
          <input
            type="number"
            min={1}
            max={slots}
            value={investSlots}
            onChange={(event) => setInvestSlots(parseInt(event.target.value))}
            style={{ width: "100%", marginTop: "4px" }}
          />
        </div>
      </Group>
    </Card>
  );
};

export default FarmCard;
