import type WaveSurfer from "wavesurfer.js";

interface CurrentMetadata {
    title: string;
    artist: string;
    artwork?: string;
}

export const updateSessionMetadata = (metadata: CurrentMetadata, wavesurfer: WaveSurfer) => {
    if ("mediaSession" in navigator) {
        const { mediaSession } = navigator;
        const { title, artist } = metadata;
        mediaSession.metadata = new MediaMetadata({
            title,
            artist,
            artwork: [
                { src: metadata?.artwork || "/images/ttcLogo.webp", sizes: "512x512", type: "image/webp" },
            ]
        });

        mediaSession.setActionHandler("play", () => {
            wavesurfer.play();
            mediaSession.playbackState = "playing";
        });

        mediaSession.setActionHandler("pause", () => {
            wavesurfer.pause();
            mediaSession.playbackState = "paused";
        });

        console.log("Media session metadata updated");
    }
}
