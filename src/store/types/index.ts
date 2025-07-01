export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  lastOperationSuccess: boolean | null;
  isLoading: boolean;
}

export interface RootState {
  auth: AuthState;
  repositories: import('../slices/repositorySlice').RepositoryState;
}
