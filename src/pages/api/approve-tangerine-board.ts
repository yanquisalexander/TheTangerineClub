import { approveTangerineBoard } from "@/utils/tangerine-board";
import { isAdmin } from "@/utils/users";
import type { APIContext } from "astro";
import { getSession } from "auth-astro/server";

export const POST = async ({ request, params }: APIContext) => {
    const session = await getSession(request)

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    /* @ts-ignore */
    if (!isAdmin(session?.user?.name.toLowerCase())) {
        return new Response('Unauthorized', { status: 401 })
    }

    const url = new URL(request.url)
    const { id } = Object.fromEntries(url.searchParams)

    if (!id) {
        return new Response('Missing ID', { status: 400 })
    }

    try {
        await approveTangerineBoard({
            id: parseInt(id)
        })

        return new Response('Success', { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response('Internal Server Error', { status: 500 })
    }
}