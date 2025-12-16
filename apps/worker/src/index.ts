import { Worker } from 'bullmq';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
};

console.log(`[Worker] Starting Email Worker connected to ${connection.host}:${connection.port}...`);

const emailWorker = new Worker('email-queue', async job => {
    // In a real app, use Nodemailer here
    console.log(`[Worker] Processing job ${job.name}:`, job.data);

    switch (job.name) {
        case 'SUBMISSION_RECEIVED':
            console.log(`[Email] To Author: "Your submission '${job.data.title}' has been received."`);
            console.log(`[Email] To Editors: "New submission received."`);
            break;
        case 'REVIEW_INVITE':
            console.log(`[Email] To Reviewer: "You are invited to review. Link: ${job.data.link}"`);
            break;
        case 'DECISION_NOTIFY':
            console.log(`[Email] To Author: "Decision made: ${job.data.decision}"`);
            break;
    }

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`[Worker] Job ${job.id} completed.`);

}, { connection });

emailWorker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

emailWorker.on('failed', (job, err) => {
    if (job) {
        console.log(`${job.id} has failed with ${err.message}`);
    }
});
