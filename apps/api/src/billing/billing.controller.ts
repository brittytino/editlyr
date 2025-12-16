import { Controller, Post, Body, Req, Headers, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Post('checkout')
    @UseGuards(JwtAuthGuard)
    async createCheckout(@Request() req: any) {
        // Basic User->Journal lookup MVP
        // Assuming we have a way to know the journalId. 
        // In Phase 2 we attached Tenant guard or we look up from User.
        // Let's look up from user for robustness.
        return this.billingService.createCheckoutSession(req.user.journalId, req.user.userId); // Note: req.user.journalId needs to be ensured by strategy or lookup
    }

    @Post('portal')
    @UseGuards(JwtAuthGuard)
    async createPortal(@Request() req: any) {
        return this.billingService.createPortalSession(req.user.journalId);
    }

    @Post('webhook')
    async handleWebhook(@Headers('stripe-signature') signature: string, @Req() req: any) {
        if (!signature) {
            // For local testing without Stripe CLI proxying signature, we might skip verify or use a mock.
            // But strict implementations need signature.
            console.log('Webhook received without signature (Local Dev Mode?)');
        }
        // NestJS raw body handling is tricky. By default req.body is JSON.
        // We need raw buffer for Stripe signature verification usually.
        // For MVP Phase 3, we'll try to use the JSON body directly if signature fails or is missing,
        // assuming we are doing `stripe trigger` or similar.

        const rawBody = req.rawBody || JSON.stringify(req.body); // Hypothetical accessor if raw body middleware existed

        // Simply passing the body buffer mock
        await this.billingService.handleWebhook(signature, Buffer.from(JSON.stringify(req.body)));
    }
}
