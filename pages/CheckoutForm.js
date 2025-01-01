import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51QWsTMKI9r1mcgcwAlD4cOjLveSsz2NWmpVNKjPBnXJX3CLS1Sh9VsmCvGa52ZxmUbi9wxejxUcJSKxatsyTzu8500GiOF1J64");
const CheckoutForm = () => {
  

  return (
    <Elements stripe={stripePromise}>
       <CardElement/>
  </Elements>
  );
};

export default CheckoutForm;
