import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const answers  = await request.json();
  console.log("answers: ",answers);
  try {
    // Loop through each answer and create an entry in the Answer table
    for (const surveyId in answers) {
      const optionId = answers[surveyId];
      await prisma.answer.create({
        data: {
          surveyId,
          optionId,
        },
      });
    }
    return NextResponse.json({ message: 'Survey submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error submitting survey' }, { status: 500 });
  }
}