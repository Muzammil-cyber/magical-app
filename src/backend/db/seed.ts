const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

const init = {
    id: '1',
    username: 'admin',
    password: 'admin',
    posts: {
        create: { title: 'Hello World', content: "This is my first post" },
    },
}

const seed = async () => {
    console.log('🌱 User seeding...');
    await prisma.user.upsert({ where: { id: init.id }, update: init, create: init });
    console.clear();
    console.log('🌱 User seeded');
    const allUsers = await prisma.user.findMany({ include: { posts: true } });
    console.dir(allUsers, { depth: null });
}

seed().then(() => {
    console.log('🌱 Database seeded');
}).catch((e) => {
    console.error(e)
}).finally(async () => {
    await prisma.$disconnect()
})
