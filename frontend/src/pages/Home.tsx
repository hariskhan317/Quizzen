import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userAuthStatus } from '../store/userSlice/asyncThunk';

const Home: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userAuthStatus());
  }, [])
  
  return (
    <div>
      <div className='mb-10'>
      <p>Home</p>
      </div>
      {isLogin ? (
        <>
      <Link to="/quizpage" className="bg-gray-300 border-2 p-4 rounded mt-10">Get Started</Link>
        </>) : (<>
        <p className='text-black'>click button to login</p>
      </>)}
    </div>
  )
}

export default Home
