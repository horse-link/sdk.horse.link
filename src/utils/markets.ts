import { MarketDetails, Meet, PropositionDetails, Race } from "../types";
import { DataHexString, bytes16HexToString } from "./formatting";
const MILLIS_IN_DAY = 1000 * 60 * 60 * 24;
const TAB_TIMEZONE_OFFSET = 10 * 60 * 60 * 1000; // GMT +10, not daylight savings

// RaceId 15 chars
// MMMMMMMMMMMPPP
export const makePropositionId = (marketId: string, prediction: number): string => {
  return `${marketId}${prediction.toString().padStart(2, "0")}`;
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

export const getPropositionIdFromRaceMeet = (race: Race, meet: Meet): string =>
  `${meet.date}_${meet.id}_${race.number}_W1`;

// what type is this?
export const getDetailsFromPropositionId = (propositionId: string) => {
  const split = propositionId.split("_");

  return {
    date: split[0],
    track: split[1],
    race: split[2]
    // type: "W"
  };
};

export const getMarketIdFromPropositionId = (propositionId: string): string => {
  // example propositionId: "019508DBN08W07"
  // marketId is the propositionId with the final 2 chars (xx) sliced off

  return propositionId.slice(0, -2);
};

// MarketId 12 chars
// AAAAAABBBCC
// A = date as days since epoch
// B = location code
// C = race number
// T = type = W = Win, P = Place
export const rehydrateMarketId = async (marketId: string): Promise<MarketDetails> => {
  return rehydrateMarketIdWithLocation(marketId, "UNKNOWN");
};

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

export const hydrateMarketId = (
	marketId: string | DataHexString
): MarketDetails => {
	
  // todo: check length == 12

  const id = isHexString(marketId) ? bytes16HexToString(marketId) : marketId;
	const daysSinceEpoch = parseInt(id.slice(0, 6));
	const location = id.slice(6, 9);
  const type = id.slice(9, 10);
	const raceNumber = id.slice(10, 12);

	return {
		date: daysSinceEpoch,
    location: "UNKNOWN",
		locationCode: location,
		raceNumber,
    type
	};
}

export const isHexString = (value: string): boolean => {
  if (!RegExp("^0x[0-9A-Fa-f]*$").test(value)) {
    return false;
  }

  if (value.length % 2 !== 0) {
    return false;
  }

  return true;
};

export const rehydratePropositionId = async (propositionId: string): Promise<PropositionDetails> => {
  if (propositionId.length !== 14) {
    throw new Error("Invalid propositionId length");
  }
  const marketId = propositionId.substring(0, 11);
  const market = await rehydrateMarketId(marketId);

  return rehydratePropositionIdWithMarket(propositionId, market);
};

export const rehydratePropositionIdWithMarket = async (propositionId: string, market: MarketDetails): Promise<PropositionDetails> => {
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