import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
    private emailQueue: Queue;

    constructor() {
        this.emailQueue = new Queue('email-queue', {
            connection: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
            },
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
