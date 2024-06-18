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
      <div className="min-h-screen flex flex-col">
          <header className="bg-gray-300 text-black rounded p-6 text-center">
              <h1 className="text-4xl font-bold">Welcome to Quizzen</h1>
              <p className="mt-2 text-lg">Test your knowledge with our fun and interactive quizzes!</p>
          </header>
          <main className="flex-grow p-6 bg-gray-100">
              <section className="my-8 text-center">
                  <h2 className="text-3xl font-semibold">Join Us Today!</h2>
                  <p className="mt-4 text-lg">Sign up now to start taking quizzes and track your progress. Challenge yourself and your friends to see who knows more!</p>
                  <div className="mt-6 space-x-4">
                      <Link to="/signup">
                          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Sign Up</button>
                      </Link>
                      <Link to="/login">
                          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">Log In</button>
                      </Link>
                  </div>
              </section>
              <section className="my-8">
                  <h2 className="text-3xl font-semibold text-center">Features</h2>
                  <ul className="mt-4 space-y-2 text-lg list-disc list-inside  grid grid-cols-2 justify-items-center md:px-40">
                      <li>Wide variety of quizzes</li>
                      <li>Track your progress</li>
                      <li>Compete with friends</li>
                      <li>Earn badges and rewards</li>
                  </ul>
              </section> 
          </main>
      </div>
  );
}

export default Home
