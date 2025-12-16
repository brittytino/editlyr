export const storageConfig = {
    s3: {
        region: process.env.S3_REGION || 'us-east-1',
        endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY || 'minioadmin',
            secretAccessKey: process.env.S3_SECRET_KEY || 'minioadmin',
        },
        forcePathStyle: true, // Needed for MinIO
    },
    bucket: process.env.S3_BUCKET || 'editlyr-uploads',
};
