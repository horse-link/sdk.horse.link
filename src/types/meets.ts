import { EcSignature, SignedResponse } from "./general";
import { Race, RaceInfo } from "./race";

export type Runner = {
  number: number;
  name: string;
  nonce: string;
  market_id: string;
  close: number;
  end: number;
  odds: number;
  win: number;
  place: number;
  handicapWeight: number;
  last5Starts: string;
  proposition_id: string;
  barrier: number;
  signature: EcSignature;
  win_signature: EcSignature;
  place_signature: EcSignature;
  status: RunnerStatus;
  backed: number;
  percentage: number;
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

export type SignedRunnersResponse = {
  data: {
    raceData: Race;
    // raceData: {
    //   name: string;
    //   distance: number;
    //   class: string;
    //   hasOdds: boolean;
    //   start: dayjs.Dayjs;
    //   close: number;
    //   end: number;
    // };
    track: {
      name: string;
      code: string;
    };
    runners: Runner[];
  };
} & SignedResponse;

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
  market_id: string;
  close: number;
  end: number;
  odds: number; // remove
  win: number;
  place: number;
  proposition_id: string; // remove
  win_proposition_id: string;
  place_proposition_id: string;
  signature: EcSignature; // remove
  win_signature: EcSignature;
  place_signature: EcSignature;
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
  track: {
    name: string;
    code: string;
  };
  winningHorses: WinningHorse[];
};

export type MeetFilters = "ALL" | "AUS_NZ" | "INTERNATIONAL";
