import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface RepositoryState {
  repositories: Repository[];
  currentRepository: Repository | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  hasMore: boolean;
  totalCount: number;
}

interface FetchRepositoriesParams {
  username: string;
  page?: number;
  perPage?: number;
  query?: string;
  refresh?: boolean;
}

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async ({
    username,
    page = 1,
    perPage = 20,
    query = '',
    refresh = false,
  }: FetchRepositoriesParams) => {
    try {
      let url = '';

      if (query.trim()) {
        // Search repositories
        url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
          query,
        )}+user:${username}&page=${page}&per_page=${perPage}&sort=updated`;
      } else {
        // Get user repositories
        url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();

      if (query.trim()) {
        return {
          repositories: data.items || [],
          totalCount: data.total_count || 0,
          page,
          refresh,
        };
      } else {
        return {
          repositories: data || [],
          totalCount: data.length || 0,
          page,
          refresh,
        };
      }
    } catch (error) {
      throw error;
    }
  },
);

const initialState: RepositoryState = {
  repositories: [],
  currentRepository: null,
  isLoading: false,
  isRefreshing: false,
  error: null,
  searchQuery: '',
  page: 1,
  hasMore: true,
  totalCount: 0,
};

const repositorySlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setCurrentRepository: (state, action: PayloadAction<Repository>) => {
      state.currentRepository = action.payload;
    },

    clearCurrentRepository: state => {
      state.currentRepository = null;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.hasMore = true;
    },

    clearRepositories: state => {
      state.repositories = [];
      state.page = 1;
      state.hasMore = true;
      state.totalCount = 0;
    },

    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRepositories.pending, (state, action) => {
        if (action.meta.arg.refresh) {
          state.isRefreshing = true;
        } else {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = null;

        const { repositories, page, refresh, totalCount } = action.payload;

        if (refresh || page === 1) {
          state.repositories = repositories;
        } else {
          state.repositories = [...state.repositories, ...repositories];
        }

        state.page = page;
        state.totalCount = totalCount;
        state.hasMore = repositories.length === 20;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.error.message || 'Failed to fetch repositories';
      });
  },
});

export const {
  setCurrentRepository,
  clearCurrentRepository,
  setSearchQuery,
  clearRepositories,
  clearError,
} = repositorySlice.actions;

export default repositorySlice.reducer;
