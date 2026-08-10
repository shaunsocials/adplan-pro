const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: CORS_HEADERS,
    });
  }

  try {
    const body = await req.json();

    // Credentials are injected by Netlify AI Gateway at runtime.
    const baseUrl = process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com";

    const response = await fetch(`${baseUrl}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 4000,
        messages: body.messages,
      }),
    });

    const data = await response.json();

    return Response.json(data, {
      status: response.ok ? 200 : response.status,
      headers: CORS_HEADERS,
    });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500, headers: CORS_HEADERS },
    );
  }
};
