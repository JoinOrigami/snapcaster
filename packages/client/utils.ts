import { NeynarFrameValidationInternalModel } from "@coinbase/onchainkit/lib/utils/neynar/frame/types";

type StateAction = {
  state: {
    serialized: string;
  };
};

type SnapcasterState = {
  fid: number;
  eligibilityType: string;
  discriminator?: string;
  title?: string;
};

export const deserializeActionState = ({
  action,
}: NeynarFrameValidationInternalModel): SnapcasterState => {
  const stateAction = action as Partial<StateAction>;
  if (!stateAction.state) {
    throw new Error("Invalid state");
  }
  const decoded = decodeURIComponent(stateAction.state.serialized);
  return JSON.parse(decoded);
};

export const discriminatorForEligibilityType = (
  eligibilityType: string,
  buttonIndex: number
) => {
  const discriminators = {
    farcaster: {
      1: "Mutuals",
      2: "Follows",
      3: "Active",
    },
    contract: {
      1: "$DEGEN",
      2: "$PERL",
      3: "$FRAME",
    },
  };
  return discriminators[eligibilityType][buttonIndex];
};
