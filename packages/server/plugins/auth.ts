import fp from "fastify-plugin";

import { FastifyInstance } from "@type/fastify";


async function auth(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request) => {
    // user can be authed in two ways
    // 1. with a cookie/session
    const fid = request.session.get("fid");
    if (fid) {
      request.fid = fid;
    }

    // 2. requests that are from a frame ?
  });
}

export default fp(auth);

