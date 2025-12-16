import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: parseInt(process.env.SMTP_PORT || '587'),
            auth: {
                user: process.env.SMTP_USER || 'ethereal_user',
                pass: process.env.SMTP_PASS || 'ethereal_pass',
            },
        });
    }

    async sendMail(to: string, subject: string, text: string, html?: string) {
        if (process.env.NODE_ENV === 'test') {
            console.log(`[Mock Email] To: ${to}, Subject: ${subject}`);
            return;
        }

        try {
            const info = await this.transporter.sendMail({
                from: '"Editlyr System" <no-reply@editlyr.org>',
                to,
                subject,
                text,
                html: html || text,
            });
            console.log(`Email sent: ${info.messageId}`);
            return info;
        } catch (error) {
            console.error('Email sending failed:', error);
            // Don't crash app on email failure
        }
    }
}
