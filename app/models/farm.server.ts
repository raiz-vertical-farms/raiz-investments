import { prisma } from "~/db.server";

export function getFarms() {
  return prisma.farm.findMany();
}

export const investInFarm = (farmId: number, investedSlots: number) => {
  return prisma.farm.update({
    where: { id: farmId },
    data: { slots: { decrement: investedSlots } },
  });
};
