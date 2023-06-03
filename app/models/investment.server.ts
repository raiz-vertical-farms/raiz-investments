import { prisma } from "~/db.server";
import type { Investment } from "~/types/Investment";

export function getInvestments() {
  return prisma.investment.findMany({
    orderBy: [
      {
        dateInvested: "desc",
      },
    ],
  });
}

export const createInvestment = ({
  farmName,
  yieldEarned,
  dateInvested,
  investedAmount,
  APY,
  status,
  slots,
}: Investment) => {
  return prisma.investment.create({
    data: {
      farmName,
      yieldEarned,
      dateInvested,
      investedAmount,
      APY,
      status,
      slots,
    },
  });
};

export const unstakeInvestment = async (id: number) => {
  const investment = await prisma.investment.update({
    where: { id },
    data: { status: "unstaked" },
  });
  return investment;
};
