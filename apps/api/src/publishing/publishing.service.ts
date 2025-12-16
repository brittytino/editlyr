import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmissionStatus } from '@prisma/client';

@Injectable()
export class PublishingService {
    constructor(private prisma: PrismaService) { }

    async getPublishedArticle(id: string) {
        return this.prisma.submission.findFirst({
            where: { id, status: SubmissionStatus.PUBLISHED }, // Only public if published
            include: { author: true }
        });
    }

    async getAllPublished(journalSlug: string) {
        return this.prisma.submission.findMany({
            where: {
                journal: { slug: journalSlug },
                status: SubmissionStatus.PUBLISHED
            },
            include: { author: true },
            orderBy: { updatedAt: 'desc' }
        });
    }
}
