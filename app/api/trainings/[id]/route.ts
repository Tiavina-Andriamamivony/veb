import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const training = await prisma.training.findUnique({
      where: { id: params.id },
      include: {
        team: true,
        attendees: { include: { user: true } },
      },
    });
    if (!training) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 });
    }
    return NextResponse.json(training);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch training' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const training = await prisma.training.update({
      where: { id: params.id },
      data: {
        date: new Date(body.date),
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        location: body.location,
        description: body.description,
        type: body.type,
        teamId: body.teamId,
        attendees: {
          set: body.attendeeIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        team: true,
        attendees: { include: { user: true } },
      },
    });
    return NextResponse.json(training);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update training' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.training.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Training deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete training' }, { status: 500 });
  }
}