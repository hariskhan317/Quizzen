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
    <header className="shadow-lg border-b px-10 py-6">
      <div className="flex justify-between items-center">
        <div>
          <button className="text-xl text-white font-semibold bg-gray-500 px-5 py-2 rounded">
            <NavLink to="/">QuizZen</NavLink>
          </button>
        </div>
        <div className="flex gap-10 items-center">
          {isLogin ? (
            <>
              <NavLink className="block text-lg" to="/">Home</NavLink>
              <button className="text-lg" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="text-lg" to="/login">Login</NavLink>
              <NavLink className="text-lg" to="/signup">Signup</NavLink>
            </>
          )}
        </div>
      </div>
    </header>

  )
}

export default Header
