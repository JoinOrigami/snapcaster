import { isPast, isFuture } from "date-fns";

export const isActive = (proposal: {
  start_timestamp: Date | string,
  end_timestamp: Date | string,
}) => isPast(proposal?.start_timestamp) && isFuture(proposal?.end_timestamp);

export const hasEnded = (proposal: {
  end_timestamp: Date | string,
}) => isPast(proposal?.end_timestamp);
