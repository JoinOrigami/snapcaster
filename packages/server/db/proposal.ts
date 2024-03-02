import { Insertable, Selectable, Updateable } from "kysely";

import { db, Proposal } from "./index";
import { isActive } from "@snapcaster/lib/proposal";
import { TProposalWithResultsResponse } from "@schemas/proposal";

export const createProposal = async (
  proposal: Insertable<Proposal>
): Promise<Selectable<Proposal>> => {
  return await db
    .insertInto("proposal")
    .values(proposal)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateProposal = async (
  id: number,
  proposal: Updateable<Proposal>
): Promise<Selectable<Proposal>> => {
  return await db
    .updateTable("proposal")
    .set(proposal)
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const findProposalById = async (id: number) => {
  return await db
    .selectFrom("proposal")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

export type ProposalResults = { for: number; against: number; total: number };
export const findProposalResultsById = async (
  id: number
): Promise<ProposalResults> => {
  const results = await db
    .selectFrom("vote")
    .where("proposal_id", "=", id)
    .select(["choice", ({ fn }) => fn.sum<number>("weight").as("weight")])
    .groupBy(["choice"])
    .execute();

  const resultsObject: ProposalResults = results.reduce(
    (acc, result) => ({
      ...acc,
      [result.choice === 0 ? "for" : "against"]:
        acc[result.choice === 0 ? "for" : "against"] + Number(result.weight), // Ensure result.weight is treated as a number
      total: acc.total + Number(result.weight), // Accumulate the total, ensuring weight is a number
    }),
    { for: 0, against: 0, total: 0 }
  );
  return resultsObject;
};

type EligibilityDetails = {
  eligible: boolean;
  message?: string;
};
export const isUserEligibleToVote = async (
  id: number,
  fid: string
): Promise<EligibilityDetails> => {
  const proposalWithVote = await db
    .selectFrom("proposal")
    .where("proposal.id", "=", id)
    .leftJoin("vote", (join) =>
      join.onRef("proposal_id", "=", "proposal.id").on("voter_fid", "=", fid)
    )
    .select(["start_timestamp", "end_timestamp", "vote.id as vote_id"])
    .executeTakeFirst();
  if (!proposalWithVote) {
    return { eligible: false, message: "Proposal not found" };
  }
  if (!isActive(proposalWithVote)) {
    return { eligible: false, message: "This proposal is not active" };
  }
  if (proposalWithVote.vote_id) {
    return {
      eligible: false,
      message: "You have already voted on this proposal",
    };
  }
  return { eligible: true };
};
