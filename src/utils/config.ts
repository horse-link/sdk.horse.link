import { Config, MarketInfo } from "../types/config";
import { Token } from "../types/tokens";
import { VaultInfo } from "../types/vaults";

export const getTokenFromSymbol = (symbol: string, config?: Config): Token => {
  const foundToken = config?.tokens.find(
    token => token.symbol.toLowerCase() === symbol.toLowerCase()
  );

  if (!foundToken) {
    throw new Error(`Token with symbol ${symbol} not found`);
  }

  return foundToken;
};

export const isUsdt = (address: string, config?: Config): boolean => {
  const usdtToken = getTokenFromSymbol("USDT", config);
  return usdtToken?.address.toLowerCase() === address.toLowerCase();
};

export const getVaultNameFromMarket = (marketAddress: string, config?: Config): string => {
  const foundVault = config?.vaults.find(
    vault => vault.marketAddress.toLowerCase() === marketAddress.toLowerCase()
  );

  if (!foundVault) {
    throw new Error(`Vault with market address ${marketAddress} not found`);
  }

  return foundVault.name;
};

export const getVault = (vaultAddress?: string, config?: Config): VaultInfo => {
  const foundVault = config?.vaults.find(
    vault => vault.address.toLowerCase() === (vaultAddress?.toLowerCase() || "")
  );

  if (!foundVault) {
    throw new Error(`Vault with address ${vaultAddress} not found`);
  }

  return foundVault;
};

export const getVaultFromMarket = (market?: MarketInfo, config?: Config): VaultInfo => {
  const foundVault = config?.vaults.find(
    vault => vault.address.toLowerCase() === (market?.vaultAddress.toLowerCase() || "")
  );

  if (!foundVault) {
    throw new Error(`Vault for market ${market?.address} not found`);
  }

  return foundVault;
};

export const getVaultFromAssetAddress = (address: string, config?: Config): VaultInfo => {
  const foundVault = config?.vaults.find(
    vault => vault.asset.address.toLowerCase() === address.toLowerCase()
  );

  if (!foundVault) {
    throw new Error(`Vault with asset address ${address} not found`);
  }

  return foundVault;
};

export const getVaultFromToken = (token: Token, config?: Config): VaultInfo => {
  const foundVault = config?.vaults.find(
    v => v.asset.address.toLowerCase() === token.address.toLowerCase()
  );

  if (!foundVault) {
    throw new Error(`Vault for token ${token.symbol} not found`);
  }

  return foundVault;
};

export const getMarketFromVault = (vault: VaultInfo, config?: Config): MarketInfo => {
  const foundMarket = config?.markets.find(
    m => m.vaultAddress.toLowerCase() === vault.address.toLowerCase()
  );

  if (!foundMarket) {
    throw new Error(`Market for vault ${vault.address} not found`);
  }

  return foundMarket;
};

export const getMarketFromToken = (token: Token, config?: Config): MarketInfo => {
  const vault = getVaultFromToken(token, config);

  if (!vault) {
    throw new Error(`Vault for token ${token.symbol} not found`);
  }

  const market = getMarketFromVault(vault, config);

  if (!market) {
    throw new Error(`Market for token ${token.symbol} not found`);
  }

  return market;
};
