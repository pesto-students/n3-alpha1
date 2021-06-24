// todo: refactor into models
const { db } = require('../models/products.json');

const allProducts = [...db.men, ...db.women];
const GENDERMAP = {
  ALL: 'both',
  MEN: 'men',
  WOMEN: 'women',
};
const BRANDS_MAP = {
  ALL: 'ALL BRANDS',
}; allProducts.forEach((p) => {
  if (p.brand?.name) BRANDS_MAP[p.brand?.name] = p.brand?.name;
});
const SIZES_MAP = {
  ALL: 'ANY',
  XXS: 'XXS',
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XXL',
  XXL: 'XXXL',
};
const CLOTHING_CATEGORIES_MAP = {
  ALL: 'ALL CLOTHING',
}; allProducts.forEach((p) => {
  if (p.clothingCategory) BRANDS_MAP[p.clothingCategory] = p.clothingCategory;
});

exports.getSettings = async (req, res) => {
  res.json({
    success: true,
    listData: {
      gender: GENDERMAP,
      clothingCategory: CLOTHING_CATEGORIES_MAP,
      size: SIZES_MAP,
      brand: BRANDS_MAP,
      cities: ['Mumbai', 'Pune', 'Kolkata', 'Delhi'],
      states: [
        {
          name: 'Maharashtra',
          cities: ['Mumbai', 'Pune'],
        },
        {
          name: 'Delhi',
          cities: ['Delhi'],
        },
        {
          name: 'West Bengal',
          cities: ['Kolkata'],
        },
      ],
    },
    availablePincodes: [
      '400[0-9][0-9][0-9]',
      '500[0-9][0-9][0-9]',
    ],
  });
};
