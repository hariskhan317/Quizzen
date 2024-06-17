// asyncThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  username: string;
  email: string;
  password: string;
  // Add other user properties if necessary
}

export const userSignup = createAsyncThunk<User, SignupData>(
  'user/signup',
  async (signupData: SignupData) => {
    const response = await axios.post<User>('/user/signup', signupData);
    return response.data;
  }
);

export const userLogin = createAsyncThunk<User, LoginData>(
  'user/login',
  async (loginData: LoginData) => {
    const response = await axios.post<User>('/user/login', loginData);
    return response.data;
  }
);

export const usetAuthStatus = createAsyncThunk(
  'user/authStatus',
  async () => {
    const response = await axios.get('/user/authStatus');
    return response.data;
  }
);
