import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const answers = await prisma.answer.groupBy({
      by: ['surveyId', 'optionId'],
      _count: {
        _all: true,
      },
    });

      const result = answers.reduce<Record<string, Record<string, number>>>((acc, current) => {
        const surveyId = current.surveyId;
        const optionId = current.optionId;
        const count = current._count._all;
      
        if (!acc[surveyId]) {
          acc[surveyId] = {};
        }
      
        acc[surveyId][optionId] = count;
      
        return acc;
      }, {});
      
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch analysis' }, { status: 500 });
  }
}