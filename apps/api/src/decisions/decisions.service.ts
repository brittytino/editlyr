import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueueService } from '../common/services/queue.service';
import { DecisionStatus } from '@prisma/client';

@Injectable()
export class DecisionsService {
    constructor(
        private prisma: PrismaService,
        private queue: QueueService
    ) { }

    async makeDecision(submissionId: string, editorId: string, status: DecisionStatus, notes: string) {
        // Enforce role check: Ensure user is editor for this journal (skipped for MVP simplicity, assumed guard)

        const decision = await this.prisma.decision.create({
            data: {
                submissionId,
                editorId,
                status,
                notes
            }
        });

        const submission = await this.prisma.submission.update({
            where: { id: submissionId },
            data: { status: status === 'ACCEPT' ? 'ACCEPTED' : status === 'REJECT' ? 'REJECTED' : 'REVISION_REQUESTED' },
            include: { author: true }
        });

        // Trigger Email
        await this.queue.addEmailJob('DECISION_NOTIFY', {
            submissionId: submission.id,
            decision: status,
            email: submission.author.email
        });

        return decision;
    }
}
