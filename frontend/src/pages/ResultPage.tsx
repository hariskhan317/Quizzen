import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { userAuthStatus } from '../store/userSlice/asyncThunk';
import loaderGif from '../assets/load-8510_256.gif';
import { getAllQuizzes } from '../store/quizSlice/asyncThunk';

const ResultPage: React.FC = () => {
    const { isLogin } = useAppSelector((state) => state.user);
    const { quizzes, status } = useAppSelector((state) => state.quiz);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(userAuthStatus());
        if (!isLogin) {
            navigate('/login');
        }
    }, [isLogin, navigate, dispatch]);

    useEffect(() => {
        dispatch(getAllQuizzes());
    }, [dispatch]);

    const handleResultPage = (id: string) => {
        navigate(`/quiz-question/${id}`);
    }

    if (status === 'loading') {
        return <div><img className='h-20 w-20 mx-auto mt-40' src={loaderGif} alt="Loading..." /></div>;
    }

    if (!quizzes.length) {
        return <div>No quiz data available.</div>;
    }

    return (
        <div className="bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-center">Quiz Result</h1>
            <div>
                {quizzes.map((item) => (
                    <div key={item._id} onClick={() => handleResultPage(item._id)} className='flex justify-between bg-white mx-auto mt-10 w-full md:w-6/12 py-5 px-10 rounded-lg shadow-lg w-full hover:scale-105 transition-all ease-in-out delay-all cursor-pointer'>
                        <div>
                            <p className='text-xs font-semibold'>
                                <span className={`${ item.score / item.questions.length * 100 > 50 ? 'text-green-700 bg-green-200 px-2 py-1 rounded-md' : 'text-red-700 bg-red-200 px-2 py-1 rounded-md'}`}>
                                    {item.score / item.questions.length * 100 > 50 ? 'Pass' : 'Fail'}
                                </span>
                            </p>
                            <h1 className='mt-2 text-3xl font-medium text-black capitalize'>{item.topic}</h1>
                        </div>
                        <div className='mt-2 text-base font-semibold text-center'>
                            <p className={`${ item.score / item.questions.length * 100 > 50 ? 'text-green-700 bg-green-200 px-2 py-1 rounded-md' : 'text-red-700 bg-red-200 px-2 py-1 rounded-md'}`}>
                                Score: {item.score} / {item.questions.length}
                            </p>
                            <p>{ item.score / item.questions.length * 100 }%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultPage;
