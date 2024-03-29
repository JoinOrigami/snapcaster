import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import {
  deserializeActionState,
  discriminatorForEligibilityType,
} from "@utils";

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

  const state = deserializeActionState(message.raw);
  const discriminator = discriminatorForEligibilityType(
    state.eligibilityType,
    message.button
  );

  return new NextResponse(
    getFrameHtmlResponse({
      ogDescription: "Snapcaster",
      ogTitle: "Snapcaster",
      input: { text: "Title" },
      buttons: [
        { label: "Create Proposal" },
        {
          label: "Continue on Web",
          action: "post_redirect",
          target: `${BASE_URL}/frame/proposals/finalize-on-web`,
        },
      ],
      state: {
        ...state,
        discriminator,
      },
      image: {
        aspectRatio: "1.91:1",
        src: `${BASE_URL}/api/images/proposal/title`,
      },
      postUrl: `${BASE_URL}/frame/proposals`,
    })
  );
}

export const dynamic = "force-dynamic";
