import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueueService } from '../common/services/queue.service';
import { ReviewStatus } from '@prisma/client';

@Injectable()
export class ReviewsService {
    constructor(
        private prisma: PrismaService,
        private queue: QueueService
    ) { }

    async inviteReviewer(submissionId: string, email: string) {
        // ... logic to check if user exists or create invite token ...
        // For MVP: Log the invite

        // Trigger Email
        await this.queue.addEmailJob('REVIEW_INVITE', {
            submissionId,
            email,
            link: `https://editlyr.org/reviews/invite?token=mock_token`
        });

        return { message: 'Invitation sent' };
    }

    async findByReviewer(reviewerId: string) {
        return this.prisma.review.findMany({
            where: { reviewerId },
            include: { submission: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.review.findUnique({
            where: { id },
            include: { submission: true }
        });
    }

    async acceptInvitation(id: string) {
        return this.prisma.review.update({
            where: { id },
            data: { status: ReviewStatus.ACCEPTED }
        });
    }

    async submitReview(id: string, score: number, content: string) {
        return this.prisma.review.update({
            where: { id },
            data: {
                score,
                content,
                status: ReviewStatus.COMPLETED,
                updatedAt: new Date(),
            }
        });
    }
}
