import { Static, Type } from "@sinclair/typebox";

import { Nullable, StrictObject } from "./utils";

export type TCreateVotePayload = Static<typeof CreateVotePayload>;
export const CreateVotePayload = StrictObject({
  proposal_id: Type.Integer(),
  choice: Type.Integer({ minimum: 0, maximum: 1 }),
});

export type TVoteResponse = Static<typeof VoteResponse>;
export const VoteResponse = Type.Object({
  id: Type.Number(),
  tx_hash: Type.String(),
  uid: Nullable(Type.String()),
});
