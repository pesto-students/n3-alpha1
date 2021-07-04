import fs from 'fs';
import https from 'https';

const download = (url, destination) => new Promise((resolve) => {
  if (!url || !destination) {
    return;
  }

  const sanitizedURL = url.replace(/^https?:\/\//, '');
  const file = fs.createWriteStream(`pictures/${destination}`);

  https.get(sanitizedURL, (response) => {
    response.pipe(file);

    file.on('finish', () => {
      file.close(resolve(true));
    });
  }).on('error', (error) => {
    fs.unlinkSync(`pictures/${destination}`);
    console.log(error.message);
    resolve(true);
  });
});

export default download;
