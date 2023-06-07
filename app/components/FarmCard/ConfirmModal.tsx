import { useEffect } from "react";
import { useCelo } from "@celo/react-celo";
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
import { useFetcher } from "@remix-run/react";
import { useMediaQuery } from "@mantine/hooks";

import TooltipButton from "./TooltipButton";
import type { Farm } from "~/types/Farm";

import { balanceOf, deposit } from "~/models/tokenizedVault.celo";

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

interface ConfirmModalProps {
  farm: Farm;
  walletId?: string | null;
  investSlots: number;
  opened: boolean;
  close: () => void;
  openSuccess: () => void;
}

const ConfirmModal = ({
  farm,
  walletId,
  investSlots,
  opened,
  close,
  openSuccess,
}: ConfirmModalProps) => {
  const fetcher = useFetcher();
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { address, connect } = useCelo();
  const { averageAPY, pricePerSlot } = farm;
  const totalInvested = pricePerSlot * investSlots;

  useEffect(() => {
    if (fetcher.data?.success) {
      close();
      openSuccess();
    }
  }, [fetcher]);

  const onInvest = async (walletId) => {
    if (address) {
      // Deposit assets on vault and receive vault tokens
      const tx = await deposit(totalInvested, address);
      console.log("Deposit tx: ", tx);

      // Todo: validate if blockchain transaction was successful

      // Create investment on db
      const data = new FormData();
      data.append("farmId", farm.id.toString());
      data.append("investedSlots", investSlots.toString());
      data.append(
        "json",
        JSON.stringify({
          farmName: farm.name,
          yieldEarned: 0,
          dateInvested: new Date().toISOString(),
          investedAmount: totalInvested,
          APY: averageAPY,
          status: "active",
          slots: investSlots,
          walletId,
        })
      );

      await fetcher.submit(data, {
        method: "post",
        action: "/investments/new",
      });
    } else {
      connect().catch((e) => console.log((e as Error).message));
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Confirm Investment"
      fullScreen={isMobile}
      centered={!isMobile}
      size="auto"
    >
      <Stack align="center" justify="center" spacing="xs">
        <Text size="lg" weight="700">
          Own a piece of our Lisbon Hybrid Farm. Make impact with profit!
        </Text>
        <Divider
          my="sm"
          className={classes.divider}
          label="Costs"
          labelPosition="center"
        />
        <Group align="flex-start" noWrap>
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
        <Group align="flex-start" noWrap>
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
              {(totalInvested * (1 + averageAPY / 100)).toFixed(2)}€
            </Text>
            <Text className={classes.wrappedLabel}>Paid Out after 1 year</Text>
          </Stack>
        </Group>
        <Divider
          my="sm"
          className={classes.divider}
          label="Impact"
          labelPosition="center"
        />
        <Group align="flex-start" spacing="xl" noWrap>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>{investSlots * 2} l</Text>
            <Text className={classes.wrappedLabel}>Water Saved per Year</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>{investSlots * 0.5}kg</Text>
            <Text className={classes.wrappedLabel}>
              CO<sub>2</sub> emissions avoided
            </Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>
              {investSlots * 0.1}m<sup>2</sup>
            </Text>
            <Text className={classes.wrappedLabel}>Farmland use avoided</Text>
          </Stack>
        </Group>
        <Space h="xl" />

        <TooltipButton
          radius="sm"
          onClick={() => onInvest(walletId)}
          variant="filled"
          fullWidth
          disabled={!walletId}
          sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
          disabledtooltip="Please connect your wallet first"
        >
          Invest
        </TooltipButton>
        <Button radius="sm" onClick={close} variant="light" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
};

export default ConfirmModal;
