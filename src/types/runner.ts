import { Race, Track } from "./race";

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
    raceData: Race;
    track: Track;
  };
  signature: string;
  hash: string;
};

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
