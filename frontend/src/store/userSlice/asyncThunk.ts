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

export const userSignup = createAsyncThunk(
  'user/signup',
  async (signupData: SignupData) => {
    const response = await axios.post('/user/signup', signupData);
    return response.data;
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async (loginData: LoginData) => {
    const response = await axios.post('/user/login', loginData);
    return response.data;
  }
);

export const userAuthStatus = createAsyncThunk(
  'user/authStatus',
  async () => {
    const response = await axios.get('/user/authStatus');
    return response.data;
  }
);

export const userLogout = createAsyncThunk(
  'user/logout',
  async () => {
    const response = await axios.post('/user/logout');
    return response.data;
  }
);
