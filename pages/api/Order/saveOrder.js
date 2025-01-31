// pages/api/edit-order.js

import { DbConnection } from "../DB";
import Order from "@/Models/Order";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
      const { _id, Products, amount, status, ShippingInfo } = req.body;
  
      try {
        // Prepare the order object that matches the OrderSchema
        const updatedOrder = {
          Products: Products.map(product => ({
            slug: product.slug,        // Map to your schema's expected field
            Quantity: product.quantity, // Map quantity from the received product data
          })),
          amount,  // Keep the same amount field
          status,  // Keep the same status field
          ShippingInfo: {  // Ensure ShippingInfo is properly structured
            name: ShippingInfo.name,
            email: ShippingInfo.email,
            address: ShippingInfo.address,
            phone: ShippingInfo.phone,
            city: ShippingInfo.city,
            state: ShippingInfo.state,
            pincode: ShippingInfo.pincode,
          },
        };
  
        // Find and update the order in the database using the _id
        const order = await Order.findByIdAndUpdate(_id, updatedOrder, { new: true });
  
        if (!order) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }
  
        return res.status(200).json({ success: true, order });
      } catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({ success: false, message: 'Failed to update order' });
      }
    } else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  }
