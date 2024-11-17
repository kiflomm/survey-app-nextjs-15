import {prisma} from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const surveys = await prisma.survey.findMany();
      return NextResponse.json(surveys, { status: 200 });
    } catch (error) {
      console.error('Error fetching surveys:', error);
      return NextResponse.json({ error: 'Failed to fetch surveys' }, { status: 500 });
    }
  }