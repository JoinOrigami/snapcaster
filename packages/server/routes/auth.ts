import { randomBytes } from "crypto";
import { createAppClient, viemConnector } from "@farcaster/auth-client";

import * as S from "@snapcaster/server/schemas/auth";
import type { FastifyInstance } from "@snapcaster/server/types/fastify";

async function routes(fastify: FastifyInstance) {
  fastify.post("/auth/nonce", {
    handler: async (request) => {
      const nonce = (
        request.session.get("nonce") ||
        randomBytes(16).toString("hex")
      );
      request.session.set("nonce", nonce);

      return { nonce };
    }
  });

  fastify.post("/auth/verify", {
    schema: {
      body: S.AuthVerifyPayload,
    },
    handler: async (request) => {
      const appClient = createAppClient({
        ethereum: viemConnector(),
      });
      const verifyResponse = await appClient.verifySignInMessage({
        message: request.body.message,
        signature: request.body.signature,
        domain: "localhost:3000",
        nonce: request.session.nonce,
      });
      const { success, fid } = verifyResponse;

      fastify.assert(success, 400)

      request.session.set("nonce", null);
      request.session.set("fid", fid);

      return { success: true };
    }
  });
}

export default routes;
