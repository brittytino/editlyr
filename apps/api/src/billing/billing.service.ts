import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Plan } from '@prisma/client';
import Razorpay = require('razorpay');
import * as crypto from 'crypto';

@Injectable()
export class BillingService {
    private razorpay: any;
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
        if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
            this.razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            });
        }
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

    // --- Razorpay Logic ---

    async createSubscription(journalId: string, userId: string) {
        if (!this.razorpay) throw new BadRequestException('Razorpay credentials not configured');

        const journal = await this.prisma.journal.findUnique({
            where: { id: journalId },
            include: { subscription: true }
        });
        if (!journal) throw new NotFoundException('Journal not found');

        // Create a subscription on Razorpay
        // Note: You must create a Plan in Razorpay Dashboard first and get the plan_id
        // or check if we can create on the fly. Usually plan_id is fixed env var.
        const planId = process.env.RAZORPAY_PLAN_ID_PRO || 'plan_mock_pro_id';

        try {
            const subscription = await this.razorpay.subscriptions.create({
                plan_id: planId,
                total_count: 120, // 10 years monthly
                quantity: 1,
                customer_notify: 1,
                notes: {
                    journalId: journal.id,
                    userId: userId
                }
            });

            return {
                subscriptionId: subscription.id,
                keyId: process.env.RAZORPAY_KEY_ID,
                journalId: journal.id
            };
        } catch (error) {
            console.error('Razorpay Create Subscription Error:', error);
            throw new BadRequestException('Failed to initiate subscription');
        }
    }

    async verifyPayment(razorpaySignature: string, razorpayPaymentId: string, razorpaySubscriptionId: string, journalId: string) {
        // HmacSHA256(razorpay_payment_id + "|" + razorpay_subscription_id, secret);
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
            .update(razorpayPaymentId + "|" + razorpaySubscriptionId)
            .digest('hex');

        if (generated_signature === razorpaySignature) {
            // Payment successful
            await this.prisma.subscription.update({
                where: { journalId },
                data: {
                    razorpaySubscriptionId: razorpaySubscriptionId,
                    plan: Plan.PRO,
                    status: 'active'
                }
            });
            return { success: true };
        } else {
            throw new BadRequestException('Invalid signature');
        }
    }

    // Webhook implementation for handling renewals / cancellations
    async handleWebhook(body: any, signature: string) {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) return; // Skip if not configured

        const expectedSignature = crypto.createHmac('sha256', secret)
            .update(JSON.stringify(body))
            .digest('hex');

        if (expectedSignature !== signature) {
            throw new BadRequestException('Invalid webhook signature');
        }

        const event = body.event;
        const payload = body.payload;

        if (event === 'subscription.charged') {
            const subId = payload.subscription.entity.id;
            // Renew logic (usually just ensure it stays active)
            await this.prisma.subscription.updateMany({
                where: { razorpaySubscriptionId: subId },
                data: { status: 'active' }
            });
        }

        if (event === 'subscription.cancelled' || event === 'subscription.halted') {
            const subId = payload.subscription.entity.id;
            await this.prisma.subscription.updateMany({
                where: { razorpaySubscriptionId: subId },
                data: {
                    status: 'canceled',
                    plan: Plan.FREE
                }
            });
        }
    }
}
