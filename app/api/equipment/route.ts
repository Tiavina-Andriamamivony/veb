import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const equipment = await prisma.equipment.findMany({
      include: {
        assignedTo: {
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const equipment = await prisma.equipment.create({
      data: {
        name: body.name,
        type: body.type,
        status: body.status,
        condition: body.condition,
        purchaseDate: new Date(body.purchaseDate),
        playerId: body.playerId,
        assignedAt: body.playerId ? new Date() : null,
      },
      include: {
        assignedTo: true,
      },
    });
    return NextResponse.json(equipment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create equipment' }, { status: 500 });
  }
}