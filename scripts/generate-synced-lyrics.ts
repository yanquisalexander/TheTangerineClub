import { MUSICS } from "@/consts/Music";
import { basename, extname } from 'node:path';
import { promises as fs } from 'node:fs';
import glob from 'fast-glob';
import { parse } from '@plussub/srt-vtt-parser';

async function generateSyncedLyrics() {
    // Obtener la lista de IDs de las músicas
    const musics = MUSICS.map(({ id }) => id);

    // Obtener los archivos .vtt
    const files = await glob('lyrics/*.vtt');
    console.log(`Found ${files.length} files\n`);

    // Procesar cada archivo
    const lyrics = await Promise.all(
        files.map(async (file) => {
            const fileName = basename(file, extname(file));

            // Si el nombre no coincide con un ID de música, omitir
            if (!musics.includes(fileName)) {
                console.log(`\n\nSkip ${file} because it doesn't match any music id\n\n`);
                return null;
            }

            console.log(`\n${file} matches music id ${fileName}. Processing...\n`);

            // Leer el archivo
            const buffer = await fs.readFile(file);
            const vtt = buffer.toString();

            // Parsear el contenido VTT
            const { entries } = parse(vtt);



            const syncedLyrics = entries.map(({ from, to, text }, index) => {
                const line = index + 1;
                const startTime = from;
                const endTime = to;

                return {
                    line,
                    start_time: startTime,
                    end_time: endTime,
                    text,
                };
            });

            const music = MUSICS.find(({ id }) => id === fileName);
            console.log(`Processed ${file} for music ${music ? music.title : 'Unknown'}\n\n`);


            return {
                id: fileName,
                syncedLyrics,
            };
        })
    );

    // Escribir el archivo JSON con las letras sincronizadas en la carpeta public/music/{id}.json

    await Promise.all(
        lyrics.map(async (lyric) => {
            if (!lyric?.syncedLyrics) return;

            const outputPath = `public/music/${lyric.id}.json`;
            await fs.writeFile(outputPath, JSON.stringify(lyric.syncedLyrics, null, 2));
            console.log(`Wrote ${outputPath}`);
        })
    );
}

// Ejecutar la función y manejar errores
generateSyncedLyrics().then((lyrics) => {
}).catch((err) => {
    console.error(err);
});
