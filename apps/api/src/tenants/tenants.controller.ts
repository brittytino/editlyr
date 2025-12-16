import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
    constructor(private readonly tenantsService: TenantsService) { }

    @Post()
    create(@Body() body: any) {
        return this.tenantsService.createTenant(body);
    }

    @Get(':slug')
    getTenant(@Param('slug') slug: string) {
        return this.tenantsService.findBySlug(slug);
    }
}
