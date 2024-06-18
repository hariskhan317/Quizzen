import axios from "axios"; 
import { createAsyncThunk } from '@reduxjs/toolkit';

interface Quiz{
    question: string;
    choice: [string];
    correctAnswer: string;
}

export const getQuizQuestion = createAsyncThunk<Quiz>('quiz/quizQuestion', async () => {
    const response = await axios.get('/quiz/new');
    return response.data.quiz;  
})