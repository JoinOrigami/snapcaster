type Payload = Record<string, unknown>;

export default async function api<T = unknown, P = Payload>(
  method: RequestInit["method"],
  path: string,
  payload?: P
): Promise<T> {
  let url = `/api${path}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const opts: RequestInit = {
    method,
    headers,
  };

  if (method === "GET" && payload) {
    url += `?${new URLSearchParams(payload as Record<string, string>)}`;
  } else if (payload) {
    headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(payload);
  }

  const res = await fetch(url, opts);
  if (!res.ok) {
    throw new Error(`API call failed ${url}: ${await res.text()}`);
  }
  return await res.json();
}
