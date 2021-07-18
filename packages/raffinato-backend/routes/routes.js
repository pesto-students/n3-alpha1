const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const commonController = require('../controllers/commonController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');
const paymentController = require('../controllers/paymentController');
const cartController = require('../controllers/cartController');

// error handlers
const { catchErrors } = require('../handlers/errorHandlers');

// GET Requests
router.get('/api/v1/products', catchErrors(productController.getProducts));
router.get('/api/v1/product', catchErrors(productController.getProduct));
router.get('/api/v1/searchProducts', catchErrors(productController.getProductsBySearchQuery));
router.get('/api/v1/settings', catchErrors(commonController.getSettings));
router.get('/api/v1/getAddress', catchErrors(userController.getAddress));
router.get('/api/v1/getOrders', catchErrors(orderController.getOrders));
router.get('/api/v1/getCart', catchErrors(cartController.getCart));

// POST Requests
router.post('/api/v1/addAddress', catchErrors(userController.addAddress));
router.post('/api/v1/createOrder', catchErrors(orderController.createOrder));
router.post('/api/v1/addToCart', catchErrors(cartController.addToCart));
router.post('/api/v1/removeFromCart', catchErrors(cartController.removeFromCart));
router.post('/api/v1/syncCart', catchErrors(cartController.syncCart));

// Third party POST Requests
router.post('/api/v1/create-payment', catchErrors(paymentController.createPayment));
router.post('/api/v1/payment-hook', catchErrors(paymentController.paymentHook));

module.exports = router;
