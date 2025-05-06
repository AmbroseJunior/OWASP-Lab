const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create users with plain text passwords
  await prisma.user.createMany({
    data: [
      { username: 'alice', email: 'alice@example.com', password: 'pass123', passwordHash: 'temp' },
      { username: 'bob', email: 'bob@example.com', password: 'secret!', passwordHash: 'temp' }
    ]
  });

  // Update with hashed passwords
  const salt = await bcrypt.genSalt(10);
  const users = await prisma.user.findMany();
  
  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: await bcrypt.hash(user.password, salt)
      }
    });
  }

  // Create products
  await prisma.product.createMany({
    data: [
      { name: 'Laptop', description: 'High-performance', price: 999.99 },
      { name: 'Phone', description: 'Flagship', price: 699.99 }
    ]
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});