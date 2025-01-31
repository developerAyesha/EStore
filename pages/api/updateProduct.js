import mongoose from 'mongoose';
import Product from '@/Models/Product';
import Category from '@/Models/Category';
import { uploadToCloudinary } from '@/utils/Cloudinary';
import upload from '@/Middleware/Multer';

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

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export default async function handler(req, res) {
  if (req.method === "PUT") {
    upload.single("img")(req, {}, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ success: false, message: "File upload failed" });
      }

      console.log("Request body:", req.body);
      console.log("Uploaded file:", req.file);

      try {
        await DbConnection();

        // Destructure the product update data
        let { title, slug, desc, price, category, color, size, availableQuantity, productId } = req.body;

        // Log category, color, and size to check if they are objects
        console.log('Category:', category);
        console.log('Color:', color);
        console.log('Size:', size);

        // Check if productId is valid
        if (!productId || !isValidObjectId(productId)) {
          console.error("Invalid productId:", productId);
          return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        // Find product by productId
        const product = await Product.findById(productId);
        console.log('Product found:', product);
        if (!product) {
          console.error("Product not found");
          return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if category is valid or resolve it
        if (typeof category === 'object' && category._id) {
          console.log('Category object detected, using _id:', category._id);
          category = category._id;
        } else if (!isValidObjectId(category)) {
          const categoryDoc = await Category.findOne({ name: category });
          if (!categoryDoc) {
            console.error("Category not found:", category);
            return res.status(400).json({ success: false, message: 'Category not found' });
          }
          category = categoryDoc._id;
        }

        // Log resolved category
        console.log('Resolved category:', category);

        // Handling image update (if provided)
        let imageUrl = product.img; // Keep the old image if no new image is provided
        if (req.file) {
          const fileBuffer = req.file.buffer;
          try {
            const uploadResult = await uploadToCloudinary(
              `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`
            );
            imageUrl = uploadResult.secure_url; // Set the new image URL from Cloudinary
            console.log('New image URL:', imageUrl);
          } catch (uploadError) {
            console.error("Error uploading image to Cloudinary:", uploadError);
            return res.status(500).json({ success: false, message: "Image upload failed" });
          }
        }

        // Update product fields
        product.title = title || product.title;
        product.slug = slug || product.slug;
        product.desc = desc || product.desc;
        product.price = price ? parseFloat(price) : product.price;
        product.img = imageUrl;
        product.category = category;
        product.color = color || product.color;
        product.size = size || product.size;
        product.availableQuantity = availableQuantity ? parseInt(availableQuantity) : product.availableQuantity;

        // Log the updated product before saving
        console.log('Updated product data:', product);

        // Save updated product
        await product.save();

        return res.status(200).json({ success: true, message: "Product updated successfully",product});
      } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    });
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}



