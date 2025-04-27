import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        coach: {
          include: {
            user: true,
          },
        },
        players: {
          include: {
            user: true,
          },
        },
        trainings: true,
      },
    });
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const team = await prisma.team.create({
      data: {
        name: body.name,
        category: body.category,
        season: body.season,
        coachId: body.coachId,
        players: {
          connect: body.playerIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        coach: {
          include: {
            user: true,
          },
        },
        players: true,
      },
    });
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}