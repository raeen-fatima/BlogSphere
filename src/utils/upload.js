import cloudinary from "../lib/Cloudinary.js";
import fs from "fs";

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    fs.unlinkSync(localFilePath); // temp file remove

    return res.secure_url;

  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadToCloudinary;
