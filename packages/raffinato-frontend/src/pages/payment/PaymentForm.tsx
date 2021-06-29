import clsx from 'clsx';
import React, { FormEvent, useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ReactComponent as StripeIcon } from 'design-system/assets/icons/stripe.svg';

import {
  ContainerBox,
  Chip,
  Button,
  TextInput,
  Icon,
  AddressBox,
} from 'design-system/index';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import './payment.scss';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { Redirect, useHistory } from 'react-router-dom';
import { createAlert } from 'store/alertSlice';
import createPayment from 'api/createPayment';
import { useMutation } from 'react-query';
import createOrder, { Order } from 'api/createOrder';
import { clearCart } from 'store/cartSlice';

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#2F1600',
      color: '#2F1600',
      fontWeight: 500,
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      backgroundColor: '#efe1d2',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#2F1600',
      },
    },
    complete: {
      iconColor: '#2F1600',
      color: '#2F1600',
    },
    invalid: {
      iconColor: '#FF0000',
      color: '#FF0000',
    },
  },
};

// Replace with CART Items

const items = [
  {
    productId: 16864752,
    quantity: 1,
  },
  {
    productId: 15957314,
    quantity: 2,
  },
];

const PaymentForm = () => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const cart = useAppSelector((state) => state.cart);

  const createOrderMutation = useMutation(
    (orderItems: Partial<Order>) => createOrder(orderItems),
    {
      onSettled: () => {
        dispatch(
          createAlert({
            message: 'Whoa! Smooth as butter.',
            type: 'success',
          })
        );
      },
    }
  );

  const selectedAddress = useAppSelector((state) => state.selectedAddress);

  const icon = <Icon name="arrow-right" />;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPayment(items).then((data) => {
      setClientSecret(data.clientSecret);
    });
  }, []);

  if (!selectedAddress) {
    dispatch(
      createAlert({
        message: 'Please select an address first',
        type: 'failure',
      })
    );
    return <Redirect to="/checkout/address" />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const {
      error: stripeError,
      ...restPayload
    } = await stripe.confirmCardPayment(clientSecret!, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (stripeError) {
      setError(stripeError.message!);
      setIsProcessing(false);
    } else {
      await createOrderMutation.mutate({ items: cart });

      setError(null);
      setIsProcessing(false);
      setSuccess(true);

      dispatch(clearCart());
    }
  };

  if (success) {
    return (
      <div className={clsx('rf-flex', 'rf-flex-h', 'rf-ju-c')}>
        <ContainerBox title="Order Confirmation">
          <div className="rf-payment-form-inner-wrapper">
            <div>
              <p className="rf-text-align-c">Thank you for shopping with us.</p>
              <p className="rf-text-align-c">
                You will get an email with order details shortly.
              </p>
            </div>
            <Button>Continue Shopping</Button>
            <Button
              variant="secondary"
              theme="dark"
              onClick={() => history.push('/orders')}
            >
              View Orders
            </Button>
          </div>
        </ContainerBox>
      </div>
    );
  }

  return (
    <div className={clsx('rf-flex', 'rf-flex-h', 'rf-ju-c')}>
      <ContainerBox title="Payment" icon={<StripeIcon />}>
        <form onSubmit={handleSubmit} className="rf-payment-form-inner-wrapper">
          <div className={clsx('rf-flex', 'rf-payment-options-wrapper')}>
            <p className="rf-text-sm">Select your payment method</p>
            <div
              className={clsx(
                'rf-payment-form-options',
                'rf-flex',
                'rf-flex-h'
              )}
            >
              <Chip label="Card" icon="card" />
              <Chip label="Paypal" icon="paypal" disabled hint="Coming soon" />
              <Chip label="GPay" icon="google" disabled hint="Coming soon" />
            </div>
          </div>
          <div className={clsx('rf-flex', 'rf-payment-options-wrapper')}>
            <p className="rf-text-sm">Billed To</p>
            <AddressBox address={selectedAddress!} />
          </div>
          <TextInput
            name="nameOnCard"
            onChange={(e) => setNameOnCard(e.target.value)}
            value={nameOnCard}
            placeholder="Name on card"
          />
          <div className="rf-payment-form-card">
            <CardElement options={CARD_OPTIONS} />
          </div>
          {error && <p className="rf-payment-failure-message">{error}</p>}
          <Button
            type="submit"
            loading={isProcessing}
            disabled={!stripe}
            righticon={!isProcessing && icon}
          >
            {isProcessing ? 'Processing' : 'Pay'}
          </Button>
          {/* Show a success message upon completion */}
        </form>
      </ContainerBox>
    </div>
  );
};

export default PaymentForm;
