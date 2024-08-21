import { db, User } from "astro:db"

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