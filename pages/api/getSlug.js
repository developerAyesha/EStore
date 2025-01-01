import mongoose from 'mongoose';
const Product = require('../../Models/Product'); 

const DbConnection = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to the database');
    return;
  }
  try {
    await mongoose.connect('mongodb://localhost:27017/Ecommerce', {
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
  console.log("req query",req.query);
  const {Slug}=req.query;
  console.log("slug in slug",Slug)
  try {
    await DbConnection();
  } catch (error) {
    console.error('Error establishing database connection:', error);
    return res.status(500).json({ success: false, message: 'Failed to connect to the database' });
  }

  console.log('Database connection established');

  try {
    // Find the main product based on the slug provided
    const product = await Product.findOne({ slug: Slug });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Find all variants with the same title to get different colors and sizes
    const variants = await Product.find({ title: product.title });
    let colorSizeSlug = {};

    // Structure colorSizeSlug to map colors and sizes to their respective slugs
    for (let item of variants) {
      if (colorSizeSlug[item.color]) {
        colorSizeSlug[item.color][item.size] = { slug: item.slug };
      } else {
        colorSizeSlug[item.color] = { [item.size]: { slug: item.slug } };
      }
    }

    console.log('Main product:', product);
    console.log("Product variants:", variants);
    console.log("Color and size mapping:", colorSizeSlug);

    return res.status(200).json({ success: true, product, colorSizeSlug });
  } catch (error) {
    console.error('Error retrieving product:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
