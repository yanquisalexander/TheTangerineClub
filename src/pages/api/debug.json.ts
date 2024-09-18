import type { APIRoute } from "astro";

export const GET: APIRoute = async ({request}) => {
    const CLOUDFLARE_HEADERS = [
        'cf-ray',
        'cf-connecting-ip',
        'cf-ipcountry',
        'cf-visitor',
        'cf-request-id',
        'cf-worker',
        'cf-device-type',
        'cf-ew-via',
        'cf-cache-status'
    ]

    const headers = Object.fromEntries([...request.headers.entries()].filter(([key]) => CLOUDFLARE_HEADERS.includes(key)))

    return new Response(JSON.stringify(headers, null, 2), {
        headers: {
            'content-type': 'application/json'
        }
    })
}