import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const stats = await prisma.stats.findMany({
      where: { playerId: params.id },
      orderBy: { date: 'desc' },
    });

    const matchStats = await prisma.matchStats.findMany({
      where: { playerId: params.id },
      include: { match: true },
    });

    // Calculate performance metrics
    const performance = {
      averagePoints: calculateAverage(stats.map(s => s.points)),
      averageRebounds: calculateAverage(stats.map(s => s.rebounds)),
      averageAssists: calculateAverage(stats.map(s => s.assists)),
      strengths: determineStrengths(stats),
      improvements: determineImprovements(stats),
    };

    return NextResponse.json({ stats, matchStats, performance });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

function calculateAverage(numbers: number[]): number {
  return numbers.length ? numbers.reduce((a, b) => a + b, 0) / numbers.length : 0;
}

function determineStrengths(stats: any[]): string[] {
  // Logic to determine player's strengths based on stats
  const averages = {
    points: calculateAverage(stats.map(s => s.points)),
    rebounds: calculateAverage(stats.map(s => s.rebounds)),
    assists: calculateAverage(stats.map(s => s.assists)),
  };

  const strengths = [];
  if (averages.points > 15) strengths.push('Scoring');
  if (averages.rebounds > 8) strengths.push('Rebounding');
  if (averages.assists > 5) strengths.push('Playmaking');

  return strengths;
}

function determineImprovements(stats: any[]): string[] {
  // Logic to determine areas for improvement
  const averages = {
    points: calculateAverage(stats.map(s => s.points)),
    rebounds: calculateAverage(stats.map(s => s.rebounds)),
    assists: calculateAverage(stats.map(s => s.assists)),
  };

  const improvements = [];
  if (averages.points < 10) improvements.push('Scoring');
  if (averages.rebounds < 5) improvements.push('Rebounding');
  if (averages.assists < 3) improvements.push('Playmaking');

  return improvements;
}