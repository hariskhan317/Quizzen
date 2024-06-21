import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postQuizQuestion, getQuizQuestion } from './asyncThunk'

interface Question {
    question: string;
    choices: string[]; // Changed to string[]
    correctAnswer: string;
}
interface Quiz {
    topic: string;
    number: number;
    questions: Question[];  
}

interface QuizState {
    quiz:  Quiz[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; 
    error: string | null;
}

const initialState: QuizState = {
    quiz: [], 
    status: 'idle', 
    error: null,
}

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postQuizQuestion.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postQuizQuestion.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
                state.status = 'succeeded'; 
                state.quiz = action.payload;
            })
            .addCase(postQuizQuestion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to get quiz question';
            }) 
        builder
            .addCase(getQuizQuestion.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getQuizQuestion.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
                state.status = 'succeeded'; 
                state.quiz = action.payload;
            })
            .addCase(getQuizQuestion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to get quiz question';
            }) 
    },
});

export default quizSlice.reducer;
