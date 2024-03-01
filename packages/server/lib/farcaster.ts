export const getProfile = async (fid: string): Promise<{
  username: string;
  pfp_url: string;
}> => {
  const res = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, {
    headers: {
      "api_key": process.env.NEYNAR_API_KEY,
    } as any,
  }).then((res) => res.json());

  return res?.users?.[0];
}
