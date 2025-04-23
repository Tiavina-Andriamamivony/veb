import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const trainings = await prisma.training.findMany({
      include: {
        team: true,
        attendees: {
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(trainings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trainings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const training = await prisma.training.create({
      data: {
        date: new Date(body.date),
        location: body.location,
        description: body.description,
        teamId: body.teamId,
        attendees: {
          connect: body.attendeeIds.map((id: string) => ({ id })),
        },
      },
      include: {
        team: true,
        attendees: true,
      },
    });
    return NextResponse.json(training, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create training' }, { status: 500 });
  }
}