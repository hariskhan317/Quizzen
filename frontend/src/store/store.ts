import { configureStore } from '@reduxjs/toolkit'
import UserSliceReducer from './userSlice/userSlice'
import QuizSliceReducer from './quizSlice/quizSlice'

export const store = configureStore({
    reducer: {
        user: UserSliceReducer,
        quiz: QuizSliceReducer,
    }
});

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch