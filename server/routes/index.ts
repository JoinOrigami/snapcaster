import type { FastifyInstance } from "@server/types/fastify";

async function routes(fastify: FastifyInstance) {
  fastify.get("/", async () => {
    return { hello: "world" };
  });
}

export default routes;
