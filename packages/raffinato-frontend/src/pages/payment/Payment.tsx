import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from 'pages/payment/PaymentForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51J5tnCSF8cSnjOXIovXZmSWdswmgMpyqhE1m2TwJbTiCVZupUXMlqODbxFbyc434abZXIq7wvyywPR1Piw9kBFLD00CDIunQwi'
);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Poppins',
    },
  ],
};

function PaymentPage() {
  return (
    <div className="rf-page">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default PaymentPage;
