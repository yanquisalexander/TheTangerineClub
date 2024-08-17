import { join, dirname, extname } from 'node:path';
import { promises as fs } from 'node:fs';
import sharp from 'sharp';
import { rm } from 'node:fs/promises';
import glob from 'fast-glob'; // Use fast-glob for file matching

const files = await glob('public/images/gallery/*.{jpg,jpeg,png}');

const shouldRemove = (str: string = '') => str.toLowerCase().startsWith('rm');
const remove = shouldRemove(process.argv[2]?.toLowerCase());

for (let index = 0; index < files.length; index++) {
    const file = files[index];
    console.info(`Optimizing ${file}`);

    // Renombrar a img-index.webp
    const newFileName = `img-${index + 1}.webp`;
    const newFilePath = join(dirname(file), newFileName);

    const convert = await sharp(file)
        .metadata()
        .then(({ width, height }) => {
            const PERCENTAGE = 0.20;
            const newWidth = Math.round((width || 0) * PERCENTAGE);
            const newHeight = Math.round((height || 0) * PERCENTAGE);
            console.info(`Resizing to ${PERCENTAGE * 100}% of original size: width=${newWidth}, height=${newHeight}`);
            return sharp(file).resize(newWidth, newHeight).webp({
                lossless: true,
                quality: 100,
            });
        });

    await convert.toFile(newFilePath);
    console.info(`Wrote ${newFilePath}`);

    if (remove) {
        await rm(file, { force: true });
        console.info(`Removed ${file}`);
    }
}
