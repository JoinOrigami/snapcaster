import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Proposal {
  description: string | null;
  discriminator: string | null;
  eligibility_type: string;
  end_timestamp: Timestamp;
  id: Generated<number>;
  proposer_fid: Int8;
  start_timestamp: Timestamp;
  summary: string | null;
  title: string;
  tx_hash: string;
  uid: string | null;
}

export interface Vote {
  choice: number;
  created_at: Generated<Timestamp>;
  id: Generated<number>;
  proposal_id: number;
  signature: string;
  tx_hash: string;
  uid: string | null;
  voter_fid: Int8;
  weight: Numeric;
}

export interface DB {
  proposal: Proposal;
  vote: Vote;
}
