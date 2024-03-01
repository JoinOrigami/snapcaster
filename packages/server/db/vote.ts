import { Insertable, Selectable } from "kysely";

import { db, Vote } from "./index";

export const findVoteByProposalIdAndFid = async (
  proposal_id: number,
  fid: string
): Promise<Selectable<Vote> | undefined> => {
  return await db
    .selectFrom("vote")
    .where("proposal_id", "=", proposal_id)
    .where("voter_fid", "=", fid)
    .selectAll()
    .executeTakeFirst();
};

export const createVote = async (
  vote: Insertable<Vote>
): Promise<Selectable<Vote>> => {
  return await db
    .insertInto("vote")
    .values(vote)
    .returningAll()
    .executeTakeFirstOrThrow();
};
