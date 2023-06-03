export interface Investment {
  id: number | undefined;
  farmName: string;
  yieldEarned: number;
  dateInvested: Date | string;
  investedAmount: number;
  APY: number;
  status: string;
  slots: number;
  walletId?: string | null;
}
