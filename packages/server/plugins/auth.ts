import fp from "fastify-plugin";

import { FastifyInstance } from "@type/fastify";

async function auth(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request) => {
    const fid = request.session.get("fid");
    if (fid) {
      request.fid = fid;
    }
  });
}

export default fp(auth);

