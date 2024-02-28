import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Proposal {
  description: string | null;
  eligibility_contract: string | null;
  eligibility_threshold: Numeric | null;
  eligibility_type: string;
  end_timestamp: Timestamp | null;
  id: Generated<number>;
  proposer_fid: Int8;
  start_timestamp: Timestamp | null;
  summary: string | null;
  title: string | null;
  uid: string | null;
}

export interface Vote {
  choice: number;
  created_at: Generated<Timestamp>;
  id: Generated<number>;
  proposal_id: number;
  signature: string;
  uid: string;
  voter_fid: Int8;
}

export interface DB {
  proposal: Proposal;
  vote: Vote;
}
