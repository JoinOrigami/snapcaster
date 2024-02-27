import { Insertable, Selectable, Updateable } from "kysely";

import { db, BaseProposal } from "./index";

export const createProposal = async (
  proposal: Insertable<BaseProposal>
): Promise<Selectable<BaseProposal>> => {
  return await db
    .insertInto("proposal")
    .values(proposal)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateProposal = async (
  id: number,
  proposal: Updateable<BaseProposal>
): Promise<Selectable<BaseProposal>> => {
  return await db
    .updateTable("proposal")
    .set(proposal)
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirstOrThrow();
};
