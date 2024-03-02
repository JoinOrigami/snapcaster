import path from "path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import fs from "fs";
import React from "react";

import * as S from "@schemas/proposal";
import type { FastifyInstance } from "@type/fastify";
import { loadEmoji, getIconCode } from "@lib/twemoji";
import { findProposalById } from "@db/proposal";

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

const template = (title: string, node: React.ReactNode) => {
  return (
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
        padding: "1rem 1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0 0 0 auto",
          alignItems: "center",
          gap: "1rem",
          height: "30px",
          width: "auto",
        }}
      >
        <img src={`http://client:3000/frame/logo.svg`} width={25} height={30} />
        <h1
          style={{
            padding: "0",
            fontFamily: "Poppins",
            fontSize: "1rem",
            width: "100px",
          }}
        >
          Snapcaster
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5em" }}>{title}</h1>
        <div
          style={{
            display: "flex",
            fontSize: "1.75rem",
            marginLeft: "3rem",
            marginRight: "3rem",
          }}
        >
          {node}
        </div>
      </div>
      <p
        style={{
          fontSize: "1rem",
          width: "100%",
          textAlign: "left",
          margin: "0",
          padding: "0",
        }}
      >
        from chaindrop with ❤️
      </p>
    </div>
  );
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
              src={`http://client:3000/frame/logo.svg`}
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
              fontSize: "2rem",
              textAlign: "center",
              margin: "0 6rem 2rem",
            }}
          >
            Based on-chain voting for Farcaster. Make decisions as a group in 4
            clicks.
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

  fastify.get("/images/proposal/audience", {
    handler: async (_, reply) => {
      const svg = await satori(
        template(
          "Who Can Vote",
          <p>
            Vote using your farcaster social graph or allow any token holder to
            vote?
          </p>
        ),
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

  fastify.get("/images/proposal/audience/farcaster", {
    handler: async (_, reply) => {
      const svg = await satori(
        template(
          "Who Can Vote",
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Mutuals: accounts you follow that follow you back</div>
            <div>Followers: accounts that follow you</div>
            <div>Active: accounts with the "Active" badge</div>
            <div style={{ marginTop: "1rem" }}>
              Edit on the web for more options!
            </div>
          </div>
        ),
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

  fastify.get("/images/proposal/audience/token", {
    handler: async (_, reply) => {
      const svg = await satori(
        template(
          "Who Can Vote",
          <p>
            Select a popular token below or enter a custom token on the web.
            Votes use token holdings as a multiplier and balance is snapshotted
            at time of creation.
          </p>
        ),
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

  fastify.get("/images/proposal/title", {
    handler: async (_, reply) => {
      const svg = await satori(
        template(
          "What are you voting on?",
          <p>
            Title your vote (i.e. 'Token Burn') - 30 chars max. For details or
            edits, continue on the web. Ready? Click 'Create Proposal' to launch
            your vote!
          </p>
        ),
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

  fastify.get("/images/proposal/finalized", {
    handler: async (_, reply) => {
      const svg = await satori(
        template(
          "Proposal Created!",
          <p>
            Snapshot confirmed, and the voting window is open for 24 hours! Use
            the 'Share' button to generate a unique link and encourage your
            community to participate. Let's make every voice count.
          </p>
        ),
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

  fastify.get("/images/proposals/:id", {
    schema: {
      params: S.ProposalRequestParams,
    },
    handler: async (request, reply) => {
      const proposal = await findProposalById(request.params.id);
      fastify.assert(proposal, 404, "Proposal not found");
      fastify.assert(proposal.title, 404, "Proposal not found");

      const svg = await satori(
        template(proposal.title, <p>{proposal.summary}</p>),
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
