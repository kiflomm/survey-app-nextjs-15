'use client'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from '@/components/ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
interface Option {
  id: string;
  option: string;
  surveyId: string;
}
interface ISurvey {
  id: string;
  question: string;
  options: Option[]
}
const SurveyList = () => {
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    setLoading(true);
    axios.get('/api/get-survey')
      .then(response => {
        setSurveys(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const currentSurvey = surveys[currentIndex] ?? { question: '', options: [] };

  const handleSubmit = (optionId: string) => {
    setAnswers(answers => ({ ...answers, [currentSurvey.id]: optionId }));
    setCurrentIndex(currentIndex + 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const isLastQuestion = currentIndex >= surveys.length - 1;
  const areAllQuestionsAnswered = Object.keys(answers).length === surveys.length;

  const handleFinish = () => {
    if (!areAllQuestionsAnswered) {
      alert('You must answer all questions to submit the questionnaire');
      return;
    }
    console.log(answers);
    axios.post('/api/submit-survey', answers)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  };

  return (
    loading ? (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    ) : (
      <Card className="max-w-md mx-auto my-8 p-6 shadow-lg">
        <CardTitle className="text-2xl font-bold text-center mb-4">
          {currentSurvey.question}
        </CardTitle>
        <CardDescription className="text-center text-gray-600 mb-6">
          {currentIndex === surveys.length ? "": `${currentIndex + 1} / ${surveys.length}`}
          {currentIndex === surveys.length ? 
          <div>
            <p>Thank you for taking the survey</p>
            <Link href="/">
                <Button>Go Home</Button>
            </Link>
            
          </div> : ''}
        </CardDescription>
        <CardContent>
          <ul className="space-y-4">
            {currentSurvey.options.map(option => (
              <li key={option.id}>
                <Button className="w-full" onClick={() => handleSubmit(option.id)}>
                  {option.option}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between mt-6">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Prev
          </button>
          {isLastQuestion ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleFinish}
            >
              Finish
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </CardFooter>
      </Card>
    )
  );
};

export default SurveyList;

