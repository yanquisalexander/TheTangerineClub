export interface Song {
    id?: number;
    title?: string;
    artist?: string;
    active?: boolean;
    minAmount?: number;
    createdAt?: Date;
    lastPlayed?: Date;
    timesPlayed?: number;
    numQueued?: number;
    attributeIds?: number[];
}
