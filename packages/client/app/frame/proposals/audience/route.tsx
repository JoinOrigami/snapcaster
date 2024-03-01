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

  return new NextResponse(
    getFrameHtmlResponse({
      ogDescription: "Snapcaster",
      ogTitle: "Snapcaster",
      buttons: [{ label: "Use Farcaster" }, { label: "Use a Token" }],
      state: { fid: message.interactor.fid },
      image: {
        aspectRatio: "1.91:1",
        src: `${BASE_URL}/api/images/proposal/audience`,
      },
      postUrl: `${BASE_URL}/frame/proposals/audience/scope`,
    })
  );
}

export const dynamic = "force-dynamic";
