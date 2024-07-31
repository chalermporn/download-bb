const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

const zipFilePath = 'demo/1-ปฐมกาล.zip';
const extractFolder = 'unzip';

// Create the extract folder if it doesn't exist
if (!fs.existsSync(extractFolder)) {
  fs.mkdirSync(extractFolder);
}

// Use unzipper to extract files
fs.createReadStream(zipFilePath)
  .pipe(unzipper.Extract({ path: extractFolder }))
  .on('finish', () => {
    console.log('Extraction complete!');
  })
  .on('error', (err) => {
    console.error('Error extracting zip file:', err);
  });
