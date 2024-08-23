import { updateStickers } from "@/utils/users";
import type { APIContext } from "astro";
import { getSession } from "auth-astro/server";


export const POST = async ({ request }: APIContext) => {
    const session = await getSession(request)

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { stickers } = body

    await updateStickers(parseInt(session.user?.id as string), stickers)

    return new Response('OK', { status: 200 })
}