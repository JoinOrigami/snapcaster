import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import type { O } from "ts-toolbelt";

import { DB } from "./types";
import { Proposal as _BaseProposal } from "./types";
export type * from "./types";

export type BaseProposal = _BaseProposal;
export type DraftProposal = Omit<BaseProposal, "uid"> & { uid: never };
export type Proposal = O.NonNullable<DraftProposal,
  | "uid"
  | "title"
  | "summary"
  | "start_timestamp"
  | "end_timestamp"
  | "eligibility_type"
>;

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  }),
});

export const db = new Kysely<DB>({ dialect });
