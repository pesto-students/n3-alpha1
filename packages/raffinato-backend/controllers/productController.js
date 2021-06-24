const { db } = require('../models/products.json');

const GENDERMAP = {
  MEN: 'men',
  WOMEN: 'women',
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 20;
const DEFAULT_GENDER = GENDERMAP.MEN;

exports.getProducts = async (req, res) => {
  const page = req.query.page || DEFAULT_PAGE;
  const limit = req.query.limit || DEFAULT_PAGE_LIMIT;
  const skip = (page * limit) - limit;

  const gender = req.query.gender || DEFAULT_GENDER;

  const paginatedProducts = db[gender].slice(skip, (page * limit));

  res.json({
    page,
    count: paginatedProducts.length,
    products: paginatedProducts,
  });
};
