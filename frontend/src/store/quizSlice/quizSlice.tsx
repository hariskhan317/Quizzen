import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuizQuestion } from './asyncThunk'

interface Quiz {
    question: string;
    choices: string[]; // Changed to string[]
    correctAnswer: string;
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
