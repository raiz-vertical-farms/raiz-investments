import type { Farm } from "@prisma/client";
import { prisma } from "~/db.server";

export function getFarms() {
  return prisma.farm.findMany();
}
