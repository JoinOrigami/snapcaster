import type { Hex } from "viem";

export const VOTING_TOKENS: Record<
  string,
  {
    chainId: number;
    address: Hex;
  }
> = {
  NOUN: {
    chainId: 1,
    address: "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03",
  },
  DEGEN: {
    chainId: 8453,
    address: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
  },
};
