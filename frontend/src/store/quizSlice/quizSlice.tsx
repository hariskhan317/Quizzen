import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postQuizQuestion, getAllQuizzes, getSingleQuiz, updateQuizResult } from './asyncThunk';

interface Question {
    question: string;
    choices: string[];
    correctAnswer: string; 
}

interface Quiz {
    _id: string; // Add ID field for navigation
    topic: string;
    number: number;
    questions: Question[];
    score: number; // Include score field for result display
}

interface QuizState {
    quizzes: Quiz[]; // Array of quizzes
    quiz: Quiz | null; // Single quiz object
    postQuiz: Quiz | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: QuizState = {
    quizzes: [], // Initialize as an empty array
    quiz: null, // Initialize as null
    status: 'idle',
    postQuiz: null,
    error: null,
};

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
                state.postQuiz = action.payload;
            })
            .addCase(postQuizQuestion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to post quiz question';
            });

        builder
            .addCase(getAllQuizzes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllQuizzes.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
                state.status = 'succeeded';
                state.quizzes = action.payload; // Set the quizzes array
            })
            .addCase(getAllQuizzes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to get quizzes';
            });

        builder
            .addCase(getSingleQuiz.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSingleQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
                state.status = 'succeeded';
                state.quiz = action.payload;
            })
            .addCase(getSingleQuiz.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to get single quiz';
            });

        builder
            .addCase(updateQuizResult.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateQuizResult.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateQuizResult.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to update quiz result';
            });
    },
});

export default quizSlice.reducer;
