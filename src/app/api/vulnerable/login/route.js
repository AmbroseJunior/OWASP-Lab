import { PrismaClient } from '@prisma/client';

export async function POST(req) {
  const { user, pass } = await req.json();
  const prisma = new PrismaClient();
  
  try {
    // Vulnerable SQLi login
    const users = await prisma.$queryRawUnsafe(
      `SELECT * FROM User WHERE username = '${user}' AND password = '${pass}'`
    );
    
    return Response.json(users.length > 0 ? users[0] : null);
    
  } catch (error) {
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}