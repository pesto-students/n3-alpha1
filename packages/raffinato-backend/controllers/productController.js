/* eslint-disable max-len */
/* eslint-disable no-var */
const _ = require('lodash');
const { db } = require('../models/products.json');

const allProducts = [...db.men, ...db.women];
const GENDERMAP = {
  ALL: 'ALL',
  MEN: 'men',
  WOMEN: 'women',
};
const BRANDS_MAP = { ALL: 'ALL' };
const SIZES_MAP = { ALL: 'ALL' };
const CLOTHING_CATEGORIES_MAP = { ALL: 'ALL' };

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 20;
const DEFAULT_GENDER = GENDERMAP.MEN;
const DEFAULT_CLOTHING_CATEGORY = CLOTHING_CATEGORIES_MAP.ALL;
const DEFAULT_SIZE = SIZES_MAP.ALL;
const DEFAULT_BRAND = BRANDS_MAP.ALL;

exports.getProducts = async (req, res) => {
  // pagination params
  const page = req.query.page || DEFAULT_PAGE;
  const limit = req.query.limit || DEFAULT_PAGE_LIMIT;
  const skip = (page * limit) - limit;

  // filter params
  const gender = req.query.gender || DEFAULT_GENDER;
  const size = req.query.size || DEFAULT_SIZE;
  const clothingCategory = req.query.clothingCategory || DEFAULT_CLOTHING_CATEGORY;
  const brand = req.query.brand || DEFAULT_BRAND;

  // filter products
  const filteredProducts = [];
  allProducts.forEach((p) => {
    const genderMatch = gender === GENDERMAP.ALL || p.gender === gender;
    const sizeMatch = size === SIZES_MAP.ALL || (_.findIndex(p.availableSizes, (s) => s.size === size) >= 0);
    const clothingCategoryMatch = clothingCategory === CLOTHING_CATEGORIES_MAP.ALL || p.clothingCategory === clothingCategory;
    const brandMatch = brand === BRANDS_MAP.ALL || (p.brand && p.brand.name === brand);
    if (genderMatch && sizeMatch && clothingCategoryMatch && brandMatch) filteredProducts.push(p);
  });

  // return
  const paginatedProducts = filteredProducts.slice(skip, (page * limit));
  res.json({
    success: true,
    page,
    totalCounts: filteredProducts.length,
    products: paginatedProducts,
  });
};

exports.getProduct = async (req, res) => {
  const { productId } = req.query;
  var index = productId
    ? _.findIndex(allProducts, (p) => p.id === parseInt(productId, 10))
    : -1;
  if (index >= 0) {
    res.json({
      success: true,
      product: allProducts[index],
    });
  } else {
    res.json({
      error: true,
      message: 'Product not found',
    });
  }
};
