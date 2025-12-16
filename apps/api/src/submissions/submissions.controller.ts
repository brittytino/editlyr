import { Controller, Get, Post, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StorageService } from '../common/services/storage.service';
import { UsersService } from '../users/users.service';
import { BillingService } from '../billing/billing.service';

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
    constructor(
        private readonly submissionsService: SubmissionsService,
        private readonly storageService: StorageService,
        private readonly usersService: UsersService,
        private readonly billingService: BillingService,
    ) { }

    @Post()
    async create(@Request() req: any, @Body() createSubmissionDto: any) {
        const user = await this.usersService.findById(req.user.userId);
        if (!user || !user.journalId) throw new NotFoundException('User not associated with a journal');

        // Enforce Billing Limits
        await this.billingService.checkSubmissionLimit(user.journalId);

        return this.submissionsService.create(createSubmissionDto, req.user.userId, user.journalId);
    }

    @Get()
    findAll(@Request() req: any) {
        return this.submissionsService.findAllForAuthor(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.submissionsService.findOne(id);
    }

    @Post('upload-url')
    async getUploadUrl(@Body() body: { filename: string; contentType: string }) {
        const key = `submissions/${Date.now()}-${body.filename}`;
        const url = await this.storageService.getUploadUrl(key, body.contentType);
        return { url, key }; // Client uploads to 'url', then sends 'key' (or full url) to create submission
    }
}
