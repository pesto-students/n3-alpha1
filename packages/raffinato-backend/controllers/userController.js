const uniqueId = require('lodash/uniqueId');

exports.getAddress = async (req, res) => {
  const { auth } = res.locals;

  const userAddress = global.addressCollection?.filter(
    (address) => address.userId === auth?.uid,
  );

  res.json({
    addresses: userAddress,
  });
};

exports.addAddress = async (req, res) => {
  const { auth } = res.locals;
  const address = req.body;

  global.addressCollection.push({
    ...address,
    id: uniqueId(),
    userId: auth.uid,
  });

  res.json({
    status: 200,
  });
};
