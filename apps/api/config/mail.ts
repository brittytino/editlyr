export const mailConfig = {
    transport: {
        host: process.env.SMTP_HOST || 'localhost',
        port: parseInt(process.env.SMTP_PORT || '1025', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    },
    defaults: {
        from: '"No Reply" <noreply@editlyr.com>',
    },
};
