import * as S from "@schemas/proposal";
import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import {
  createProposal,
  findProposalById,
  isUserEligibleToVote,
  updateProposal,
} from "@db/proposal";
import { createProposalAttestation, waitForUID } from "@lib/eas";
import { Proposal } from "@db/index";
import { Insertable } from "kysely";
import { getVotingWeight } from "@lib/vote";
import { getProfile } from "@lib/farcaster";

const serializeDate = (date: Date) => date && date.toISOString();

async function routes(fastify: FastifyInstance) {
  fastify.post("/proposals", {
    schema: {
      body: S.CreateProposalPayload,
      response: {
        200: S.ProposalResponse,
      },
    },
    handler: async (request) => {
      fastify.assert(request.fid, 401);

      const data = request.body;

      fastify.assert(data.eligibility_type && data.discriminator, 401);

      const tx_hash = await createProposalAttestation(
        data as Insertable<Proposal>
      );

      const proposal = await createProposal({
        proposer_fid: request.fid,
        tx_hash,
        ...request.body,
      });

      waitForUID(tx_hash)
        .then((uid) => updateProposal(proposal.id, { uid }))
        .catch(console.error);

      return {
        ...proposal,
        start_timestamp: serializeDate(proposal.start_timestamp),
        end_timestamp: serializeDate(proposal.end_timestamp),
      };
    },
  });

  fastify.get("/proposals/:id", {
    schema: {
      params: S.ProposalRequestParams,
      response: {
        200: S.ProposalResponse,
      },
    },
    handler: async (request) => {
      const proposal = await findProposalById(request.params.id);

      // make sure the proposal exists and is submitted on-chain
      fastify.assert(proposal?.tx_hash, 404);

      return {
        ...proposal,
        start_timestamp: serializeDate(proposal.start_timestamp),
        end_timestamp: serializeDate(proposal.end_timestamp),
      };
    },
  });

  fastify.get("/proposals/:id/eligibility", {
    schema: {
      params: S.ProposalEligibilityRequestParams,
      response: {
        200: S.ProposalEligibilityResponse,
      },
    },
    handler: async (request) => {
      fastify.assert(request.fid, 401);
      const proposal = await findProposalById(request.params.id);
      fastify.assert(proposal, 404, "Proposal not found");
      const eligibility = await isUserEligibleToVote(
        request.params.id,
        request.fid
      );
      if (!eligibility.eligible) {
        return eligibility;
      }

      if (proposal.eligibility_type === "token") {
        const weight = await getVotingWeight(proposal, request.fid);
        if (weight === 0n) {
          return {
            eligible: false,
            message: `Only ${proposal.discriminator} holders can vote on this proposal`,
          };
        }
      } else {
        const profile = await getProfile({
          fid: proposal.proposer_fid,
          viewer_fid: request.fid,
        });

        if (proposal.discriminator === "active") {
          if (profile.active_status !== "active") {
            return {
              eligible: false,
              message:
                "Only users with the active badge can vote on this proposal",
            };
          }
        } else if (proposal.discriminator === "followers") {
          if (!profile.viewer_context.following) {
            return {
              eligible: false,
              message: "Only followers can vote on this proposal",
            };
          }
        } else if (proposal.discriminator === "mutuals") {
          if (
            !(
              profile.viewer_context.following &&
              profile.viewer_context.followed_by
            )
          ) {
            return {
              eligible: false,
              message: "Only mutual follows can vote on this proposal",
            };
          }
        }
      }
      return { eligible: true };
    },
  });
}

export default routes;
