import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postQuizQuestion, getAllQuizzes, updateQuizResult } from './asyncThunk'

interface Question {
    question: string;
    choices: string[];
    correctAnswer: string; 
}
interface Quiz {
    topic: string;
    number: number;
    questions: Question[];
}

interface QuizState {
    quiz: Quiz | null; // Change to a single Quiz object or null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; 
    error: string | null;
}

const initialState: QuizState = {
    quiz: null, // Initialize as null
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
            .addCase(postQuizQuestion.fulfilled, (state, action: PayloadAction<Quiz>) => {
                state.status = 'succeeded'; 
                state.quiz = action.payload;
            })
            .addCase(postQuizQuestion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to get quiz question';
            }) 
        builder
            .addCase(getAllQuizzes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllQuizzes.fulfilled, (state, action: PayloadAction<Quiz>) => {
                state.status = 'succeeded'; 
                state.quiz = action.payload;
            })
            .addCase(getAllQuizzes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to get quiz question';
            }) 
        builder
            .addCase(updateQuizResult.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateQuizResult.fulfilled, (state) => {
                state.status = 'succeeded';  
            })
            .addCase(updateQuizResult.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to get quiz question';
            })
    },
});

export default quizSlice.reducer;
