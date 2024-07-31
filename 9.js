const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

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

        // if (!fs.existsSync(destinationFolder)) {
        //     fs.mkdirSync(destinationFolder);
        // }


        fs.createReadStream(oldFilePath)
            .pipe(unzipper.Extract({ path: folderPath }))
            .on('finish', () => {
                console.log('Unzip complete.')

                // Step 2: Change Folder Name
                // const oldFolderPath1 = `${folderPath}/${index}`;
                // const newFolderPath1 = `${destinationFolder}`;
                // console.log(index, file, oldFolderPath1, newFolderPath1);

                // fs.renameSync(oldFolderPath1, newFolderPath1);
                // console.log('Folder renamed.');


            });


    });
}
)();