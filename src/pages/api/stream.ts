import type { APIContext } from "astro";
//@ts-ignore
import twitch from 'twitch-m3u8'

export const GET = async ({ request }: APIContext) => {
    try {
        const stream = await twitch.getStream("thetangerineclub")

        const stream720p = stream.find((s: any) => s.resolution === '1280x720')
        const m3u8Response = await fetch(stream720p.url)

        return new Response(m3u8Response.body, {
            headers: {
                'Content-Type': 'application/vnd.apple.mpegurl',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}