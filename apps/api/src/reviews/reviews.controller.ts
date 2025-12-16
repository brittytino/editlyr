import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    @Get('me')
    getMyReviews(@Request() req: any) {
        return this.reviewsService.findByReviewer(req.user.userId);
    }

    @Get(':id')
    getReview(@Param('id') id: string) {
        return this.reviewsService.findOne(id);
    }

    @Post(':id')
    submitReview(@Param('id') id: string, @Body() body: { score: number; content: string }) {
        return this.reviewsService.submitReview(id, body.score, body.content);
    }

    @Post(':id/accept')
    acceptReview(@Param('id') id: string) {
        return this.reviewsService.acceptInvitation(id);
    }
}
