import { Static, Type } from "@sinclair/typebox";

import { StrictObject, Hex, Nullable } from "./utils";

export type TAuthResponse = Static<typeof AuthResponse>;
export const AuthResponse = StrictObject({
  fid: Type.String(),
});

export type TAuthVerifyPayload = Static<typeof AuthVerifyPayload>;
export const AuthVerifyPayload = StrictObject({
  message: Type.String({ minLength: 1 }),
  signature: Hex(),
});

export type TAuthProfileResponse = Static<typeof AuthProfileResponse>;
export const AuthProfileResponse = StrictObject({
  username: Type.String(),
  pfp_url: Nullable(Type.String()),
});
