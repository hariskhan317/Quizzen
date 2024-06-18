import React, { useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';  
import { useNavigate } from 'react-router-dom'; 
interface props{
    score: number;
    totalQuestions: number;
}
 
const ResultPage: React.FC<props> = ({ score, totalQuestions }) => {
    const { isLogin } = useAppSelector((state) => state.user);
    const percentage = (score / totalQuestions) * 100;
    const navigate = useNavigate();

    useEffect(() => { 
        if (!isLogin) {
            navigate('/login');
        }
    }, [isLogin]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-6 text-center">Quiz Result</h1>
                <div className="text-center mb-6">
                    <p className="text-xl font-semibold">You scored</p>
                    <p className="text-4xl font-bold text-gray-900">{score}/{totalQuestions}</p>
                    <p className="text-lg">({percentage.toFixed(2)}%)</p>
                </div>
                <div className="text-center">
                    <p className="text-lg">Congratulations on completing the quiz!</p>
                    <p className="text-lg">You can view your detailed results and answers below:</p>
                    <Link to="/quiz-results">
                        <button className="mt-6 bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-purple-800 transition duration-300">View Results</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
