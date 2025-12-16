import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // 1. Extract Tenant Slug from Header (MVP) or Host
        const slug = request.headers['x-tenant-slug'];

        if (!slug) return true; // If no header, maybe global or not tenant-specific (e.g. platform signup)

        // 2. Verify Tenant exists
        const journal = await this.prisma.journal.findUnique({ where: { slug: slug as string } });
        if (!journal) throw new UnauthorizedException('Tenant not found');

        // 3. Attach to request
        request['tenant'] = journal;
        return true;
    }
}
