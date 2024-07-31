import { parseFile } from 'music-metadata';
import * as fs from 'fs';

import path from 'path';

const folderPath = "./demo";

(async () => {
    const files = fs.readdirSync(folderPath);
    const mp3Files = files.filter(file => file.endsWith('.mp3'));

    console.log(mp3Files);
    mp3Files.forEach(async (file, index) => {
        const oldFilePath = path.join(folderPath, file);
        const { common } = await parseFile(`./demo/${file}`);
        const newFileName = `${common.title}.mp3`; // You can customize the new file name here
        const r_newFileName = newFileName.replace(/^Bible_th_(\d+_)/, "$1");
        const newFilePath = path.join(folderPath, r_newFileName);

        console.log(oldFilePath, newFilePath);

        // Rename the file
        fs.rename(oldFilePath, newFilePath, err => {
            if (err) {
                console.error(`Error renaming file ${file}:`, err);
            } else {
                console.log(`File ${file} renamed to ${newFileName}`);
            }
        });
    });
}
)();