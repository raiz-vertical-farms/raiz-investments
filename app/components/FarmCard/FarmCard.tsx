import { useState } from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Stack,
  Badge,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import QuantityInput from "./QuantityInput";
import ConfirmModal from "./ConfirmModal";
import SuccessModal from "./SuccessModal";
import TooltipButton from "./TooltipButton";
import lisbonConceptFarm from "~/assets/lisbon_concept_farm.jpg";
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

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
  wrappedLabel: {
    maxWidth: "70px",
    textAlign: "center",
    fontSize: theme.fontSizes.xs,
    color: theme.colors.gray[7],
    fontWeight: 500,
  },
  bigLabel: {
    fontSize: theme.fontSizes.xxxl,
    lineHeight: theme.fontSizes.xxxl,
    fontWeight: 800,
  },
  secondaryBigLabel: {
    fontSize: theme.fontSizes.xxl,
    lineHeight: theme.fontSizes.xxxl,
    fontWeight: 800,
    color: theme.colors.gray[7],
  },
  divider: {
    width: "100%",
  },
}));

interface FarmCardProps {
  farm: Farm;
  walletId?: string | null;
}

const FarmCard = ({ farm, walletId }: FarmCardProps) => {
  const { image, name, location, slots, averageAPY, pricePerSlot } = farm;
  const { classes, theme } = useStyles();
  const [investSlots, setInvestSlots] = useState(1);
  const [transactionUrl, setTransactionUrl] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const [successOpened, { open: openSuccess, close: closeSuccess }] =
    useDisclosure(false);

  const features = [
    { emoji: "📍", label: location },
    { emoji: "🌱", label: `Growing Spaces: ${slots}` },
    { emoji: "💰", label: `Price per slot: ${pricePerSlot} cUSD` },
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
    <>
      <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image src={lisbonConceptFarm} alt={location} height={180} />
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Group position="apart">
            <Text fz="lg" fw={500}>
              {name}
            </Text>
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text my="md" className={classes.label} c="dimmed">
            Farm details
          </Text>
          <Stack align="flex-start" justify="flex-start" spacing="xs">
            {features}
          </Stack>
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
          <TooltipButton
            radius="sm"
            style={{ flex: 1 }}
            onClick={open}
            variant="filled"
            disabled={slots < investSlots}
            sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
            disabledtooltip="Not enough slots available"
          >
            Invest {pricePerSlot * investSlots} cUSD
          </TooltipButton>
        </Group>
      </Card>
      <ConfirmModal
        farm={farm}
        walletId={walletId}
        opened={opened}
        investSlots={investSlots}
        close={close}
        openSuccess={openSuccess}
        setTransactionUrl={setTransactionUrl}
      />
      <SuccessModal opened={successOpened} close={closeSuccess} transactionUrl={transactionUrl} />
    </>
  );
};

export default FarmCard;
