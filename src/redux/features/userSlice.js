import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    clearAllUserErrors: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  clearAllUserErrors,
  logout
} = userSlice.actions;

export const register = (data) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post('http://localhost:4500/user/signup', data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || "Something went wrong"));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:4500/user/signin', data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.user && response.data.token) {
      dispatch(loginSuccess(response.data));
    } else {
      dispatch(loginFailure('Invalid login response'));
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Something went wrong"));
  }
};

export const googleSignIn = (data) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:4500/user/google', data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.user && response.data.token) {
      dispatch(loginSuccess(response.data));
    } else {
      dispatch(loginFailure('Invalid Google sign-in response'));
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Something went wrong"));
  }
};

export default userSlice.reducer;
