import type { APIContext } from "astro";

export const GET = async ({ request }: APIContext) => {
    const url = new URL(request.url);
    return new Response(`User-agent: *
Allow: /

Host: ${url.hostname}

        `, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}