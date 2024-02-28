## Debugging the frame

1. Set up a [cloudflare tunnel](https://eshlox.net/2023/03/28/use-cloudflare-tunnel-to-expose-your-local-web-server-via-https) so you have persistent external DNS for your localhost. I used my machine name as opposed to `localhost` so as to be friendly to teammates doing the same.
2. Set `BASE_URL` equal to your tunneled FQDN in the `.env` file.
3. Visit the [official frame debugger](https://warpcast.com/~/developers/frames) and paste in your tunnel's domain name.
