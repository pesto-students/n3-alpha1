// todo: refactor into models
const { db } = require('../models/products.json');

const allProducts = [...db.men, ...db.women];
const GENDERS = [
  { value: 'ALL', label: 'both' },
  { value: 'men', label: 'men' },
  { value: 'women', label: 'women' },
];
const BRANDS = [
  { value: 'ALL', label: 'all brands' },
];
const SIZES = [
  { value: 'ALL', label: 'any' },
  { value: 'XXS', label: 'xxs' },
  { value: 'XS', label: 'xs' },
  { value: 'S', label: 's' },
  { value: 'M', label: 'm' },
  { value: 'L', label: 'l' },
  { value: 'XL', label: 'xl' },
  { value: 'XXL', label: 'xxl' },
];
const CLOTHING_CATEGORIES = [
  { value: 'ALL', label: 'all clothing' },
];

// populated brands & clothing categories dynamically
allProducts.forEach((p) => {
  if (p.brand?.name) {
    BRANDS.push({
      value: p.brand?.name,
      label: p.brand?.name,
    });
  }
  if (p.clothingCategory) {
    BRANDS.push({
      value: p.clothingCategory,
      label: p.clothingCategory,
    });
  }
});

exports.getSettings = async (req, res) => {
  res.json({
    success: true,
    listData: {
      gender: GENDERS,
      clothingCategory: CLOTHING_CATEGORIES,
      size: SIZES,
      brand: BRANDS,
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
