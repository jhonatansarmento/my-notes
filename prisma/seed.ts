import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Seeding banco...');

  // Usuários de exemplo
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Doe',
      image: 'https://i.pravatar.cc/150?img=1',
      notes: {
        create: [
          {
            title: 'Primeira nota da Alice',
            content: 'Essa é a primeira nota da Alice',
            priority: 'HIGH',
          },
          {
            title: 'Estudar Next.js 15',
            content: 'Ler a documentação do App Router e Server Actions',
            priority: 'MEDIUM',
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      image: 'https://i.pravatar.cc/150?img=2',
      notes: {
        create: [
          {
            title: 'Lista de compras',
            content: 'Comprar pão, leite e café',
            priority: 'LOW',
            done: true,
          },
          {
            title: 'Reunião com o time',
            content: 'Preparar apresentação do projeto',
            priority: 'HIGH',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 dias
          },
        ],
      },
    },
  });

  console.log(`✅ Seed completo: ${user1.email}, ${user2.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
