import { db, MemberCards, User, eq } from "astro:db"

export const ADMINS = import.meta.env.ADMIN_USERNAMES?.split(',') || []

export const isAdmin = (username: string) => ADMINS.includes(username)

/* 
    Admins can approve messages on the Tangerine Board
*/

export const createOrUpdateUser = async ({ id, username, displayName, twitchTier }: { id: string, username: string, displayName: string, twitchTier: number }) => {
    try {
        await db.insert(User).values({
            id,
            username,
            displayName,
            twitchTier
        }).onConflictDoUpdate({
            target: [User.id],
            set: {
                username,
                displayName,
                twitchTier
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const getMemberCardData = async (memberId: number) => {
    const card = await db.select().from(MemberCards).where(eq(MemberCards.userId, memberId.toString())).limit(1)

    if (card.length === 0) {
        return null
    }

    return card[0]
}

export const updateStickers = async (memberId: number, stickers: string[]) => {
    try {
        await db.insert(MemberCards).values({
            userId: memberId.toString(),
            stickers
        }).onConflictDoUpdate({
            target: [MemberCards.userId],
            set: {
                stickers
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const getUserTier = async (userId: string) => {
    const user = await db.select({ twitchTier: User.twitchTier }).from(User).where(eq(User.id, userId)).limit(1)

    if (user.length === 0) {
        return null
    }

    return user[0].twitchTier
}