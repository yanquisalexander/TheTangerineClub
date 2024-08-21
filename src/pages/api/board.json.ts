import { addToTangerineBoard } from "@/utils/tangerine-board";
import type { APIContext } from "astro";
import { getSession } from "auth-astro/server";

export const POST = async ({ request }: APIContext) => {
    const session = await getSession(request)

    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const { message } = await request.json()

    try {
        await addToTangerineBoard({
            userId: session?.user?.id as string,
            message,
        })

        return new Response('Success', { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response('Internal Server Error', { status: 500 })
    }
}