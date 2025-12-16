import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
    private emailQueue: Queue;

    constructor() {
        const redisUrl = process.env.REDIS_URL;
        let connectionConfig;

        if (redisUrl) {
            // Parse redis://user:pass@host:port
            const parsed = new URL(redisUrl);
            connectionConfig = {
                host: parsed.hostname,
                port: parseInt(parsed.port || '6379'),
                username: parsed.username,
                password: parsed.password,
                // Add TLS if dealing with secure Redis (like Upstash/Neon/AWS)
                tls: parsed.protocol === 'rediss:' ? { rejectUnauthorized: false } : undefined
            };
        } else {
            connectionConfig = {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
            };
        }

        this.emailQueue = new Queue('email-queue', {
            connection: connectionConfig,
        });
    }

    async onModuleInit() {
        // Optional: check connection
    }

    async onModuleDestroy() {
        await this.emailQueue.close();
    }

    async addEmailJob(type: string, payload: any) {
        // Job name = type (e.g., 'sub_received'), data = payload
        return this.emailQueue.add(type, payload);
    }
}
