import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const annnoucement1 = await prisma.announcement.create({
    data: {
      title: 'Ini title dari seeder',
      detail: 'Ini detail dari seeder',
    },
  });

  console.log({ annnoucement1 });
}

main()
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
