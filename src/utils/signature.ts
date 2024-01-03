import { ethers } from "ethers";

export const signBackMessage = (
  nonce: string,
  marketId: string,
  propositionId: string,
  odds: ethers.BigNumber,
  close: number,
  end: number,
  signer: ethers.Signer
) => {
  const backMessage = ethers.utils.solidityKeccak256(
    ["bytes16", "bytes16", "bytes16", "uint256", "uint256", "uint256"],
    [nonce, propositionId, marketId, odds, close, end]
  );

  return signMessage(backMessage, signer);
};

export const signMessage = async (message: string, signer: ethers.Signer) => {
  const sig = await signer.signMessage(ethers.utils.arrayify(message));
  const { v, r, s } = ethers.utils.splitSignature(sig);
  return { v, r, s };
};

export const signMessageAsString = async (
	message: string,
	signer: ethers.Signer
) => {
	const sig = await signer.signMessage(ethers.utils.arrayify(message));
	return sig;
};

const makeSetMarketOracleResultMessage = (marketId: string, propositionId: string) => {
  const setMarketOracleResultMessage = ethers.utils.solidityKeccak256(["bytes16", "bytes16"], [marketId, propositionId]);
  return setMarketOracleResultMessage;
};

const makeSetScratchMessage = (marketId: string, propositionId: string, odds: ethers.BigNumber): string => {
  const b16MarketId = marketId;
  const b16PropositionId = propositionId;
  const message = ethers.utils.solidityKeccak256(["bytes16", "bytes16", "uint256"], [b16MarketId, b16PropositionId, odds]);
  return message;
};

export const signSetMarketOracleResultMessage = (marketId: string, propositionId: string, signer: ethers.Signer) => {
  const setMarketOracleResultMessage = makeSetMarketOracleResultMessage(marketId, propositionId);
  return signMessage(setMarketOracleResultMessage, signer);
};

export const signSetScratchedMessage = (marketId: string, propositionId: string, odds: ethers.BigNumber, signer: ethers.Signer) => {
  const settleMessage = makeSetScratchMessage(marketId, propositionId, odds);
  return signMessage(settleMessage, signer);
};
