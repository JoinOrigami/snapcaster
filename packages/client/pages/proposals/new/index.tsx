import { useState } from "react";
import { useForm } from "react-hook-form";
import { add } from "date-fns";
import toast from "react-hot-toast";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { type NextRequest } from "next/server";

import type * as S from "@snapcaster/server/schemas/proposal";
import api from "@snapcaster/client/api";
import { useRouter } from "next/navigation";
import Layout from "@components/layouts/main";
import { QueryClient, dehydrate } from "@tanstack/react-query";

type FormValues = {
  title: string;
  _votingPeriod: string;
  summary: string;
  description: string;
  eligibility_type: string;
  discriminator: string;
};

// TODO: refactor and move auth logic into a common place
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["auth", "data"],
    queryFn: () =>
      api("GET", "/auth", null, {
        Cookie: ctx.req.headers.cookie ?? "",
      }),
  });

  type ProposalQueryParams = {
    title: string;
    eligibilityType: string;
    discriminator: string;
  };

  const query = ctx.query as ProposalQueryParams;

  if (!queryClient.getQueryData(["auth", "data"])) {
    return {
      redirect: {
        destination: `/signin?next=${encodeURIComponent("/proposals/new")}`,
        permanent: false,
      },
    };
  }

  return {
    props: { queries: dehydrate(queryClient), query },
  };
}

function Page({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const { title, eligibilityType, discriminator } = query;
  const { watch, register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: title,
      discriminator: eligibilityType === "token" ? discriminator : "",
      eligibility_type:
        eligibilityType === "farcaster" ? discriminator : "token" ?? "mutuals",
      _votingPeriod: "24",
    },
  });

  const submit = (data: FormValues) => {
    const proposal: S.TCreateProposalPayload = {
      ...data,
      start_timestamp: new Date().toISOString(),
      end_timestamp: add(new Date(), {
        hours: parseInt(data._votingPeriod),
      }).toISOString(),
    };

    setIsCreating(true);
    api("POST", `/proposals`, proposal)
      .then(({ id }: { id: number }) => {
        router.push(`/proposals/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create proposal");
        setIsCreating(false);
      });
  };

  return (
    <div className="container-sm">
      <h1 className="mb-6">New proposal</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
        <h4>Who can vote?</h4>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              className="radio"
              value="mutuals"
              {...register("eligibility_type")}
            />
            Mutuals
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              className="radio"
              value="followers"
              {...register("eligibility_type")}
            />
            Followers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              className="radio"
              value="active"
              {...register("eligibility_type")}
            />
            Active
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              className="radio"
              value="token"
              {...register("eligibility_type")}
            />
            Use token
          </label>
        </div>

        {watch("eligibility_type") === "token" && (
          <div className="flex gap-4 mt-2">
            <select className="input" {...register("discriminator")}>
              <option value="DEGEN">$DEGEN</option>
              <option value="NOUN">NOUN</option>
            </select>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-24 border-t border-base-300 mt-4 pt-6">
          <label className="label flex-[7]">
            Title
            <input
              type="text"
              className="input"
              placeholder="Retro PGF for $DEGEN builders?"
              required
              {...register("title")}
            />
          </label>
          <label className="label flex-[4]">
            Voting period
            <select className="input" {...register("_votingPeriod")}>
              <option value="24">1 day</option>
              <option value="36">3 days</option>
              <option value="168">7 days</option>
            </select>
          </label>
        </div>
        <label className="label col-span-12">
          Summary
          <input
            type="text"
            className="input"
            placeholder="Should we set aside 1 BILLION $DEGEN for Retroactive public goods funding for builders in the ecosystem?"
            {...register("summary")}
          />
        </label>
        <label className="label col-span-12">
          Description
          <textarea
            className="textarea"
            rows={10}
            placeholder="Describe the proposal in detail..."
            {...register("description")}
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-end mt-6">
          <p className="text-sm text-gray-200">
            Proposals are live for voting as soon as they are published.
          </p>
          <button
            type="submit"
            className="btn btn-md btn-primary"
            disabled={isCreating}
          >
            Publish proposal
          </button>
        </div>
      </form>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Page;
