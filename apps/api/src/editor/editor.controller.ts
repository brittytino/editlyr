import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { EditorService } from './editor.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DecisionStatus } from '@prisma/client';

@Controller('editor')
@UseGuards(JwtAuthGuard)
export class EditorController {
    constructor(private readonly editorService: EditorService) { }

    @Get('submissions')
    findAll(@Request() req: any) {
        // Assuming admin/editor has journalId in user object or associated via DB
        // For MVP, fetch journalId from user's record
        // We'll trust the user.journalId for now or fetch user again.
        // Ideally Guard checks Roles.
        return this.editorService.findAllSubmissions('demo'); // Hardcoded 'demo' journal slug or look up form DB for MVP
        // Real implementation: req.user.journalId
    }

    @Get('submissions/:id')
    findOne(@Param('id') id: string) {
        return this.editorService.getSubmission(id);
    }

    @Post('submissions/:id/assign')
    assignReviewer(@Param('id') id: string, @Body() body: { reviewerId: string }) {
        return this.editorService.assignReviewer(id, body.reviewerId);
    }

    @Post('submissions/:id/decision')
    makeDecision(@Param('id') id: string, @Request() req: any, @Body() body: { decision: DecisionStatus; notes?: string }) {
        return this.editorService.makeDecision(id, req.user.userId, body.decision, body.notes);
    }
}
