import {
  Hex,
  encodeAbiParameters,
  getContract,
  keccak256,
  pad,
  parseAbiParameters,
  parseEventLogs,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { getUnixTime } from "date-fns";

import { Proposal, Vote } from "@snapcaster/server/db";
import { publicClient, walletClient } from "./rpc";
import { EAS } from "./abi";
import { Insertable } from "kysely";

const EAS_ADDRESS = "0x4200000000000000000000000000000000000021";

const PROPOSAL_SCHEMA = {
  uid: "0x465f5d486ba0d9eb095613f9de6520cee94e60c48fbf785b3b3039d94e9879c3",
  schema:
    "string title,bytes32 summary,bytes32 description,uint64 startTimestamp,uint64 endTimestamp,string eligibilityType,string discriminator",
} as const;

const VOTE_SCHEMA = {
  uid: "0x22d9d1cb77d5f59a07fbb270fbd26ae3ff833792a5c5be77b7994b0ea3617f92",
  schema: "uint64 voterFID,uint8 choice,bytes signature",
} as const;

const getEASContract = () => {
  return getContract({
    address: EAS_ADDRESS,
    abi: EAS,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  });
};

export async function createProposalAttestation(
  proposal: Omit<Insertable<Proposal>, "tx_hash">
) {
  const eas = getEASContract();
  const args = [
    proposal.title,
    keccak256(Buffer.from(proposal.summary || "")),
    keccak256(Buffer.from(proposal.description || "")),
    BigInt(getUnixTime(proposal.start_timestamp)),
    BigInt(getUnixTime(proposal.end_timestamp)),
    proposal.eligibility_type,
    proposal.discriminator!,
  ] as const;

  const data = encodeAbiParameters(
    parseAbiParameters(PROPOSAL_SCHEMA.schema),
    args
  );

  const uid = await eas.write.attest(
    [
      {
        schema: PROPOSAL_SCHEMA.uid,
        data: {
          data,
          recipient: "0x0000000000000000000000000000000000000000",
          revocable: false,
          expirationTime: 0n,
          value: 0n,
          refUID: pad("0x0"),
        },
      },
    ],
    {
      value: 0n,
      account: privateKeyToAccount(process.env.ATTESTER_PRIVATE_KEY as Hex),
    }
  );

  return uid;
}

export async function createVoteAttestation(
  vote: Omit<Insertable<Vote>, "tx_hash"> & {
    proposal_uid: Hex;
  }
) {
  const eas = getEASContract();
  const args = [
    BigInt(vote.voter_fid),
    vote.choice,
    vote.signature as Hex,
  ] as const;

  const data = encodeAbiParameters(
    parseAbiParameters(VOTE_SCHEMA.schema),
    args
  );

  const uid = await eas.write.attest(
    [
      {
        schema: VOTE_SCHEMA.uid,
        data: {
          data,
          recipient: "0x0000000000000000000000000000000000000000",
          revocable: false,
          expirationTime: 0n,
          value: 0n,
          refUID: vote.proposal_uid,
        },
      },
    ],
    {
      value: 0n,
      account: privateKeyToAccount(process.env.ATTESTER_PRIVATE_KEY as Hex),
    }
  );

  return uid;
}

export async function waitForUID(hash: Hex) {
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  const logs = parseEventLogs({
    abi: EAS,
    logs: receipt.logs,
  });

  const args = logs.find((log) => log.eventName === "Attested")?.args;
  const uid = (args as any)?.uid;
  if (!uid) {
    throw new Error(`expecting UID in log for tx: ${hash}`);
  }

  return uid;
}
