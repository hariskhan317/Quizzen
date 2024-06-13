import React from 'react'
import { NavLink } from 'react-router-dom'
const Header: React.FC = () => {
  return (
    <header>
        <div className='flex justify-between '>
            <div>
                <h1>QuizZen</h1>
            </div>
            <div className='flex gap-10'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
                <button >Logout</button>
            </div>
        </div>
    </header>
  )
}

export default Header
