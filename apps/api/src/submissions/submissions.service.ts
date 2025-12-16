import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../common/services/storage.service';
import { BillingService } from '../billing/billing.service';
import { SubmissionStatus } from '@prisma/client';
import { QueueService } from '../common/services/queue.service';

@Injectable()
export class SubmissionsService {
    constructor(
        private prisma: PrismaService,
        private storage: StorageService,
        private billing: BillingService,
        private queue: QueueService
    ) { }

    async create(data: any, authorId: string, journalId: string) {
        // Find journal for user - although guard handles it, good for data consistency
        const submission = await this.prisma.submission.create({
            data: {
                title: data.title,
                abstract: data.abstract,
                fileUrl: data.fileUrl,
                status: 'DRAFT',
                author: { connect: { id: authorId } },
                journal: { connect: { id: journalId } }
            }
        });
        return submission;
    }

    async submit(id: string, userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.journalId) throw new NotFoundException('User not associated with a journal');

        // Check billing limits
        await this.billing.checkSubmissionLimit(user.journalId);

        const submission = await this.prisma.submission.update({
            where: { id, authorId: userId },
            data: { status: 'SUBMITTED' }
        });

        // Trigger Email Job via Queue
        await this.queue.addEmailJob('SUBMISSION_RECEIVED', {
            submissionId: submission.id,
            title: submission.title,
            email: user.email // Sending to author
        });

        return submission;
    }

    async findAllForAuthor(userId: string) {
        return this.prisma.submission.findMany({
            where: { authorId: userId },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findOne(id: string) {
        return this.prisma.submission.findUnique({ where: { id } });
    }
}
