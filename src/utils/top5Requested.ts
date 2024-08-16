import type { Song } from "@/types/Song";

export const getTop5Requested = async () => {
    const response = await fetch('https://api.streamersonglist.com/v1/streamers/2372/songs?size=5&current=0&showInactive=false&isNew=false&order=desc&type=timesPlayed');
    const { items }: { items: Song[] } = await response.json();
    return items;
}