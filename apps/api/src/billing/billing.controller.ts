import { Controller, Post, Body, Req, Headers, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Post('checkout')
    @Post('upgrade')
    @UseGuards(JwtAuthGuard)
    async upgrade(@Request() req: any, @Body() body: { journalId: string; userId: string }) {
        // Initiates Razorpay Subscription flow
        // For now, journalId and userId are taken from req.user, but body is kept for flexibility.
        return this.billingService.createSubscription(req.user.journalId, req.user.userId);
    }

    @Post('verify')
    @UseGuards(JwtAuthGuard)
    async verify(@Body() body: { razorpay_payment_id: string; razorpay_subscription_id: string; razorpay_signature: string; journalId: string }, @Request() req: any) {
        // For now, journalId is taken from req.user, but body is kept for flexibility.
        return this.billingService.verifyPayment(body.razorpay_signature, body.razorpay_payment_id, body.razorpay_subscription_id, req.user.journalId);
    }

    @Post('portal')
    @UseGuards(JwtAuthGuard)
    async createPortal(@Request() req: any) {
        // Razorpay manages sub portals differently or not at all in the same way stripe does.
        // For MVP, return a message or link to contact support.
        return { message: 'For cancellations, please contact support or check your email.' };
    }

    @Post('webhook')
    async webhook(@Body() body: any, @Req() req: any) {
        // Razorpay sends "x-razorpay-signature" header
        const signature = req.headers['x-razorpay-signature'];

        // Mock body handling for webhook compatibility
        await this.billingService.handleWebhook(body, signature as string); // Cast to string
    }
}
