import { Hex, encodeAbiParameters, getContract, pad, parseAbiParameters } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { getUnixTime } from "date-fns";

import { CompletedProposal } from "@snapcaster/server/db";
import { publicClient, walletClient } from "./rpc";
import { EAS } from "./abi";
import { Selectable } from "kysely";

const EAS_ADDRESS = "0x4200000000000000000000000000000000000021";

const PROPOSAL_SCHEMA = {
  uid: "0xf3c83d778e0ccde8dcc959ad907f5c7e82a05728a3a4eafc7370138bc8b003e8",
  schema: "string title,bytes32 summary,bytes32 description,uint64 startTimestamp,uint64 endTimestamp,string eligibilityType,address eligibilityContract,uint256 eligibilityThreshold",
} as const;

const getEASContract = () => {
  return getContract({
    address: EAS_ADDRESS,
    abi: EAS,
    client: {
      public: publicClient,
      wallet: walletClient,
    }
  })
}

export async function createProposalAttestation(proposal: Selectable<CompletedProposal>) {
  const eas = getEASContract();
  const args = [
    proposal.title,
    pad(`0x${Buffer.from(proposal.summary || "").toString("hex")}`),
    pad(`0x${Buffer.from(proposal.description || "").toString("hex")}`),
    BigInt(getUnixTime(proposal.start_timestamp)),
    BigInt(getUnixTime(proposal.end_timestamp)),
    proposal.eligibility_type,
    (proposal.eligibility_contract || "0x0000000000000000000000000000000000000000") as Hex,
    BigInt(proposal.eligibility_threshold || 0),
  ] as const;

  const data = encodeAbiParameters(
    parseAbiParameters(PROPOSAL_SCHEMA.schema),
    args,
  );

  const uid = await eas.write.attest([{
    schema: PROPOSAL_SCHEMA.uid,
    data: {
      data,
      recipient: "0x0000000000000000000000000000000000000000",
      revocable: false,
      expirationTime: 0n,
      value: 0n,
      refUID: pad("0x0")
    }
  }], {
    value: 0n,
    account: privateKeyToAccount(process.env.ATTESTER_PRIVATE_KEY as Hex),
  });

  return uid;
}
