import dotenv from 'dotenv';

import axios from 'axios';
import scrapeImageByCategory from './lib/scrapeImage';
import writeTofile from './lib/writeToFile';

dotenv.config();

const productsData = {
  db: {
    men: [],
    women: [],
  },
};

const { PRODUCTS_BASE_URL = 'https://www.farfetch.com/in/plpslice/listing-api/products-facets' } = process.env;

// gender: Men | Women
const clothesAPI = (pageNum, gender) => `${PRODUCTS_BASE_URL}?page=${pageNum}&view=100&gender=${gender}&pricetype=FullPrice&c-category=136330`;

const addData = (gender, data) => {
  const lowerCasedGender = gender.toLowerCase();
  productsData.db[lowerCasedGender] = [...productsData.db[lowerCasedGender], ...data];
};

const getData = (pageNum, gender) => new Promise((resolve, reject) => {
  axios
    .get(clothesAPI(pageNum, gender))
    .then((response) => {
      const { items } = response.data.listingItems;

      addData(gender, items);
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

const scrapeImages = async () => {
  const sanitizedProductsMen = await scrapeImageByCategory(productsData, 'men');
  const sanitizedProductsWomen = await scrapeImageByCategory(productsData, 'women');

  return {
    db: {
      men: sanitizedProductsMen,
      women: sanitizedProductsWomen,
    },
  };
};

const main = async () => {
  // get data
  try {
    await getData(1, 'Men');
    await getData(2, 'Men');

    await getData(1, 'Women');
    await getData(2, 'Women');
  } catch (e) {
    console.log('stopped...\n');
    console.log(e);
  }

  try {
    // scrape gallery images
    const sanitizeJSON = await scrapeImages();
    await writeTofile(sanitizeJSON);
  } catch (e) {
    console.log(e, 'Errored Out');
  }
};

main();
