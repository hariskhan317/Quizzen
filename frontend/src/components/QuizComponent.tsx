import React, { useState } from 'react'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
interface QuizComponentProps {
  item: {
    question: string;
    choices: string[];
    correctAnswer: string;
  };
  index: number; 
  active: number; 
  setIndex: (indexUpdater: (prevIndex: number) => number) => void;
  setActive: (active: number | null) => void;
  setSelectedOptions: (selectedOptionsUpdater: (prev: string[]) => string[]) => void; 
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ setSelectedOptions, item, index, setIndex, active, setActive}) => {
 
  const [ disableButton, setDisableButton ] = useState(false)
  const handleResult = (choice: string, choiceIndex:number) => {
    setActive(choiceIndex)
    setDisableButton(true);
    setSelectedOptions((prev) => [...prev, choice])

    if (choice === item.correctAnswer.toString()) {
      toast.success("true!!");
    } else {
      toast.error("false!!");
    }
    setTimeout(() => {
      setIndex((prev: number) => prev + 1);
      setActive(null);
      setDisableButton(false);
    }, 1500);

  };  
  
  return (
    <div className='px-4 md:px-32'> 
      <h1 className='text-xl font-semibold py-10'>Question {index + 1}. {item?.question}</h1>
      <div className='grid grid-cols-2 gap-10 lg:px-16'>
        {item?.choices?.map((choice, choiceIndex) => (
          <button
            key={choiceIndex}  
            onClick={() => handleResult(choice,choiceIndex)}
            disabled={disableButton}
            className={`py-3 px-3 rounded-lg border-2 border-gray-800 transition-all ease-in-out delay-all font-medium hover:bg-white hover:text-gray-800 ${active ===  choiceIndex ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
          >
            {choice}
          </button>
        ))}
      </div> 
    </div>
  );
};