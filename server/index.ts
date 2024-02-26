import fastify from "fastify";
import sensible from "@fastify/sensible";
import ajvFormats from "ajv-formats";

import routes from "./routes";

const server = fastify({
  ajv: { plugins: [ajvFormats] },
});

server.register(sensible);
server.register(routes);

(async () => {
  try {
    await server.listen({ port: 3001 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
