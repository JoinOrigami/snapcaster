import { NeynarFrameValidationInternalModel } from "@coinbase/onchainkit/lib/utils/neynar/frame/types";
import { TProfileResponse } from "@snapcaster/server/schemas";

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
      1: "mutuals",
      2: "followers",
      3: "active",
    },
    token: {
      1: "DEGEN",
      2: "NOUN",
    },
  };
  return discriminators[eligibilityType][buttonIndex];
};

export const isMutualFollow = (connection: TProfileResponse) => {
  return (
    connection.viewer_context.following && connection.viewer_context.followed_by
  );
};

export const isActive = (connection: TProfileResponse) => {
  return connection.active_status === "active";
};

export const isFollower = (connection: TProfileResponse) => {
  return connection.viewer_context.followed_by;
};

export const isSocialEligible = (
  discriminator: string,
  connection: TProfileResponse
) => {
  switch (discriminator) {
    case "mutuals":
      return isMutualFollow(connection);
    case "followers":
      return isFollower(connection);
    case "active":
      return isActive(connection);
    default:
      return false;
  }
};
