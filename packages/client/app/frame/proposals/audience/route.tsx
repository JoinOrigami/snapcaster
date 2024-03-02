import {
  FrameButtonMetadata,
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL;
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

export async function POST(req: NextRequest): Promise<Response> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: NEYNAR_API_KEY,
  });

  if (!isValid) {
    return new NextResponse("Invalid Message", { status: 400 });
  }

  type ScopeDiscriminators = {
    [key: number]: {
      buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]];
      discriminator: string;
    };
  };

  const scopes: ScopeDiscriminators = {
    1: {
      buttons: [
        { label: "Mutuals" },
        { label: "Followers" },
        { label: "Active" },
      ],
      discriminator: "farcaster",
    },
    2: {
      buttons: [{ label: "$DEGEN" }, { label: "NOUN" }],
      discriminator: "token",
    },
  };

  if (message.button !== 1 && message.button !== 2) {
    console.error("Invalid scope selection");
    return new NextResponse("Invalid Message", { status: 400 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      ogDescription: "Snapcaster",
      ogTitle: "Snapcaster",
      buttons: scopes[message.button].buttons,
      state: {
        fid: message.interactor.fid,
        eligibilityType: scopes[message.button].discriminator,
      },
      image: {
        aspectRatio: "1.91:1",
        src: `${BASE_URL}/api/images/proposal/audience/${
          scopes[message.button].discriminator
        }`,
      },
      postUrl: `${BASE_URL}/frame/proposals/audience/scope`,
    })
  );
}

export const dynamic = "force-dynamic";
