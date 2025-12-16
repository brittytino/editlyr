import { PrismaClient, Role, Plan, SubmissionStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Create Platform Admin
    const adminEmail = 'admin@editlyr.org';
    const adminPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: adminPassword,
            name: 'Platform Admin',
            roles: [Role.ADMIN],
        },
    });
    console.log(`👤 Platform Admin: ${admin.email}`);

    // 2. Create Demo Journal
    const journalSlug = 'demo-journal';
    const journal = await prisma.journal.upsert({
        where: { slug: journalSlug },
        update: {},
        create: {
            name: 'Editlyr Demo Journal',
            slug: journalSlug,
            description: 'A demonstration journal for the Editlyr platform.',
        },
    });
    console.log(`book Journal: ${journal.name} (${journal.slug})`);

    // 3. Create Journal Editor
    const editorEmail = 'editor@demo.editlyr.org';
    const editorPassword = await bcrypt.hash('editor123', 10);

    const editor = await prisma.user.upsert({
        where: { email: editorEmail },
        update: {},
        create: {
            email: editorEmail,
            password: editorPassword,
            name: 'Demo Editor',
            roles: [Role.EDITOR],
            journalId: journal.id,
        },
    });
    console.log(`🖊️ Editor: ${editor.email}`);

    // 4. Create Free Subscription for Journal
    const sub = await prisma.subscription.upsert({
        where: { journalId: journal.id },
        update: {},
        create: {
            journalId: journal.id,
            plan: Plan.FREE,
            status: 'active',
        },
    });
    console.log(`💳 Subscription: ${sub.plan} (${sub.status})`);

    // 5. Create a Seed Submission
    const authorEmail = 'author@demo.editlyr.org';
    const authorPassword = await bcrypt.hash('author123', 10);

    const author = await prisma.user.upsert({
        where: { email: authorEmail },
        update: {},
        create: {
            email: authorEmail,
            password: authorPassword,
            name: 'Demo Author',
            roles: [Role.AUTHOR],
            journalId: journal.id,
        },
    });

    const submission = await prisma.submission.create({
        data: {
            title: 'The Impact of AI on Academic Publishing',
            abstract: 'This paper explores how Large Language Models are transforming the peer review process...',
            status: SubmissionStatus.SUBMITTED,
            journalId: journal.id,
            authorId: author.id,
            fileUrl: 'https://res.cloudinary.com/demo/image/upload/v1/sample.pdf', // Mock URL
        }
    });
    console.log(`📄 Submission: ${submission.title}`);

    console.log('✅ Seed completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
