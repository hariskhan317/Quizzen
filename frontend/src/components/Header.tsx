import React from 'react';
import { NavLink } from 'react-router-dom';
import { userLogout } from '../store/userSlice/asyncThunk';
import { useAppSelector, useAppDispatch } from '../store/hooks'; 
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.user)
  const handleLogout = () => {
    dispatch(userLogout())
  }
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
              <button onClick={handleLogout} >Logout</button>
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
