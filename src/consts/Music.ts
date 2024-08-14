import type { Music } from "@/types/Music";

export const MUSICS: Music[] = [
    {
        id: 'flowers-of-september',
        title: 'Flowers of September',
        releaseDate: new Date(2020, 2, 1).toISOString(),
        hasLyrics: true,
    },
    {
        id: 'disarm',
        title: 'Disarm',
        releaseDate: new Date(2020, 9, 10).toISOString(),
    }
]