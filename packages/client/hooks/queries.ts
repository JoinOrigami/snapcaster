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

export const useProposal = (id: number | string) =>
  useQuery({
    queryKey: ["proposals", "deatil", id],
    queryFn: () => api<S.TProposalResponse>("GET", `/proposals/${id}`),
  });
