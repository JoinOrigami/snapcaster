import { getFrameMetadata } from "@coinbase/onchainkit";
import SignIn from "@components/signin";
import { LuVote } from "react-icons/lu";
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuCamera } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { Metadata } from "next";

const BASE_URL = process.env.BASE_URL;

const frameMetadata = getFrameMetadata({
  buttons: [
    { label: "Create a proposal" },
    {
      label: "Create on the web",
      action: "link",
      target: `${BASE_URL}/proposals/new`,
    },
  ],
  state: {},
  image: `${BASE_URL}/api/images/start`,
  postUrl: `${BASE_URL}/proposals/new`,
});

export const metadata: Metadata = {
  title: "Snapcaster",
  description: "Snapcaster",
  openGraph: {
    siteName: "Snapcaster",
    title: "Snapcaster: get voting",
    type: "website",
    description: "Based on-chain voting for Farcaster.",
    images: [`${BASE_URL}/api/images/start`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl py-6 px-gutter">
      <div className="flex items-center justify-between">
        <h1>Snapcaster</h1>
        <SignIn />
      </div>

      <div className="sm:text-center mx-auto max-w-xl my-[10vh]">
        <h1 className="sm:text-center">Make better decisions together</h1>
        <p className="mt-6">
          The revolution is verifiable and inclusive. Ignite change and empower
          every voice in your community, from the Farcaster social graph to
          on-chain assets. Snapcaster equips you for secure, impactful
          decisions, celebrating your key contributors and building a trusted,
          collaborative future
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 sm:px-8">
        <div className="flex col-span-1 items-start gap-5">
          <LuVote className="w-14 h-14 sm:w-18 sm:h-18 mt-1 sm:mt-2 text-primary shrink-0" />
          <div>
            <h3>Inclusive engagement</h3>
            <p className="mt-2">
              Dive in, whether you're swinging big bags or making waves in the
              social scene. Every voice fuels our collective journey.
            </p>
          </div>
        </div>

        <div className="flex col-span-1 items-start gap-5">
          <LuCamera className="w-14 h-14 sm:w-18 sm:h-18 mt-1 sm:mt-2 text-primary shrink-0" />
          <div>
            <h3>Snapshots</h3>
            <p className="mt-2">
              Transparent snapshot timings so you know exactly when your
              eligibility is locked in.
            </p>
          </div>
        </div>

        <div className="flex col-span-1 items-start gap-5">
          <TbMoneybag className="w-14 h-14 sm:w-18 sm:h-18 mt-1 sm:mt-2 text-primary shrink-0" />
          <div>
            <h3>Power in participation</h3>
            <p className="mt-2">
              Your bags are your voice! The more you hold, the louder you call
              for change. We see you and your commitment.
            </p>
          </div>
        </div>

        <div className="flex col-span-1 items-start gap-5">
          <IoChatbubblesOutline className="w-14 h-14 sm:w-18 sm:h-18 mt-1 sm:mt-2 text-primary shrink-0" />
          <div>
            <h3>Vote where you vibe</h3>
            <p className="mt-2">
              Powered by farcaster frames, meet your community where they live
              to vote without leaving the conversation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
