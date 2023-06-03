import {
  Text,
  Group,
  Stack,
  Button,
  Modal,
  Divider,
  Space,
  createStyles,
} from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import type { Farm } from "~/types/Farm";

const useStyles = createStyles((theme) => ({
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
  wrappedLabel: {
    maxWidth: "70px",
    textAlign: "center",
    fontSize: theme.fontSizes.xs,
    color: theme.colors.gray[7],
    fontWeight: 500,
  },
}));

interface FarmCardProps {
  farm: Farm;
  investSlots: number;
  opened: boolean;
  close: () => void;
}

const FarmCard = ({ farm, investSlots, opened, close }: FarmCardProps) => {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  const { image, name, location, slots, averageAPY, pricePerSlot } = farm;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Confirm Investment"
      fullScreen
    >
      <Stack align="center" justify="center" spacing="xs">
        <Divider
          my="sm"
          className={classes.divider}
          label="Costs"
          labelPosition="center"
        />
        <Group align="flex-start">
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>{investSlots}</Text>
            <Text className={classes.wrappedLabel}>Spaces</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.secondaryBigLabel}>x</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>{pricePerSlot}</Text>
            <Text className={classes.wrappedLabel}>€ / Space</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.secondaryBigLabel}>=</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>
              {pricePerSlot * investSlots}€
            </Text>
            <Text className={classes.wrappedLabel}>Total Price</Text>
          </Stack>
        </Group>
        <Divider
          my="sm"
          className={classes.divider}
          label="Returns"
          labelPosition="center"
        />
        <Group align="flex-start">
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>
              {pricePerSlot * investSlots}
            </Text>
            <Text className={classes.wrappedLabel}>Total Price</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.secondaryBigLabel}>x</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>{1 + averageAPY / 100}</Text>
            <Text className={classes.wrappedLabel}>{averageAPY}% APY</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.secondaryBigLabel}>=</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>
              {pricePerSlot * investSlots * (1 + averageAPY / 100)}€
            </Text>
            <Text className={classes.wrappedLabel}>Paid Out after 1 year</Text>
          </Stack>
        </Group>
        <Space h="xl" />
        <Button
          radius="sm"
          onClick={() => navigate("/investments")}
          variant="filled"
          fullWidth
        >
          Invest
        </Button>
        <Button radius="sm" onClick={close} variant="light" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
};

export default FarmCard;
