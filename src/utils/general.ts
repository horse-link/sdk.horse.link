import crypto from "crypto";
import { ethers } from "ethers";
import { formatTimestamp } from "./formatting";

export const getIndexFromId = (id: string): number => {
  const parts = id.split("_");
  return Number(parts[parts.length - 1]);
};

export const getNonce = async (): Promise<string> => {
  // Make a 15 character nonce
  const bytes = await crypto.randomBytes(15);
  return ethers.utils.hexlify(
    ethers.utils.concat([bytes, ethers.constants.HashZero]).slice(0, 16)
  );
};

export const getToday = (): string => {
  return formatTimestamp(new Date().getTime());
};
