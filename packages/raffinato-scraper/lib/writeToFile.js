import fs from 'fs';

const writeTofile = async (data) => {
  console.log('Writing to file...');

  const json = JSON.stringify(data);

  await fs.writeFile('data.json', json, () => {
    console.log('\n successfully written...');
  });
};

export default writeTofile;
