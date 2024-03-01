import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { deserializeActionState } from "@utils";

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

  console.log({ state, title: message.input });

  // TODO: submit proposal to API and get proposal ID for redirect URL

  return new NextResponse(
    getFrameHtmlResponse({
      ogDescription: "Snapcaster",
      ogTitle: "Snapcaster",
      buttons: [
        {
          label: "View and share your proposal",
          action: "post_redirect",
          target: `${BASE_URL}/proposals/1`,
        },
      ],
      state: {
        ...state,
        title: message.input,
      },
      image: {
        aspectRatio: "1.91:1",
        src: `${BASE_URL}/api/images/proposal/finalized`,
      },
    })
  );
}
