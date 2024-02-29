import path from "path";
import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import fastifyStatic from "@fastify/static";
import auth from "./auth";
import images from "./images";
import proposal from "./proposal";

async function routes(fastify: FastifyInstance) {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "images"),
    prefix: "/images/",
  });
  fastify.register(auth);
  fastify.register(images);
  fastify.register(proposal);
}

export default routes;
