import * as S from "@schemas/proposal";
import type { FastifyInstance } from "@snapcaster/server/types/fastify";

import { createProposal } from "@db/proposal";
import { createProposalAttestation } from "@lib/eas";
import { CompletedProposal } from "@db/index";
import { Insertable } from "kysely";

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

      const data = request.body;

      fastify.assert(data.eligibility_type !== "contract" || (
        data.eligibility_contract &&
        data.eligibility_threshold !== null
      ));

      const uid = await createProposalAttestation(
        data as Insertable<CompletedProposal>
      );

      const proposal = await createProposal({
        proposer_fid: request.fid,
        uid,
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
