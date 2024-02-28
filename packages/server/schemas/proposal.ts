import { Static, Type } from "@sinclair/typebox";

import { StrictObject, Hex, Nullable } from "./utils";

export const ProposalRequestParams = StrictObject({
  id: Type.Number(),
});

export type TUpdateProposalPayload = Static<typeof UpdateProposalPayload>;
export const UpdateProposalPayload = Type.Partial(
  StrictObject({
    title: Type.String({ minLength: 1, maxLength: 100 }),
    summary: Type.String({ minLength: 1, maxLength: 1000 }),
    description: Type.String({ minLength: 1, maxLength: 10000 }),
    start_timestamp: Type.String({ format: "date-time" }),
    end_timestamp: Type.String({ format: "date-time" }),
    eligibility_threshold: Type.String({ format: "uint256" }),
    eligibility_contract: Hex({ format: "eth-address" }),
  })
);

export type TCreateProposalPaylod = Static<typeof CreateProposalPayload>;
export const CreateProposalPayload = Type.Intersect([
  StrictObject({
    eligibility_type: Type.String({ enum: ["token_weight", "follows"] }),
  }),
  UpdateProposalPayload,
]);

export type TProposalResponse = Static<typeof ProposalResponse>;
export const ProposalResponse = Type.Object({
  id: Type.Number(),
  proposer_fid: Type.String(),
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
