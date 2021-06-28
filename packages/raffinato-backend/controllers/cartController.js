const { v4: uuid } = require('uuid');

exports.addToCart = async (req, res) => {
  const { auth } = res.locals;
  const item = req.body;

  const cartItem = {
    ...item,
    id: uuid(),
    userId: auth.uid,
  };

  global.cartCollection.push(cartItem);

  res.json({
    status: 200,
    ...cartItem,
  });
};
