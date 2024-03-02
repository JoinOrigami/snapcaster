import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { deserializeActionState } from "@utils";
import api from "@snapcaster/client/api";
import type { TProposalResponse } from "@snapcaster/server/schemas";

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

  const state = deserializeActionState(message.raw);
  const now = new Date().toISOString();
  const twentyFourHrs = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24
  ).toISOString();

  const res: TProposalResponse = await api(
    "POST",
    "/proposals",
    {
      title: message.input,
      eligibility_type: state.eligibilityType,
      discriminator: state.discriminator,
      start_timestamp: now,
      end_timestamp: twentyFourHrs,
    },
    { Cookie: cookie }
  );

  if (!res.id) {
    console.error("Failed to create proposal");
    return new NextResponse("Invalid request", { status: 400 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      ogDescription: "Snapcaster",
      ogTitle: "Snapcaster",
      buttons: [
        {
          label: "View and share your proposal",
          action: "link",
          target: `${BASE_URL}/proposals/${res.id}`,
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
