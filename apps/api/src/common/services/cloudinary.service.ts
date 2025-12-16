import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadFile(filePath: string, folder: string = 'submissions') {
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: `editlyr/${folder}`,
                resource_type: 'auto',
                type: 'authenticated', // Private file
            });
            return result;
        } catch (error) {
            console.error('Cloudinary upload failed:', error);
            throw error;
        }
    }

    getSignedUrl(publicId: string, format: string = 'pdf') {
        return cloudinary.url(publicId, {
            resource_type: 'image', // Cloudinary often treats PDFs as image/multi-page
            type: 'authenticated',
            format: format,
            sign_url: true,
            expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        });
    }
}
