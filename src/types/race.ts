import { RaceStatus } from "../constants/status";

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

// export type RaceData = {
//   name: string;
//   distance: string;
//   class: string;
//   hasOdds: boolean;
//   start: number;
//   close: number;
//   end: number;
// };

export type Race = {
  number: number;
  name: string;
  start?: string;
  start_unix?: number;
  end?: string;
  end_unix?: number;
  close?: string;
  close_unix?: number;
  status: RaceStatus;
  hasOdds: boolean;
};

export type RaceWithResults = Race & {
  results?: number[];
};

// export type RaceDTO = {
//   number: number;
//   name: string;
//   start: string;
//   start_unix: number;
//   end: string;
//   end_unix: number;
//   close: string;
//   close_unix: number;
//   status: string;
//   results: any;
// };

export type RaceDataResponse = {
  raceData: Race;
  track: Track;
  runners: any;
};

export type RaceInfo = {
  raceNumber: number;
  raceName: string;
  raceClassConditions: string;
  raceDistance: number;
  raceStartTime: string;
  raceStatus: string;
};
