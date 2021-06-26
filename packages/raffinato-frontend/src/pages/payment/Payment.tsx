import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from 'pages/payment/PaymentForm';

const { REACT_APP_STRIPE_PUBLIC_KEY } = process.env;

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY!);

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
