const Stripe = require("stripe");

const stripe = new Stripe("sk_test_51QWsTMKI9r1mcgcwHe6FTaeSxHthVv3qTdYX5EuyJIAxMHMIXvvYBC0ZQsxjP22Bil7HU4N2FBkPBWtVVIIuWhzq00qPbxK4Kk"); // Replace with your secret key


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd', // Change currency if needed
        payment_method_types: ['card'],
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
