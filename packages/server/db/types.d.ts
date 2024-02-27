import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Proposal {
  description: string | null;
  eligibility_contract: string | null;
  eligibility_threshold: number | null;
  eligibility_type: string;
  end_timestamp: Timestamp | null;
  id: Generated<number>;
  proposer_id: number;
  start_timestamp: Timestamp | null;
  summary: string | null;
  title: string | null;
  uid: string | null;
}

export interface User {
  fid: number;
  id: Generated<number>;
}

export interface DB {
  proposal: Proposal;
  user: User;
}
