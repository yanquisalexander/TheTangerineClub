import { imageMeta } from 'image-meta';
import { join } from 'node:path';
import { promises as fs } from 'node:fs';
import glob from 'fast-glob'; // Use fast-glob for file matching

const meta: { height: number; width: number }[] = [];

async function generateMeta() {
    const files = await glob('public/images/gallery/*.webp'); // Get list of files using fast-glob
    console.log(`Found ${files.length} files`);

    for (const file of files) {
        // Convert file to arraybuffer (node)
        const buffer = await fs.readFile(file);
        const { height = 0, width = 0 } = imageMeta(buffer);

        meta.push({ height, width });
    }

    const outputPath = join(process.cwd(), 'src/data/gallery-meta.json');
    await fs.writeFile(outputPath, JSON.stringify(meta, null, 2));
    console.log(`Wrote ${outputPath}`);
}

generateMeta().catch((err) => console.error(err));
