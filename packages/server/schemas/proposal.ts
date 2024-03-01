import { Static, Type } from "@sinclair/typebox";

import { StrictObject, Hex, Nullable } from "./utils";

export const ProposalRequestParams = StrictObject({
  id: Type.Number(),
});

export type TCreateProposalPayload = Static<typeof CreateProposalPayload>;
export const CreateProposalPayload = StrictObject({
  title: Type.String({ minLength: 1, maxLength: 100 }),
  eligibility_type: Type.String({
    enum: ["contract", "follows", "mutuals", "active"]
  }),
  start_timestamp: Type.String({ format: "date-time" }),
  end_timestamp: Type.String({ format: "date-time" }),
  summary: Type.Optional(Nullable(Type.String({ minLength: 1, maxLength: 1000 }))),
  description: Type.Optional(Nullable(Type.String({ minLength: 1, maxLength: 10000 }))),
  eligibility_threshold: Type.Optional(Nullable(Type.String({ format: "uint256" }))),
  eligibility_contract: Type.Optional(Nullable(Hex({ format: "eth-address" }))),
});

export type TProposalResponse = Static<typeof ProposalResponse>;
export const ProposalResponse = Type.Object({
  id: Type.Number(),
  proposer_fid: Type.String(),
  tx_hash: Type.String(),
  uid: Nullable(Type.String()),
  title: Nullable(Type.String()),
  summary: Nullable(Type.String()),
  description: Nullable(Type.String()),
  start_timestamp: Nullable(Type.String()),
  end_timestamp: Nullable(Type.String()),
  eligibility_threshold: Nullable(Type.String()),
  eligibility_contract: Nullable(Type.String()),
  eligibility_type: Type.String(),
});
