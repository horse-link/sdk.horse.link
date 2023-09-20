export type FormattedProtocol = {
    id: "protocol";
    inPlay: number;
    tvl: number;
    performance: number;
    lastUpdate: number;
  };
  
  export type MarketStats = {
    totalBets: number;
    totalVolume: number;
    revenue: number;
    earnings: number;
    payouts: number;
    largestBet: number;
    profit: number;
};
