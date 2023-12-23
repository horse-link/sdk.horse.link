import dayjs from "dayjs";
import { ethers } from "ethers";

export const formatToFourDecimals = (amount: string): string => {
  const parsedAmount = parseFloat(amount);
  if (parsedAmount === 0) return "0.0000";
  if (parsedAmount < 0.0001) return "<0.0001";

  const roundedToFourDecimal = parsedAmount.toFixed(4);
  return roundedToFourDecimal;
};

// returns four decimals without special formatting
export const formatToFourDecimalsRaw = (amount: string): string => {
  const parsedAmount = parseFloat(amount);
  // parsedAmount === 0
  if (!parsedAmount) return "0.0000";

  return parsedAmount.toFixed(4);
};

export const formatToTwoDecimals = (amount: string): string => {
  const parsedAmount = parseFloat(amount);
  const roundedToTwoDecimals = parsedAmount.toFixed(2);
  return roundedToTwoDecimals;
};

// add a comma every 3 digits
export const formatNumberWithCommas = (amount: string): string => {
  const parsedAmount = parseFloat(amount);
  const formatToFourDecimal = parsedAmount.toFixed(6);
  const roundedToFourDecimal = +formatToFourDecimal;
  const convertToFourDecimalsWithCommas = roundedToFourDecimal.toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 4,
      minimumFractionDigits: 4
    }
  );
  return convertToFourDecimalsWithCommas;
};

export const shortenAddress = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;

export const shortenHash = (hash: string): string => {
  const start = hash.substring(0, 15);
  const end = hash.substring(hash.length - 15, hash.length);
  return `${start}...${end}`;
};

// Derived from EthersJS version for Bytes32
export const formatBytes16String = (text: string): string => {
  // Get the bytes
  const bytes = ethers.utils.toUtf8Bytes(text);

  // Check we have room for null-termination
  if (bytes.length > 15)
    throw new Error("bytes16 string must be less than 16 bytes");

  // Zero-pad (implicitly null-terminates)
  return ethers.utils.hexlify(
    ethers.utils.concat([bytes, ethers.constants.HashZero]).slice(0, 16)
  );
};

// Derived from EthersJS version for Bytes32
export const parseBytes16String = (bytes: ethers.BytesLike): string => {
  const data = ethers.utils.arrayify(bytes);

  // Must be 16 bytes with a null-termination
  if (data.length !== 16)
    throw new Error("invalid bytes16 - not 16 bytes long");
  if (data[15] !== 0)
    throw new Error("invalid bytes16 string - no null terminator");

  // Find the null termination
  const nullTermination = data.indexOf(0);

  // Determine the string value
  return ethers.utils.toUtf8String(data.slice(0, nullTermination));
};

export const formatFirstLetterCapitalised = (string: string): string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`;

export const bytes16HexToString = (hex: string): string => {
  const s = Buffer.from(hex.slice(2), "hex").toString("utf8").toString();
  // Chop off the trailing 0s
  return s.slice(0, s.indexOf("\0"));
};

export const formatTimestamp = (timestamp: string | number, format?: string): string => {
  const today = new Date(timestamp).toLocaleString("en-US", {
    timeZone: "Australia/Brisbane"
  });
  return dayjs(today).format(format ?? "YYYY-MM-DD");
};