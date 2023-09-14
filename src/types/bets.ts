export enum BetResult {
  WIN = "WIN",
  LOSE = "LOSE",
  PENDING = "PENDING"
}

export type BetStatus =
  | "RESULTED"
  | "PENDING"
  | "SCRATCHED"
  | "SETTLED"
  | "INVALID"
  | "REFUNDED";

// "#",
// "Punter",
// "Amount",
// "Time",
// "Race",
// "Proposition",
// "Status",
// "Result"
export type BetHistory = {
  index: number;
  punter: string;
  amount: string;
  asset: string;
  payout: string;
  time: number;
  race: string;
  runner: string;
  propositionId: string;
  proposition: string;
  status: BetStatus;
  //result: BetResult;
  result: string;
  tx: string;
  settledAtTx: string;
};

export type BetHistoryResponse = {
  bets: BetHistory[];
};
