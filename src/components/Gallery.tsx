import 'photoswipe/style.css';
import { useGallery } from "@/hooks/useGallery";
import '@/components/styles/gallery.css';
import { type Masory } from "@/types/Gallery";


export default function Galeria() {
    const { first, isExpanded, photos, LoadMore } = useGallery();

    return (
        <section className="max-w-6xl mx-auto py-20 px-20">
            <masonry-layout
                gap="24"
                maxcolwidth="320"
                className="lg:mx-auto mx-4 py-20"
                id="gallery"
            >
                {photos.map(({ height, width }, i) => (
                    <a
                        className="group rounded-xl hover:scale-105 hover:contrast-[110%] transition-all relative"
                        href={`/images/gallery/img-${i + 1}.webp`}
                        target="_blank"
                        key={`img-${i + 1}`}
                        style={{ aspectRatio: `${width}/${height}` }}
                        data-cropped="true"
                        data-pswp-width={width}
                        data-pswp-height={height}
                        ref={!first.current ? first : undefined}
                    >
                        <img
                            className="rounded-xl object-cover w-full h-auto"
                            loading="lazy"
                            style={{ aspectRatio: `${width}/${height}` }}
                            src={`/images/gallery/img-${i + 1}.webp`}
                            alt={`Image ${i + 1} of The Tangerine Club`}
                        />
                        <img
                            className="blur-md opacity-0 group-hover:opacity-100 absolute inset-0 transition contrast-150 -z-10 object-cover"
                            loading="lazy"
                            style={{ aspectRatio: `${width}/${height}` }}
                            src={`/images/gallery/img-${i + 1}.webp`}
                            alt={`Image ${i + 1} of The Tangerine Club with blur effect to make a shadow effect`}
                        />
                    </a>
                ))}
            </masonry-layout>

            {!isExpanded && (
                <div className="text-center mx-auto">
                    <button
                        // @ts-ignore
                        onClick={LoadMore}
                        className="bg-primary text-white px-4 py-2 rounded-md mt-4"
                    >
                        Load More
                    </button>
                </div>
            )}
        </section>
    );
}
