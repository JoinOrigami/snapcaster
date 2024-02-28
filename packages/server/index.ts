import fastify from "fastify";
import sensible from "@fastify/sensible";
import session from "@fastify/secure-session";
import ajvFormats from "ajv-formats";

import { FORMATS } from "@schemas/utils";
import auth from "./plugins/auth";
import routes from "./routes";

const server = fastify({
  ajv: {
    plugins: [ajvFormats],
    customOptions: {
      formats: FORMATS,
    },
  },
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

// custom plugins
server.register(auth);

server.register(routes);

(async () => {
  try {
    await server.listen({ host: "0.0.0.0", port: 3001 });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
