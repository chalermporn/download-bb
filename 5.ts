import * as fs from 'fs';
import * as mm from 'music-metadata';

async function editMP3Metadata(filePath: string, newMetadata: mm.IAudioMetadata): Promise<void> {
    try {
        const metadata = await mm.parseFile(filePath, { native: true });

        // Modify metadata properties as needed
        metadata.common.title = newMetadata.title || metadata.common.title;
        metadata.common.artist = newMetadata.artist || metadata.common.artist;
        // Add more properties as needed

        // Save the updated metadata back to the file
        const updatedFileBuffer = mm.write(metadata, { keepEverything: true });
        fs.writeFileSync(filePath, updatedFileBuffer);
        console.log(`Metadata for ${filePath} updated successfully.`);
    } catch (error) {
        console.error(`Error updating metadata for ${filePath}: ${error.message}`);
    }
}


async function processMP3Folder(folderPath: string): Promise<void> {
    try {
        const files = fs.readdirSync(folderPath);
        const mp3Files = files.filter(file => file.endsWith('.mp3'));

        for (const mp3File of mp3Files) {
            const filePath:any = `${folderPath}/${mp3File}`;
            // Define your new metadata here
            const newMetadata:any = {
                title: 'New Title',
                artist: 'New Artist',
                // Add more properties as needed
            };
            console.log(mp3File);

            // await editMP3Metadata(filePath, newMetadata);
        }
    } catch (error) {
        console.error(`Error reading folder ${folderPath}: ${error.message}`);
    }
}

// Example usage
const folderPath = './demo';
processMP3Folder(folderPath);
