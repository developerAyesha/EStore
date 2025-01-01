import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe.js with your publishable key
const stripePromise = loadStripe("pk_test_51QWsTMKI9r1mcgcwAlD4cOjLveSsz2NWmpVNKjPBnXJX3CLS1Sh9VsmCvGa52ZxmUbi9wxejxUcJSKxatsyTzu8500GiOF1J64");

const CardCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const res = await fetch('http://localhost:3000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Payment Successful!</p>}
    </form>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CardCheckout />
  </Elements>
);

export default CheckoutPage;
