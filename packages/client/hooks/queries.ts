import { useQuery } from "@tanstack/react-query";

import type * as S from "@snapcaster/server/schemas";
import api from "../api";

export const useAuth = () =>
  useQuery({
    queryKey: ["auth", "data"],
    queryFn: () => api<S.TAuthResponse>("GET", `/auth`),
  });

export const useProfile = () =>
  useQuery({
    queryKey: ["auth", "profile"],
    queryFn: () => api<S.TAuthProfileResponse>("GET", `/auth/profile`),
  });

export const useAuthorProfile = (
  fid: string | undefined,
  options: { enabled: boolean }
) =>
  useQuery({
    queryKey: ["author", "profile", fid],
    queryFn: () => api<S.TAuthProfileResponse>("GET", `/profile/${fid}`),
    enabled: options.enabled,
  });

export const useProposalWithResults = (id: number | string) =>
  useQuery({
    queryKey: ["proposals", "detail", id],
    queryFn: () =>
      api<S.TProposalWithResultsResponse>("GET", `/proposals/${id}`),
  });
