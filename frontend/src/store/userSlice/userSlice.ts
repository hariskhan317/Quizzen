import { createSlice } from '@reduxjs/toolkit'
import { userSignup } from './asyncThunk'

interface User {
    username: string;
    email: string;
    password: string;
    // other user properties if necessary
  }
  
  interface UserState {
    isLogin: boolean;
    currentUser: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
  }
  
  const initialState: UserState = {
    isLogin: false,
    currentUser: [],
    status: 'idle',
    error: '',
  };

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.status = "loading"
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.currentUser.push(action.payload)
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    },
})

export default userSlice.reducer;