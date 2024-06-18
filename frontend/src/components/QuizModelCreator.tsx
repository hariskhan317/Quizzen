
export const QuizModelCreator = ({handleStartQuiz}) => {
    return (
      <div className="absolute">
      
        <div className="quiz-selector-container px-6 py-10 mt-10 w-7/12 mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Quiz Creation</h2>
            <div className='space-y-5 mt-5'>
              <div>
                <label htmlFor="" className='text-base font-semibold'>Topic</label>
                <input type="text" className="mt-1  w-full border-2 border-gray-300 rounded py-1 px-3" placeholder='Topic' />
                <span className='text-xs text-gray-500'>Please Provide a Topic you would like to be quizzed on here</span>
              </div>
              <div>
                <label htmlFor="" className='text-base font-semibold'>Number of Questions</label>
                <input type="number" className="mt-1 w-full border-2 border-gray-300 rounded py-1 px-3" placeholder='Topic' />
                <span className='text-xs text-gray-500'>You can choose how many questions you would like to be quizzed on here</span>
              </div>
            </div>
            <button onClick={handleStartQuiz} className="mt-10 w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                Start Quiz
            </button>
        </div>
      </div>
    )
}

 
