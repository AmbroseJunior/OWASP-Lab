import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}