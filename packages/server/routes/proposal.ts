import * as S from "@schemas/proposal";
import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import { createProposal } from "@db/proposal";

const serializeDate = (date: Date | null) => date && date.toISOString();

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

      console.log("request.body", request.body);
      const proposal = await createProposal({
        proposer_fid: request.fid,
        ...request.body,
      });

      return {
        ...proposal,
        start_timestamp: serializeDate(proposal.start_timestamp),
        end_timestamp: serializeDate(proposal.end_timestamp),
      };
    }
  });
}

export default routes;
