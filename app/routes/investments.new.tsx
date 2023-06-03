import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

import { createInvestment } from "~/models/investment.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const data = JSON.parse(formData.get("json") as string);
  await createInvestment(data);
  return redirect("/investments");
};
