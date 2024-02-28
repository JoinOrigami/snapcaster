import { getFrameMetadata } from "@coinbase/onchainkit";
import SignIn from "@components/signin";
import { Metadata } from "next";

const BASE_URL = process.env.BASE_URL;

const frameMetadata = getFrameMetadata({
  buttons: [
    { label: "Create a proposal" },
    { label: "Create on the web" },
    { label: "About" },
  ],
  image: `${BASE_URL}/api/images/start`,
  postUrl: `${BASE_URL}/api/proposals/new`,
});

export const metadata: Metadata = {
  title: "Snapcaster",
  description: "Snapcaster",
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl py-6">
      <div className="flex items-center justify-between">
        <h1>Snapcaster</h1>
        <SignIn />
      </div>
    </div>
  );
}
