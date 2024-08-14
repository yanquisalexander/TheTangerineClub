
import MiduAnimations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				manrope: ["Manrope Variable", "sans-serif"],
				atomic: ["Atomic Marker", "cursive"],
				"atomic-extras": ["Atomic Marker Extras", "cursive"],
			},
		},
	},
	plugins: [
		MiduAnimations,
	],
}
