
import MiduAnimations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				mdx: "900px",
			},
			fontFamily: {
				manrope: ["Manrope Variable", "sans-serif"],
				atomic: ["Atomic Marker", "cursive"],
				"atomic-extras": ["Atomic Marker Extras", "cursive"],
			},
			colors: {
				'electric-violet': {
					'50': '#f6f2ff',
					'100': '#eee8ff',
					'200': '#dfd4ff',
					'300': '#cab1ff',
					'400': '#b085ff',
					'500': '#9146ff',
					'600': '#8d30f7',
					'700': '#7f1ee3',
					'800': '#6a18bf',
					'900': '#57169c',
					'950': '#370b6a',
				},
			}
		},
	},
	plugins: [
		MiduAnimations,
	],
}
