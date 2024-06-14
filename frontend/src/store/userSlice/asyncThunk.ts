// asyncThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// interface SignupData {
//   name: string;
//   email: string;
//   password: string;
// }

// interface User {
//   username: string;
//   // other user properties if necessary
// }

export const userSignup = createAsyncThunk(
  'user/signup',
  async (signupData) => {
    const response = await axios.post('/user/signup', signupData);
    console.log(signupData)  
    return response.data;
  }
);
