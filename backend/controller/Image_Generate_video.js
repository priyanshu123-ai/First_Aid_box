import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateVideoFromImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: "Image URL required" });

    // Step 1: Upload image to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(imageUrl, {
      folder: "first-aid-images",
    });

    // Step 2: Generate a looping video from the uploaded image
    const videoUrl = cloudinary.v2.video(uploadResponse.public_id, {
      resource_type: "video",
      transformation: [
        { width: 720, height: 720, crop: "fill" },
        { effect: "loop:5" }, // loop 5 seconds
      ],
      format: "mp4",
    });

    res.json({ videoUrl });
  } catch (err) {
    console.error("Cloudinary error:", err);
    res.status(500).json({ error: "Failed to generate video" });
  }
};
