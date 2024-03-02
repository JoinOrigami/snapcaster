import { Static, Type } from "@sinclair/typebox";
import { StrictObject, Hex } from "./utils";

export type TProfileResponse = Static<typeof ProfileResponse>;
export const ProfileResponse = StrictObject({
  username: Type.String(),
  pfp_url: Type.String(),
  active_status: Type.String(),
  viewer_context: StrictObject({
    following: Type.Boolean(),
    followed_by: Type.Boolean(),
  }),
  custody_address: Hex(),
  verified_addresses: StrictObject({
    eth_addresses: Type.Array(Hex()),
  }),
});

export const ProfileRequestParams = Type.Object({
  other_fid: Type.String(),
});
