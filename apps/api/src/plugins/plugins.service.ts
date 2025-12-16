import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Plan } from '@prisma/client';

@Injectable()
export class PluginsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.plugin.findMany();
    }

    async getJournalPlugins(journalId: string) {
        return this.prisma.journalPlugin.findMany({
            where: { journalId },
            include: { plugin: true }
        });
    }

    async togglePlugin(journalId: string, pluginKey: string, enabled: boolean) {
        const plugin = await this.prisma.plugin.findUnique({ where: { key: pluginKey } });
        if (!plugin) throw new NotFoundException('Plugin not found');

        const journal = await this.prisma.journal.findUnique({
            where: { id: journalId },
            include: { subscription: true }
        });

        // ENFORCEMENT: Paid plugins require PRO plan
        if (plugin.isPaid && journal?.subscription?.plan !== Plan.PRO) {
            throw new BadRequestException('This plugin requires a PRO subscription.');
        }

        // Upsert JournalPlugin record
        // We need to find the specific ID if updating, or create.
        // Prisma upsert requires unique compound key, which we defined @@unique([journalId, pluginId])

        return this.prisma.journalPlugin.upsert({
            where: {
                journalId_pluginId: {
                    journalId,
                    pluginId: plugin.id
                }
            },
            update: { enabled },
            create: {
                journalId,
                pluginId: plugin.id,
                enabled
            }
        });
    }
}
