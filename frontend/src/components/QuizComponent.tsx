import React from 'react';

interface QuizComponentProps {
  item: {
    question: string;
    choices: string[];
    correctAnswer: string;
  };
  index: number;
  active: number;
  score: number;
  setActive: (index: number) => void;
  setScore: (update: (prevScore: number) => number) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ item, index, active, setActive, score, setScore }) => {
  const handleChoice = (choiceIndex: number, choice: string) => {
    if (choice === item.correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(prev - 1, 0)); // Prevent score from going below 0
    }
    setActive(choiceIndex);
  };
  
  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className='px-4 md:px-32'> 
      <h1 className='text-xl font-semibold py-10'>Question {index + 1}. {item.question}</h1>
      <div className='grid grid-cols-2 gap-10 lg:px-16'>
        {item.choices.map((choice, choiceIndex) => (
          <button
            key={choiceIndex}
            onClick={() => handleChoice(choiceIndex, choice)}
            className={`py-3 px-3 rounded-lg border-2 border-gray-800 transition-all ease-in-out delay-all font-medium hover:bg-white hover:text-gray-800 ${active === choiceIndex ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
          >
            {choice}
          </button>
        ))}
      </div>
      <h1 className='text-base font-normal py-10'>Correct Answer: {item.correctAnswer}</h1>
    </div>
  );
};
