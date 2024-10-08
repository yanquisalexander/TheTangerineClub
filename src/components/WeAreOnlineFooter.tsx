import { $ } from "@/lib/dom-selector";
import { useEffect, useState } from "preact/hooks";

export const WeAreOnlineFooter = () => {
    const [isOnline, setIsOnline] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [closedManually, setClosedManually] = useState(false);

    useEffect(() => {
        const $liveNow = $("[data-tangerine-live-now]");
        if (closedManually) return;

        if ($liveNow) {
            setIsOnline(true);

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        setShowFooter(!entry.isIntersecting);
                    });
                },
                { threshold: 0.2 }
            );

            observer.observe($liveNow);

            return () => {
                observer.disconnect();
            };
        } else {
            fetch('https://midudev-apis.midudev.workers.dev/uptime/thetangerineclub')
                .then((res) => res.json())
                .then(({ online }) => {
                    setIsOnline(online);
                    setShowFooter(online);
                })
                .catch(console.error); // Added error handling
        }
    }, [currentPath, closedManually]);

    useEffect(() => {
        const handlePageLoad = () => {
            setCurrentPath(window.location.pathname);
        };

        document.addEventListener('astro:page-load', handlePageLoad);

        return () => {
            document.removeEventListener('astro:page-load', handlePageLoad);
        };
    }, []);

    return (
        <footer
            class={`fixed bg-electric-violet-800 bottom-0 left-0 right-0 font-medium text-white py-4 px-4 text-center transition-all z-[10001] ${showFooter ? 'translate-y-0' : 'translate-y-full'}`}
        >
            {isOnline && (
                <>
                    <p class="flex items-center justify-center gap-x-2">
                        <svg x="0" y="0" viewBox="0 0 2400 2800" height="24" width="28" xmlSpace="preserve">
                            <path fill="#fff" d="M2200 1300l-400 400h-400l-350 350v-350H600V200h1600z"></path>
                            <g>
                                <path fill="#9146ff" d="M500 0L0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300l-400 400h-400l-350 350v-350H600V200h1600v1100z"></path>
                                <path fill="#9146ff" d="M1700 550h200v600h-200zM1150 550h200v600h-200z"></path>
                            </g>
                        </svg>

                        We are live now!{" "}
                        <a href="https://twitch.tv/thetangerineclub" class="underline" target="_blank" rel="noopener noreferrer">
                            Watch now
                        </a>
                    </p>
                    <button
                        aria-label="Close live now footer"
                        onClick={() => {
                            setShowFooter(false);
                            setClosedManually(true);
                        }}
                        class="absolute top-0 right-0 p-2 text-white size-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
                        </svg>
                    </button>
                </>
            )}
        </footer>
    );
};
