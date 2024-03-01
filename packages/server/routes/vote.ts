import type { FastifyInstance } from "@type/fastify";
import { Hex } from "viem";
import { Selectable } from "kysely";

import { isActive } from "@snapcaster/lib/proposal";
import { createVote, findVoteByProposalIdAndFid } from "@db/vote";
import * as S from "@schemas/vote";
import { createVoteAttestation } from "@lib/eas";
import { findProposalById } from "@db/proposal";
import { Proposal } from "@db/index";
import { getVotingWeight } from "@lib/vote";

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

      const proposal = (
        await findProposalById(request.body.proposal_id)
      ) as Selectable<Proposal>;

      fastify.assert(proposal?.uid, 400);
      fastify.assert(isActive(proposal), 400, "This proposal is not active");

      const existing = await findVoteByProposalIdAndFid(proposal.id, request.fid);
      fastify.assert(!existing, 400, "You have already voted on this proposal");

      const weight = await getVotingWeight(proposal, request.fid);
      fastify.assert(weight > 0, 400, "You are not eligible to vote on this proposal");

      const data = {
        ...request.body,
        voter_fid: request.fid,
        weight,
        signature: "0x0", // TODO
      };

      const uid = await createVoteAttestation({
        proposal_uid: proposal.uid as Hex,
        ...data,
      });
      const vote = await createVote({
        uid,
        ...data,
      });

      return vote;
    }
  });
}

export default routes;
