import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

import { unstakeInvestment } from "~/models/investment.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const investmentId = Number(formData.get("investmentId"));
  await unstakeInvestment(investmentId);
  return null;
};
