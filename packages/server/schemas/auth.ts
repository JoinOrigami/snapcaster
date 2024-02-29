import { Static, Type } from "@sinclair/typebox";

import { StrictObject, Hex } from "./utils";

export type TAuthResponse = Static<typeof AuthResponse>;
export const AuthResponse = StrictObject({
  fid: Type.String(),
});

export type TAuthVerifyPayload = Static<typeof AuthVerifyPayload>;
export const AuthVerifyPayload = StrictObject({
  message: Type.String({ minLength: 1 }),
  signature: Hex(),
});
