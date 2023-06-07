import { useState, useEffect } from 'react';
import { useCelo } from '@celo/react-celo';

import {
  Text,
  Group,
  Stack,
  Modal,
  Divider,
  Space,
  createStyles,
} from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { useMediaQuery } from "@mantine/hooks";

import TooltipButton from "./TooltipButton";
import type { Farm } from "~/types/Farm";

import { approve, deposit, kit, assetAllowance } from "~/models/tokenizedVault.celo";

const useStyles = createStyles((theme) => ({
  bigLabel: {
    fontSize: theme.fontSizes.xxl,
    lineHeight: theme.fontSizes.xxl,
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
  buttonsContainer: {
    width: "100%",
  }
}));

interface ConfirmModalProps {
  farm: Farm;
  walletId?: string | null;
  investSlots: number;
  opened: boolean;
  close: () => void;
  openSuccess: () => void;
  setTransactionUrl: (url: string) => void;
}

const ConfirmModal = ({
  farm,
  walletId,
  investSlots,
  opened,
  close,
  openSuccess,
  setTransactionUrl,
}: ConfirmModalProps) => {
  const fetcher = useFetcher();
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { connect } = useCelo();
  const { averageAPY, pricePerSlot } = farm;
  const [ totalInvested, setTotalInvested ] = useState(0);
  const [ transactionApproved, setTransactionApproved ] = useState(false);
  const [ loadingApprove, setLoadingApprove ] = useState(false);
  const [ loadingInvest, setLoadingInvest ] = useState(false);
  
  useEffect(() => {
    if (fetcher.data?.success) {
      close();
      openSuccess();
    }
  }, [fetcher]);

  useEffect(() => {
    const resetModal = () => setTransactionApproved(false);
    if (opened) {
      // Todo: check allowance approved for vault contract to spend for user from blockchain
      const checkTransactionApproved = () => {
        try {
          const fetchAllowance = async () => await assetAllowance(walletId).then(allowance => {
            const allowanceNum = kit.web3.utils.fromWei(allowance.toString(), "ether");
            
            setTransactionApproved(totalInvested <= Number(allowanceNum));
          });
          fetchAllowance();
          
        } catch(e) {
          console.error(e);
        }
      };
      resetModal();
      checkTransactionApproved();
    }
  }, [opened, totalInvested, walletId]);

  useEffect(() => {
    setTotalInvested(pricePerSlot * investSlots);
  }, [pricePerSlot, investSlots]);

  const onApproveInvest = async (walletId) => {
    if (walletId) {
      setLoadingApprove(true);
      // Todo: on success, set transactionApproved to true
      try {
        const txApprove = await approve(walletId, totalInvested).then(async (tx) => {
          console.log('approve tx: ', tx);
          
          const transactionHash = await tx.getHash();
          console.log('transactionHash', transactionHash);
          if (transactionHash) {
            setTransactionApproved(true);
          }
          const transactionReceipt = await tx.waitReceipt();
          console.log('transactionReceipt', transactionReceipt);
          
          const receipt = await kit.web3.eth.getTransactionReceipt(transactionHash).then((res) => {
            console.log('res', res);
          });
          console.log('recepit', receipt);
        });
        console.log('txApprove', txApprove);
      } catch(e) {
        console.error(e);
      }
      setLoadingApprove(false);
    } else {
      connect().catch((e) => console.log((e as Error).message));
    }
  };

  const onInvest = async (walletId) => {
    if (walletId) {
      setLoadingInvest(true);
      try {
        // Deposit assets on vault and receive vault tokens
        // Todo: separate approve from deposit
        const txDeposit = await deposit(totalInvested, walletId);
        
        const txHash = await txDeposit.getHash();
        //! Todo: Change to mainnet on prod
        setTransactionUrl(`https://alfajores.celoscan.io/tx/${txHash}`);
  
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
      } catch(e) {
        console.error(e);
      }
      setLoadingInvest(false);
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
            <Text className={classes.wrappedLabel}>cUSD / Space</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.secondaryBigLabel}>=</Text>
          </Stack>
          <Stack spacing={0} align="center" justify="flex-start">
            <Text className={classes.bigLabel}>{totalInvested}cUSD</Text>
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
              {(totalInvested * (1 + averageAPY / 100)).toFixed(2)}cUSD
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

        <Group position="center" grow className={classes.buttonsContainer}>
          <TooltipButton
            radius="sm"
            onClick={() => onApproveInvest(walletId)}
            variant="filled"
            fullWidth
            sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
            disabled={!walletId}
            disabledtooltip="Please connect your wallet first"
            color="blue"
            loading={loadingApprove}
          >
            Approve
          </TooltipButton>
          <TooltipButton
            radius="sm"
            onClick={() => onInvest(walletId)}
            variant="filled"
            fullWidth
            sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
            disabled={!walletId || !transactionApproved}
            disabledtooltip={!walletId ? "Please connect your wallet first" : "Please approve transaction first"}
            loading={loadingInvest}
          >
            Invest
          </TooltipButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ConfirmModal;
