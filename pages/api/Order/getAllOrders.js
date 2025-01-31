import Order from "@/Models/Order";
import { DbConnection } from "../DB";
export default async function handler(req, res) {
  await DbConnection();

  if (req.method === 'GET') {
    try {
      const orders = await Order.find();
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
