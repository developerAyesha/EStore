import cloudinary from 'cloudinary';
import { promisify } from 'util';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Promisify the upload function for async/await usage
const uploadToCloudinary = promisify(cloudinary.v2.uploader.upload);

export { uploadToCloudinary };
