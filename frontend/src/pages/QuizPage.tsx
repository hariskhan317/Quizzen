import { useEffect } from 'react'; 
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { usetAuthStatus } from '../store/userSlice/asyncThunk';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const { isLogin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(usetAuthStatus());
    if (!isLogin) {
      return navigate('/login')
    }
  },[isLogin])
  return (
    <div>
      QuizPage
    </div>
  )
}

export default QuizPage;
