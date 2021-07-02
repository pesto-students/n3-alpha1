import puppeteer from 'puppeteer';
import asyncPool from 'tiny-async-pool';

import download from './downloadFile';

const { PRODUCTS_BASE_URL = 'https://www.farfetch.com' } = process.env;

const scrapeImageByCategory = async (data, gender) => {
  const productsArray = [];

  await asyncPool(10, data.db[gender], async (item) => {
    if (!item.url) {
      return Promise.resolve();
    }

    const itemURL = `${PRODUCTS_BASE_URL}${item.url}`;
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    await page.goto(itemURL, { waitUntil: 'load', timeout: 0 });

    const imageAray = await page.evaluate(() => {
      const imageHrefArray = [];

      const imageRootSelector = document.querySelector('[data-test*="imagery"] > div')?.children;

      if (!(Symbol.iterator in Object(imageRootSelector))) {
        return [];
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const currentNodeItem of imageRootSelector) {
        const imageSrc = currentNodeItem.getElementsByTagName('img')[0].getAttribute('src').replace('/', '');

        imageHrefArray.push(imageSrc);
      }

      return imageHrefArray;
    });

    const imageArrayHq = imageAray?.map((img) => img?.replace(/_480.jpg/, '_1000.jpg'));

    await browser.close();

    if (imageAray.length) {
      productsArray.push({ ...item, imageCount: imageAray.length });
    }

    await Promise.all(imageAray?.map(async (imgSrc, index) => {
      await download(imgSrc, `${item.id}-${index}.jpg`);
    }));

    await Promise.all(imageArrayHq?.map(async (imgSrc, index) => {
      await download(imgSrc, `${item.id}-${index}-hq.jpg`);
    }));

    return null;
  });

  return productsArray;
};

export default scrapeImageByCategory;
