import { Insertable, Selectable, Updateable } from "kysely";

import { db, Proposal } from "./index";

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
}
