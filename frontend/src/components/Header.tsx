import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/hooks'; 
const Header: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.user)
  return (
    <header>
      <div className='flex justify-between '>
        <div>  
          <h1>QuizZen</h1>
        </div>
        <div className='flex gap-10'>
          {isLogin ? (
            <>
              <NavLink to="/">Home</NavLink>
              <button >Logout</button>
            </>) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </> )}
          </div>
      </div>
    </header>
  )
}

export default Header
