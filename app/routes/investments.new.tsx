import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

import { createInvestment } from "~/models/investment.server";
import { investInFarm } from "~/models/farm.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  // Decrease the number of slots available in the farm
  const farmId = Number(formData.get("farmId"));
  const investedSlots = Number(formData.get("investedSlots"));
  await investInFarm(farmId, investedSlots);

  // Create the investment
  const data = JSON.parse(formData.get("json") as string);
  await createInvestment(data);
  return redirect("/investments");
};
