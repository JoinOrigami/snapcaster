import { Insertable, Selectable } from "kysely";

import { db, User } from "./index";

export const createUser = async (user: Insertable<User>): Promise<Selectable<User>> => {
  const existing = await db
    .selectFrom("user")
    .where("fid", "=", user.fid)
    .selectAll()
    .executeTakeFirst();

  if (existing) {
    return existing;
  }

  return await db
    .insertInto("user")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
};
