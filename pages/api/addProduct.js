import mongoose from 'mongoose';
const Product = require('../../Models/Product'); 
import Category from '@/Models/Category';
import upload from '@/Middleware/Multer';
import { uploadToCloudinary } from '@/utils/Cloudinary';



export const config = {
  api: {
    bodyParser: false, // Disable default body parser for multipart data
  },
};

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
  if (req.method === "POST") {
    // Use the Multer middleware
    upload.single("img")(req, {}, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ success: false, message: "File upload failed" });
      }

      console.log("Request body:", req.body);
      console.log("Uploaded file:", req.file);

      // Proceed with your logic
      try {
        await DbConnection();
 
        const fileBuffer = req.file.buffer;
        const uploadResult = await uploadToCloudinary(
          `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`
        );

        // Extract Cloudinary URL
        const imageUrl = uploadResult.secure_url;

        const categoryDoc = await Category.findOne({ name: req.body.category });
        if (!categoryDoc) {
          return res.status(400).json({ message: 'Category not found.' });
        }
  
        const product = new Product({
          title: req.body.title,
          slug: req.body.slug,
          desc: req.body.desc,
          price: req.body.price,
          img: imageUrl, // Save the file's buffer or path
          category: categoryDoc._id,
          color: req.body.color,
          size: req.body.size,
          availableQuantity: req.body.availableQuantity,
        });
        await product.save();
        return res.status(200).json({ success: true, message: "Product added successfully" });
      } catch (error) {
        console.error("Error saving product:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    });
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
