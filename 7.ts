import * as fs from 'fs';

import path from 'path';
import { Extract } from 'unzipper';
const folderPath = "./demo";

(async () => {
    const files = fs.readdirSync(folderPath);
    const zipFiles = files.filter(file => file.endsWith('.zip'));

    console.log(zipFiles);
    zipFiles.forEach(async (file, index) => {
        const oldFilePath = path.join(folderPath, file);
        const r_newFileName = file.replace(/\.zip$/, "");


        const destinationFolder = path.join(folderPath, r_newFileName);
        console.log(index, file, r_newFileName, destinationFolder);

        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder);
        }


        const stream = fs.createReadStream(oldFilePath)
            .pipe(Extract({ path: destinationFolder }));

        stream.on('finish', () => {
            console.log('Extraction complete');
        });


    });
}
)();