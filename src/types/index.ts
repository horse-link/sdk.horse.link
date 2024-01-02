import { BigNumber } from "ethers";

export enum RaceStatus {
  INTERIM = "Interim",
  ABANDONED = "Abandoned",
  CLOSED = "Closed",
  NORMAL = "Normal",
  PAYING = "Paying"
}

export enum BetResult {
  WIN = "WIN",
  LOSE = "LOSE",
  PENDING = "PENDING"
}

// TODO: make enums
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

export type ProtocolAddresses = {
  registry: string;
  marketOracle: string;
  ownerAddress: string;
};

export type MarketInfo = {
  owner: string;
  address: string;
  fee: BigNumber;
  inPlayCount: BigNumber;
  totalExposure: BigNumber;
  totalInPlay: BigNumber;
  vaultAddress: string;
};

export type Config = {
  addresses: ProtocolAddresses;
  markets: MarketInfo[];
  vaults: VaultInfo[];
  tokens: TokenInfo[];
  locations: Record<string, string>;
};

export type EcSignature = {
  v: number;
  r: string;
  s: string;
};

export type SignedResponse = {
  owner: string;
  hash: string;
  signature: string;
};

export type Signature = {
  message: string;
  messageHash: string;
  signature: string;
};

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

export type MarketDetails = {
  date: number;
  location: string;
  locationCode: string;
  raceNumber: string;
  type: string;
};

export type Meeting = {
  id: string;
  name: string;
  location: string;
  date: string;
  races: RaceWithResults[];
};

export type BackWithStats = {
  amount: BigInt;
  percentage: number;
};

export type Runner = {
  nonce: string;
  number: number;
  name: string;
  market_id: string; // remove
  proposition_id: string; // remove
  close: number;
  end: number;
  win: number; // remove
  place: number; // remove
  handicapWeight: number;
  last5Starts: string;
  barrier: number;
  signature: EcSignature; // remove
  win_signature: EcSignature; // remove
  place_signature: EcSignature; // remove
  status: RunnerStatus;
  rider: string;
  backed: number; // remove
  percentage: number; // remove
  backs: Back[];
};

export type RunnerStatus = "Open" | "Scratched" | "LateScratched";

export type NextToJumpRace = {
  jumperRaceStartTime: string;
  jumperRaceNumber: number;
  meeting: {
    jumperMeetingName: string;
    location: string;
    raceType: string;
    venueCode: string;
  };
};

export type NextToJump = {
  races: NextToJumpRace[];
  missingLocations: string[];
  errors?: unknown[];
};

export type SignedMeetingsResponse = {
  data: MeetResponse;
} & SignedResponse;

export type Meet = {
  id: string;
  name: string;
  location: string;
  date: string;
  races: Race[];
};

export type MeetResponse = {
  nonce: string;
  created: number;
  expires: number;
  meetings: Meet[];
};

export type MeetInfo = {
  meetingName: string;
  location: string;
  raceType: string;
  meetingDate: string;
  prizeMoney: string;
  weatherCondition: string | null;
  trackCondition: string | null;
  railPosition: string | null;
  venueMnemonic: string;
  raceInfo: RaceInfo[];
};

export type Back = {
  nonce: string;
  type: string;
  market_id: string;
  close: number;
  end: number;
  odds: number;
  proposition_id: string;
  signature: EcSignature;
};

// The parameters for a call to back() on the Market contract.
// Same as Back but with a wager attribute
export type BackParams = Back & {
  wager: string;
};

export type WinningHorse = {
  runner: string;
  number: number;
  rider: string;
  place: number;
};

export type MeetResults = {
  track: Track;
  winningHorses: WinningHorse[];
};

export type MeetFilters = "ALL" | "AUS_NZ" | "INTERNATIONAL";

export type RaceResult = {
  marketId: string;
  marketResultAdded: boolean;
  winningPropositionId?: string;
  marketOracleResultSig?: any;
  scratchedRunners?: any;
};

export type Track = {
  name: string;
  code: string;
};

// Remove
export type RaceData = {
  race: Race;
  track: Track;
  runners: any;
};

export type RaceDataResponse = {
  race: Race;
  track: Track;
  runners: Runner[];
};

export type Race = {
  number: number;
  name: string;
  distance: number;
  start?: string;
  start_unix?: number;
  end?: string;
  end_unix?: number;
  close?: string;
  close_unix?: number;
  status: string; // todo change to enum
  hasOdds: boolean;
};

export type RaceWithResults = Race & {
  results?: number[];
};

// REMOVE THE RACE PART FROM THE PROPERTIES, JUST status not raceStatus
export type RaceInfo = {
  raceNumber: number;
  raceName: string;
  raceClassConditions: string;
  raceDistance: number;
  raceStartTime: string;
  raceStatus: string;
};

export type RunnersResponse = {
  owner: string;
  raceData: RaceData;
};

export type SignedRunnersResponse = RunnersResponse & SignedResponse;

export enum JACKET_MARKINGS {
  QUARTERS = "QUARTERS",
  SASH = "SASH",
  VEE = "VEE",
  PLAIN = "PLAIN",
  EPAULETTES = "EPAULETTES",
  MALTESE_CROSS = "MALTESE_CROSS",
  HALVES = "HALVES",
  DIAMOND_BAND = "DIAMOND_BAND",
  CROSSED_SASHES = "CROSSED_SASHES",
  STRIPE = "STRIPE",
  YOKE = "YOKE",
  CLUB = "CLUB"
}

// Specification https://qric.qld.gov.au/wp-content/uploads/2017/04/Thoroughbred-Application-to-Register-Colours.pdf
// EG https://api.beta.tab.com.au/v1/tab-info-service/racing/silk/ROYAL%20BLUE%2C%20YELLOW%20SASH%2C%C2%A0RED%C2%A0CAP
export type Silk = {
  jacketColour: string;
  jacketMarkings: JACKET_MARKINGS;
};

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

export type Token = {
  address: string;
  symbol: string;
  decimals: string;
  src?: string;
  name?: string;
};

export type TokenInfo = {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  owner: string;
  totalSupply: BigNumber;
};

export type VaultStats = {
  vaultBalance: string;
  userBalance: string;
  performance: string;
  asset: string;
};

export enum VaultTransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  BORROW = "borrow",
  REPAY = "repay"
}

export type Vault = {
  name: string;
  symbol: string;
  totalAssets: string;
  address: string;
};

export type VaultUserData = {
  percentage: string;
  userShareBalance: BigNumber;
  userAssetBalance: BigNumber;
};

export type VaultModalState = {
  type: VaultTransactionType;
  vault: VaultInfo;
};

export type VaultTransaction = {
  id: string;
  type: VaultTransactionType;
  vaultAddress: string;
  userAddress: string;
  amount: BigNumber;
  timestamp: number;
};

export type VaultHistory = {
  type: VaultTransactionType;
  amount: BigNumber;
  createdAt: number;
  vaultAddress: string;
  tx: string;
}[];

export type VaultInfo = {
  name: string;
  address: string;
  owner: string;
  asset: TokenInfo;
  marketAddress: string;
  performance: BigNumber;
  totalAssets: BigNumber;
  totalSupply: BigNumber;
  totalAssetsLocked: BigNumber;
  userAssetTotal?: BigNumber;
  userShareTotal?: BigNumber;
  userSharePercentage?: string;
};

export type PropositionDetails = {
  marketId: string;
  market: MarketDetails;
  runner: string; // number?
  place: string; // number?
};
