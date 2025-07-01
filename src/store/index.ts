import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import authSlice from 'store/slices/authSlice';
import type { RootState } from './types';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  devTools: __DEV__,
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store as default };

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectLastOperationSuccess = (state: RootState) =>
  state.auth.lastOperationSuccess;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectUserFullName = (state: RootState) => {
  const user = state.auth.user;
  if (!user) return '';
  return `${user.firstName} ${user.lastName}`.trim();
};
