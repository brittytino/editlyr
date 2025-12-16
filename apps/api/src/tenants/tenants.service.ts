import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, Plan } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TenantsService {
    constructor(private prisma: PrismaService) { }

    async createTenant(data: { journalName: string; slug: string; adminEmail: string; adminPassword: string }) {
        // 1. Check if slug exists
        const existing = await this.prisma.journal.findUnique({ where: { slug: data.slug } });
        if (existing) throw new ConflictException('Journal slug already taken');

        // 2. Create Journal + Admin User + Subscription (Transaction)
        return this.prisma.$transaction(async (tx) => {
            const journal = await tx.journal.create({
                data: {
                    name: data.journalName,
                    slug: data.slug,
                    subscription: {
                        create: {
                            plan: Plan.FREE,
                            status: 'active'
                        }
                    }
                }
            });

            const hashedPassword = await bcrypt.hash(data.adminPassword, 10);

            const user = await tx.user.create({
                data: {
                    email: data.adminEmail,
                    password: hashedPassword,
                    roles: [Role.ADMIN],
                    journalId: journal.id
                }
            });

            return { journal, user };
        });
    }

    async findBySlug(slug: string) {
        return this.prisma.journal.findUnique({
            where: { slug },
            include: { subscription: true }
        });
    }
}
