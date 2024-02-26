import fastify from "fastify";
import sensible from "@fastify/sensible";
import session from "@fastify/secure-session";
import ajvFormats from "ajv-formats";

import routes from "./routes";

const server = fastify({
  ajv: { plugins: [ajvFormats] },
});

server.register(sensible);
server.register(session, {
  key: Buffer.from(process.env.SESSION_KEY as string, "base64"),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 3600 * 24 * 7 * 1000,
  },
});

server.register(routes);

(async () => {
  try {
    await server.listen({ host: "0.0.0.0", port: 3001 });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
