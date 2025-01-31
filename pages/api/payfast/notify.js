export default function handler(req, res) {
    if (req.method === 'POST') {
      // Process the PayFast notification
      console.log('PayFast Notification:', req.body);
      res.status(200).send('Notification received');
    } else {
      res.status(405).send('Method Not Allowed');
    }
  }
  