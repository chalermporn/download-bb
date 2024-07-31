const fs = require('fs');
const path = require('path');

// Specify the folder path containing the MP3 files
const folderPath = './demo';

// Read the files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Filter out only the MP3 files
  const mp3Files = files.filter(file => file.endsWith('.mp3'));

  // Rename each MP3 file
  mp3Files.forEach((file, index) => {
    const oldFilePath = path.join(folderPath, file);
    const newFileName = `new_name_${index + 1}.mp3`; // You can customize the new file name here
    const newFilePath = path.join(folderPath, newFileName);

    // Rename the file
    fs.rename(oldFilePath, newFilePath, err => {
      if (err) {
        console.error(`Error renaming file ${file}:`, err);
      } else {
        console.log(`File ${file} renamed to ${newFileName}`);
      }
    });
  });
});
