export interface Music {
    id: string;
    title: string;
    releaseDate: string;
    moreInfo?: string;
    artistNotes?: {
        title: string;
        description: string;
    }[]
}