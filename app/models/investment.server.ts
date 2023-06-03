import { prisma } from "~/db.server";
import type { Investment } from "~/types/Investment";

export function getInvestments() {
  return prisma.investment.findMany();
}

export function createInvestment({
  farmName,
  yieldEarned,
  dateInvested,
  investedAmount,
  APY,
  status,
  slots,
}: Investment) {
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
}
