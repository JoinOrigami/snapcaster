import path from "path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import fs from "fs";
import React from "react";

import type { FastifyInstance } from "@snapcaster/server/types/fastify";

const outfitMedium = fs.readFileSync(
  path.join(__dirname, "..", "fonts", "Outfit-Medium.otf")
);
const outfitRegular = fs.readFileSync(
  path.join(__dirname, "..", "fonts", "Outfit-Regular.otf")
);

const imageConfig = {
  width: 600,
  height: 400,
  fonts: [
    {
      name: "Outfit",
      data: outfitMedium,
      weight: 500,
      style: "normal",
    } as const,
    {
      name: "Outfit",
      data: outfitRegular,
      weight: 400 as const,
      style: "normal",
    } as const,
  ],
};

async function routes(fastify: FastifyInstance) {
  fastify.get("/images/start", {
    handler: async (_, reply) => {
      const svg = await satori(
        <div style={{
          backgroundColor: "#fafafa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "1.25rem",
        }}>
          <h1 style={{fontSize: "3.5rem", fontWeight: "500", marginBottom: "0"}}>
            Snapcaster
          </h1>
          <p style={{width: "60%", textAlign: "center", marginTop: "0", marginBottom: "2rem"}}>
            Based on-chain voting for Farcaster. Make decisions as a group in 4 clicks
          </p>
          <div style={{width: "100%", textAlign: "left"}}>
            from chaindrop with :heart:
          </div>
        </div>,
        imageConfig
      );

      const png = new Resvg(svg)
        .render()
        .asPng();

      if (process.env.NODE_ENV === "production") {
        reply.header("Cache-Control", "public, max-age=10");
      }
      reply.header("Content-Type", "image/png");

      return reply.send(png);
    }
  });
}

export default routes;
