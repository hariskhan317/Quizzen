import { useState } from "react";
import { postQuizQuestion } from '../store/quizSlice/asyncThunk';
import { useAppDispatch } from '../store/hooks';
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
// import loaderGif from '../assets/load-8510_256.gif';

interface QuizModelCreatorProps {
  setShowModel: (show: boolean) => void;
}
 
export const QuizModelCreator: React.FC<QuizModelCreatorProps> = ({setShowModel}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<string>('');
  const [number, setNumber] = useState<number>(0);

  const handleStartQuiz = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { topic, number };
    dispatch(postQuizQuestion(data));
    return navigate('/quizpage')
  };

  return (
    <div className="absolute">
      <div className="quiz-selector-container px-6 py-10 mt-10 w-7/12 mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold mb-4 text-center">Quiz Creation</h2>
          <button onClick={() => {setShowModel(false)}}>
            <IoCloseSharp className="text-3xl" />
          </button>
        </div>
        <form onSubmit={handleStartQuiz} className="mt-5">
          <div>
            <label htmlFor="topic" className="text-base font-semibold">Topic</label>
            <input 
              id="topic"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
              type="text"
              className="mt-1 w-full border-2 border-gray-300 rounded py-1 px-3"
              placeholder="Topic"
            />
            <span className="text-xs text-gray-500">Please provide a topic you would like to be quizzed on here</span>
          </div>
          <div className="mt-6">
            <label htmlFor="number" className="text-base font-semibold">Number of Questions</label>
            <input
              id="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber(Number(e.target.value))}
              type="number"
              className="mt-1 w-full border-2 border-gray-300 rounded py-1 px-3"
              placeholder="Number"
            />
            <span className="text-xs text-gray-500">You can choose how many questions you would like to be quizzed on here</span>
          </div>
          <button type="submit" className="mt-10 w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-all ease-in-out delay-all">
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};
