const { STRIPE_PRIVATE_KEY } = process.env;

const stripe = require('stripe')(STRIPE_PRIVATE_KEY);

const calculateOrderAmount = (items, id) => {
  const order = 0;
  // TODO: Logic
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

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

exports.paymentHook = (request, response) => {
  const event = request.body;

  if (event.type === PAYMENT_EVENT_MAP.SUCCESS) {
    // TODO: Change order status & send email
    console.log(event);
  }

  response.send();
};
