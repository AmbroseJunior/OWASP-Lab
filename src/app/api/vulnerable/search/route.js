import { PrismaClient } from '@prisma/client';
export async function POST(req) {
    const { query } = await req.json();
    const prisma = new PrismaClient();
    
    // Vulnerable to SQLi
    const products = await prisma.$queryRawUnsafe(
      `SELECT * FROM Product WHERE name LIKE '%${query}%'`
    );
    
    return Response.json(products);
  }