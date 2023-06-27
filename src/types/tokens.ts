import { BigNumber } from "ethers";
// import { Address } from "abitype";

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