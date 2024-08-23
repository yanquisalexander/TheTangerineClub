import type { Session } from "@auth/core/types";
import { Container3D } from "./Container3D";
import { MemberCard } from "./MemberCard";
import { STICKERS } from "@/consts/Stickers";
import { useState } from "preact/hooks";

export const MyMemberCard = ({ session, stickers = [] }: { session: Session, stickers: string[] }) => {
    const [tier, setTier] = useState(3);

    const [selectedStickers, setSelectedStickers] = useState(() => {
        const stickersList = new Array(3).fill(null)
        stickers.forEach((sticker, index) => {
            stickersList[index] = sticker
        })
        return {
            limit: tier,
            list: stickersList,
        }
    })

    const updateStickers = async (newStickers: string[]) => {
        const stickersList = new Array(3).fill(null)
        newStickers.forEach((sticker, index) => {
            stickersList[index] = sticker
        })

        const response = await fetch(`/api/stickers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stickers: newStickers,
            }),
        })

        if (!response.ok) {
            console.error('Failed to update stickers')
            return
        }
    }



    const handleSelectSticker = async (selectedSticker: string) => {
        const newStickers = selectedStickers.list
        // If sticker is already selected, return
        if (newStickers.includes(selectedSticker)) return
        // Find the first empty slot
        const index = newStickers.findIndex((sticker) => sticker === null)
        // If no empty slot is found, return
        if (index === -1) return
        newStickers[index] = selectedSticker
        setSelectedStickers({
            limit: selectedStickers.limit,
            list: newStickers,
        })

        updateStickers(newStickers)
    }


    const handleRemoveSticker = async (index: number) => {
        const newStickers = selectedStickers.list
        newStickers[index] = null
        setSelectedStickers({
            limit: selectedStickers.limit,
            list: newStickers,
        })

        updateStickers(newStickers)
    }



    return (
        <>
            <div>
                <div class="w-auto">
                    <Container3D>
                        <MemberCard
                            className="max-w-[400px] md:max-w-[700px] mx-auto"
                            number={parseInt(session?.user?.id as string)}
                            selectedStickers={selectedStickers}
                            handleRemoveSticker={handleRemoveSticker}
                            user={{
                                avatar: session?.user?.image,
                                username: session?.user?.name,
                            }}
                        />
                    </Container3D>
                    <div class="w-2/3 mx-auto h-6 rounded-[50%] mt-6 transition-colors duration-300 blur-xl bg-[#e98354]"></div>
                </div>
                <div class="flex flex-col items-center w-full px-8 mt-16 mb-16 gap-x-10 gap-y-4 lg:mb-0 lg:mt-4 md:flex-row">
                    <button
                        type="button"
                        class="flex items-center cursor-pointer gap-2 rounded-lg text-white px-3 py-[10px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-midu-primary/40 bg-[#121226] hover:bg-[#1A1A2E] hover:border-midu-primary/60"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4 mr-2"
                            width="1200"
                            height="1227"
                            fill="none"
                            viewBox="0 0 1200 1227"
                        >
                            <path
                                fill="#fff"
                                d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                            ></path>
                        </svg>
                        Compartir
                    </button>
                    <a
                        download=""
                        class="flex items-center cursor-pointer gap-2 rounded-lg text-white px-3 py-[10px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-midu-primary/40 bg-[#121226] hover:bg-[#1A1A2E] hover:border-midu-primary/60"
                    >
                        <svg
                            width="30"
                            height="31"
                            viewBox="0 0 30 31"
                            fill="none"
                            class="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_90_2554)">
                                <path
                                    d="M5 21.75V24.25C5 24.913 5.26339 25.5489 5.73223 26.0178C6.20107 26.4866 6.83696 26.75 7.5 26.75H22.5C23.163 26.75 23.7989 26.4866 24.2678 26.0178C24.7366 25.5489 25 24.913 25 24.25V21.75"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M8.75 14.25L15 20.5L21.25 14.25"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M15 5.5V20.5"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_90_2554">
                                    <rect
                                        width="30"
                                        height="30"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                    ></rect>
                                </clipPath>
                            </defs>
                        </svg>
                        Guardar
                    </a>
                </div>
            </div>
            <div class="w-full md:order-none">
                <div>
                    <h2 class="mt-10 text-2xl font-bold text-white lg:pl-8">
                        Stickers
                        <div></div>
                    </h2>
                    <div
                        class="flex flex-row w-full p-8 max-h-[30rem] overflow-x-auto text-center flex-nowrap md:flex-wrap gap-x-8 gap-y-12 lg:pb-20 hidden-scroll h-40 relative"
                        style="mask-image:linear-gradient(to top, transparent, #000 40%)"
                    >
                        {
                            STICKERS.map(({ id }) => (
                                <button class="" onClick={() => handleSelectSticker(id)}>
                                    <div class="flex items-center justify-center w-12 h-12 transition-all cursor-pointer hover:scale-125">
                                        <img class="w-auto h-12" src={`/images/stickers/${id}.webp`} alt="" />
                                    </div>
                                </button>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    );
};
