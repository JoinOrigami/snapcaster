import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";

const BASE_URL = process.env.BASE_URL;
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

export async function middleware(request: NextRequest) {
  if (
    request.method === "POST" &&
    request.nextUrl.pathname === "/proposals/new"
  ) {
    const body: FrameRequest = await request.json();
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: NEYNAR_API_KEY,
    });

    return new NextResponse(
      getFrameHtmlResponse({
        ogDescription: "Snapcaster",
        ogTitle: "Snapcaster",
        buttons: [{ label: "tacos" }],
        image: {
          aspectRatio: "1.91:1",
          src: `${BASE_URL}/api/images/start`,
        },
        postUrl: "",
      })
    );
  }

  return NextResponse.next();
}
