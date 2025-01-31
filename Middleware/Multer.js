import multer from "multer";

// Configure Multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory (for processing or custom storage)
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Limit file size to 5MB
});

// Export the middleware
export default upload;
