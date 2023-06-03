import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Badge,
  Button,
  rem,
} from "@mantine/core";
import { useFetcher } from "@remix-run/react";

import type { Investment } from "~/types/Investment";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  tr: {
    height: "51px",
  },
}));

interface InvestmentTableProps {
  data: Investment[];
}

const InvestmentTable = ({ data }: InvestmentTableProps) => {
  const { classes, cx } = useStyles();
  const fetcher = useFetcher();
  const [scrolled, setScrolled] = useState(false);

  const onUnStake = async (investmentId: number | undefined) => {
    if (!investmentId) return;
    const data = new FormData();
    data.append("investmentId", investmentId.toString());
    fetcher.submit(data, {
      method: "post",
      action: "/investments/unstake",
    });
  };

  const rows = data.map((row) => {
    return (
      <tr key={row.id} className={classes.tr}>
        <td>{row.farmName}</td>
        <td>
          <Badge color={row.status === "active" ? "green" : "gray"}>
            {row.status}
          </Badge>
        </td>
        <td>{row.slots}</td>
        <td>{row.dateInvested.toString().slice(0, 16).replace("T", " ")}</td>
        <td>{row.investedAmount} €</td>
        <td>{row.APY}%</td>
        <td>{row.yieldEarned} €</td>
        <td>
          {row.status === "active" && (
            <Button variant="subtle" onClick={() => onUnStake(row.id)}>
              Unstake
            </Button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea
      h="100%"
      w="100%"
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Farm Name</th>
            <th>Status</th>
            <th># Spaces</th>
            <th>Date Invested</th>
            <th>Invested Amount</th>
            <th>APY</th>
            <th>Yield Earned</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default InvestmentTable;
