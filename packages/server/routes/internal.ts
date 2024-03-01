import type { FastifyInstance } from "@type/fastify";

import { Type } from "@sinclair/typebox";

// TODO: only allow internal requests to these endpoints
async function routes(fastify: FastifyInstance) {
  fastify.post("/internal/auth/:fid", {
    schema: {
      params: Type.Object({
        fid: Type.String({ format: "uint64" }),
      }),
    },
    handler: async (request) => {
      request.session.set("fid", request.params.fid);

      return { success: true };
    }
  });
}

export default routes;
