import { useState } from "preact/hooks"
import { Container3D } from "./Container3D"
import { MemberCard } from "./MemberCard"

export const SharedMemberCard = ({ stickers = [], number, avatar, username }: { stickers: string[], number: number, avatar: string, username: string }) => {
    const [selectedStickers, setSelectedStickers] = useState(() => {
        const stickersList = new Array(3).fill(null)
        stickers.forEach((sticker, index) => {
            stickersList[index] = sticker
        })
        return {
            limit: 3,
            list: stickersList,
        }
    })

    return (
        <Container3D>
            <MemberCard
                className="max-w-[400px] md:max-w-[700px] mx-auto"
                number={number}
                selectedStickers={selectedStickers}
                user={{
                    avatar,
                    username,
                }}
            />
        </Container3D>
    )
}