import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmissionStatus, DecisionStatus, ReviewStatus, Role } from '@prisma/client';

@Injectable()
export class EditorService {
    constructor(private prisma: PrismaService) { }

    async findAllSubmissions(journalId: string) {
        return this.prisma.submission.findMany({
            where: { journalId },
            include: { author: true, reviews: true, decisions: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getSubmission(id: string) {
        return this.prisma.submission.findUnique({
            where: { id },
            include: { author: true, reviews: { include: { reviewer: true } }, decisions: true }
        });
    }

    async assignReviewer(submissionId: string, reviewerId: string) {
        // Check if reviewer exists
        const reviewer = await this.prisma.user.findUnique({ where: { id: reviewerId } });
        if (!reviewer) throw new NotFoundException('Reviewer not found');

        // Create review record
        return this.prisma.review.create({
            data: {
                submissionId,
                reviewerId,
                status: ReviewStatus.PENDING
            }
        });

        // TODO: Send email invitation via Event/Queue
    }

    async makeDecision(submissionId: string, editorId: string, decision: DecisionStatus, notes?: string) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Create Decision Record
            await tx.decision.create({
                data: {
                    submissionId,
                    editorId,
                    status: decision,
                    notes
                }
            });

            // 2. Update Submission Status
            let newStatus: SubmissionStatus = SubmissionStatus.UNDER_REVIEW;
            if (decision === DecisionStatus.ACCEPT) newStatus = SubmissionStatus.ACCEPTED;
            if (decision === DecisionStatus.REJECT) newStatus = SubmissionStatus.REJECTED;
            if (decision === DecisionStatus.REVISION) newStatus = SubmissionStatus.REVISION_REQUESTED;

            return tx.submission.update({
                where: { id: submissionId },
                data: { status: newStatus }
            });
        });
    }
}
