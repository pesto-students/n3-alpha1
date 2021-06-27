/* eslint-disable no-plusplus */
const { v4: uuidv4 } = require('uuid');
const upperFirst = require('lodash/upperFirst');

// const calculateOrderAmount = (items, id) => {
//   global.orderCollection.push({
//     id: uniqueId(),
//     items,
//     userId: id,
//   });

//   const order = 0;
//   return 1400;
// };

exports.getOrders = async (req, res) => {
  const { auth } = res.locals;

  const userOrders = global.orderCollection?.filter(
    (order) => order.userId === auth?.uid,
  );

  res.json({
    orders: userOrders,
  });
};

exports.createOrder = async (req, res) => {
  const { auth } = res.locals;
  const { items } = req.body;
  const order = {
    id: uuidv4(),
    createdAt: new Date(),
    userId: auth.uid,
    status: 'created',
    items: [],
    totalPrice: 0,
  };

  for (let i = 0; i < items.length; i++) {
    const { productId, quantity } = items[i];

    const {
      brand, shortDescription, priceInfo, images,
    } = global.productCollection.find(
      (product) => product.id === productId,
    ) || {};

    order.items.push({
      brand: brand.name,
      shortDescription: upperFirst(shortDescription.split(' ').pop()),
      quantity,
      price: priceInfo.finalPrice,
      thumbnail: images.cutOut,
    });

    order.totalPrice += priceInfo.finalPrice * quantity;
  }

  global.orderCollection.push(order);

  res.send({
    status: 200,
  });
};
