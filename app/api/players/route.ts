import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      include: {
        user: true,
        teams: true,
        stats: true,
        matchStats: true,
        equipment: true,
        attendances: true,
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
            firstName: body.firstName,
            lastName: body.lastName,
            role: 'PLAYER',
            profileImage: body.profileImage,
          },
        },
        birthDate: new Date(body.birthDate),
        gender: body.gender,
        category: body.category,
        position: body.position,
        jerseyNumber: body.jerseyNumber,
        licenseDate: new Date(body.licenseDate),
        licenseExpiry: new Date(new Date(body.licenseDate).setFullYear(new Date(body.licenseDate).getFullYear() + 4)),
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