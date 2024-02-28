import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import auth from "./auth";
import images from "./images";

async function routes(fastify: FastifyInstance) {
  fastify.register(auth);
  fastify.register(images);
}

export default routes;
