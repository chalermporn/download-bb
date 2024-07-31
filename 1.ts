import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as AdmZip from 'adm-zip';

const dataList = [
    {
        "id": 22,
        "name": "เพลงซาโลมอน",
        "url": "http://audio1.wordfree.net/bibles/app/audio/18_22.zip"
    },
    {
        "id": 23,
        "name": "อิสยาห์",
        "url": "http://audio1.wordfree.net/bibles/app/audio/18_23.zip"
    }
];

const downloadFolder = path.join(__dirname, 'download');

async function downloadAndRename(): Promise<void> {
    for (const data of dataList) {
        try {
            const response = await axios.get(data.url, { responseType: 'arraybuffer' });
            
            // Ensure the download folder exists
            if (!fs.existsSync(downloadFolder)) {
                fs.mkdirSync(downloadFolder);
            }

            // Save the downloaded zip file with the original name in the "download" folder
            const filePath = path.join(downloadFolder, `${data.name}.zip`);
            fs.writeFileSync(filePath, response.data);

            // Extract the contents of the zip file to the same "download" folder
            const zip = new AdmZip();
            zip.addFile(`${data.name}.zip`, response.data);
            zip.extractAllTo(downloadFolder, true);

            console.log(`Downloaded and extracted: ${data.name}`);
        } catch (error) {
            console.error(`Error downloading or extracting ${data.name}: ${error.message}`);
        }
    }
}

// Call the function to start the download and extraction process
downloadAndRename();
