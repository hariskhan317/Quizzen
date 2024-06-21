import axios from "axios"; 
import { createAsyncThunk } from '@reduxjs/toolkit';


interface quizQuestion{
    topic: string;
    number: number;
}
interface Quiz{
    question: string;
    choice: [string];
    correctAnswer: string;
}

export const postQuizQuestion = createAsyncThunk<Quiz, quizQuestion>('quiz/postQuizQuestion', async (data:quizQuestion) => {
    const response = await axios.post('/quiz/new',data);
    return response.data.quiz;  
})

export const getQuizQuestion = createAsyncThunk<Quiz, quizQuestion>('quiz/getQuizQuestion', async () => {
    const response = await axios.get('/quiz/get-quizzes');
    return response.data.quiz;  
})