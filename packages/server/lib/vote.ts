import { Selectable } from "kysely";
import { createPublicClient, http, parseAbi } from "viem";
import { base, mainnet } from "viem/chains";
import { readContract } from "viem/actions";

import { VOTING_TOKENS } from "@snapcaster/lib/constants";
import { Proposal } from "@db/index";
import { getProfile } from "./farcaster";

const CHAINS = [base, mainnet];

export const getVotingWeight = async (proposal: Selectable<Proposal>, fid: string): Promise<bigint> => {
  const profile = await getProfile({ fid, viewer_fid: proposal.proposer_fid });

  if (proposal.eligibility_type === "farcaster") {
    const following = profile.viewer_context.following;
    const followed_by = profile.viewer_context.followed_by;

    const eligibility: Record<string, boolean> = {
      mutuals: following && followed_by,
      followers: followed_by,
      active: profile.active,
    };

    return eligibility[proposal.discriminator] ? 1n : 0n;
  }

  const token = VOTING_TOKENS[proposal.discriminator as keyof typeof VOTING_TOKENS];
  if (!token) {
    throw new Error("Invalid voting token");
  }

  const client = createPublicClient({
    chain: CHAINS.find((c) => c.id === token.chainId),
    transport: http(process.env.RPC_URL, { batch: true }),
  });

  const addresses = [
    profile.custody_address,
    ...profile.verified_addresses.eth_addresses,
  ];

  const balances = await Promise.all(addresses.map((address) =>
    readContract(client, {
      address: token.address,
      functionName: "balanceOf",
      args: [address],
      abi: parseAbi([
        `function balanceOf(address owner) view returns (uint256)`
      ]),
    })
  ));

  return balances.reduce((acc, balance) => acc + balance, 0n);
}
