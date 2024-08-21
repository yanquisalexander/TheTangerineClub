import { db, desc, TangerineBoard, eq, not, isNotNull, User } from "astro:db"

export const getTangerineBoard = async () => {
    const results = await db.select()
        .from(TangerineBoard)
        .orderBy(desc(TangerineBoard.id))
    return results
}

export const addToTangerineBoard = async ({ userId, message }: { userId: string, message: string }) => {
    try {
        await db.insert(TangerineBoard).values({
            userId,
            message,
            approvedAt: null
        }).onConflictDoUpdate({
            target: [TangerineBoard.userId],
            set: {
                message,
                approvedAt: null // Reset the approvedAt field
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const approveTangerineBoard = async ({ id }: { id: number }) => {
    try {
        await db.update(TangerineBoard)
            .set({
                approvedAt: new Date()
            })
            .where(eq(TangerineBoard.id, id))
    } catch (error) {
        console.error(error)
    }
}

export const deleteFromTangerineBoard = async ({ id }: { id: number }) => {
    try {
        await db.delete(TangerineBoard)
            .where(eq(TangerineBoard.id, id))
    } catch (error) {
        console.error(error)
    }
}

export const getApprovedTangerineBoard = async () => {
    const results = await db.select()
        .from(TangerineBoard)
        .where(isNotNull(TangerineBoard.approvedAt))
        .orderBy(desc(TangerineBoard.id))
        .innerJoin(User, eq(TangerineBoard.userId, User.id))
    return results
}

export const getUnapprovedTangerineBoard = async () => {
    const results = await db.select()
        .from(TangerineBoard)
        .where(not(isNotNull(TangerineBoard.approvedAt)))
        .orderBy(desc(TangerineBoard.id))
        .innerJoin(User, eq(TangerineBoard.userId, User.id))

    return results
}

export const updateMessage = async ({ id, message }: { id: number, message: string }) => {
    try {
        await db.update(TangerineBoard)
            .set({
                message
            })
            .where(eq(TangerineBoard.id, id))
    } catch (error) {
        console.error(error)
    }
}