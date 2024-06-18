import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userSignup, userLogin, userAuthStatus, userLogout } from './asyncThunk';
    
interface User {
    name: string;
    email: string;
    password: string; 
}

interface UserState {
    isLogin: boolean;
    currentUser: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    isLogin: false,
    currentUser: null,
    status: 'idle',
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // signup
        builder.addCase(userSignup.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(userSignup.fulfilled, (state, action: PayloadAction<User>) => {
            state.status = 'succeeded';
            state.currentUser = action.payload;
            state.isLogin = true;
            state.error = null;
        })
        .addCase(userSignup.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to signup';
        });
        // login
        builder.addCase(userLogin.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(userLogin.fulfilled, (state, action: PayloadAction<User>) => {
            state.status = 'succeeded';
            state.currentUser = action.payload;
            state.isLogin = true;
            state.error = null;
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to login';
        });
        // authStatus
        builder.addCase(userAuthStatus.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(userAuthStatus.fulfilled, (state, action: PayloadAction<User>) => {
            state.status = 'succeeded';
            state.currentUser = action.payload;
            state.isLogin = true;
            state.error = null;
        })
        .addCase(userAuthStatus.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to login';
        });
        // authStatus
        builder.addCase(userLogout.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(userLogout.fulfilled, (state) => {
            state.status = 'succeeded';
            state.currentUser = null;
            state.isLogin = false; 
        })
        .addCase(userLogout.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to login';
        });
    },
});

export default userSlice.reducer;
