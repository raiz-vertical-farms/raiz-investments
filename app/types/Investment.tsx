export interface Investment {
  id: number | undefined;
  farmName: string;
  yieldEarned: number;
  dateInvested: Date;
  investedAmount: number;
  APY: number;
  status: string;
  slots: number;
  walletId?: string | null;
}
