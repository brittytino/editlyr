import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('plugins')
@UseGuards(JwtAuthGuard)
export class PluginsController {
    constructor(private readonly pluginsService: PluginsService) { }

    @Get()
    async list(@Request() req: any) {
        // Return both all available plugins AND the journal's current config logic
        // For MVP, just listing all and client can stitch, or more robust service method
        const allPlugins = await this.pluginsService.findAll();
        const myPlugins = await this.pluginsService.getJournalPlugins(req.user.journalId);

        // Merge for simple client consumption
        return allPlugins.map(p => {
            const myConfig = myPlugins.find(mp => mp.pluginId === p.id);
            return {
                ...p,
                enabled: myConfig ? myConfig.enabled : false,
                config: myConfig ? myConfig.config : null
            };
        });
    }

    @Post('toggle')
    async toggle(@Request() req: any, @Body() body: { key: string, enabled: boolean }) {
        return this.pluginsService.togglePlugin(req.user.journalId, body.key, body.enabled);
    }
}
