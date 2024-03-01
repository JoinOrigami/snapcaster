import path from "path";
import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import fastifyStatic from "@fastify/static";
import auth from "./auth";
import images from "./images";
import proposal from "./proposal";

async function routes(fastify: FastifyInstance) {
  fastify.setErrorHandler((error, _request, reply) => {
    console.error(error);
    if (error.statusCode) {
      reply.status(error.statusCode).send({ ok: false, error: error.message });
    }
    reply.status(500).send({ ok: false });
  });
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "images"),
    prefix: "/images/",
  });
  fastify.register(auth);
  fastify.register(images);
  fastify.register(proposal);
}

export default routes;
