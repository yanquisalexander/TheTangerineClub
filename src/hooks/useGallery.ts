import { useState, useEffect, useRef } from 'react';
import photos from '@/data/gallery-meta.json';
import "@appnest/masonry-layout";
// @ts-ignore
import PhotoSwipeLightbox from "photoswipe/lightbox";

export const useGallery = () => {
    const offset = 10
    const first = useRef<HTMLAnchorElement>(null)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const init = async () => {

            const lightbox = new PhotoSwipeLightbox({
                gallery: "#gallery",
                children: "a",
                pswpModule: () => import("photoswipe"),
            })
            lightbox.init()
        }
        init()
    }, [])

    const LoadMore = async (e: MouseEvent) => {
        e.preventDefault()

        const res = await fetch("/api/gallery.json?offset=9")
        const images = await res.json()

        const html = images
            .map((img: any, index: number) => {
                const imgIndex = index + offset
                if (!first.current) return

                const clone = first.current.cloneNode(true) as HTMLElement
                if (!clone) return
                clone.setAttribute("data-pswp-width", img.width)
                clone.setAttribute("data-pswp-height", img.height)
                clone.setAttribute(
                    "href",
                    `/images/gallery/img-${imgIndex}.webp`
                )
                clone.classList.add("animate-fade-up")
                clone.classList.add("animate-delay-300")
                clone.classList.add("opacity-0")
                clone.querySelector("img:first-child")?.setAttribute(
                    "src",
                    `/images/gallery/img-${imgIndex}.webp`
                )

                return clone?.outerHTML
            })
            .join("")

        document.querySelector("#gallery")?.insertAdjacentHTML("beforeend", html)
        document.querySelector("masonry-layout")?.scheduleLayout()
        setIsExpanded(true)
    }

    return {
        first,
        isExpanded,
        photos,
        LoadMore
    }
}
