import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// 1. Login Async Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      // Check if browser is offline
      if (!navigator.onLine) {
        throw new Error('NETWORK_ERROR');
      }

      const response = await axios.post(`${API_URL}/auth/login`, formData, { timeout: 6000 });
      return response.data;
    } catch (error) {
      // Network error or backend server not running
      if (!error.response || error.code === 'ERR_NETWORK' || error.message === 'NETWORK_ERROR') {
        throw new Error('NETWORK_ERROR');
      }
      return rejectWithValue(error.response?.data?.message || 'Invalid email or password.');
    }
  }
);

// 2. Register Async Thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      // Check if browser is offline
      if (!navigator.onLine) {
        throw new Error('NETWORK_ERROR');
      }

      const response = await axios.post(`${API_URL}/auth/register`, formData, { timeout: 6000 });
      return response.data;
    } catch (error) {
      // Network error or backend server not running
      if (!error.response || error.code === 'ERR_NETWORK' || error.message === 'NETWORK_ERROR') {
        throw new Error('NETWORK_ERROR');
      }
      return rejectWithValue(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    isRegistered: false,
    loading: false,
    error: null,
    networkError: false,
  },
  reducers: {
    resetAuthStatus: (state) => {
      state.isLoggedIn = false;
      state.isRegistered = false;
      state.error = null;
      state.networkError = false;
    },
    setNetworkError: (state, action) => {
      state.networkError = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isRegistered = false;
      state.error = null;
      state.networkError = false;
    },
  },
  extraReducers: (builder) => {
    // Login Lifecycle
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.networkError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user || { email: 'user@example.com' };
        state.token = action.payload.token || 'token_received';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error?.message === 'NETWORK_ERROR') {
          state.networkError = true;
        } else {
          state.error = action.payload || 'Login failed!';
        }
      });

    // Register Lifecycle
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.networkError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = true;
        state.user = action.payload.user || null;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error?.message === 'NETWORK_ERROR') {
          state.networkError = true;
        } else {
          state.error = action.payload || 'Registration failed!';
        }
      });
  },
});

export const { resetAuthStatus, setNetworkError, logout } = authSlice.actions;

export default authSlice.reducer;
