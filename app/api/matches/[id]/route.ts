import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const match = await prisma.match.findUnique({
      where: { id: params.id },
      include: {
        homeTeam: true,
        awayTeam: true,
        matchStats: {
          include: {
            player: { include: { user: true } },
          },
        },
      },
    });
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch match' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const match = await prisma.match.update({
      where: { id: params.id },
      data: {
        date: new Date(body.date),
        location: body.location,
        homeTeamId: body.homeTeamId,
        awayTeamId: body.awayTeamId,
        homeScore: body.homeScore,
        awayScore: body.awayScore,
        status: body.status,
        quarter: body.quarter,
        notes: body.notes,
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        matchStats: true,
      },
    });
    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update match' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.match.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Match deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete match' }, { status: 500 });
  }
}