const { v4: uuid } = require('uuid');

exports.addToCart = (req, res) => {
  const { auth } = res.locals;
  const { item } = req.body;

  const cartItem = {
    ...item,
    userId: auth.uid,
  };

  const presentCartItem = global.cartCollection.find((cartItemSingle) => (
    cartItemSingle.id === item.id
    && cartItemSingle.userId === auth.uid
  ));

  if (presentCartItem) {
    presentCartItem.quantity += 1;
  } else {
    global.cartCollection.push(cartItem);
  }

  res.json({
    status: 200,
    ...cartItem,
  });
};

exports.removeFromCart = (req, res) => {
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

exports.getCart = (req, res) => {
  const { auth } = res.locals;

  const cartByUser = global.cartCollection.filter((item) => item.userId === auth.uid);

  res.json({
    status: 200,
    items: cartByUser,
  });
};

exports.syncCart = (req, res) => {
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
