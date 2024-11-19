'use client'
import { useState, useEffect } from 'react';
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

  useEffect(()=>{
    const fetchSurvey = async () => {
        try {
            const response = await fetch('/api/get-survey');
            const data = await response.json();
            setSurveys(data);
        }catch(error){
            console.error(error);
        }
    }
    fetchSurvey();
  },[])

  return (
    <div>
      <h1>Survey Analysis</h1>
      {surveys.map((survey) => {
        const surveyAnalysis = analysis[survey.id];
        if (!surveyAnalysis) return null;
        return (
          <div key={survey.id}>
            <h2>{survey.question}</h2>
            <ul>
              {survey.options.map((option) => (
                <li key={option.id}>
                  {option.option}: {surveyAnalysis[option.id] || 0} votes
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
export default AnalysisPage;
