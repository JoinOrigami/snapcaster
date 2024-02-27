import type { FastifyInstance } from "@votes/server/types/fastify";

import auth from "./auth";

async function routes(fastify: FastifyInstance) {
  fastify.register(auth);
}

export default routes;
