import type { FastifyInstance } from "@type/fastify";
import { Hex } from "viem";
import { Selectable } from "kysely";

import { isActive } from "@snapcaster/lib/proposal";
import { createVote, findVoteByProposalIdAndFid, updateVote } from "@db/vote";
import * as S from "@schemas/vote";
import { createVoteAttestation, waitForUID } from "@lib/eas";
import { findProposalById, isUserEligibleToVote } from "@db/proposal";
import { Proposal } from "@db/index";
import { getVotingWeight } from "@lib/vote";
import { getProfile } from "@lib/farcaster";

async function routes(fastify: FastifyInstance) {
  fastify.post("/votes", {
    schema: {
      body: S.CreateVotePayload,
      response: {
        200: S.VoteResponse,
      },
    },
    handler: async (request) => {
      fastify.assert(request.fid, 401);

      const proposal = (await findProposalById(
        request.body.proposal_id
      )) as Selectable<Proposal>;
      const voteEligibility = await isUserEligibleToVote(
        request.body.proposal_id,
        request.fid
      );
      fastify.assert(voteEligibility.eligible, 400, voteEligibility.message);

      let weight = BigInt(0);
      if (proposal.eligibility_type === "token") {
        weight = await getVotingWeight(proposal, request.fid);
        fastify.assert(
          weight > 0,
          400,
          "You are not eligible to vote on this proposal"
        );
      } else {
        const profile = await getProfile({
          fid: proposal.proposer_fid,
          viewer_fid: request.fid,
        });

        if (proposal.discriminator === "active") {
          fastify.assert(
            profile.active_status === "active",
            400,
            "Only users with the active badge can vote on this proposal"
          );
        } else if (proposal.discriminator === "followers") {
          fastify.assert(
            profile.viewer_context.following,
            400,
            "Only followers can vote on this proposal"
          );
        } else if (proposal.discriminator === "mutuals") {
          fastify.assert(
            profile.viewer_context.following &&
              profile.viewer_context.followed_by,
            400,
            "Only mutual follows can vote on this proposal"
          );
        }
        weight = BigInt(1);
      }

      const data = {
        ...request.body,
        voter_fid: request.fid,
        weight: weight.toString(),
        signature: "0x0", // TODO
      };

      const tx_hash = await createVoteAttestation({
        proposal_uid: proposal.uid as Hex,
        ...data,
      });
      const vote = await createVote({
        tx_hash,
        ...data,
      });

      waitForUID(tx_hash)
        .then((uid) => updateVote(vote.id, { uid }))
        .catch(console.error);

      return vote;
    },
  });
}

export default routes;
