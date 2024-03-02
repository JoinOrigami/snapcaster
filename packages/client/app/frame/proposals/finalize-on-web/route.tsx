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

  const authRes = await fetch(
    `http://server:3001/internal/auth/${message.interactor.fid}`,
    {
      method: "POST",
    }
  );
  const cookie = authRes.headers.get("set-cookie");

  return NextResponse.redirect(
    new URL(
      `${BASE_URL}/proposals/new?title=${message.input}&eligibilityType=${state.eligibilityType}&discriminator=${state.discriminator}`
    ),
    { status: 302, headers: { "set-cookie": cookie as string } }
  );
}

export const dynamic = "force-dynamic";
