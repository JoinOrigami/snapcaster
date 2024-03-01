import { Selectable } from "kysely";

import { Proposal } from "@db/index";

export const getVotingWeight = async (_proposal: Selectable<Proposal>, _fid: string) => {
  // TODO
  return 1;
}
