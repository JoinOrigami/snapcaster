import {
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

  if (message.button === 1) {
    // button 1 is "Use Farcaster"
    return new NextResponse(
      getFrameHtmlResponse({
        ogDescription: "Snapcaster",
        ogTitle: "Snapcaster",
        buttons: [
          { label: "Mutuals" },
          { label: "Follows" },
          { label: "Active" },
        ],
        state: { fid: message.interactor.fid, eligibilityType: "farcaster" },
        image: {
          aspectRatio: "1.91:1",
          src: `${BASE_URL}/api/images/proposals/audience/farcaster`,
        },
        postUrl: `${BASE_URL}/frame/proposals/audience/scope`,
      })
    );
  } else if (message.button === 2) {
    // button 2 is "Use a Token"
    return new NextResponse(
      getFrameHtmlResponse({
        ogDescription: "Snapcaster",
        ogTitle: "Snapcaster",
        buttons: [{ label: "$DEGEN" }, { label: "$PERL" }, { label: "$FRAME" }],
        state: { fid: message.interactor.fid, eligibilityType: "contract" },
        image: {
          aspectRatio: "1.91:1",
          src: `${BASE_URL}/api/images/proposals/audience/token`,
        },
        postUrl: `${BASE_URL}/frame/proposals/audience/scope`,
      })
    );
  } else {
    return new NextResponse("Invalid Selection", { status: 400 });
  }
}

export const dynamic = "force-dynamic";
