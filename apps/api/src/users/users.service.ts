import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findAllByJournal(requestingUserId: string) {
        const requester = await this.prisma.user.findUnique({ where: { id: requestingUserId } });
        if (!requester || !requester.journalId) throw new NotFoundException('Journal not found');

        return this.prisma.user.findMany({
            where: { journalId: requester.journalId },
            select: { id: true, name: true, email: true, roles: true, createdAt: true }
        });
    }

    async inviteUser(requesterId: string, email: string, role: Role) {
        const requester = await this.prisma.user.findUnique({ where: { id: requesterId } });
        if (!requester || !requester.journalId) throw new NotFoundException('Journal not found');

        // Check if user exists
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) throw new ConflictException('User already exists');

        // Create user with temp password
        // In real app: send email with invitation link
        const hashedPassword = await bcrypt.hash('temp1234', 10);

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                roles: [role],
                journalId: requester.journalId,
                name: email.split('@')[0] // Default name
            }
        });
    }
}
