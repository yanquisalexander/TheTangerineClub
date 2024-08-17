import { type HTMLAttributes } from 'react';

export type Masory<T> = T & { gap: string, maxcolwidth: string }

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['masonry-layout']: Masory<HTMLAttributes<HTMLDivElement>>
        }
    }
}