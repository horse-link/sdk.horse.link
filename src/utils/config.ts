import { Config, MarketInfo } from "../types/config";
import { Token } from "../types/tokens";
import { VaultInfo } from "../types/vaults";

export const getTokenFromSymbol = (symbol: string, config?: Config): Token | undefined =>
  config?.tokens.find(
    token => token.symbol.toLowerCase() === symbol.toLowerCase()
  );

export const isUsdt = (address: string, config?: Config): boolean =>
  getTokenFromSymbol("USDT", config)?.address.toLowerCase() ===
  address.toLowerCase();

export const getVaultNameFromMarket = (
  marketAddress: string,
  config?: Config
): string | undefined =>
  config?.vaults.find(
    vault => vault.marketAddress.toLowerCase() === marketAddress.toLowerCase()
  )?.name;

export const getVault = (vaultAddress?: string, config?: Config): VaultInfo | undefined =>
  config?.vaults.find(
    vault => vault.address.toLowerCase() === vaultAddress?.toLowerCase()
  );

export const getVaultFromMarket = (market?: MarketInfo, config?: Config): VaultInfo | undefined =>
  config?.vaults.find(
    vault => vault.address.toLowerCase() === market?.vaultAddress.toLowerCase()
  );

export const getVaultFromAssetAddress = (address: string, config?: Config): VaultInfo | undefined =>
  config?.vaults.find(
    vault => vault.asset.address.toLowerCase() === address.toLowerCase()
  );

export const getVaultFromToken = (token: Token, config?: Config): VaultInfo | undefined =>
  config?.vaults.find(
    v => v.asset.address.toLowerCase() === token.address.toLowerCase()
  );

export const getMarketFromVault = (vault: VaultInfo, config?: Config): MarketInfo | undefined =>
  config?.markets.find(
    m => m.vaultAddress.toLowerCase() === vault.address.toLowerCase()
  );

export const getMarketFromToken = (token: Token, config?: Config): MarketInfo | undefined => {
  const vault = getVaultFromToken(token, config);
  if (!vault) return;

  return getMarketFromVault(vault, config);
};
