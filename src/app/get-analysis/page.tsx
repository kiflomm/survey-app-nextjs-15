'use client'
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface IOption {
    id: string;
    option: string;
    surveyId: string;
}
interface Isurvey {
    id: string;
    question: string;
    options: IOption[];
}
const AnalysisPage = () => {
  const [analysis, setAnalysis] = useState<Record<string,Record<string,number>>>({});
  const [surveys, setSurveys] = useState<Isurvey[]>([]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch('/api/get-analysis');
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAnalysis();
  }, []);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch('/api/get-survey');
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSurvey();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 gray-red-800">Survey Analysis</h1>
      <div className="space-y-8">
        {surveys.map((survey) => {
          const surveyAnalysis = analysis[survey.id];
          if (!surveyAnalysis) return null;

          return (
            <Card key={survey.id} className="max-w-2xl mx-auto shadow-lg border border-gray-200 rounded-lg">
              <CardHeader className="bg-blue-600 text-white p-4 rounded-t-lg">
                <CardTitle className="text-xl">{survey.question}</CardTitle>
                <CardDescription className="text-sm text-red-600">Here is how people have responded:</CardDescription>
              </CardHeader>
              <CardContent className="p-4 bg-white">
                <ul className="space-y-2">
                  {survey.options.map((option) => (
                    <li key={option.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span className="text-gray-700">{option.option}</span>
                      <span className="font-semibold text-blue-600">{surveyAnalysis[option.id] || 0} votes</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-4 bg-gray-100 rounded-b-lg">
                <p className="text-sm text-red-600">Thank you for participating!</p>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default AnalysisPage;

