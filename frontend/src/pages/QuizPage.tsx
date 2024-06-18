import { useEffect } from 'react'; 
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userAuthStatus } from '../store/userSlice/asyncThunk';
import { getQuizQuestion } from '../store/quizSlice/asyncThunk';
import { useNavigate } from 'react-router-dom';
import { QuizComponent } from '../components/QuizComponent'
import loaderGif from '../assets/load-8510_256.gif';
 
const QuizPage = () => {
    const { isLogin } = useAppSelector((state) => state.user);
    const { quiz } = useAppSelector((state) => state.quiz);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userAuthStatus());
        if (!isLogin) {
            navigate('/login');
        }
    }, [isLogin, navigate, dispatch]);
  
    const handleStartQuiz = () => {
      dispatch(getQuizQuestion());
      console.log(quiz)
    }
  
    // Check if quiz is null or undefined, render loading if it is
    if (!quiz) {
      return <div><img className='h-20 w-20 mx-auto mt-40' src={loaderGif} alt="Loading..." /></div>;
    }
  
    return (
        <div>

          {quiz.map((item, quizIndex) => (
            <QuizComponent item={item} quizIndex={quizIndex} />
          ))}
        </div>
    );
}

export default QuizPage;
