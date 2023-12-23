import crypto from "crypto";
import { ethers } from "ethers";
import { MarketDetails, PropostionDetails } from "../types/";
import { formatTimestamp } from "./formatting";

const MILLIS_IN_DAY = 1000 * 60 * 60 * 24;
const TAB_TIMEZONE_OFFSET = 10 * 60 * 60 * 1000; // GMT +10, not daylight savings

export const getIndexFromId = (id: string): number => {
  const parts = id.split("_");
  return Number(parts[parts.length - 1]);
};

// MarketId 12 chars
// AAAAAABBBCCW
// A = date as days since epoch
// B = location code
// C = race number
// T = type (W = Win, P = Place)
export const makeMarketId = (
  date: Date,
  location: string,
  raceNumber: string,
  type: string
): string => {
  //Turn Date object into number of days since 1/1/1970, padded to 6 digits
  const daysSinceEpoch = Math.floor(
    (date.getTime() + TAB_TIMEZONE_OFFSET) / MILLIS_IN_DAY
  )
    .toString()
    .padStart(6, "0");
  const result = `${daysSinceEpoch}${location}${type}${raceNumber
    .toString()
    .padStart(2, "0")}`;
  if (result.length !== 12) {
    throw new Error("Invalid marketId length");
  }
  return result;
};

// RaceId 15 chars
// MMMMMMMMMMMPPP
export const makePropositionId = (marketId: string, prediction: number): string => {
  return `${marketId}${prediction.toString().padStart(2, "0")}`;
};

export const getNonce = async (): Promise<string> => {
  // Make a 15 character nonce
  const bytes = await crypto.randomBytes(15);
  return ethers.utils.hexlify(
    ethers.utils.concat([bytes, ethers.constants.HashZero]).slice(0, 16)
  );
};

// // MarketId 12 chars
// // AAAAAABBBCC
// // A = date as days since epoch
// // B = location code
// // C = race number
// // T = type = W = Win, P = Place
// export const rehydrateMarketId = async (marketId: string): Promise<MarketDetails> => {
//   if (marketId.length !== 12) {
//     throw new Error("Invalid marketId length");
//   }
  
//   const locationCode = marketId.substring(6, 9);
//   const location = await getLocationFromCode(locationCode);
  
//   return rehydrateMarketIdWithLocation(marketId, location);
// };

// MarketId 12 chars
// AAAAAABBBCC
// A = date as days since epoch
// B = location code
// C = race number
// T = type = W = Win, P = Place
export const rehydrateMarketIdWithLocation = (marketId: string, location: string): MarketDetails => {
  if (marketId.length !== 12) {
    throw new Error("Invalid marketId length");
  }
  // This is the days since epoch, calculated with +TAB_TIMEZONE_OFFSET
  const daysSinceEpoch = parseInt(marketId.substring(0, 6));

  // Get the actual date, by subtracting the timezone offset
  const date = new Date(
    daysSinceEpoch * MILLIS_IN_DAY - TAB_TIMEZONE_OFFSET
  ).getTime();

  const locationCode = marketId.substring(6, 9);
  const type = marketId.substring(9, 10);
  const raceNumber = marketId.substring(10, 12);
  return {
    date,
    location,
    locationCode,
    raceNumber,
    type
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
  if (propositionId.length !== 16) {
    throw new Error("Invalid propositionId length");
  }

  const marketId = propositionId.substring(0, 12);
  const outcome = propositionId.substring(13, 15);
  const runner = outcome.slice(0, 1);
  const place = outcome.slice(1, 2);

  return {
    marketId,
    market,
    runner,
    place
  };
};

export const getToday = (): string => {
  return formatTimestamp(new Date().getTime());
};
