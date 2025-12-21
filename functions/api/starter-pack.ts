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
    // Collect client metadata from Cloudflare
    const clientIp = request.headers.get("cf-connecting-ip") || "";
    const clientCountry = request.headers.get("cf-ipcountry") || "";
    // @ts-ignore - request.cf is Cloudflare-specific runtime property
    const clientTimezone = request.cf?.timezone || null;

    const contentType = request.headers.get("Content-Type") || "";
    let bodyToSend: ArrayBuffer | string;

    // If JSON request, inject client metadata into body
    if (contentType.includes("application/json")) {
      const payload = await request.json();
      payload.__client = {
        ip: clientIp,
        country: clientCountry,
        timezone: clientTimezone,
        ua: request.headers.get("user-agent") || null,
        lang: request.headers.get("accept-language") || null,
        origin: request.headers.get("origin") || null,
        referer: request.headers.get("referer") || null,
        secChUa: request.headers.get("sec-ch-ua") || null,
        secChUaPlatform: request.headers.get("sec-ch-ua-platform") || null,
        secChUaMobile: request.headers.get("sec-ch-ua-mobile") || null,
        saveData: request.headers.get("save-data") || null,
      };
      bodyToSend = JSON.stringify(payload);
    } else {
      // Non-JSON request, pass through as-is
      bodyToSend = await request.arrayBuffer();
    }

    const upstream = await fetch(env.N8N_STARTER_PACK_URL, {
      method: "POST",
      headers: { "Content-Type": contentType || "application/json" },
      body: bodyToSend as any,
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
