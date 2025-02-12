import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Configuration for Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CLOUD, 
    api_secret: process.env.API_KEY_SECRET_CLOUD
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null; // Early return if no file path is provided
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        return result; // Return the result if successful
    } catch (error) {
        console.error("Error during upload:", error);
        // Ensure the local file is deleted if an error happens
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);  // Or use fs.promises.unlink() for async
        }
        return null; // Return null on error
    }
};

export { uploadOnCloudinary };
