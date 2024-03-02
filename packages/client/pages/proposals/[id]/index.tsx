import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import Error from "next/error";
import { isFuture, formatDistanceToNow } from "date-fns";
import { IoShareOutline } from "react-icons/io5";

import { isActive, hasEnded } from "@snapcaster/lib/proposal";
import api from "@snapcaster/client/api";
import Layout from "@components/layouts/main";
import { useProposal } from "@hooks/queries";
import toast from "react-hot-toast";
import { FrameMetadata } from "@coinbase/onchainkit";

const BASE_URL = process.env.BASE_URL;

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

  await queryClient.prefetchQuery({
    queryKey: ["proposals", "detail", ctx.query.id],
    queryFn: () => api("GET", `/proposals/${ctx.query.id}`),
  });

  return {
    props: {
      id: ctx.query.id,
      queries: dehydrate(queryClient),
    },
  };
}

function Page({ id }: { id: string }) {
  const { data: proposal, isError } = useProposal(id);

  if (isError) {
    return <Error statusCode={404} />;
  }

  const share = () => {
    if (navigator.share) {
      navigator.share({ url: window.location.href }).catch(console.info);
      return;
    }

    navigator.clipboard.writeText(window.location.href);
    toast("Share link copied");
  };

  return (
    <div className="container-sm">
      <FrameMetadata
        image={`${BASE_URL}/api/images/proposals/${id}`}
        buttons={[
          { label: "Ready to vote, anon?" },
          {
            label: "View details",
            action: "link",
            target: `${BASE_URL}/proposals/${id}`,
          },
        ]}
        postUrl={`${BASE_URL}/frame/proposals/${id}`}
      />
      <div className="flex items-center justify-between gap-6">
        <h1>{proposal?.title}</h1>
        <button
          className="flex gap-2 items-center active:scale-90 link below-sm:hidden"
          onClick={share}
        >
          <IoShareOutline className="w-5 h-5" />
          Share
        </button>
      </div>
      {proposal && (
        <div className="text-gray-200 mt-2 mb-6 flex gap-3">
          <span>by arshsingh.eth</span>
          <span className="text-gray-500 dark:text-gray-100">|</span>
          {isFuture(proposal?.start_timestamp) && (
            <span className="text-lime-500 italic">
              starts in {formatDistanceToNow(proposal?.start_timestamp)}
            </span>
          )}
          {isActive(proposal) && (
            <span className="text-amber-500 italic">
              ends in {formatDistanceToNow(proposal?.end_timestamp)}
            </span>
          )}
          {hasEnded(proposal) && (
            <span className="italic">
              ended{" "}
              {formatDistanceToNow(proposal?.end_timestamp, {
                addSuffix: true,
              })}
            </span>
          )}
        </div>
      )}
      <p className="my-8">{proposal?.summary}</p>

      <h3>Current results</h3>

      <div className="flex items-center mt-4">
        <div className="w-28 sm:w-32 shrink-0">
          <p>In favor</p>
          <p className="text-gray-200 text-sm">239 votes</p>
        </div>
        <div className="w-full bg-base-200 h-3 w-full rounded-md overflow-hidden">
          <div className="bg-primary/70 h-3 w-[65%]"></div>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className="w-28 sm:w-32 shrink-0">
          <p>Against</p>
          <p className="text-gray-200 text-sm">42 votes</p>
        </div>
        <div className="w-full bg-base-200 h-3 w-full rounded-md overflow-hidden">
          <div className="bg-primary/70 h-3 w-[35%]"></div>
        </div>
      </div>

      <p className="mt-8">{proposal?.description}</p>

      <div
        className="sm:hidden fixed right-0 bottom-0 left-0 bg-content flex items-center justify-center px-gutter py-6 gap-3 font-medium text-content-invert shadow"
        onClick={share}
      >
        <IoShareOutline className="w-5 h-5 mb-0.5" />
        Share proposal
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Page;
