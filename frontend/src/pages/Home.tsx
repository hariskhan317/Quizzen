import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { QuizModelCreator } from '../components/QuizModelCreator'
import { userAuthStatus } from '../store/userSlice/asyncThunk';

const Home: React.FC = () => {
  const { isLogin, currentUser } = useAppSelector((state) => state.user);
  const [showModel, setShowModel] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userAuthStatus());
  }, [])
  
  const showModelHandle = () => {
    setShowModel(true)
  }

  return (
      <div className="max-h-screen flex flex-col">
        {isLogin ? (
          <>
            <header className="bg-gray-800 rounded text-black p-6 text-center">
              <h1 className="text-4xl text-white font-bold capitalize">Welcome Back, {currentUser?.name}!</h1>
              <p className="mt-2 text-gray-100 text-lg">Ready to test your knowledge today?</p>
            </header>
            <main className="grid lg:grid-cols-2 gap-4 justify-items-center">
                <section className="my-8 ">
                    <h2 className="text-3xl font-semibold">Take a New Quiz</h2>
                    <p className="mt-4 text-lg">Select a category and start a new quiz now:</p>
                    <button onClick={showModelHandle} className="mt-6 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300">Start Quiz</button>
                </section> 
                <section className="my-8">
                    <h2 className="text-3xl font-semibold">Recent Activity</h2>
                    <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
                        <li>Quiz on General Knowledge: 85%</li>
                        <li>Quiz on Science: 90%</li>
                        <li>Quiz on History: 75%</li>
                    </ul>
                    <div className="">
                        <Link to="/result">
                            <button className="mt-6 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300">See All Activity</button>
                        </Link>
                    </div>
                </section>
                {/* Model */}
            {showModel &&
              <>
                <div onClick={() => {setShowModel(false)}} className="bg-black bg-opacity-[90%] w-full h-full absolute top-0 left-0"></div>
                <QuizModelCreator setShowModel={setShowModel} />
              </>
            }
            </main> 
          </>
        ) : (
            <>
              <header className="bg-gray-800 text-white rounded p-6 text-center">
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
            </>
          )}
      </div>
 
  );
}

export default Home
