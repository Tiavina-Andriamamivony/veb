import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const team = await prisma.team.findUnique({
      where: { id: params.id },
      include: {
        coach: { include: { user: true } },
        players: { include: { user: true } },
        trainings: true,
        homeMatches: true,
        awayMatches: true,
      },
    });
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const team = await prisma.team.update({
      where: { id: params.id },
      data: {
        name: body.name,
        category: body.category,
        season: body.season,
        coachId: body.coachId,
        players: {
          set: body.playerIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        coach: { include: { user: true } },
        players: { include: { user: true } },
      },
    });
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.team.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Team deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
  }
}