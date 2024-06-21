import { useEffect, useState } from 'react'; 
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userAuthStatus } from '../store/userSlice/asyncThunk';
import { useNavigate } from 'react-router-dom';
import { QuizComponent } from '../components/QuizComponent'
import loaderGif from '../assets/load-8510_256.gif';
 
const QuizPage = () => {
    const { isLogin } = useAppSelector((state) => state.user);
    const { quiz } = useAppSelector((state) => state.quiz);
    const { status } = useAppSelector((state) => state.quiz);
    const [index, setIndex] = useState<number>(0);
    const [active, setActive] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userAuthStatus());
        if (!isLogin) {
            navigate('/login');
        }

    }, [isLogin, navigate, dispatch]);
  
    const handleNext = () => {
      setIndex((prev) => prev + 1);
      setActive(null);
    }
  
    useEffect(() => {
      if (quiz && quiz.questions && index >= quiz.questions.length) {
        return navigate('/result')
      }
    }, [index])
 

  
    // Check if quiz is null or undefined, render loading if it is
    if (status === 'loading') {
      return <div><img className='h-20 w-20 mx-auto mt-40' src={loaderGif} alt="Loading..." /></div>;
    }
  
  return (
    <>{quiz && quiz.questions && quiz.questions.length > 0  ? (<>
      <div>
        <h1 className="text-3xl font-bold mb-4 capitalize">{quiz.topic}</h1>
        <p className="text-lg mb-4">Number of Questions: {quiz.number}</p>
        <p className="text-lg mb-4">Score {score}</p>
        <QuizComponent
          item={quiz.questions[index]}
          index={index}
          active={active}
          setActive={setActive}
          score={score}
          setScore={(update) => setScore((prevScore) => update(prevScore))}
        />
        <div className='flex justify-end'>
          <button onClick={handleNext} className='w-40 py-3 px-3 rounded-lg border-2 border-gray-800 font-medium bg-gray-800 text-white hover:bg-white hover:text-gray-800 transition-all ease-in-out delay-all'>Next</button>
        </div>
      </div>
    </>) : (<>
      <h1 className="text-3xl font-bold mb-4 capitalize">No Quiz Found</h1> 
    </>)}</>

    );
}

export default QuizPage;
