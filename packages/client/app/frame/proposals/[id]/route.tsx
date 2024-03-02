import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL;
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const body: FrameRequest = await req.json();
  const id = parseInt(params.id);
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
      buttons: [
        { label: "For" },
        { label: "Against" },

        {
          label: "View details",
          action: "link",
          target: `${BASE_URL}/proposals/${id}`,
        },
      ],
      image: {
        aspectRatio: "1.91:1",
        src: `${BASE_URL}/api/images/proposals/${id}`,
      },
      postUrl: `${BASE_URL}/frame/proposal/${id}/votes`,
    })
  );
}

export const dynamic = "force-dynamic";
