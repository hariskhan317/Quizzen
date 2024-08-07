import { useEffect } from 'react';  
import { useAppDispatch, useAppSelector } from '../store/hooks';  
import { userAuthStatus } from '../store/userSlice/asyncThunk';
import loaderGif from '../assets/load-8510_256.gif'; 
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleQuiz } from '../store/quizSlice/asyncThunk';  

 

const QuestionPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch(); 
    const navigate = useNavigate();
    const { quiz, status } = useAppSelector((state) => state.quiz);
    const { isLogin } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(userAuthStatus());
        if (!isLogin) {
            navigate('/login');
        }
    }, [isLogin, navigate, dispatch]);
    
    useEffect(() => {
        if (id) {
            dispatch(getSingleQuiz(id));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div><img className='h-20 w-20 mx-auto mt-40' src={loaderGif} alt="Loading..." /></div>;
    }

    if (!quiz) {
        return <div>No Quiz Found</div>;
    }

    const score = quiz.score ?? 0;
    const number = quiz.number ?? 1;
    const percentage = (score / number) * 100;

    return (
        <div className='w-full md:w-8712 mx-auto'>
            <h1 className="text-2xl font-bold mb-6 capitalize">{quiz.topic}</h1> 
  
            {quiz?.questions?.map((item, index) => (
                <div className='mt-7' key={index}>
                    <h1 className='text-lg font-medium text-black'>Q{index + 1}. {item.question}</h1>
                    <div className='grid grid-cols-2'>
                        {item.choices.map((choice, choiceIndex) => (
                            <div className='text-base text-black capitalize px-7 py-1 mt-2' key={choiceIndex}>
                                { choiceIndex + 1}. {choice}
                            </div>
                        ))} 
                    </div> 
                    <div className='text-base text-black capitalize mt-6'>
                        Your Answer: {item?.selectedOptions?.map((optionItem: { option: string, _id: string }, optionIndex: number) => (
                            <span className='font-bold' key={optionIndex}>{optionItem.option}</span>
                        ))}
                    </div>
                    <div className='text-base text-black capitalize mt-2'>
                        Correct Answer: <span className='font-bold'>{item.correctAnswer}</span>
                    </div>
                </div>
            ))}
            <div className='mt-20 text-center'> 
                <p className={`px-5 px-2 ${percentage > 50 ? 'text-green-700 bg-green-200 px-2 py-1 rounded-md' : 'text-red-700 bg-red-200 px-2 py-1 rounded-md'}`}>
                    You scored {score} out of {number}, which is {percentage}%. {percentage > 50 ? 'Congratulations, you passed!' : 'Unfortunately, you did not pass.'}
                </p> 
            </div>
        </div> 
    );
}

export default QuestionPage;
