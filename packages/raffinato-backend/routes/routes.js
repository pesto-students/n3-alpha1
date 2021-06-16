const express = require('express');

const router = express.Router();
// const base58 = require('../controllers/base58');
const productController = require('../controllers/productController');

// error handlers
const { catchErrors } = require('../handlers/errorHandlers');

// router.get('/', catchErrors(productController.landing));

router.get('/api/v1/products', catchErrors(productController.getProducts));

module.exports = router;
