import * as S from "@schemas/proposal";
import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import { createProposal, findProposalById, updateProposal } from "@db/proposal";

const serializeDate = (date: Date | null) => date && date.toISOString();

async function routes(fastify: FastifyInstance) {
  fastify.post("/proposals", {
    schema: {
      body: S.CreateProposalPayload,
      response: {
        201: S.ProposalResponse,
      },
    },
    handler: async (request) => {
      fastify.assert(request.fid, 401);

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

  fastify.patch("/proposals/:id", {
    schema: {
      body: S.UpdateProposalPayload,
      params: S.ProposalRequestParams,
      response: {
        201: S.ProposalResponse,
      },
    },
    handler: async (request) => {
      fastify.assert(request.fid, 401);

      const proposal = await findProposalById(request.params.id);
      fastify.assert(proposal && proposal.proposer_fid === request.fid, 403);

      const updated = await updateProposal(
        request.params.id,
        request.body
      );

      return {
        ...updated,
        start_timestamp: serializeDate(proposal.start_timestamp),
        end_timestamp: serializeDate(proposal.end_timestamp),
      };
    }
  });
}

export default routes;
