import crypto from "crypto";
import { ethers } from "ethers";
import { MarketDetails } from "../types/";

const MILLIS_IN_DAY = 1000 * 60 * 60 * 24;
const TAB_TIMEZONE_OFFSET = 10 * 60 * 60 * 1000; // GMT +10, not daylight savings

export type PropostionDetails = {
  marketId: string,
  market: MarketDetails,
  runner: string, // number?
  place: string // number?
}

export const getIndexFromId = (id: string): number => {
  const parts = id.split("_");
  return Number(parts[parts.length - 1]);
};

// RaceId 15 chars
// MMMMMMMMMMMPPP
export const makePropositionId = (marketId: string, prediction: number): string => {
  return `${marketId}W${prediction.toString().padStart(2, "0")}`;
};

export const getNonce = async (): Promise<string> => {
  // Make a 15 character nonce
  const bytes = await crypto.randomBytes(15);
  return ethers.utils.hexlify(
    ethers.utils.concat([bytes, ethers.constants.HashZero]).slice(0, 16)
  );
};

// // MarketId 11 chars
// // AAAAAABBBCC
// // A = date as days since epoch
// // B = location code
// // C = race number
// export const rehydrateMarketId = async (marketId: string): Promise<MarketDetails> => {
//   if (marketId.length !== 11) {
//     throw new Error("Invalid marketId length");
//   }
  
//   const locationCode = marketId.substring(6, 9);
//   const location = await getLocationFromCode(locationCode);
  
//   return rehydrateMarketIdWithLocation(marketId, location);
// };

export const rehydrateMarketIdWithLocation = (marketId: string, location: string): MarketDetails => {
  if (marketId.length !== 11) {
    throw new Error("Invalid marketId length");
  }
  // This is the days since epoch, calculated with +TAB_TIMEZONE_OFFSET
  const daysSinceEpoch = parseInt(marketId.substring(0, 6));

  // Get the actual date, by subtracting the timezone offset
  const date = new Date(
    daysSinceEpoch * MILLIS_IN_DAY - TAB_TIMEZONE_OFFSET
  ).getTime();

  const locationCode = marketId.substring(6, 9);
  const raceNumber = marketId.substring(9, 11);
  return {
    date,
    location,
    locationCode,
    raceNumber
  };
};

// export const rehydratePropositionId = async (propositionId: string): Promise<PropostionDetails> => {
//   if (propositionId.length !== 14) {
//     throw new Error("Invalid propositionId length");
//   }
//   const marketId = propositionId.substring(0, 11);
//   const market = await rehydrateMarketId(marketId);

//   return rehydratePropositionIdWithMarket(propositionId, market);
// };

export const rehydratePropositionIdWithMarket = async (propositionId: string, market: MarketDetails): Promise<PropostionDetails> => {
  if (propositionId.length !== 14) {
    throw new Error("Invalid propositionId length");
  }

  const marketId = propositionId.substring(0, 11);
  const outcome = propositionId.substring(12, 14);
  const runner = outcome.slice(0, 1);
  const place = outcome.slice(1, 2);

  return {
    marketId,
    market,
    runner,
    place
  };
};