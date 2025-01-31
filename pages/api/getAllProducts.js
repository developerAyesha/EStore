import mongoose from 'mongoose';
const Product = require('../../Models/Product'); 
import { DbConnection } from './DB';


export default async function handler(req, res) {
  console.log('Handler started');
  
  try {
    await DbConnection();
  } catch (error) {
    console.error('Error establishing database connection:', error);
    return res.status(500).json({ success: false, message: 'Failed to connect to the database' });
  }

  console.log('Database connection established');

  try {
    const products = await Product.find()
    .populate('category', 'name') // Populate the 'category' field with 'name' only
    .exec();
    console.log('products:', products);

    return res.status(201).json({ success: true, products });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
