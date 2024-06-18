import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Header from './components/Header';
import Quizpage from './pages/QuizPage'; 
import Footer from './components/Footer'
import ResultPage from './pages/ResultPage'

function App() { 
  return (
    <div className='bg-gray-100 h-screen '>
      <Header /> 
      <div className='py-8 px-20'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quizpage' element={<Quizpage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/result' element={<ResultPage score={20} totalQuestions={10} />} />
        </Routes>
      </div>
      <Footer /> 
    </div>
  )
}

export default App
