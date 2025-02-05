import { v2 as cloudinary } from 'cloudinary';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY_CLOUD, 
        api_secret: process.env.API_KEY_SECRET_CLOUD // Click 'View API Keys' above to copy your API secret
    })


    const uploadOnCloudinary=async (localFilePath)=>{

try {
    
    if(!localFilePath) return null;
    //upload file to cloudinary
      return await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})


} catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
}

    }


    export {uploadOnCloudinary}