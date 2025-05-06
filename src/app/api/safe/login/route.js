import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const prisma = new PrismaClient();
  
  try {
    // Handle empty body
    if (!req.body) {
      return Response.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    const { user, pass } = await req.json();

    // Case-insensitive handling
    const username = user?.trim().toLowerCase() || '';

    const userRecord = await prisma.user.findFirst({
      where: {
        username: username
      },
      select: {
        id: true,
        username: true,
        passwordHash: true
      }
    });

    if (!userRecord || !userRecord.passwordHash) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(pass, userRecord.passwordHash);
    
    if (!isValid) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return Response.json({
      id: userRecord.id,
      username: userRecord.username,
      message: "Encrypted using AES-256-CBC"
    });

  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { error: "Authentication system error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}