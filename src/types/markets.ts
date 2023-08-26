export type MarketHistoryType = "BORROW" | "REPAY";

export type MarketBorrowResponse = {
  id: string;
  vaultAddress: string;
  betIndex: number;
  amount: string;
  createdAt: number;
};

export type MarketRepayResponse = {
  id: string;
  vaultAddress: string;
  amount: string;
  createdAt: number;
};

export type MarketHistory = {
  id: string; // tx id
  vaultAddress: string;
  amount: string;
  type: MarketHistoryType;
  createdAt: number;
};
