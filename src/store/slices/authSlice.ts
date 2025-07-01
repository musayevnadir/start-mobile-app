import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../types';
import { AuthStorage } from '../../utils/storage';

const STATIC_USER: User = {
  id: '1',
  email: 'start.mobile.app@gmail.com',
  firstName: 'Nadir',
  lastName: 'Musayev',
};

export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async () => {
    const isAuth = await AuthStorage.isAuthenticated();
    if (isAuth) {
      const user = await AuthStorage.loadUser();
      return user;
    }
    return null;
  },
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  lastOperationSuccess: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      const { email, password } = action.payload;

      if (email === 'start.mobile.app@gmail.com' && password === 'Admin123!') {
        state.user = STATIC_USER;
        state.isAuthenticated = true;
        state.lastOperationSuccess = true;
        AuthStorage.saveUser(STATIC_USER);
      } else {
        state.lastOperationSuccess = false;
      }
    },

    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.lastOperationSuccess = true;
      AuthStorage.clearAuth();
    },

    register: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
      }>,
    ) => {
      const { email, firstName, lastName } = action.payload;

      const newUser: User = {
        id: '1',
        email,
        firstName,
        lastName,
      };

      state.user = newUser;
      state.isAuthenticated = true;
      state.lastOperationSuccess = true;
      AuthStorage.saveUser(newUser);
    },

    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        AuthStorage.saveUser(state.user);
      }
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.lastOperationSuccess = true;
      AuthStorage.saveUser(action.payload);
    },

    clearLastOperationResult: state => {
      state.lastOperationSuccess = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUserFromStorage.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(loadUserFromStorage.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const {
  login,
  logout,
  register,
  updateProfile,
  setUser,
  clearLastOperationResult,
} = authSlice.actions;

export default authSlice.reducer;
