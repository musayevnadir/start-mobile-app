import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GitHubAPI, Repository } from '../../services/api/github.api';

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
    if (query.trim()) {
      const searchQuery = `${query} user:${username}`;
      const response = await GitHubAPI.searchRepositories({
        query: searchQuery,
        page,
        perPage,
        sort: 'updated',
      });

      if (!response.result) {
        throw new Error(response.message || 'Failed to search repositories');
      }

      return {
        repositories: response.data?.items || [],
        totalCount: response.data?.total_count || 0,
        page,
        refresh,
      };
    } else {
      const response = await GitHubAPI.getUserRepositories({
        username,
        page,
        perPage,
        sort: 'updated',
      });

      if (!response.result) {
        throw new Error(response.message || 'Failed to fetch repositories');
      }

      return {
        repositories: response.data || [],
        totalCount: response.data?.length || 0,
        page,
        refresh,
      };
    }
  },
);

export const fetchRepository = createAsyncThunk(
  'repositories/fetchRepository',
  async ({ owner, repo }: { owner: string; repo: string }) => {
    const response = await GitHubAPI.getRepository(owner, repo);

    if (!response.result) {
      throw new Error(response.message || 'Failed to fetch repository');
    }

    return response.data;
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
      })
      .addCase(fetchRepository.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRepository.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentRepository = action.payload;
      })
      .addCase(fetchRepository.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch repository';
      });
  },
});

export const {
  setCurrentRepository,
  setSearchQuery,
  clearRepositories,
  clearError,
} = repositorySlice.actions;

export default repositorySlice.reducer;
