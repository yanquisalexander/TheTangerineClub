import type { APIRoute } from "astro";

import galleryInfo from '@/data/gallery-meta.json'

export const prerender = true

export const GET: APIRoute = ({ request }) => {
    const { url } = request
    const searchParams = new URL(url).searchParams

    const offset = Number(searchParams.get('offset') ?? '0')

    const data = galleryInfo.slice(offset, offset + 10)

    return new Response(JSON.stringify(data), {
        headers: {
            'content-type': 'application/json',
        },
    })
}