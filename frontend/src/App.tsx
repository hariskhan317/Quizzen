import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Header from './components/Header';
import Quizpage from './pages/QuizPage';
function App() {

  return (
    <div className='px-10 py-6 bg-gray-100 h-screen '>
      <Header />
      <div className='py-8 px-12'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/quizpage' element={<Quizpage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
