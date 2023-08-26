import { RaceData, Track } from "./race";

export type RunnerDTO = {
  nonce: string;
  number: number;
  name: string;
  market_id: string;
  close: number;
  end: number;
  odds: number;
  originalOdds: string;
  last5Starts: string;
  handicapWeight: number;
  proposition_id: string;
  signature: any;
  barrier: number;
  status: string;
  backed: number;
  percentage: number;
};

export type RunnersResponse = {
  owner: string;
  data: {
    runners: any;
    raceData: RaceData;
    track: Track;
  };
  signature: string;
  hash: string;
};
