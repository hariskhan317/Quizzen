import { configureStore } from '@reduxjs/toolkit'
import UserSliceReducer from './userSlice/userSlice'

export const store = configureStore({
    reducer: {
        user: UserSliceReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch