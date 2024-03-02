import { TProfileResponse } from "@schemas/farcaster";

export const getProfile = async ({
  fid,
  viewer_fid,
}: {
  fid: string;
  viewer_fid?: string;
}): Promise<TProfileResponse> => {
  let url = `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`;
  if (viewer_fid) {
    url += `&viewer_fid=${viewer_fid}`;
  }

  const res = await fetch(url, {
    headers: {
      api_key: process.env.NEYNAR_API_KEY,
    } as any,
  }).then((res) => res.json());

  return res?.users?.[0];
};
