export interface Investment {
  id: number;
  farmName: string;
  yieldEarned: number;
  dateInvested: string;
  investedAmount: number;
  totalAPY: number;
  status: string;
  slots: number;
}
