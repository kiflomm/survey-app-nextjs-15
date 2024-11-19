import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
export async function POST(request: Request) {
  const { question, options } = await request.json();
  //console.log(question, options);
  try {
    await prisma.survey.create({
        data: {
          question,
          options: {
            create: options,
          },
        },
      });
    return NextResponse.json({ message: 'Survey created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating survey' }, { status: 500 });
  }
}
