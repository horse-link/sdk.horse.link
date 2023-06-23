"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOrdinals = exports.formatTimeToHMSFromNow = exports.formatTimeToHMS = exports.formatFirstLetterCapitalised = exports.parseBytes16String = exports.formatBytes16String = exports.shortenHash = exports.shortenAddress = exports.formatNumberWithCommas = exports.formatToTwoDecimals = exports.formatToFourDecimalsRaw = exports.formatToFourDecimals = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const ethers_1 = require("ethers");
// import { MeetInfo } from "../types/meets";
// import { BetId, Deposit, Withdraw } from "../types/subgraph";
// import { Chain } from "wagmi";
// import { VaultTransaction } from "../types/vaults";
const formatToFourDecimals = (amount) => {
    const parsedAmount = parseFloat(amount);
    if (parsedAmount === 0)
        return "0.0000";
    if (parsedAmount < 0.0001)
        return "<0.0001";
    const roundedToFourDecimal = parsedAmount.toFixed(4);
    return roundedToFourDecimal;
};
exports.formatToFourDecimals = formatToFourDecimals;
// returns four decimals without special formatting
const formatToFourDecimalsRaw = (amount) => {
    const parsedAmount = parseFloat(amount);
    // parsedAmount === 0
    if (!parsedAmount)
        return "0.0000";
    return parsedAmount.toFixed(4);
};
exports.formatToFourDecimalsRaw = formatToFourDecimalsRaw;
const formatToTwoDecimals = (amount) => {
    const parsedAmount = parseFloat(amount);
    const roundedToTwoDecimals = parsedAmount.toFixed(2);
    return roundedToTwoDecimals;
};
exports.formatToTwoDecimals = formatToTwoDecimals;
// add a comma every 3 digits
const formatNumberWithCommas = (amount) => {
    const parsedAmount = parseFloat(amount);
    const formatToFourDecimal = parsedAmount.toFixed(6);
    const roundedToFourDecimal = +formatToFourDecimal;
    const convertToFourDecimalsWithCommas = roundedToFourDecimal.toLocaleString("en-US", {
        maximumFractionDigits: 4,
        minimumFractionDigits: 4
    });
    return convertToFourDecimalsWithCommas;
};
exports.formatNumberWithCommas = formatNumberWithCommas;
const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
exports.shortenAddress = shortenAddress;
const shortenHash = (hash) => {
    const start = hash.substring(0, 15);
    const end = hash.substring(hash.length - 15, hash.length);
    return `${start}...${end}`;
};
exports.shortenHash = shortenHash;
// Derived from EthersJS version for Bytes32
const formatBytes16String = (text) => {
    // Get the bytes
    const bytes = ethers_1.ethers.utils.toUtf8Bytes(text);
    // Check we have room for null-termination
    if (bytes.length > 15)
        throw new Error("bytes16 string must be less than 16 bytes");
    // Zero-pad (implicitly null-terminates)
    return ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.concat([bytes, ethers_1.ethers.constants.HashZero]).slice(0, 16));
};
exports.formatBytes16String = formatBytes16String;
// Derived from EthersJS version for Bytes32
const parseBytes16String = (bytes) => {
    const data = ethers_1.ethers.utils.arrayify(bytes);
    // Must be 16 bytes with a null-termination
    if (data.length !== 16)
        throw new Error("invalid bytes16 - not 16 bytes long");
    if (data[15] !== 0)
        throw new Error("invalid bytes16 string - no null terminator");
    // Find the null termination
    const nullTermination = data.indexOf(0);
    // Determine the string value
    return ethers_1.ethers.utils.toUtf8String(data.slice(0, nullTermination));
};
exports.parseBytes16String = parseBytes16String;
const formatFirstLetterCapitalised = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`;
exports.formatFirstLetterCapitalised = formatFirstLetterCapitalised;
// Deprecated
const formatTimeToHMS = (time, shortForm) => {
    const now = (0, dayjs_1.default)();
    // time is less than 5 mins
    return (0, exports.formatTimeToHMSFromNow)(now, time, shortForm);
};
exports.formatTimeToHMS = formatTimeToHMS;
const formatTimeToHMSFromNow = (now, time, shortForm) => {
    const date = (0, dayjs_1.default)(time);
    const isNegative = now > date;
    const prefix = isNegative ? "-" : "";
    const hours = date.diff(now, "hours");
    const minutes = date.diff(now.add(hours, "hours"), "minutes");
    const seconds = date.diff(now.add(hours, "hours").add(minutes, "minutes"), "seconds");
    // return longform H M S
    if (!shortForm)
        return `${prefix}${Math.abs(hours)}h ${Math.abs(minutes)}m ${Math.abs(seconds)}s`;
    // if time > 2 hours
    if (Math.abs(hours) > 2) {
        const shortformHours = minutes > 30 ? hours + 1 : hours;
        return `${prefix}${Math.abs(shortformHours)}h`;
    }
    // if time is between 1 and 2 hours
    if (Math.abs(hours) >= 1)
        return `${prefix}${Math.abs(hours)}h ${Math.abs(minutes)}m`;
    // if time is less than 1 hour but over 5 minutes
    if (Math.abs(hours) < 1 && minutes >= 5)
        return `${prefix}${Math.abs(minutes)}m`;
    // time is less than 5 mins
    return `${prefix}${Math.abs(minutes)}m ${Math.abs(seconds)}s`;
};
exports.formatTimeToHMSFromNow = formatTimeToHMSFromNow;
// export const formatTrackCondition = (meetRaces: MeetInfo) => {
//   if (!meetRaces.trackCondition) return;
//   const LookupMap: Map<string, string> = new Map([
//     ["GOOD", "GOOD"],
//     ["GOOD3", "GOOD (3)"],
//     ["GOOD4", "GOOD (4)"],
//     ["FIRM1", "FIRM (1)"],
//     ["FIRM2", "FIRM (2)"],
//     ["SOFT5", "SOFT (5)"],
//     ["SOFT6", "SOFT (6)"],
//     ["SOFT7", "SOFT (7)"],
//     ["HVY8", "HEAVY (8)"],
//     ["HVY9", "HEAVY (9)"],
//     ["HVY10", "HEAVY (10)"],
//     ["SYNTHETIC", "Synthetic"],
//     ["UNKNOWN", "Unknown"]
//   ]);
//   return LookupMap.get(meetRaces.trackCondition.toUpperCase());
// };
const formatOrdinals = (n) => {
    const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
    const suffixes = new Map([
        ["one", "st"],
        ["two", "nd"],
        ["few", "rd"],
        ["other", "th"]
    ]);
    const rule = pr.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
};
exports.formatOrdinals = formatOrdinals;
// export const formatChain = (chain: Chain): Chain => ({
//   ...chain,
//   // take out spaces and capitals
//   name: chain.name.split(" ")[0].toLowerCase()
// });
// export const formatVaultTransactionIntoDeposit = ({
//   id,
//   vaultAddress,
//   userAddress,
//   amount,
//   timestamp
// }: VaultTransaction): Partial<Deposit> => ({
//   id,
//   vault: vaultAddress,
//   sender: userAddress,
//   assets: amount,
//   createdAt: timestamp
// });
// export const formatVaultTransactionIntoWithdraw = ({
//   id,
//   vaultAddress,
//   userAddress,
//   amount,
//   timestamp
// }: VaultTransaction): Partial<Withdraw> => ({
//   id,
//   vault: vaultAddress,
//   sender: userAddress,
//   assets: amount,
//   createdAt: timestamp
// });