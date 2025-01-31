import mongoose from 'mongoose';
const Product = require('../../Models/Product'); 
import { DbConnection } from './DB';


export default async function handler(req, res) {
    console.log('Handler started');
    const { slug } = req.query;
  console.log('query in slug.,,,,,,,,',slug);
    
    if (req.method === 'DELETE') {
      try {
        // Get the slug from the query parameters
       
        // Establish database connection
        await DbConnection();
  
        // Delete the product by slug
        const product = await Product.findOne({ slug });
        console.log('product in unterface',product);
        
const result = await Product.deleteOne({ slug});

console.log('Delete result:', result);
        
        // If no product was deleted, return an error message
        if (result.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
  
        // Successfully deleted
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
        
      } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    } else {
      // If method is not DELETE, return method not allowed
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  }
