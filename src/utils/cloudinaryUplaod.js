import { v2 as cloudinary } from "cloudinary"
import fs from 'fs'


    
    
    const uploadOnCloudinary = async (localFilePath) =>{
        
        cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    
    try {

        if(!localFilePath) return null;

        // Upload file 
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: 'auto'
            }
        )

        console.log('File uploaded successfully! ', response.url)
        return response
        
    } catch (e) {
        console.error('Cloudinary upload failed:', e)
        fs.unlinkSync(localFilePath)
        return null
    }
}

export { uploadOnCloudinary }
    