import path from "path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import fs from "fs";
import React from "react";
import { loadEmoji, getIconCode } from "../lib/twemoji";

import type { FastifyInstance } from "@snapcaster/server/types/fastify";

const BASE_URL = process.env.BASE_URL;

const outfitMedium = fs.readFileSync(
  path.join(__dirname, "..", "fonts", "Outfit-Medium.otf")
);
const outfitRegular = fs.readFileSync(
  path.join(__dirname, "..", "fonts", "Outfit-Regular.otf")
);

const poppins = fs.readFileSync(
  path.join(__dirname, "..", "fonts", "Poppins-Regular.ttf")
);

const imageConfig = {
  width: 800,
  height: 418,
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
      weight: 400,
      style: "normal",
    } as const,
    {
      name: "Poppins",
      data: poppins,
      weight: 500,
      style: "normal",
    } as const,
  ],
  loadAdditionalAsset: async (code: string, segment: string) => {
    if (code === "emoji") {
      return `data:image/svg+xml;base64,${btoa(
        await loadEmoji(getIconCode(segment))
      )}`;
    } else {
      return code;
    }
  },
};

async function routes(fastify: FastifyInstance) {
  fastify.get("/images/start", {
    handler: async (_, reply) => {
      const svg = await satori(
        <div
          style={{
            backgroundColor: "rgb(29, 36, 48)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={`${BASE_URL}/api/images/logo.svg`}
              width={100}
              height={120}
            />
            <h1
              style={{
                fontFamily: "Poppins",
                fontSize: "3.5rem",
                marginTop: "1.75rem",
              }}
            >
              Snapcaster
            </h1>
          </div>
          <p
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              marginTop: "0",
              marginBottom: "2rem",
            }}
          >
            Make decisions as a group in 4 clicks
          </p>
          <div
            style={{ fontSize: "1.25rem", width: "100%", textAlign: "left" }}
          >
            from chaindrop with ❤️
          </div>
        </div>,
        imageConfig
      );

      const png = new Resvg(svg).render().asPng();

      if (process.env.NODE_ENV === "production") {
        reply.header("Cache-Control", "public, max-age=10");
      } else {
        reply.header("Cache-Control", "public, max-age=0");
      }
      reply.header("Content-Type", "image/png");

      return reply.send(png);
    },
  });
}

export default routes;
