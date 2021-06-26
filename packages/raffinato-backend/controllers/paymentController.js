const { v4: uuidv4 } = require('uuid');

const stripe = require('stripe')('sk_test_51J5tnCSF8cSnjOXIxnmFgf83Qcjg0rDvg8p8fx8nXZoEqOAl8lLq40Np7fDs56Vi3xBkQrAWogZhaAY6gy8yzQhH00I6xNbN0O');

const calculateOrderAmount = (items, id) => {
  const order = 0;
  return 1400;
};

const PAYMENT_EVENT_MAP = {
  SUCCESS: 'payment_intent.succeeded',
  ATTACHED: 'payment_method.attached',
};

exports.createPayment = async (req, res) => {
  const { auth } = res.locals;
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items, auth.uid),
    currency: 'inr',
  });
  console.log(global.orderCollection);

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

exports.paymentHook = (request, response) => {
  const event = request.body;

  console.log('Event is ', event);

  if (event.type === PAYMENT_EVENT_MAP.SUCCESS) {
    console.log(event);
  }

  response.send();
};
