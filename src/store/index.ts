import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import authSlice from 'store/slices/authSlice';
import repositorySlice from 'store/slices/repositorySlice';
import type { RootState } from './types';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    repositories: repositorySlice,
  },
  devTools: __DEV__,
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store as default };

// Auth selectors
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

// Repository selectors
export const selectRepositories = (state: RootState) =>
  state.repositories.repositories;
export const selectCurrentRepository = (state: RootState) =>
  state.repositories.currentRepository;
export const selectRepositoriesLoading = (state: RootState) =>
  state.repositories.isLoading;
export const selectRepositoriesRefreshing = (state: RootState) =>
  state.repositories.isRefreshing;
export const selectRepositoriesError = (state: RootState) =>
  state.repositories.error;
export const selectSearchQuery = (state: RootState) =>
  state.repositories.searchQuery;
export const selectHasMore = (state: RootState) => state.repositories.hasMore;
export const selectCurrentPage = (state: RootState) => state.repositories.page;
