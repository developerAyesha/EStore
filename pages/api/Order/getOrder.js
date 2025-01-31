import Order from "@/Models/Order";
import Product from "@/Models/Product";
import { DbConnection } from "../DB";

export default async function handler(req, res) {
  await DbConnection();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Find the order by id
      const order = await Order.findById(id); 
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      console.log('Order found:', order);

      const updatedProducts = [];
      
      // Iterate over the products in the order
      for (const product of order.Products) {
        console.log('Product slug:', product.slug);

        // Find the product by slug
        const p = await Product.findOne({ slug: product.slug });

        // Check if the product exists
        if (!p) {
          console.log('Product not found:', product.slug);
          continue; // Skip this product if not found
        }

        // Create the updated product object with full details
        const updatedProduct = {
          _id: p._id,
          title: p.title,
          slug: p.slug,
          desc: p.desc,
          price: p.price,
          img: p.img,
          category: p.category,
          color: p.color,
          size: p.size,
          availableQuantity: p.availableQuantity,
          isPremium: p.isPremium,
          quantity: product.Quantity || p.availableQuantity, // Use the quantity from the order or default to availableQuantity
        };

        console.log('Updated Product:', updatedProduct);

        // Push the updated product into the array
        updatedProducts.push(updatedProduct);
      }
      
      console.log('Updated Order Products:', updatedProducts);

      // Return the updated products in the response (without changing the order in the database)
      res.status(200).json({ success: true, data: { ...order.toObject(), Products: updatedProducts } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
