import { BigNumber } from "ethers";
import { TokenInfo } from "./tokens";
import { VaultInfo } from "./vaults";
// import { Address } from "abitype";

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
