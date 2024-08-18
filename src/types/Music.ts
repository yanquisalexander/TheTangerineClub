export interface Music {
    id: string;
    title: string;
    releaseDate: string;
    moreInfo?: string;
    hasLyrics?: boolean;
    artistNotes?: {
        title: string;
        description: string;
    }[],
    streamingLinks?: {
        spotify?: string;
        appleMusic?: string;
        youtube?: string;
    };
}