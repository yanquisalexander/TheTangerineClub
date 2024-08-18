import type { APIRoute } from 'astro';

export const prerender = true;

const robotsTxt = `
User-agent: *
Allow: /

# Host 
Host: ${new URL(import.meta.env.SITE).host}

# Sitemaps
Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};