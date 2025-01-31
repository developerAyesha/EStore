import mongoose from 'mongoose';
const Product = require('../../Models/Product'); 
import Category from '@/Models/Category';
import { DbConnection } from './DB';

export default async function handler(req, res) {
  console.log('Handler started');
  console.log("req query",req.query);
  const {CategoryName}=req.query;
  try {
    await DbConnection();
  } catch (error) {
    console.error('Error establishing database connection:', error);
    return res.status(500).json({ success: false, message: 'Failed to connect to the database' });
  }

  console.log('Database connection established');

  try {
    const category = await Category.findOne({ name: 'Tshirt' });
    if (!category) {
      console.log('Category not found');
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
   console.log('CATEGOTY.....',category);
    // Find products by category id
    const products = await Product.find({ category: category._id }).populate('category', 'name');

    console.log('Products by category:', products);

    let product = {};

    for (let item of products) {
      if (item.title in product) {
        // Add unique colors and sizes if available quantity is greater than 0
        if (item.availableQuantity > 0) {
          if (!product[item.title].color.includes(item.color)) {
            product[item.title].color.push(item.color);
          }
          if (!product[item.title].size.includes(item.size)) {
            product[item.title].size.push(item.size);
          }
        }
      } else {
        // Initialize a new product entry
        product[item.title] = {
          ...item._doc,  // Use spread syntax to copy Mongoose document properties
          color: item.availableQuantity > 0 ? [item.color] : [],
          size: item.availableQuantity > 0 ? [item.size] : []
        };
      }
    }
    return res.status(201).json({ success: true, product});
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
