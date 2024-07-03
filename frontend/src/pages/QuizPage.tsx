import { useEffect, useState } from 'react'; 
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userAuthStatus } from '../store/userSlice/asyncThunk';
import { updateQuizResult } from '../store/quizSlice/asyncThunk';
import { useNavigate } from 'react-router-dom';
import loaderGif from '../assets/load-8510_256.gif'; 
import { QuizComponent } from '../components/QuizComponent' 
 
const QuizPage = () => {
    const { isLogin } = useAppSelector((state) => state.user);
    const { quiz } = useAppSelector((state) => state.quiz);
    const { status } = useAppSelector((state) => state.quiz);
    const [ index, setIndex ] = useState<number>(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState<number | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    // const [ checkAnswer, setCheckAnswer] = useState<boolean>(false)

  useEffect(() => {
    dispatch(userAuthStatus());
      if (!isLogin) {
          navigate('/login');
      }
    }, [isLogin, navigate, dispatch]);
    
  useEffect(() => {
    if (quiz?.questions?.length) {
      if (index >= quiz.questions.length) {
        const data = {selectedOptions, id: quiz._id};
        dispatch(updateQuizResult(data));
        navigate('/result-page');
      }
    }
  }, [index, quiz, navigate]);

  
  
  // Check if quiz is null or undefined, render loading if it is
  if (status === 'loading') {
    return <div><img className='h-20 w-20 mx-auto mt-40' src={loaderGif} alt="Loading..." /></div>;
  }
  
  if (!quiz || !quiz.questions || quiz.questions.length === 0 || !quiz.questions[index]) {
    return <h1 className="text-3xl font-bold mb-4 capitalize">No Quiz Found</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 capitalize">{quiz.topic}</h1>
      <p className="text-lg mb-4">Number of Questions: {quiz.number}</p>
      <QuizComponent
        active={active}
        setActive={setActive}
        item={quiz.questions[index]}
        index={index}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        setIndex={setIndex}
      />
    </div>
  );
}

export default QuizPage;