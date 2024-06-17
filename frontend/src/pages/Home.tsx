import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { usetAuthStatus } from '../store/userSlice/asyncThunk';

const Home: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(usetAuthStatus());
  }, [])
  
  return (
    <div>
      <p>Home</p>
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
