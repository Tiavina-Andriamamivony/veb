import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      include: {
        user: true,
        stats: true,
        teams: true,
        equipment: true,
      },
    });
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const player = await prisma.player.create({
      data: {
        user: {
          create: {
            email: body.email,
            name: body.name,
            role: 'PLAYER',
          },
        },
        position: body.position,
        jerseyNumber: body.jerseyNumber,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create player' }, { status: 500 });
  }
}