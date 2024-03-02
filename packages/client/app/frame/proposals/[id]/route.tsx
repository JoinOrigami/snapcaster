import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import api from "@snapcaster/client/api";
import { TProposalEligibilityResponse } from "@snapcaster/server/schemas";

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

  const {
    eligible,
    message: eligibilityMessage,
  }: TProposalEligibilityResponse = await api(
    "GET",
    `/proposals/${id}/eligibility`,
    {},
    {
      Cookie: cookie,
    }
  );
  const imageURL = eligible
    ? `${BASE_URL}/api/images/proposals/${id}`
    : `${BASE_URL}/api/images/proposals/${id}/eligibility?message=${eligibilityMessage}`;

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
        src: imageURL,
      },
      postUrl: `${BASE_URL}/frame/proposals/${id}/votes`,
    })
  );
}

export const dynamic = "force-dynamic";
