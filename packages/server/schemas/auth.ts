import { Static, Type } from "@sinclair/typebox";

import { StrictObject, Hex } from "./utils";

export type TAuthVerifyPaylod = Static<typeof AuthVerifyPayload>;
export const AuthVerifyPayload = StrictObject({
  message: Type.String({ minLength: 1 }),
  signature: Hex(),
});
