/**
 * Cloudflare Pages Function - Starter Pack API Proxy
 *
 * Purpose:
 * - Proxy requests to n8n starter-pack webhook
 * - Avoid CORS issues
 * - Hide n8n webhook URL from frontend
 */

interface Env {
  N8N_STARTER_PACK_URL: string;
  ALLOWED_ORIGINS?: string;
  CLIENT_SECRET?: string;
}

function parseAllowedOrigins(envValue?: string): string[] {
  if (!envValue) return ["https://chien.callfoods.com", "http://localhost:5173", "http://localhost:5174"];
  return envValue.split(",").map(s => s.trim()).filter(Boolean);
}

function makeCorsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Client-Secret",
    "Vary": "Origin",
  };
}

/**
 * Handle OPTIONS preflight requests
 */
export const onRequestOptions: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get("Origin") || "";
  const allowed = parseAllowedOrigins(env.ALLOWED_ORIGINS);
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0];

  return new Response(null, {
    status: 204,
    headers: makeCorsHeaders(allowOrigin),
  });
};

/**
 * Handle POST requests - proxy to starter pack webhook
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.N8N_STARTER_PACK_URL) {
    return new Response(
      JSON.stringify({ error: "Server misconfiguration: Missing N8N_STARTER_PACK_URL" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const origin = request.headers.get("Origin") || "";
  const allowed = parseAllowedOrigins(env.ALLOWED_ORIGINS);
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0];

  if (env.CLIENT_SECRET) {
    const clientSecret = request.headers.get("X-Client-Secret");
    if (clientSecret !== env.CLIENT_SECRET) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            ...makeCorsHeaders(allowOrigin),
          },
        }
      );
    }
  }

  try {
    const body = await request.arrayBuffer();
    const contentType = request.headers.get("Content-Type") || "application/json";

    // Pass-through browser headers for analytics/telemetry
    const passThrough = [
      "user-agent",
      "accept-language",
      "origin",
      "referer",
      "sec-ch-ua",
      "sec-ch-ua-platform",
      "sec-ch-ua-mobile",
      "save-data",
    ];

    const headers = new Headers();
    headers.set("Content-Type", contentType);

    // Forward browser headers to n8n
    for (const h of passThrough) {
      const v = request.headers.get(h);
      if (v) headers.set(h, v);
    }

    // Forward real IP address (Cloudflare provides this)
    const cfIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (cfIp) headers.set("x-forwarded-for", cfIp);

    // Forward country code
    const cfCountry = request.headers.get("cf-ipcountry");
    if (cfCountry) headers.set("x-ip-country", cfCountry);

    // Forward timezone (if available from Cloudflare)
    // @ts-ignore - request.cf is Cloudflare-specific runtime property
    const tz = request.cf?.timezone;
    if (tz) headers.set("x-timezone", tz);

    const upstream = await fetch(env.N8N_STARTER_PACK_URL, {
      method: "POST",
      headers,
      body,
    });

    const respBody = await upstream.arrayBuffer();
    const respContentType = upstream.headers.get("Content-Type") || "application/json";

    return new Response(respBody, {
      status: upstream.status,
      headers: {
        "Content-Type": respContentType,
        ...makeCorsHeaders(allowOrigin),
      },
    });
  } catch (error) {
    console.error("starter-pack proxy error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to forward request to starter-pack",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 502,
        headers: {
          "Content-Type": "application/json",
          ...makeCorsHeaders(allowOrigin),
        },
      }
    );
  }
};
