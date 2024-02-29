import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import auth from "./auth";
import images from "./images";
import proposal from "./proposal";

async function routes(fastify: FastifyInstance) {
  fastify.register(auth);
  fastify.register(images);
  fastify.register(proposal);
}

export default routes;
