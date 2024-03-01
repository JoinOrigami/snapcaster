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
      image: string;
    };
  };

  const scopes: ScopeDiscriminators = {
    1: {
      buttons: [
        { label: "Mutuals" },
        { label: "Follows" },
        { label: "Active" },
      ],
      image: "farcaster",
    },
    2: {
      buttons: [{ label: "$DEGEN" }, { label: "$PERL" }, { label: "$FRAME" }],
      image: "token",
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
      state: { fid: message.interactor.fid, eligibilityType: "farcaster" },
      image: {
        aspectRatio: "1.91:1",
        src: `${BASE_URL}/api/images/proposal/audience/${
          scopes[message.button].image
        }`,
      },
      postUrl: `${BASE_URL}/frame/proposals/audience/scope`,
    })
  );
}

export const dynamic = "force-dynamic";
