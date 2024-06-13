import React from 'react'
import { Link } from 'react-router-dom'
const Home: React.FC = () => {
  return (
    <div>
      <p>Home</p>
      <button className='bg-gray-300 border-2 p-4 rounded mt-10'>
        <Link to="/quizpage">Get Started</Link>
      </button>
    </div>
  )
}

export default Home
