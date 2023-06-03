import {
  Text,
  Group,
  Stack,
  Button,
  Modal,
  Divider,
  Space,
  Tooltip,
  createStyles,
} from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { createInvestment } from "~/models/investment.server";

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
  walletId?: string | null;
  investSlots: number;
  opened: boolean;
  close: () => void;
}

const FarmCard = ({
  farm,
  walletId,
  investSlots,
  opened,
  close,
}: FarmCardProps) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { averageAPY, pricePerSlot } = farm;
  const totalInvested = pricePerSlot * investSlots;

  const InvestButton = (props) => {
    const newProps = { ...props };
    if (props.disabled) {
      delete newProps.disabled;
      newProps["data-disabled"] = true;
    }
    return (
      <Tooltip
        label={"Please connect your wallet first"}
        disabled={!props.disabled}
      >
        <Button {...newProps} />
      </Tooltip>
    );
  };

  const onInvest = async (walletId) => {
    await createInvestment({
      id: undefined,
      farmName: farm.name,
      yieldEarned: 0,
      dateInvested: new Date(),
      investedAmount: totalInvested,
      APY: averageAPY,
      status: "active",
      slots: investSlots,
      walletId,
    });
    navigate("/investments");
  };

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
            <Text className={classes.bigLabel}>{totalInvested}€</Text>
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
            <Text className={classes.bigLabel}>{totalInvested}</Text>
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
              {totalInvested * (1 + averageAPY / 100)}€
            </Text>
            <Text className={classes.wrappedLabel}>Paid Out after 1 year</Text>
          </Stack>
        </Group>
        <Space h="xl" />

        <InvestButton
          radius="sm"
          onClick={() => onInvest(walletId)}
          variant="filled"
          fullWidth
          disabled={!walletId}
          sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
        >
          Invest
        </InvestButton>
        <Button radius="sm" onClick={close} variant="light" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
};

export default FarmCard;
