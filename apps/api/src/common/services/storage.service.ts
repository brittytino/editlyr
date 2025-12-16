import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { storageConfig } from '../../../config/storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            region: storageConfig.s3.region,
            endpoint: storageConfig.s3.endpoint,
            credentials: {
                accessKeyId: storageConfig.s3.credentials.accessKeyId,
                secretAccessKey: storageConfig.s3.credentials.secretAccessKey,
            },
            forcePathStyle: storageConfig.s3.forcePathStyle,
        });
    }

    async getUploadUrl(key: string, contentType: string): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: storageConfig.bucket,
            Key: key,
            ContentType: contentType,
        });
        return getSignedUrl(this.s3, command, { expiresIn: 3600 });
    }

    async getDownloadUrl(key: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: storageConfig.bucket,
            Key: key,
        });
        return getSignedUrl(this.s3, command, { expiresIn: 3600 });
    }
}
