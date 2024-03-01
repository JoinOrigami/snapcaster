type Payload = Record<string, unknown>;

export default async function api<T = unknown, P = Payload>(
  method: RequestInit["method"],
  path: string,
  payload?: P,
  headers?: Record<string, string>
): Promise<T> {
  let baseUrl = "/api";

  // When using SSR, reach API through docker hostname
  // in development and BASE_URL in production
  if (typeof window === "undefined") {
    baseUrl = process.env.NODE_ENV === "development" ?
      "http://server:3001" :
      `${process.env.BASE_URL}/api`;
  }

  let url = `${baseUrl}${path}`;
  const opts: RequestInit = {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
    },
  };

  if (method === "GET" && payload) {
    url += `?${new URLSearchParams(payload as Record<string, string>)}`;
  } else if (payload) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(payload);
  }

  const res = await fetch(url, opts);
  if (!res.ok) {
    throw new Error(`API call failed ${url}: ${await res.text()}`);
  }
  return await res.json();
}
