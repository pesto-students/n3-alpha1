const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const commonController = require('../controllers/commonController');
const userController = require('../controllers/userController');

// error handlers
const { catchErrors } = require('../handlers/errorHandlers');

// router.get('/', catchErrors(productController.landing));

router.get('/api/v1/products', catchErrors(productController.getProducts));
router.get('/api/v1/product', catchErrors(productController.getProduct));
router.get('/api/v1/settings', catchErrors(commonController.getSettings));
router.get('/api/v1/getAddress', catchErrors(userController.getAddress));

router.post('/api/v1/addAddress', catchErrors(userController.addAddress));

module.exports = router;
