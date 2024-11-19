import React from 'react';
interface IndividualAnalysisProps {
  answers: Record<string, string>;
}

const IndividualAnalysis: React.FC<IndividualAnalysisProps> = ({ answers }) => {
    
  const surveyResponses = Object.entries(answers);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Individual Survey Response Analysis</h2>
      <ul>
        {surveyResponses.map(([surveyId, answerId]) => (
          <li key={surveyId} className="mb-4">
            <h3 className="text-md font-bold">Survey {surveyId}</h3>
            <p>Answer: {answerId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndividualAnalysis;