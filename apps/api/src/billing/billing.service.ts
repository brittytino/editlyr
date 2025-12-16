import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Plan } from '@prisma/client';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
    private stripe: Stripe;
    private readonly LIMITS = {
        [Plan.FREE]: {
            submissions: 5,
            storageMB: 100,
        },
        [Plan.PRO]: {
            submissions: Infinity,
            storageMB: 10000,
        }
    };

    constructor(private prisma: PrismaService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
            apiVersion: '2024-11-20.acacia' as any, // Use latest API version available or provided
        });
    }

    async checkSubmissionLimit(journalId: string) {
        const journal = await this.prisma.journal.findUnique({
            where: { id: journalId },
            include: { subscription: true, submissions: true }
        });

        if (!journal?.subscription) return;

        // Allow unlimited if PRO
        const plan = journal.subscription.plan;
        if (plan === Plan.PRO) return;

        const limit = this.LIMITS[plan].submissions;
        const currentCount = journal.submissions.length;

        if (currentCount >= limit) {
            throw new BadRequestException(`Free plan limit reached (${limit} submissions). Upgrade to Pro.`);
        }
    }

    async checkStorageLimit(journalId: string, fileSize: number) {
        const journal = await this.prisma.journal.findUnique({
            where: { id: journalId },
            include: { subscription: true }
        });
        if (!journal?.subscription) return;

        const limitMB = this.LIMITS[journal.subscription.plan].storageMB;
        const limitBytes = limitMB * 1024 * 1024;

        if (fileSize > limitBytes) {
            throw new BadRequestException(`File too large for your plan. Limit: ${limitMB}MB`);
        }
    }

    // --- Stripe Logic ---

    async createCheckoutSession(journalId: string, userId: string) {
        const journal = await this.prisma.journal.findUnique({
            where: { id: journalId },
            include: { subscription: true }
        });
        if (!journal) throw new NotFoundException('Journal not found');

        // Create Checkout Session
        const session = await this.stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            customer_email: 'admin@' + journal.slug + '.editlyr.org', // Mock or real admin email
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID_PRO || 'price_mock_pro',
                    quantity: 1,
                },
            ],
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/settings?success=true`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/settings?canceled=true`,
            metadata: {
                journalId: journal.id,
                userId: userId
            }
        });

        return { url: session.url };
    }

    async createPortalSession(journalId: string) {
        const journal = await this.prisma.journal.findUnique({
            where: { id: journalId },
            include: { subscription: true }
        });

        if (!journal?.subscription?.stripeCustomerId) {
            throw new BadRequestException('No billing account found.');
        }

        const session = await this.stripe.billingPortal.sessions.create({
            customer: journal.subscription.stripeCustomerId,
            return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/settings`,
        });

        return { url: session.url };
    }

    async handleWebhook(signature: string, payload: Buffer) {
        // Logic to verify signature
        // const event = this.stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);

        // For MVP without real webhook secret / signature matching (local testing):
        // We assume the body is the event.
        const event = JSON.parse(payload.toString());

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const journalId = session.metadata.journalId;

            await this.prisma.subscription.update({
                where: { journalId },
                data: {
                    stripeCustomerId: session.customer,
                    stripeSubscriptionId: session.subscription,
                    plan: Plan.PRO,
                    status: 'active'
                }
            });
        }

        if (event.type === 'customer.subscription.deleted') {
            // Downgrade to free
            const subscription = event.data.object;
            // Find subscription by stripe ID
            const dbSub = await this.prisma.subscription.findFirst({ where: { stripeSubscriptionId: subscription.id } });
            if (dbSub) {
                await this.prisma.subscription.update({
                    where: { id: dbSub.id },
                    data: {
                        plan: Plan.FREE,
                        status: 'canceled'
                    }
                });
            }
        }
    }
}
