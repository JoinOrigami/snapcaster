import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import auth from "./auth";
import images from "./images";
import proposal from "./proposal";
import vote from "./vote";
import internal from "./internal";

async function routes(fastify: FastifyInstance) {
  fastify.setErrorHandler((error, _request, reply) => {
    console.error(error);
    if (error.statusCode) {
      reply.status(error.statusCode).send({ ok: false, error: error.message });
    }
    reply.status(500).send({ ok: false });
  });

  fastify.register(auth);
  fastify.register(images);
  fastify.register(proposal);
  fastify.register(vote);
  fastify.register(internal);
}

export default routes;
