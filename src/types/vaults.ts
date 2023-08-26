import { BigNumber } from "ethers";
// import { Hash } from "@wagmi/core";
// import { Address } from "abitype";
import { TokenInfo } from "./tokens";

export type VaultStats = {
  vaultBalance: string;
  userBalance: string;
  performance: string;
  asset: string;
};

export enum VaultTransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  BORROW = "borrow",
  REPAY = "repay"
}

export type Vault = {
  name: string;
  symbol: string;
  totalAssets: string;
  address: string;
};

export type VaultUserData = {
  percentage: string;
  userShareBalance: BigNumber;
  userAssetBalance: BigNumber;
};

export type VaultModalState = {
  type: VaultTransactionType;
  vault: VaultInfo;
};

export type VaultTransaction = {
  id: string;
  type: VaultTransactionType;
  vaultAddress: string;
  userAddress: string;
  amount: BigNumber;
  timestamp: number;
};

export type VaultHistory = {
  type: VaultTransactionType;
  amount: BigNumber;
  createdAt: number;
  vaultAddress: string;
  tx: string;
}[];

export type VaultInfo = {
  name: string;
  address: string;
  owner: string;
  asset: TokenInfo;
  marketAddress: string;
  performance: BigNumber;
  totalAssets: BigNumber;
  totalSupply: BigNumber;
  totalAssetsLocked: BigNumber;
  userAssetTotal?: BigNumber;
  userShareTotal?: BigNumber;
  userSharePercentage?: string;
};
