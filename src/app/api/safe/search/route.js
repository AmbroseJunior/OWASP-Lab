import { PrismaClient } from '@prisma/client';

export async function POST(req) {
  const prisma = new PrismaClient();
  const { query } = await req.json();

  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });

    return Response.json(products);
  } catch (error) {
    return Response.json([]);
  } finally {
    await prisma.$disconnect();
  }
}