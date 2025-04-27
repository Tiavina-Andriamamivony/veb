import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const player = await prisma.player.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        teams: true,
        stats: true,
        matchStats: true,
        equipment: true,
        attendances: true,
      },
    });
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }
    return NextResponse.json(player);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch player' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const player = await prisma.player.update({
      where: { id: params.id },
      data: {
        position: body.position,
        jerseyNumber: body.jerseyNumber,
        category: body.category,
        isActive: body.isActive,
        user: {
          update: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            profileImage: body.profileImage,
          },
        },
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(player);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update player' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.player.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Player deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete player' }, { status: 500 });
  }
}