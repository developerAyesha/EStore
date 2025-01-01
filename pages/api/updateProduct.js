import mongoose from 'mongoose';
const Product = require('../../Models/Product');

const DbConnection = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to the database');
    return;
  }
  try {
    await mongoose.connect('mongodb://localhost:27017/CodesWeare', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Database connection error');
  }
};

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
    if (req.method === 'POST') {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ success: false, message: 'Invalid data format. Expected an array of products.' });
      }

      const updatedProducts = [];
      for (let i = 0; i < req.body.length; i++) {
        let updatedProduct = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i], { new: true });
        updatedProducts.push(updatedProduct);
      }

      return res.status(200).json({
        success: true,
        message: "Products have been updated successfully",
        products: updatedProducts
      });
    } else {
      return res.status(400).json({ success: false, message: 'This method is not allowed' });
    }
  } catch (error) {
    console.error('Error updating products:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
