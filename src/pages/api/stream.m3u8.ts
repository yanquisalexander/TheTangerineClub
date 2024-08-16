import type { APIContext } from "astro";
//@ts-ignore
import twitch from 'twitch-m3u8';

export const GET = async ({ request }: APIContext) => {
    try {
        const stream = await twitch.getStream("thetangerineclub");
        const streamUrl = stream[0].url;

        const streamData = await fetch(streamUrl);

        return new Response(await streamData.text(), {
            headers: {
                'Content-Type': 'application/vnd.apple.mpegurl',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
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
