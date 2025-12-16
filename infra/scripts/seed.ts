import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding...')

    // Create Default Journal
    const journal = await prisma.journal.upsert({
        where: { slug: 'demo' },
        update: {},
        create: {
            name: 'Editlyr Demo Journal',
            slug: 'demo',
            description: 'A demo journal for the Editlyr platform.',
        },
    })

    // Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@editlyr.org' },
        update: {},
        create: {
            email: 'admin@editlyr.org',
            password: 'hashedpassword', // In production, use bcrypt hash
            name: 'Admin User',
            roles: ['ADMIN'],
            journalId: journal.id,
        },
    })

    console.log({ journal, admin })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
