import { db, MemberCards, User, eq } from "astro:db"

export const ADMINS = import.meta.env.ADMIN_USERNAMES?.split(',') || []

export const isAdmin = (username: string) => ADMINS.includes(username)

/* 
    Admins can approve messages on the Tangerine Board
*/

export const createOrUpdateUser = async ({ id, username, displayName, twitchTier, avatar }: { id: string, username: string, displayName: string, twitchTier: number, avatar: string }) => {
    try {
        await db.insert(User).values({
            id,
            username,
            displayName,
            avatar,
            twitchTier
        }).onConflictDoUpdate({
            target: [User.id],
            set: {
                username,
                displayName,
                avatar,
                twitchTier
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const getMemberCardData = async (memberId: number) => {
    const card = await db.select()
        .from(MemberCards)
        .where(eq(MemberCards.userId, memberId.toString()))
        .innerJoin(User, eq(User.id, MemberCards.userId))
        .limit(1)

    if (card.length === 0) {
        return null
    }

    return card[0]
}

export const updateStickers = async (memberId: number, stickers: string[]) => {
    try {
        await db.insert(MemberCards).values({
            userId: memberId.toString(),
            stickers,
        }).onConflictDoUpdate({
            target: [MemberCards.userId],
            set: {
                stickers,
                updatedAt: new Date()
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