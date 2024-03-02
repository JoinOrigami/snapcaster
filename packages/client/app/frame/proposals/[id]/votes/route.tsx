import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { TVoteResponse } from "@snapcaster/server/schemas";
import { NextRequest, NextResponse } from "next/server";
import api from "../../../../../api";

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

  // Authenticate for our next request
  const authRes = await fetch(
    `http://server:3001/internal/auth/${message.interactor.fid}`,
    {
      method: "POST",
    }
  );
  const cookie = authRes.headers.get("set-cookie");
  if (!cookie) {
    console.error("Authentication failed");
    return new NextResponse("Invalid request", { status: 400 });
  }

  const res: TVoteResponse = await api(
    "POST",
    `/votes`,
    {
      proposal_id: id,
      choice: message.button - 1,
    },
    { Cookie: cookie }
  );

  if (!res.id) {
    console.error("Failed to create vote");
    return new NextResponse("Invalid request", { status: 400 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      ogDescription: "Snapcaster",
      ogTitle: "Snapcaster",
      buttons: [
        {
          label: "Share",
          action: "link",
          target: `${BASE_URL}/proposals/${id}`,
        },
      ],
      image: {
        aspectRatio: "1.91:1",
        src: `${BASE_URL}/api/images/proposals/${id}/votes/${message.interactor.fid}`,
      },
    })
  );
}

export const dynamic = "force-dynamic";
