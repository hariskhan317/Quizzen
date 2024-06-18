import React from 'react';

interface QuizComponentProps{
    item: {
        question: string;
        choices: string[];
        correctAnswer: string;
      };
    quizIndex: number;
}

export const QuizComponent: React.FC<QuizComponentProps>  = ({ item, quizIndex }) => {
  return (
    <div className='px-4 md:px-32'>
      <h1 className='text-xl font-semibold py-10'>Question {quizIndex + 1}. {item.question}</h1>
      <div className='grid grid-cols-2 gap-10'> 
        {item.choices.map((choice, index) => (
          <button key={index} className='bg-violet-700 py-3 px-3 rounded-lg text-white font-medium'>{choice}</button>
        ))} 
      </div>
      <h1 className='text-base font-normal py-10'>Correct Answer: {item.correctAnswer}</h1>
    </div>
  );
};
