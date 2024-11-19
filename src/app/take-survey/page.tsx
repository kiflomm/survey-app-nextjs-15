'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Option {
  id: string;
  option: string;
  surveyId:string;
}
interface ISurvey {
  id:string;
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

  const currentSurvey = surveys[currentIndex] ?? {question: '', options: []};

  const handleSubmit = (optionId: string) => {
    setAnswers(answers => ({...answers, [currentSurvey.id]: optionId}));
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
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>{currentSurvey.question}</h2>
          <ul>
            {currentSurvey.options.map(option => (
              <li key={option.id}>
                <button onClick={() => handleSubmit(option.id)}>
                  {option.option}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              Prev
            </button>
            {isLastQuestion ? (
              <button onClick={handleFinish}>
                Finish
              </button>
            ) : (
              <button onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyList;

