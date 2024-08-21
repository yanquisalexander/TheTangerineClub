import { indexUrl } from "@/utils/googleIndexingApi";
import type { APIContext } from "astro";

export const GET = async ({ request }: APIContext) => {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const { secret, path } = Object.fromEntries(params);
    if (import.meta.env.SECRET_KEY !== secret) {
        return new Response("The secret key is invalid", { status: 401 });
    }

    if (!path) {
        return new Response("The path is required", { status: 400 });
    }

    const fullUrl = new URL(path, import.meta.env.SITE).toString();

    try {
        const result = await indexUrl(fullUrl);
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response((error as Error).message, { status: 500 });
    }
}