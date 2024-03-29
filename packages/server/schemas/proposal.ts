import { Static, Type } from "@sinclair/typebox";

import { StrictObject, Nullable } from "./utils";

export const ProposalRequestParams = StrictObject({
  id: Type.Number(),
});

export const ProposalVoteRequestParams = StrictObject({
  id: Type.Number(),
  fid: Type.String(),
});

export const ProposalEligibilityRequestParams = StrictObject({
  id: Type.Number(),
});

export const ProposalEligibilityMessageQueryParams = StrictObject({
  message: Type.String(),
});

export type TProposalEligibilityResponse = Static<
  typeof ProposalEligibilityResponse
>;
export const ProposalEligibilityResponse = StrictObject({
  eligible: Type.Boolean(),
  message: Type.Optional(Type.String()),
});

export type TCreateProposalPayload = Static<typeof CreateProposalPayload>;
export const CreateProposalPayload = StrictObject({
  title: Type.String({ minLength: 1, maxLength: 100 }),
  eligibility_type: Type.String({
    enum: ["token", "farcaster"],
  }),
  discriminator: Type.String(),
  start_timestamp: Type.String({ format: "date-time" }),
  end_timestamp: Type.String({ format: "date-time" }),
  summary: Type.Optional(
    Nullable(Type.String({ minLength: 1, maxLength: 1000 }))
  ),
  description: Type.Optional(
    Nullable(Type.String({ minLength: 1, maxLength: 10000 }))
  ),
});

export type TProposalResponse = Static<typeof ProposalResponse>;
export const ProposalResponse = Type.Object({
  id: Type.Number(),
  proposer_fid: Type.String(),
  tx_hash: Type.String(),
  uid: Nullable(Type.String()),
  title: Type.String(),
  summary: Nullable(Type.String()),
  description: Nullable(Type.String()),
  start_timestamp: Type.String(),
  end_timestamp: Type.String(),
  discriminator: Type.String(),
  eligibility_type: Type.String(),
});

export type TProposalResultsResponse = Static<typeof ProposalResultsResponse>;
export const ProposalResultsResponse = Type.Object({
  results: Type.Object({
    for: Type.Number(),
    against: Type.Number(),
    total: Type.Number(),
  }),
});

export type TProposalWithResultsResponse = Static<
  typeof ProposalWithResultsResponse
>;
export const ProposalWithResultsResponse = Type.Intersect([
  ProposalResponse,
  ProposalResultsResponse,
]);
