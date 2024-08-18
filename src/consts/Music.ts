import type { Music } from "@/types/Music";

const convertDate = (day: number, month: number, year: number) => new Date(year, month - 1, day).toISOString();

export const MUSICS: Music[] = [
    {
        id: 'flowers-of-september',
        title: 'Flowers of September',
        releaseDate: convertDate(1, 3, 2020),
        hasLyrics: true,
    },
    {
        id: 'disarm',
        title: 'Disarm',
        releaseDate: convertDate(10, 10, 2020),
    },
    {
        id: 'seasons',
        title: 'Seasons',
        releaseDate: convertDate(14, 2, 2021),
    },
    {
        id: 'last-train',
        title: 'Last Train',
        releaseDate: convertDate(5, 3, 2021),
    },
    {
        id: 'colored-hats',
        title: 'Colored Hats',
        releaseDate: convertDate(5, 3, 2021),
    }
]