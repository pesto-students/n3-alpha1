require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const router = require('./routes/routes');
const swaggerDocument = require('./docs/swagger.json');
const middlewares = require('./middleware/index');
const addressCollection = require('./models/address');
const cartCollection = require('./models/cart');
const orderCollection = require('./models/orders');
const { db: productDB } = require('./models/products.json');

const allProducts = [...productDB.men, ...productDB.women];

// TODO: Use Mongo for storage
global.addressCollection = addressCollection;
global.orderCollection = orderCollection;
global.cartCollection = cartCollection;
global.productCollection = allProducts;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

const options = {
  explorer: true,
};

app.use(middlewares.checkAuth);

app.use('/api-docs/v1', (req, res, next) => {
  swaggerDocument.host = req.get('host');
  req.swaggerDoc = swaggerDocument;
  next();
}, swaggerUi.serve, swaggerUi.setup(null, options));

// // pass variables to our templates + all requests
// app.use((req, res, next) => {
//   res.locals.user = req.user || null;
//   res.locals.currentPath = req.path;
//   next();
// });

app.use('/', router);

module.exports = app;
