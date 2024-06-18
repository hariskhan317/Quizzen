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
    <header className='shadow-lg border-b px-10 py-6'>
      <div className='flex justify-between '>
        <div>  
          <button className='text-xl font medium bg-gray-300 px-5 py-2 rounded'>QuizZen</button>
        </div>
        <div className='flex gap-10 ' >
          {isLogin ? (
            <>
              <button>
                <NavLink className="block" to="/">Home</NavLink>
              </button>
              <button onClick={handleLogout} >Logout</button>
            </>) : (
              <>
                <button>
                  <NavLink to="/login">Login</NavLink>
                </button>
                <button>
                  <NavLink to="/signup">Signup</NavLink>
                </button>
              </> )}
          </div>
      </div>
    </header>
  )
}

export default Header
