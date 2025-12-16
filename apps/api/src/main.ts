import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

async function bootstrap() {
    // Load config from root .env
    dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

    const requiredEnvVars = [
        'DATABASE_URL',
        'REDIS_URL',
        'CLOUDINARY_CLOUD_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET',
        'RAZORPAY_KEY_ID',
        'RAZORPAY_KEY_SECRET'
    ];

    const missing = requiredEnvVars.filter(key => !process.env[key]);
    if (missing.length > 0) {
        console.error('❌ Missing critical environment variables:', missing.join(', '));
        process.exit(1);
    }

    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Enable CORS for generic access or configure specific origin
    await app.listen(4000);
    console.log(`🚀 Server running on http://localhost:4000`);
    console.log(`🏥 Health check at http://localhost:4000/health`);
}
bootstrap();
