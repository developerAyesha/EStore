import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, item_name } = req.body;
    console.log('req body on payfast .....',req.body);
    const data = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY,
      amount: amount,
      item_name: item_name,
      return_url: 'http://localhost:3000/payment-success',
      cancel_url: 'http://localhost:3000/payment-cancel',
      notify_url: 'http://localhost:3000/api/payfast/notify',
    };
   

    // Convert data to query string
    const queryString = new URLSearchParams(data).toString();
    console.log('data of payment .....',queryString)

    try {
      const response = await axios.post(
        'https://sandbox.payfast.co.za/eng/process',
        queryString,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      res.status(200).json({ url: response.request.res.responseUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
