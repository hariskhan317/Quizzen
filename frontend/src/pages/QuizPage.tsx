import { useEffect, useState } from 'react'; 
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userAuthStatus } from '../store/userSlice/asyncThunk';
import { updateQuizResult } from '../store/quizSlice/asyncThunk';
import { useNavigate } from 'react-router-dom';
import loaderGif from '../assets/load-8510_256.gif'; 
import { QuizComponent } from '../components/QuizComponent';

const QuizPage = () => {
    const { isLogin } = useAppSelector((state) => state.user);
    const { postQuiz, status } = useAppSelector((state) => state.quiz);
    const [index, setIndex] = useState<number>(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState<number | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        dispatch(userAuthStatus());
        if (!isLogin) {
            navigate('/login');
        }
    }, [isLogin, navigate, dispatch]);

    useEffect(() => {
        if (postQuiz?.questions?.length) {
            if (index >= postQuiz.questions.length) {
                const data = { selectedOptions, id: postQuiz._id };
                dispatch(updateQuizResult(data));
                return navigate('/result');
            }
        }
    }, [index, postQuiz, navigate, selectedOptions, dispatch]);

    {console.log(postQuiz)}

    if (status === 'loading') {
        return <div><img className='h-20 w-20 mx-auto mt-40' src={loaderGif} alt="Loading..." /></div>;
    }

    if (!postQuiz || !postQuiz.questions || postQuiz.questions.length === 0) {
        return <h1 className="text-3xl font-bold mb-4 capitalize">No Quiz Found</h1>;
    }

 

    return (
      <div>
            <h1 className="text-3xl font-bold mb-4 capitalize">{postQuiz.topic}</h1>
            <p className="text-lg mb-4">Number of Questions: {postQuiz.questions.length}</p>
            <QuizComponent
                active={active}
                setActive={setActive}
                item={postQuiz.questions[index]}
                index={index}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                setIndex={setIndex}
            />
        </div>
    );
}

export default QuizPage;
