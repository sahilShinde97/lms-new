import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next();
    }

    const fileKeys = Object.keys(req.files);
    for (const key of fileKeys) {
      const file = req.files[key][0];
      
      if (!file) {
        continue;
      }

      // Convert buffer to base64
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      // Upload to Cloudinary with increased timeout and chunk size
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
        folder: "lms_uploads",
        chunk_size: 6000000, // 6MB chunks
        timeout: 120000 // 2 minutes timeout
      });

      // Store the Cloudinary URL in req.body
      req.body[key] = result.secure_url;
    }
    next();
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ 
      success: false,
      message: "File upload failed", 
      error: error.message 
    });
  }
};

export default uploadToCloudinary;