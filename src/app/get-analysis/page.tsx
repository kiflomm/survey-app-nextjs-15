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
  const [analysis, setAnalysis] = useState<Record<string, Record<string, number>>>({});
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
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">Survey Analysis</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {surveys.map((survey) => {
          const surveyAnalysis = analysis[survey.id];
          if (!surveyAnalysis) return null;

          return (
            <Card key={survey.id} className="w-full max-w-md shadow-lg rounded-lg flex flex-col justify-between">
              <CardHeader className="bg-indigo-600 text-white p-5 rounded-t-lg">
                <CardTitle className="text-2xl">{survey.question}</CardTitle>
                <CardDescription className="text-sm text-indigo-200 mt-1">
                  Here is how people have responded:
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 bg-white">
                <ul className="space-y-3">
                  {survey.options.map((option) => (
                    <li key={option.id} className="flex justify-between items-center p-3 bg-indigo-50 rounded-md">
                      <span className="text-gray-800">{option.option}</span>
                      <span className="font-bold text-indigo-600">{surveyAnalysis[option.id] || 0} votes</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-5 bg-indigo-100 rounded-b-lg -mb-px">
                <p className="text-sm text-indigo-600">Updated at {new Date().toLocaleString()}</p>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default AnalysisPage;

