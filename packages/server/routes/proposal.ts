import * as S from "@schemas/proposal";
import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import { createProposal, findProposalById, updateProposal } from "@db/proposal";
import { createProposalAttestation, waitForUID } from "@lib/eas";
import { Proposal } from "@db/index";
import { Insertable } from "kysely";

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
}

export default routes;
