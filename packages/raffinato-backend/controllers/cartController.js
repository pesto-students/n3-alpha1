const { v4: uuid } = require('uuid');

exports.addToCart = async (req, res) => {
  const { auth } = res.locals;
  const { item } = req.body;

  const cartItem = {
    ...item,
    id: uuid(),
    userId: auth.uid,
  };

  res.json({
    status: 200,
    ...cartItem,
  });
};

exports.removeFromCart = async (req, res) => {
  const { auth } = res.locals;
  const item = req.body;

  global.cartCollection = global.cartCollection.filter((cartItem) => (
    cartItem.id === item.id
    && cartItem.userId === auth.uid
  ));

  res.json({
    status: 200,
    item,
  });
};

exports.getCart = async (req, res) => {
  const { auth } = res.locals;

  const cartByUser = global.cartCollection.filter((item) => item.userId === auth.uid);

  res.json({
    status: 200,
    items: cartByUser,
  });
};

exports.syncCart = async (req, res) => {
  const { auth } = res.locals;
  const { items } = req.body;

  const itemsWithUserId = items.map((item) => ({
    ...item,
    id: uuid(),
    userId: auth.uid,
  })) || [];

  global.cartCollection.push(...itemsWithUserId);

  res.json({
    status: 200,
  });
};
