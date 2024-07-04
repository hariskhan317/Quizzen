import axios from "axios"; 
import { createAsyncThunk } from '@reduxjs/toolkit';


interface quizQuestion{
    topic: string;
    number: number;
}

// interface quizResult {
//     selectedOptions: [string];
// }
interface Quiz{
    question: string;
    choice: [string];
    correctAnswer: string;
}

type idType = string;
interface Selection{
    selectedOptions: string[];
    id: string;
}

export const postQuizQuestion = createAsyncThunk('quiz/postQuizQuestion', async (data:quizQuestion) => {
    const response = await axios.post('/quiz/new', data);
    return response.data.quiz;  
})

export const getSingleQuiz = createAsyncThunk('quiz/getQuiz', async (id:idType) => {
    const response = await axios.get(`/quiz/get-quiz/${id}`);  
    return response.data;  
})

export const getAllQuizzes = createAsyncThunk('quiz/getAllQuizzes', async () => {
    const response = await axios.get('/quiz/get-quizzes'); 
    return response.data.quiz;  
})

export const updateQuizResult = createAsyncThunk<Quiz, Selection>(
    'quiz/updateQuizResult',
    async (data:Selection) => {
        try { 
            const response = await axios.post('/quiz/quiz-result', data);
            return response.data.quiz;  
    
        } catch (error) {
            console.error('Error updating quiz result:', error);
            throw error; 
        }
    }
);