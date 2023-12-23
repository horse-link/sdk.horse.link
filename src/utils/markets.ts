import { Meet, Race } from "../types";
import { time } from "../constants";
import dayjs from "dayjs";

export const makeMarketId = (
  date: Date,
  location: string,
  raceNumber: string
): string => {
  const offset = date.getTimezoneOffset();
  const dateInTimezone = dayjs(date).subtract(offset, "minutes");
  const daysSinceEpoch = Math.floor(dateInTimezone.valueOf() / time.ONE_DAY_MS)
    .toString()
    .padStart(6, "0");
  return `${daysSinceEpoch}${location}${raceNumber
    .toString()
    .padStart(2, "0")}`;
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
